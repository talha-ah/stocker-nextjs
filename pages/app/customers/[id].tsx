import Head from "next/head"
import type { NextPage } from "next"
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
  }, [tab, customer])

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
        <FlexRow>
          <Header actions={false} title={customer?.first_name} />
          {customer?.phone && <SubHeading>Phone: {customer?.phone}</SubHeading>}
          {customer?.address_one && (
            <SubHeading>Address: {customer?.address_one}</SubHeading>
          )}
          {customer?.email && <SubHeading>Email: {customer?.email}</SubHeading>}
        </FlexRow>

        <FlexRow>
          <FlexRow>
            <TabButton
              active={tab === "unpaid"}
              onClick={() => setTab("unpaid")}
            >
              UnPaid
            </TabButton>
            <TabButton active={tab === "paid"} onClick={() => setTab("paid")}>
              Paid
            </TabButton>
          </FlexRow>
          <FlexRow justifyContent="flex-end">
            {customerOrders.length > 0 && tab === "unpaid" && (
              <Button
                small
                primary
                onClick={() => setShow((s) => !s)}
                loading={loading.addGeneralPayment}
              >
                Add Payment
              </Button>
            )}
          </FlexRow>
        </FlexRow>

        <Table
          height={650}
          headers={headers}
          rows={customerOrders}
          loading={loading.fetch}
          totalField={tab === "unpaid" && "balance"}
        />

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
