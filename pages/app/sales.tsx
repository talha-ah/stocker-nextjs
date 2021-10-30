import Head from "next/head"
import { useState } from "react"
import type { NextPage } from "next"
import styled from "styled-components"

import { Layout } from "@layouts/layout"
import { Drawer } from "@components/Drawer"
import { Button } from "@components/Buttons"
import { useAddCustomer } from "@hooks/customers"
import { Header, Table } from "@components/Table"
import { Form, Input, TextArea } from "@components/Inputs"

const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.gaps.light};
`

const tableData = {
  headers: [
    { key: 1, name: "Name", field: "name" },
    { key: 2, name: "Email", field: "email" },
    { key: 3, name: "Phone", field: "phone" },
    { key: 3, name: "Address", field: "address" },
    { key: 3, name: "Details", field: "details" },
    { key: 3, name: "Sales", field: "sales" },
    { key: 3, name: "Balance", field: "balance" },
    { key: 3, name: "Actions", field: "actions" },
  ],
  rows: [
    {
      key: 1,
      name: "Talha Ahmad",
      email: "talha@gmail.com",
      phone: "03364543004",
      address: "Harbance pura Lahore",
      details: "Bulb description",
      sales: 20,
      balance: 0,
    },
    {
      key: 2,
      name: "Talha Ahmad",
      email: "talha@gmail.com",
      phone: "03364543004",
      address: "Harbance pura Lahore",
      details: "Bulb description",
      sales: 20,
      balance: 0,
    },
    {
      key: 3,
      name: "Talha Ahmad",
      email: "talha@gmail.com",
      phone: "03364543004",
      address: "Harbance pura Lahore",
      details: "Bulb description",
      sales: 20,
      balance: 0,
    },
    {
      key: 4,
      name: "Talha Ahmad",
      email: "talha@gmail.com",
      phone: "03364543004",
      address: "Harbance pura Lahore",
      details: "Bulb description",
      sales: 20,
      balance: 0,
    },
    {
      key: 5,
      name: "Talha Ahmad",
      email: "talha@gmail.com",
      phone: "03364543004",
      address: "Harbance pura Lahore",
      details: "Bulb description",
      sales: 20,
      balance: 0,
    },
  ],
}

const Customers: NextPage = () => {
  const [show, setShow] = useState(false)

  const { addCustomer, loading, error } = useAddCustomer()

  const onSubmit = async (e: any) => {
    e.preventDefault()
    const email = e.target.email.value
    const password = e.target.password.value
    addCustomer({ email, password })
  }

  return (
    <Layout>
      <Head>
        <title>Customers - Stocker</title>
        <meta name="description" content="stocker" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Content>
        <Header add={() => setShow((s) => !s)} title="Customers" />
        <Table data={tableData} />
        <Drawer
          show={show}
          title="Add Customer"
          setShow={(s: boolean) => setShow(s)}
        >
          <Form onSubmit={onSubmit}>
            <Input
              primary
              required
              type="text"
              name="name"
              label="Name"
              error={error}
              placeholder="Name"
            />
            <Input
              primary
              required
              type="email"
              name="email"
              error={error}
              label="Email"
              placeholder="Email"
            />
            <Input
              primary
              required
              type="text"
              name="phone"
              error={error}
              label="Phone"
              placeholder="Phone"
            />
            <Input
              primary
              required
              type="text"
              error={error}
              name="address"
              label="Address"
              placeholder="Address"
            />
            <TextArea
              primary
              error={error}
              label="Details"
              name="description"
              placeholder="Details"
            />

            <Button type="submit">Create</Button>
          </Form>
        </Drawer>
      </Content>
    </Layout>
  )
}

export default Customers
