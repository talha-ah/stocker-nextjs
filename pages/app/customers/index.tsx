import Head from "next/head"
import router from "next/router"
import type { NextPage } from "next"
import styled from "styled-components"
import { useState, useEffect } from "react"

import { Layout } from "@layouts/layout"
import { Modal } from "@components/Modal"
import { Content } from "@components/Common"
import { Button } from "@components/Buttons"
import { Confirm } from "@components/Confirm"
import { useAppContext } from "@contexts/index"
import { useCustomers } from "@hooks/customers"
import { Header, Table } from "@components/Table"
import { Edit, Delete, Eye } from "@components/icons"
import { CreateCustomer, EditCustomer } from "forms/customers"

const Actions = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  gap: ${({ theme }) => theme.spacing.light}px;
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
  const [query, setQuery] = useState<any>("")
  const [dataList, setDataList] = useState([])
  const [customer, setCustomer] = useState<CustomerType>(null)

  const { error, headers, loading, addData, editData, fetchData, deleteData } =
    useCustomers()

  useEffect(() => {
    fetchData()
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    const filtered = state.customers.customers.filter(
      (option: any) =>
        !option.first_name ||
        option.first_name.toLowerCase().indexOf(query.toLowerCase()) > -1
    )
    setDataList(filtered)
    // eslint-disable-next-line
  }, [query, state.customers.customers])

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
          <Button
            small
            iconed
            hover={false}
            onClick={() => router.push(`/app/customers/${row._id}`)}
          >
            <Eye />
          </Button>
          <Button
            small
            iconed
            hover={false}
            onClick={() => {
              setCustomer(row)
              setShow((s) => !s)
            }}
          >
            <Edit />
          </Button>
          {row.orders <= 0 && (
            <Confirm
              title="Delete Customer"
              onConfirm={() => deleteData(row._id)}
              message="Are you sure you want to delete this customer?"
              trigger={({ open }: { open: any }) => (
                <Button
                  small
                  iconed
                  hover={false}
                  onClick={open}
                  loading={loading.delete}
                >
                  <Delete />
                </Button>
              )}
            />
          )}
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
        <Header
          title="Customers"
          name={"search_customers"}
          add={() => setShow((s) => !s)}
          placeholder={"Search Customer"}
          onSearch={(value: any) => setQuery(value)}
        />
        <Table
          headers={headers}
          loading={loading.fetch}
          totalField={["balance"]}
          rows={renderData(dataList)}
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
