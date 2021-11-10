import Head from "next/head"
import type { NextPage } from "next"
import styled from "styled-components"
import { useRouter } from "next/router"
import { useState, useEffect } from "react"

import { Layout } from "@layouts/layout"
import { Modal } from "@components/Modal"
import { useOrders } from "@hooks/orders"
import { AddPayment } from "@forms/orders"
import { SubHeading } from "@components/Texts"
import { useCustomers } from "@hooks/customers"
import { Header, Table } from "@components/Table"
import { Content, FlexRow } from "@components/Common"
import { TabButton, Button } from "@components/Buttons"

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
  const [tab, setTab] = useState("unpaid")
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

    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    const { id } = router.query
    fetchCustomerOrders(id, tab)

    // eslint-disable-next-line
  }, [tab])

  const addPayment = (body: any, cb: any) => {
    addGeneralPayment({ ...body, customerId: customer._id }, () => {
      setShow((s) => !s)
      cb()
    })
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

        <FlexRow>
          <TabButton active={tab === "unpaid"} onClick={() => setTab("unpaid")}>
            UnPaid
          </TabButton>
          <TabButton active={tab === "paid"} onClick={() => setTab("paid")}>
            Paid
          </TabButton>
        </FlexRow>

        <Table
          headers={headers}
          rows={customerOrders}
          loading={loading.fetch}
          totalField={tab === "unpaid" && "balance"}
        />

        {customerOrders.length > 0 && tab === "unpaid" && (
          <Buttons>
            <Button
              primary
              onClick={() => setShow((s) => !s)}
              loading={loading.addGeneralPayment}
            >
              Add Payment
            </Button>
          </Buttons>
        )}

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
