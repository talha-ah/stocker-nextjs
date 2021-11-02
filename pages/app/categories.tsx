import Head from "next/head"
import type { NextPage } from "next"
import styled from "styled-components"
import { useState, useEffect } from "react"

import { Layout } from "@layouts/layout"
import { Modal } from "@components/Modal"
import { Button } from "@components/Buttons"
import { Form, Input } from "@components/Inputs"
import { Header, Table } from "@components/Table"
import { useCategories } from "@hooks/categories"

const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.gaps.light};
`

const Categories: NextPage = () => {
  const [show, setShow] = useState(false)

  const { fetchData, data, headers, addData, addLoading, fetchLoading } =
    useCategories()

  useEffect(() => {
    fetchData()
    // eslint-disable-next-line
  }, [])

  const onSubmit = async (e: any) => {
    e.preventDefault()
    const name = e.target.name.value
    addData({ name }, () => e.target.reset())
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
        <Table rows={data} headers={headers} loading={fetchLoading} />
        <Modal
          show={show}
          title="Add Category"
          setShow={(s: boolean) => setShow(s)}
        >
          <Form onSubmit={onSubmit}>
            <Input
              primary
              required
              type="text"
              name="name"
              label="Category Name"
              placeholder="Category name"
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

export default Categories
