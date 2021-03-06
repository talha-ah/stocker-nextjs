import Head from "next/head"
import { useState } from "react"
import type { NextPage } from "next"
import styled from "styled-components"

import { Layout } from "@layouts/layout"
import { useOrders } from "@hooks/orders"
import { Input } from "@components/Inputs"
import { Delete } from "@components/icons"
import { Button } from "@components/Buttons"
import { generateReceipt } from "@utils/pdfs"
import { useSearchStock } from "@hooks/stocks"
import { Header, Table } from "@components/Table"
import { Content, FlexRow } from "@components/Common"
import { Select, SelectType } from "@components/Select"
import { SearchSelect } from "@components/SearchSelect"
import { generateId, calculateDiscount, truncate } from "@utils/common"
import { useSearchCustomer, useCustomers } from "@hooks/customers"

const Buttons = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.default}px;
  margin: ${({ theme }) => theme.spacing.default}px 0px;
`

const Actions = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.light};
`

const headers = [
  { key: 1, name: "Sr.", field: "sr", align: "left", width: "100px" },
  { key: 2, name: "Description", field: "description", align: "left" },
  {
    key: 3,
    name: "Inventory",
    field: "inventory",
    align: "left",
    width: "100px",
  },
  { key: 4, name: "Price", field: "sale_price", align: "left", width: "100px" },
  { key: 5, name: "Qty", field: "qty", align: "left", width: "100px" },
  { key: 6, name: "Disc %", field: "discount", align: "left", width: "100px" },
  {
    key: 7,
    name: "Disc",
    field: "discount_price",
    align: "right",
  },
  {
    key: 8,
    name: "Amount",
    field: "total_price",
    align: "right",
  },
  { key: 9, name: "Actions", field: "actions", align: "center" },
]

const paymentTypes = [
  {
    label: "Cash",
    value: "cash",
  },
  {
    label: "Installments",
    value: "installments",
  },
]

