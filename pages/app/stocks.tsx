import Head from "next/head"
import Image from "next/image"
import { useState } from "react"
import type { NextPage } from "next"
import styled from "styled-components"

import { Layout } from "@layouts/layout"
import { useStocks } from "@hooks/stocks"
import { Modal } from "@components/Modal"
import { IconButton } from "@components/Buttons"
import { Header, Table } from "@components/Table"
import { CreateStock, EditStock } from "@forms/stocks"

const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.gaps.light};
`

const Actions = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  gap: ${({ theme }) => theme.gaps.light};
`

type StockType = {
  sr: number
  _id: string
  code: string
  category: any
  status: string
  createdAt: Date
  updatedAt: Date
  location: string
  cost_price: number
  inventory: number
  created_by: string
  sale_price: number
  description: string
} | null

const Stocks: NextPage = () => {
  const [show, setShow] = useState(false)
  const [stock, setStock] = useState<StockType>(null)

  const { data, headers, addData, editData, deleteData, error, loading } =
    useStocks()

  const onSubmit = async (body: any, cb: any) => {
    addData(body, cb)
  }

  const onEdit = async (body: any, cb: any) => {
    editData(body, stock?._id, () => {
      setShow(false)
      setStock(null)
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
              console.log("row", row)
              setStock(row)
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
            disabled={loading.delete}
            onClick={() => deleteData(row._id)}
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
        <title>Stocks - Stocker</title>
        <meta name="description" content="stocker" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Content>
        <Header add={() => setShow((s) => !s)} title="Stocks" />
        <Table
          headers={headers}
          rows={renderData(data)}
          loading={loading.fetch}
        />
        <Modal
          show={show}
          title={stock ? "Edit Category" : "Add Category"}
          setShow={(s: boolean) => {
            setShow(s)
            if (!s) setStock(null)
          }}
        >
          {stock ? (
            <EditStock
              value={stock}
              onSubmit={onEdit}
              error={error.edit}
              loading={loading.edit}
            />
          ) : (
            <CreateStock
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

export default Stocks
