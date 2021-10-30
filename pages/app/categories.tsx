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
    { key: 1, name: "Name", field: "name" },
    { key: 2, name: "Items", field: "items" },
    { key: 3, name: "Actions", field: "actions" },
  ],
  rows: [
    {
      key: 1,
      name: "Bulbs",
      items: 12,
    },
    {
      key: 2,
      name: "Lights",
      items: 221,
    },
    {
      key: 3,
      name: "TubeLights",
      items: 122,
    },
    {
      key: 4,
      name: "Buttons",
      items: 33,
    },
    {
      key: 5,
      name: "Switches",
      items: 42,
    },
    {
      key: 6,
      name: "High Light",
      items: 2,
    },
  ],
}

const Categories: NextPage = () => {
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
        <Header add={() => setShow((s) => !s)} title="Categories" />
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

            <Button type="submit">Create</Button>
          </Form>
        </Drawer>
      </Content>
    </Layout>
  )
}

export default Categories
