import Head from "next/head"
import type { NextPage } from "next"
import styled from "styled-components"
import { useRouter } from "next/router"
import { useState, useEffect } from "react"

import { Layout } from "@layouts/layout"
import { Modal } from "@components/Modal"
import { useOrders } from "@hooks/orders"
import { AddPayment } from "@forms/orders"
import { Button } from "@components/Buttons"
import { Spinner } from "@components/Spinner"
import { SubHeading } from "@components/Texts"
import { useCustomers } from "@hooks/customers"
import { Header, Table } from "@components/Table"
import { Content, FlexRow } from "@components/Common"

const headers = [
  { key: 1, name: "Order #", field: "order_id", align: "left" },
  { key: 3, name: "Display Id", field: "display_id", align: "left" },
  { key: 4, name: "Type", field: "type", align: "left" },
  { key: 5, name: "Total Price", field: "total_price", align: "left" },
  { key: 6, name: "Stocks", field: "stocks_length", align: "left" },
  { key: 7, name: "Balance", field: "balance", align: "left" },
]

const Buttons = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.gaps.default};
  margin: ${({ theme }) => theme.gaps.default} 0px;
`

const Customers: NextPage = () => {
  const router = useRouter()
  const [show, setShow] = useState(false)
  const [customer, setCustomer] = useState<any>(null)

  const {
    error,
    loading,
    customerOrders,
    addGeneralPayment,
    fetchCustomerOrders,
  } = useOrders()
  const { fetchCustomer } = useCustomers()

  useEffect(() => {
    const { id } = router.query
    setCustomer(fetchCustomer(id))
    fetchCustomerOrders(id)
    // eslint-disable-next-line
  }, [])

  const renderData = (rows: any) => {
    return rows.map((row: any) => ({
      ...row,
    }))
  }

  const addPayment = (body: any, cb: any) => {
    console.log("Add Payment", body)
    // addGeneralPayment(body, () => {
    //   setShow((s) => !s)
    //   cb()
    // })
  }

  return (
    <Layout>
      <Head>
        <title>Customers Details - Stocker</title>
        <meta name="description" content="stocker" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Content>
        <Header actions={false} title={customer?.first_name} />

        <FlexRow>
          <SubHeading>Phone: {customer?.phone}</SubHeading>
          <SubHeading>Address: {customer?.address_one}</SubHeading>
          <SubHeading>Email: {customer?.email}</SubHeading>
        </FlexRow>

        <Table
          headers={headers}
          totalField="balance"
          loading={loading.fetch}
          rows={renderData(customerOrders)}
        />

        <Buttons>
          <Button onClick={() => setShow((s) => !s)}>
            {loading.addGeneralPayment ? (
              <Spinner size={16} text="Loading..." position="left" />
            ) : (
              "Add Payment"
            )}
          </Button>
        </Buttons>

        <Modal
          show={show}
          title={"Add Payment"}
          setShow={(s: boolean) => setShow(s)}
        >
          <AddPayment
            onSubmit={addPayment}
            error={error.addGeneralPayment}
            loading={loading.addGeneralPayment}
          />
        </Modal>
      </Content>
    </Layout>
  )
}

export default Customers
