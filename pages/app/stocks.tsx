import Head from "next/head"
import { useState } from "react"
import type { NextPage } from "next"
import styled from "styled-components"

import { Layout } from "@layouts/layout"
import { useStocks } from "@hooks/stocks"
import { Modal } from "@components/Modal"
import { Button } from "@components/Buttons"
import { useAppContext } from "@contexts/index"
import { Header, Table } from "@components/Table"
import { Select, SelectType } from "@components/Select"
import { Form, Input, TextArea } from "@components/Inputs"

const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.gaps.light};
`

const Stocks: NextPage = () => {
  const { state } = useAppContext()
  const [show, setShow] = useState(false)
  const [category, setCategory] = useState<SelectType[]>([])

  const { data, headers, addData, addError, addLoading, fetchLoading } =
    useStocks()

  const onSubmit = async (e: any) => {
    e.preventDefault()

    const body: any = {
      category: category[0]?.value,
    }
    Array.from(e.target).forEach((input: any) => {
      input.name && (body[input.name] = input.value)
    })

    addData(body, () => {
      e.target.reset()
      setCategory([])
    })
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
              value={category}
              placeholder="Category"
              onChange={(value: any) => setCategory(value)}
              options={state.categories.categories.map((category: any) => ({
                label: category?.name,
                value: category?._id,
              }))}
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
