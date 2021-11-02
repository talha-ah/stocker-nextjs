import Head from "next/head"
import type { NextPage } from "next"
import styled from "styled-components"
import { useState, useEffect } from "react"

import { Layout } from "@layouts/layout"
import { Modal } from "@components/Modal"
import { Button } from "@components/Buttons"
import { useCustomers } from "@hooks/customers"
import { Header, Table } from "@components/Table"
import { Form, Input, TextArea } from "@components/Inputs"

const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.gaps.light};
`

const Customers: NextPage = () => {
  const [show, setShow] = useState(false)

  const {
    data,
    headers,
    fetchData,
    addData,
    addError,
    addLoading,
    fetchLoading,
  } = useCustomers()

  useEffect(() => {
    fetchData()
    // eslint-disable-next-line
  }, [])

  const onSubmit = async (e: any) => {
    e.preventDefault()

    const body: any = {}
    Array.from(e.target).forEach((input: any) => {
      input.name && (body[input.name] = input.value)
    })

    addData(body, () => {
      e.target.reset()
    })
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
        <Table rows={data} headers={headers} loading={fetchLoading} />
        <Modal
          show={show}
          title="Add Customer"
          setShow={(s: boolean) => setShow(s)}
        >
          <Form onSubmit={onSubmit}>
            <Input
              primary
              required
              type="text"
              name="first_name"
              label="Name"
              error={addError}
              placeholder="Name"
            />
            <Input
              primary
              type="email"
              name="email"
              error={addError}
              label="Email"
              placeholder="Email"
            />
            <Input
              primary
              type="text"
              name="phone"
              error={addError}
              label="Phone"
              placeholder="Phone"
            />
            <Input
              primary
              type="text"
              error={addError}
              name="address_one"
              label="Address"
              placeholder="Address"
            />
            <TextArea
              primary
              error={addError}
              label="Details"
              name="description"
              placeholder="Details"
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

export default Customers
