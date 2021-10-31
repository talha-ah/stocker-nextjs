import Head from "next/head"
import { useState } from "react"
import type { NextPage } from "next"
import styled from "styled-components"

import { Layout } from "@layouts/layout"
import { useStocks } from "@hooks/stocks"
import { Modal } from "@components/Modal"
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

const Stocks: NextPage = () => {
  const [show, setShow] = useState(false)

  const { data, headers, addData, addError, addLoading, fetchLoading } =
    useStocks()

  const onSubmit = async (e: any) => {
    e.preventDefault()
    const email = e.target.email.value
    const password = e.target.password.value
    addData({ email, password })
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
        <Table rows={data} headers={headers} loading={fetchLoading} />
        <Modal
          show={show}
          title="Add Stock"
          setShow={(s: boolean) => setShow(s)}
        >
          <Form onSubmit={onSubmit}>
            <Select
              primary
              required
              error={addError}
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
              error={addError}
              placeholder="Code"
            />
            <Input
              primary
              required
              type="text"
              error={addError}
              name="cost_price"
              label="Cost Price"
              placeholder="Cost Price"
            />
            <Input
              primary
              required
              type="text"
              error={addError}
              name="sale_price"
              label="Sale Price"
              placeholder="Sale Price"
            />
            <Input
              primary
              required
              type="text"
              error={addError}
              name="inventory"
              label="Inventory"
              placeholder="Inventory"
            />
            <Input
              primary
              required
              type="text"
              error={addError}
              name="location"
              label="Location"
              placeholder="Location"
            />
            <TextArea
              primary
              error={addError}
              name="description"
              label="Description"
              placeholder="Description"
            />

            <Button type="submit">
              {addLoading ? "Loading..." : "Create"}
            </Button>
          </Form>
        </Modal>
      </Content>
    </Layout>
  )
}

export default Stocks
