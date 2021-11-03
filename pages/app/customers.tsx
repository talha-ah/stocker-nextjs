import Head from "next/head"
import type { NextPage } from "next"
import styled from "styled-components"
import { useState, useEffect } from "react"

import { Layout } from "@layouts/layout"
import { Modal } from "@components/Modal"
import { useCustomers } from "@hooks/customers"
import { CreateCustomer } from "forms/customers"
import { Header, Table } from "@components/Table"

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
    addData,
    headers,
    addError,
    fetchData,
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
          <CreateCustomer
            error={addError}
            onSubmit={onSubmit}
            loading={addLoading}
          />
        </Modal>
      </Content>
    </Layout>
  )
}

export default Customers
