import Head from "next/head"
import Image from "next/image"
import { useState } from "react"
import type { NextPage } from "next"
import styled from "styled-components"

import { Layout } from "@layouts/layout"
import { useOrders } from "@hooks/orders"
import { Input } from "@components/Inputs"
import { generateReceipt } from "@utils/pdfs"
import { useSearchStock } from "@hooks/stocks"
import { Header, Table } from "@components/Table"
import { Content, FlexRow, FlexColumn } from "@components/Common"
import { Select, SelectType } from "@components/Select"
import { SearchSelect } from "@components/SearchSelect"
import { generateId, calculateDiscount } from "@utils/common"
import { useSearchCustomer, useCustomers } from "@hooks/customers"
import { Button, NeutralButton, IconButton } from "@components/Buttons"

const Form = styled(FlexColumn)`
  margin: ${({ theme }) => theme.gaps.light} 0px;
`

const Buttons = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.gaps.default};
  margin: ${({ theme }) => theme.gaps.default} 0px;
`

const Actions = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.gaps.light};
`

const headers = [
  { key: 1, name: "Sr.", field: "sr", align: "left", width: "100px" },
  { key: 2, name: "Description", field: "description", align: "left" },
  { key: 3, name: "Code", field: "code", align: "left" },
  { key: 4, name: "Price", field: "sale_price", align: "left", width: "100px" },
  { key: 5, name: "Qty", field: "qty", align: "left", width: "100px" },
  { key: 6, name: "Disc %", field: "discount", align: "left", width: "100px" },
  {
    key: 7,
    name: "Disc Price",
    field: "discount_price",
    align: "left",
    width: "100px",
  },
  {
    key: 8,
    name: "Total Price",
    field: "total_price",
    align: "left",
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

  const { addData, loading } = useOrders()
  const [stockQuery, setstockQuery] = useState("")
  const { stocks } = useSearchStock(stockQuery)
  const [customerQuery, setCustomerQuery] = useState("")
  const { customers } = useSearchCustomer(customerQuery)

  const [address, setAddress] = useState<string>("")
  const [displayId, setDisplayId] = useState<string>("")
  const [customer, setCustomer] = useState<any | null>(null)

  const addStock = (value: any) => {
    const rowsCloned = [...rows]

    const rowIndex = rowsCloned.findIndex(
      (row) => String(row.value) === String(value.value)
    )

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
      display_id: displayId || generateId(),
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
          name={`qty${row._id}`}
          onChange={(e: any) => onChangeRowInput(e, "qty", row)}
        />
      ),
      discount: (
        <Input
          small
          min={0}
          type="number"
          value={row.discount}
          name={`discount${row._id}`}
          onChange={(e: any) => onChangeRowInput(e, "discount", row)}
        />
      ),
      discount_price: calculateDiscount(row.sale_price, row.qty, row.discount)
        .discount,
      total_price: calculateDiscount(row.sale_price, row.qty, row.discount)
        .value,
      actions: (
        <Actions>
          <IconButton onClick={() => removeStock(row._id)}>
            <Image
              src="/icons/Delete.svg"
              alt="search-icon"
              height={16}
              width={16}
            />
          </IconButton>
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
        <Header title="Add Order" actions={false} />
        <Form>
          <FlexRow>
            <Input
              name="displayId"
              value={displayId}
              label="Display Id"
              placeholder="Display Id"
              onChange={(e: any) => setDisplayId(e.target.value)}
            />
            <Input
              name="address"
              label="Address"
              value={address}
              placeholder="Address"
              onChange={(e: any) => setAddress(e.target.value)}
            />
          </FlexRow>
          <FlexRow>
            <Select
              required
              name="paymentType"
              value={paymentType}
              label="Payment Type"
              options={paymentTypes}
              placeholder="Payment Type"
              onChange={(value: any) => setPaymentType(value)}
            />
            <SearchSelect
              required
              name="customers"
              label="Customer"
              options={customers}
              value={customer?.first_name}
              placeholder="Search Customer"
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
              onSelect={(value: any) => addStock(value)}
              onSearch={(text: string) => setstockQuery(text)}
            />
          </FlexRow>
        </Form>
        <Table
          hover={false}
          id="add_order"
          headers={headers}
          rows={renderData(rows)}
          totalField="total_price"
        />
        <Buttons>
          <Button onClick={() => onSubmit("active")}>
            {loading.add.quotation ? "Loading..." : "Add Order"}
          </Button>
          <NeutralButton onClick={() => onSubmit("quotation")}>
            {loading.add.active ? "Loading..." : "Add Quotation"}
          </NeutralButton>
        </Buttons>
      </Content>
    </Layout>
  )
}

export default Orders
