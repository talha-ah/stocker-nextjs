import Head from "next/head"
import { useState } from "react"
import type { NextPage } from "next"
import styled from "styled-components"

import { api } from "@utils/api"
import { Layout } from "@layouts/layout"
import { Modal } from "@components/Modal"
import { generateId } from "@utils/common"
import { endpoints } from "@utils/constants"
import { useSearchStock } from "@hooks/stocks"
import { CreateCustomer } from "forms/customers"
import { Header, Table } from "@components/Table"
import { Select, SelectType } from "@components/Select"
import { SearchSelect } from "@components/SearchSelect"
import { Button, NeutralButton } from "@components/Buttons"
import { useSearchCustomer, useCustomers } from "@hooks/customers"

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

const headers = [
  { key: 1, name: "Sr.", field: "sr" },
  { key: 2, name: "Description", field: "description" },
  { key: 3, name: "Code", field: "code" },
  { key: 4, name: "Price", field: "sale_price" },
  { key: 5, name: "Qty", field: "qty" },
  { key: 6, name: "Disc %", field: "discount" },
  { key: 7, name: "Disc Price", field: "discounted_price" },
  { key: 8, name: "Actions", field: "" },
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

type RowType = {
  sr: number
  qty: number
  code: string
  value: string
  discount: number
  sale_price: number
  description: string
  discounted_price: number
}

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
  const [rows, setRows] = useState<RowType[]>([])

  const [paymentType, setPaymentType] = useState<SelectType[]>([
    paymentTypes[0],
  ])

  const [stockSearch, setstockSearch] = useState("")
  const { stocks, stocksLoading } = useSearchStock(stockSearch, rows)

  const [customer, setCustomer] = useState<CustomerType>(null)
  const [customerSearch, setCustomerSearch] = useState("")
  const { customers, customersLoading } = useSearchCustomer(customerSearch)

  const setStock = (value: any) => {
    const rowsCloned = [...rows]

    const rowIndex = rowsCloned.findIndex(
      (row) => String(row.value) === String(value.value)
    )

    if (rowIndex === -1) {
      rowsCloned.push({
        qty: 1,
        discount: 0,
        sr: value.sr,
        code: value.code,
        value: value.value,
        sale_price: value.sale_price,
        description: value.description,
        discounted_price: value.sale_price,
      })
    } else {
      rowsCloned[rowIndex].qty++
    }

    setRows(rowsCloned)
    setstockSearch("")
  }

  // ==================> Add Customer
  const [show, setShow] = useState(false)

  const { addData, addError, addLoading } = useCustomers()

  const onAddCustomer = async (e: any) => {
    e.preventDefault()

    const body: any = {}
    Array.from(e.target).forEach((input: any) => {
      input.name && (body[input.name] = input.value)
    })

    addData(body, () => {
      e.target.reset()
    })
  }
  // Add Customer <==================

  // ==================> Submit
  const [orderLoading, setOrderLoading] = useState(false)

  const onSubmit = async (status: string) => {
    setOrderLoading(true)
    const body = {
      created_for: customer?.value,
      display_id: generateId(),
      stocks: rows.map((row) => ({
        stock_id: row.value,
        quantity: row.qty,
        price: row.sale_price,
        discount: row.discount,
        discount_type: "percentage",
      })),
      type: paymentType[0]?.value,
      installments: 1,
      status: status || "active",
      address_one: customer?.address_one,
      address_two: customer?.address_two,
      postal_code: customer?.postal_code,
      city: customer?.city,
      state: customer?.state,
      country: customer?.country,
    }

    await api({
      method: "POST",
      uri: endpoints.orders,
      body: JSON.stringify(body),
    })
    setOrderLoading(true)

    // Create invoice
  }
  // Submit <==================

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
            onSelect={(value: any) => setStock(value)}
            onSearch={(text: string) => setstockSearch(text)}
          />
        </Selects>
        <Table rows={rows} headers={headers} />
        <Buttons>
          <NeutralButton onClick={() => onSubmit("quotation")}>
            {orderLoading ? "Loading..." : "Add Quotation"}
          </NeutralButton>
          <Button onClick={() => onSubmit("active")}>
            {orderLoading ? "Loading..." : "Add Order"}
          </Button>
        </Buttons>
        <Modal
          show={show}
          title="Add Customer"
          setShow={(s: boolean) => setShow(s)}
        >
          <CreateCustomer
            error={addError}
            onSubmit={onAddCustomer}
            loading={addLoading}
          />
        </Modal>
      </Content>
    </Layout>
  )
}

export default Orders