const Orders: NextPage = () => {
  const [rows, setRows] = useState<any>([])

  const [paymentType, setPaymentType] = useState<SelectType[]>([
    paymentTypes[0],
  ])

  const { addData, loading, error } = useOrders()

  const [stockQuery, setstockQuery] = useState("")
  const { stocks } = useSearchStock(stockQuery)

  const [customerQuery, setCustomerQuery] = useState("")
  const { customers } = useSearchCustomer(customerQuery)

  const [address, setAddress] = useState<string>("")
  const [customer, setCustomer] = useState<any | null>(null)

  const addStock = (value: any) => {
    const rowsCloned = [...rows]

    const rowIndex = rowsCloned.findIndex(
      (row) => String(row.value) === String(value.value)
    )
    console.log(rowIndex)

    if (rowIndex === -1) {
      rowsCloned.push({
        ...value,
        qty: 1,
        discount: 0,
        discount_price: 0,
        total_price: value.sale_price,
      })
    } else {
      rowsCloned[rowIndex].qty++
    }

    setRows(rowsCloned)
    setstockQuery("")
  }

  const removeStock = (id: string) => {
    const rowsCloned = [...rows]

    setRows(rowsCloned.filter((d: any) => String(d._id) !== String(id)))
  }

  const onChangeRowInput = (e: any, field: any, row: any) => {
    const name = e.target.name
    const value = e.target.value

    const clonedRows = [...rows]
    const elemIndex = clonedRows.findIndex(
      (elem: any) => String(elem._id) === String(row._id)
    )
    clonedRows[elemIndex][field] = value
    setRows(clonedRows)

    setTimeout(() => {
      const element = document.getElementById(name)
      element?.focus()
    }, 0)
  }

  const resetForm = () => {
    setRows([])
    setCustomer(null)
    setPaymentType([paymentTypes[0]])
  }

  const onSubmit = async (status: string = "active") => {
    const body = {
      created_for: customer?.value,
      display_id: generateId(),
      stocks: rows.map((row: any) => ({
        stock_id: row.value,
        quantity: row.qty,
        price: row.sale_price,
        discount: row.discount,
        discount_type: "percentage",
      })),
      type: paymentType[0]?.value,
      installments: 1,
      status: status,
      address_one: address || customer?.address_one,
      address_two: customer?.address_two,
      postal_code: customer?.postal_code,
      city: customer?.city,
      state: customer?.state,
      country: customer?.country,
    }

    addData(body, (data: any) => {
      generateReceipt(data)
      resetForm()
    })
  }

  // ==================> Add Customer
  const { addData: addCustomer } = useCustomers()

  const onAddCustomer = async (body: any) => {
    addCustomer(body, (data: any) => {
      setCustomer({
        ...data,
        value: data._id,
        label: data.first_name,
      })
    })
  }
  // Add Customer <==================

  const renderData = (rows: any) => {
    return rows.map((row: any) => ({
      ...row,
      sale_price: (
        <Input
          small
          min={0}
          type="number"
          marginBottom={0.1}
          value={row.sale_price}
          name={`sale_price${row._id}`}
          onChange={(e: any) => onChangeRowInput(e, "sale_price", row)}
        />
      ),
      qty: (
        <Input
          small
          min={0}
          type="number"
          value={row.qty}
          marginBottom={0.1}
          name={`qty${row._id}`}
          onChange={(e: any) => onChangeRowInput(e, "qty", row)}
        />
      ),
      discount: (
        <Input
          small
          min={0}
          type="number"
          marginBottom={0.1}
          value={row.discount}
          name={`discount${row._id}`}
          onChange={(e: any) => onChangeRowInput(e, "discount", row)}
        />
      ),
      discount_price:
        truncate(
          calculateDiscount(row.sale_price, row.qty, row.discount).discount,
          2
        ) || 0,
      total_price: truncate(
        calculateDiscount(row.sale_price, row.qty, row.discount).value,
        2
      ),
      actions: (
        <Actions>
          <Button
            small
            iconed
            hover={false}
            onClick={() => removeStock(row._id)}
          >
            <Delete />
          </Button>
        </Actions>
      ),
    }))
  }

  return (
    <Layout>
      <Head>
        <title>Add Order - Stocker</title>
        <meta name="description" content="stocker" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Content>
        <FlexRow>
          <Header title="Add Order" actions={false} />
          <FlexRow>
            <Input
              name="address"
              label="Address"
              value={address}
              marginBottom={0.1}
              placeholder="Address"
              onChange={(e: any) => setAddress(e.target.value)}
            />
          </FlexRow>
        </FlexRow>
        <FlexRow>
          <Select
            required
            search={false}
            name="paymentType"
            value={paymentType}
            label="Payment Type"
            options={paymentTypes}
            placeholder="Payment Type"
            error={error?.add?.paymentType}
            onChange={(value: any) => setPaymentType(value)}
          />
          <SearchSelect
            required
            name="customers"
            label="Customer"
            options={customers}
            value={customer?.first_name}
            placeholder="Search Customer"
            error={error?.add?.created_for}
            onSelect={(value: any) => setCustomer(value)}
            onSearch={(text: string) => setCustomerQuery(text)}
            onCreate={(value: any) => onAddCustomer({ first_name: value })}
          />
          <SearchSelect
            required
            name="stocks"
            label="Stock"
            options={stocks}
            placeholder="Search Stock"
            error={error?.add?.stocks}
            onSelect={(value: any) => addStock(value)}
            onSearch={(text: string) => setstockQuery(text)}
          />
        </FlexRow>

        <Table
          height={600}
          hover={false}
          id="add_order"
          headers={headers}
          rows={renderData(rows)}
          totalField={["discount_price", "total_price"]}
        />
        {rows.length > 0 && (
          <Buttons>
            <Button
              primary
              loading={loading.add.order}
              onClick={() => onSubmit("active")}
            >
              Add Order
            </Button>
            <Button
              neutral
              loading={loading.add.quotation}
              onClick={() => onSubmit("quotation")}
            >
              Add Quotation
            </Button>
          </Buttons>
        )}
      </Content>
    </Layout>
  )
}

export default Orders
