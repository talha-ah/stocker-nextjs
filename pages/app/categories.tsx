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
    { key: 1, name: "Company", field: "company" },
    { key: 2, name: "Contact", field: "contact" },
    { key: 3, name: "Country", field: "country" },
  ],
  rows: [
    {
      key: 1,
      company: "Alfreds Futterkiste",
      contact: "Maria Anders",
      country: "Germany",
    },
    {
      key: 2,
      company: "Berglunds snabbköp",
      contact: "Christina Berglund",
      country: "Sweden",
    },
    {
      key: 2,
      company: "Centro comercial Moctezuma",
      contact: "Francisco Chang",
      country: "Mexico",
    },
    {
      key: 3,
      company: "Ernst Handel",
      contact: "Roland Mendel",
      country: "Austria",
    },
    {
      key: 4,
      company: "Island Trading",
      contact: "Helen Bennett",
      country: "UK",
    },
    {
      key: 4,
      company: "Königlich Essen",
      contact: "Philip Cramer",
      country: "Germany",
    },
  ],
}

const App: NextPage = () => {
  return (
    <Layout>
      <Head>
        <title>Categories - Stocker</title>
        <meta name="description" content="stocker" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Content>
        <Header />
        <Table data={tableData} />
      </Content>
    </Layout>
  )
}

export default App
