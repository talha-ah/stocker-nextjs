import Head from "next/head"
import type { NextPage } from "next"
import styled from "styled-components"

import { Layout } from "@layouts/layout"
import { Header, Table } from "@components/Table"

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
    { key: 4, name: "Address", field: "address" },
    { key: 5, name: "Details", field: "details" },
    { key: 6, name: "Sales", field: "sales" },
    { key: 7, name: "Balance", field: "balance" },
    { key: 8, name: "Actions", field: "actions" },
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
  return (
    <Layout>
      <Head>
        <title>Customers - Stocker</title>
        <meta name="description" content="stocker" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Content>
        <Header title="Sales" />
        <Table rows={tableData.rows} headers={tableData.headers} />
      </Content>
    </Layout>
  )
}

export default Customers
