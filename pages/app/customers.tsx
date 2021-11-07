import Head from "next/head"
import Image from "next/image"
import type { NextPage } from "next"
import styled from "styled-components"
import { useState, useEffect } from "react"

import { Layout } from "@layouts/layout"
import { Modal } from "@components/Modal"
import { Content } from "@components/Common"
import { useAppContext } from "@contexts/index"
import { useCustomers } from "@hooks/customers"
import { IconButton } from "@components/Buttons"
import { Header, Table } from "@components/Table"
import { CreateCustomer, EditCustomer } from "forms/customers"

const Actions = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  gap: ${({ theme }) => theme.gaps.light};
`

type CustomerType = {
  role: Date
  _id: string
  phone: Date
  balance: any
  status: Date
  email: string
  orders: number
  createdAt: Date
  updatedAt: Date
  first_name: string
  created_by: string
  address_one: string
  description: string
} | null

const Customers: NextPage = () => {
  const { state } = useAppContext()
  const [show, setShow] = useState(false)
  const [customer, setCustomer] = useState<CustomerType>(null)

  const { error, headers, loading, addData, editData, fetchData, deleteData } =
    useCustomers()

  useEffect(() => {
    fetchData()
    // eslint-disable-next-line
  }, [])

  const onSubmit = async (body: any, cb: any) => {
    addData(body, cb)
  }

  const onEdit = async (body: any, cb: any) => {
    editData(body, customer?._id, () => {
      setShow(false)
      setCustomer(null)
      cb()
    })
  }

  const renderData = (rows: any) => {
    return rows.map((row: any) => ({
      ...row,
      actions: (
        <Actions>
          <IconButton
            onClick={() => {
              setCustomer(row)
              setShow((s) => !s)
            }}
          >
            <Image
              src="/icons/Edit.svg"
              alt="search-icon"
              height={16}
              width={16}
            />
          </IconButton>
          <IconButton
            onClick={() => deleteData(row._id)}
            disabled={row.orders > 0 || loading.delete}
          >
            <Image
              src="/icons/Delete.svg"
              alt="search-icon"
              height={16}
              width={16}
            />
          </IconButton>
        </Actions>
      ),
    }))
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
        <Table
          headers={headers}
          loading={loading.fetch}
          rows={renderData(state.customers.customers)}
        />
        <Modal
          show={show}
          title={customer ? "Edit Customer" : "Add Customer"}
          setShow={(s: boolean) => {
            setShow(s)
            if (!s) setCustomer(null)
          }}
        >
          {customer ? (
            <EditCustomer
              value={customer}
              onSubmit={onEdit}
              error={error.edit}
              loading={loading.edit}
            />
          ) : (
            <CreateCustomer
              error={error.add}
              onSubmit={onSubmit}
              loading={loading.add}
            />
          )}
        </Modal>
      </Content>
    </Layout>
  )
}

export default Customers
