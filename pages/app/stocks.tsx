import Head from "next/head"
import { useState } from "react"
import type { NextPage } from "next"
import styled from "styled-components"

import { Layout } from "@layouts/layout"
import { useAddStock } from "@hooks/stocks"
import { Drawer } from "@components/Drawer"
import { Select } from "@components/Select"
import { Button } from "@components/Buttons"
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
    { key: 1, name: "Sr.", field: "sr" },
    { key: 2, name: "Description", field: "description" },
    { key: 3, name: "Cost Price", field: "cost_price" },
    { key: 4, name: "Sale Price", field: "sale_price" },
    { key: 5, name: "Inventory", field: "inventory" },
    { key: 6, name: "Location", field: "location" },
    { key: 7, name: "Code", field: "code" },
    { key: 8, name: "Category", field: "category" },
    { key: 9, name: "Actions", field: "actions" },
  ],
  rows: [
    {
      key: 1,
      sr: 1,
      description: "Bulb description",
      cost_price: 12,
      sale_price: 16,
      inventory: 160,
      location: "A Shelf",
      code: "XE45C",
      category: "Bulbs",
    },
    {
      key: 2,
      sr: 2,
      description: "Bulb description2",
      cost_price: 12,
      sale_price: 16,
      inventory: 160,
      location: "A Shelf",
      code: "XE45C",
      category: "Bulbs",
    },
    {
      key: 3,
      sr: 3,
      description: "Bulb description3",
      cost_price: 12,
      sale_price: 16,
      inventory: 160,
      location: "A Shelf",
      code: "XE45C",
      category: "Bulbs",
    },
    {
      key: 4,
      sr: 4,
      description: "Bulb description4",
      cost_price: 12,
      sale_price: 16,
      inventory: 160,
      location: "A Shelf",
      code: "XE45C",
      category: "Bulbs",
    },
    {
      key: 5,
      sr: 5,
      description: "Bulb description5",
      cost_price: 12,
      sale_price: 16,
      inventory: 160,
      location: "A Shelf",
      code: "XE45C",
      category: "Bulbs",
    },
  ],
}

const Stocks: NextPage = () => {
  const [show, setShow] = useState(false)

  const { addStock, loading, error } = useAddStock()

  const onSubmit = async (e: any) => {
    e.preventDefault()
    const email = e.target.email.value
    const password = e.target.password.value
    addStock({ email, password })
  }

  return (
    <Layout>
      <Head>
        <title>Stocks - Stocker</title>
        <meta name="description" content="stocker" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Content>
        <Header add={() => setShow((s) => !s)} title="Stocks" />
        <Table data={tableData} />
        <Drawer
          show={show}
          title="Add Stock"
          setShow={(s: boolean) => setShow(s)}
        >
          <Form onSubmit={onSubmit}>
            <Select
              primary
              required
              error={error}
              name="category"
              label="Category"
              placeholder="Category"
              onChange={(value: any) => console.log(value)}
              options={[
                { label: "Bulbs", value: "bulbs" },
                { label: "LEDs", value: "leds" },
                { label: "Pliers", value: "pliers" },
              ]}
            />
            <Input
              primary
              required
              type="text"
              name="code"
              label="Code"
              error={error}
              placeholder="Code"
            />
            <Input
              primary
              required
              type="text"
              error={error}
              name="cost_price"
              label="Cost Price"
              placeholder="Cost Price"
            />
            <Input
              primary
              required
              type="text"
              error={error}
              name="sale_price"
              label="Sale Price"
              placeholder="Sale Price"
            />
            <Input
              primary
              required
              type="text"
              error={error}
              name="inventory"
              label="Inventory"
              placeholder="Inventory"
            />
            <Input
              primary
              required
              type="text"
              error={error}
              name="location"
              label="Location"
              placeholder="Location"
            />
            <TextArea
              primary
              error={error}
              name="description"
              label="Description"
              placeholder="Description"
            />

            <Button type="submit">Create</Button>
          </Form>
        </Drawer>
      </Content>
    </Layout>
  )
}

export default Stocks
