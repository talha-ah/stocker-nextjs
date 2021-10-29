import Head from "next/head"
import { useState } from "react"
import type { NextPage } from "next"
import styled from "styled-components"

import { Layout } from "@layouts/layout"
import { Drawer } from "@components/Drawer"
import { Button } from "@components/Buttons"
import { Form, Input } from "@components/Inputs"
import { Header, Table } from "@components/Table"
import { useAddCategory } from "@hooks/categories"

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
  const [show, setShow] = useState(false)

  const { addCategory, loading, error } = useAddCategory()

  const onSubmit = async (e: any) => {
    e.preventDefault()
    const email = e.target.email.value
    const password = e.target.password.value
    addCategory({ email, password })
  }

  return (
    <Layout>
      <Head>
        <title>Categories - Stocker</title>
        <meta name="description" content="stocker" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Content>
        <Header add={() => setShow((s) => !s)} />
        <Table data={tableData} />
        <Drawer
          show={show}
          title="Add Category"
          setShow={(s: boolean) => setShow(s)}
        >
          <Form onSubmit={onSubmit}>
            <Input
              primary
              required
              type="text"
              error={error}
              name="category_name"
              placeholder="Category name"
              label="Category Name"
            />

            <Button type="submit" loading={loading}>
              Create category
            </Button>
          </Form>
        </Drawer>
      </Content>
    </Layout>
  )
}

export default App
