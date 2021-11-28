import Head from "next/head"
import type { NextPage } from "next"
import { useRouter } from "next/router"
import { useState, useEffect } from "react"

import { Layout } from "@layouts/layout"
import { Modal } from "@components/Modal"
import { useOrders } from "@hooks/orders"
import { AddPayment } from "@forms/orders"
import { Button } from "@components/Buttons"
import { SubHeading } from "@components/Texts"
import { useCustomers } from "@hooks/customers"
import { Header, Table } from "@components/Table"
import { Content, FlexRow } from "@components/Common"

const headers = [
  { key: 1, name: "Order #", field: "order_id", align: "left" },
  { key: 2, name: "Type", field: "type", align: "left" },
  { key: 3, name: "Total Price", field: "total_price", align: "right" },
  { key: 4, name: "Stocks", field: "stocks_length", align: "right" },
  { key: 5, name: "Balance", field: "balance", align: "right" },
]

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

    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    const { id } = router.query
    fetchCustomerOrders(id)

    // eslint-disable-next-line
  }, [customer])

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
          <Header actions={false} title={`Customer: ${customer?.first_name}`} />
          {customer?.phone && <SubHeading>Phone: {customer?.phone}</SubHeading>}
          {customer?.address_one && (
            <SubHeading>Address: {customer?.address_one}</SubHeading>
          )}
          {customer?.email && <SubHeading>Email: {customer?.email}</SubHeading>}
        </FlexRow>

        <FlexRow justifyContent="flex-end">
          {customerOrders.length > 0 && (
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

        <Table
          height={650}
          headers={headers}
          totalField="balance"
          rows={customerOrders}
          loading={loading.fetch}
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
