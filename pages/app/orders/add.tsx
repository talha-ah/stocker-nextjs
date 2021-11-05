import Head from "next/head"
import { useState } from "react"
import Image from "next/image"
import type { NextPage } from "next"
import styled from "styled-components"
import { useRouter } from "next/router"

import { Layout } from "@layouts/layout"
import { Modal } from "@components/Modal"
import { useOrders } from "@hooks/orders"
import { Input } from "@components/Inputs"
import { useSearchStock } from "@hooks/stocks"
import { CreateCustomer } from "forms/customers"
import { Header, Table } from "@components/Table"
import { Select, SelectType } from "@components/Select"
import { SearchSelect } from "@components/SearchSelect"
import { generateId, calcDiscount } from "@utils/common"
import { useSearchCustomer, useCustomers } from "@hooks/customers"
import { Button, NeutralButton, IconButton } from "@components/Buttons"

const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.gaps.light};
`

const Selects = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: ${({ theme }) => theme.gaps.default};
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
    field: "discounted_price",
    align: "left",
    width: "100px",
  },
  { key: 8, name: "Actions", field: "actions", align: "center" },
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

type CustomerType = {
  city: string
  value: string
  state: string
  country: string
  first_name: string
  address_one: string
  address_two: string
  postal_code: string
} | null

const Orders: NextPage = () => {
  const router = useRouter()
  const [rows, setRows] = useState<any>([])

  const [paymentType, setPaymentType] = useState<SelectType[]>([
    paymentTypes[0],
  ])

  const { addData, loading } = useOrders()
  const [stockSearch, setstockSearch] = useState("")
  const { stocks, stocksLoading } = useSearchStock(stockSearch)

  const [customer, setCustomer] = useState<CustomerType>(null)
  const [customerSearch, setCustomerSearch] = useState("")
  const { customers, customersLoading } = useSearchCustomer(customerSearch)

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
        discounted_price: value.sale_price,
      })
    } else {
      rowsCloned[rowIndex].qty++
    }

    setRows(rowsCloned)
    setstockSearch("")
  }

  const removeStock = (id: string) => {
    const rowsCloned = [...rows]

    setRows(rowsCloned.filter((d: any) => String(d._id) !== String(id)))
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
      address_one: customer?.address_one,
      address_two: customer?.address_two,
      postal_code: customer?.postal_code,
      city: customer?.city,
      state: customer?.state,
      country: customer?.country,
    }

    addData(body, () => {
      // Create invoice
      router.back()
    })
  }

  // ==================> Add Customer
  const [show, setShow] = useState(false)

  const {
    addData: addCustomer,
    error: addCustomerError,
    loading: addCustomerLoading,
  } = useCustomers()

  const onAddCustomer = async (body: any, cb: any) => {
    addCustomer(body, cb)
  }
  // Add Customer <==================

  const onChange = (e: any, field: any, row: any) => {
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

  const renderData = (rows: any) => {
    return rows.map((row: any) => ({
      ...row,
      sale_price: (
        <Input
          small
          min={0}
          width={100}
          type="number"
          value={row.sale_price}
          name={`sale_price${row._id}`}
          onChange={(e: any) => onChange(e, "sale_price", row)}
        />
      ),
      qty: (
        <Input
          small
          min={0}
          width={100}
          type="number"
          value={row.qty}
          name={`qty${row._id}`}
          onChange={(e: any) => onChange(e, "qty", row)}
        />
      ),
      discount: (
        <Input
          small
          min={0}
          width={100}
          type="number"
          value={row.discount}
          name={`discount${row._id}`}
          onChange={(e: any) => onChange(e, "discount", row)}
        />
      ),
      discounted_price: calcDiscount(row.sale_price * row.qty, row.discount),
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
        <Selects>
          <Select
            name="paymentType"
            value={paymentType}
            label="Payment Type"
            options={paymentTypes}
            placeholder="Payment Type"
            onChange={(value: any) => setPaymentType(value)}
          />
          <SearchSelect
            name="customers"
            label="Customer"
            options={customers}
            loading={customersLoading}
            value={customer?.first_name}
            placeholder="Search Customer"
            onCreate={() => setShow((s) => !s)}
            onSelect={(value: any) => setCustomer(value)}
            onSearch={(text: string) => setCustomerSearch(text)}
          />
          <SearchSelect
            name="stocks"
            label="Stock"
            options={stocks}
            loading={stocksLoading}
            placeholder="Search Stock"
            onSelect={(value: any) => addStock(value)}
            onSearch={(text: string) => setstockSearch(text)}
          />
        </Selects>
        <Table rows={renderData(rows)} headers={headers} hover={false} />
        <Buttons>
          <NeutralButton onClick={() => onSubmit("quotation")}>
            {loading.add.active ? "Loading..." : "Add Quotation"}
          </NeutralButton>
          <Button onClick={() => onSubmit("active")}>
            {loading.add.quotation ? "Loading..." : "Add Order"}
          </Button>
        </Buttons>
        <Modal
          show={show}
          title="Add Customer"
          setShow={(s: boolean) => setShow(s)}
        >
          <CreateCustomer
            onSubmit={onAddCustomer}
            error={addCustomerError.add}
            loading={addCustomerLoading.add}
          />
        </Modal>
      </Content>
    </Layout>
  )
}

export default Orders
