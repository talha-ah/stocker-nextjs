import Head from "next/head"
import Image from "next/image"
import type { NextPage } from "next"
import styled from "styled-components"
import { useState, useEffect } from "react"

import { Layout } from "@layouts/layout"
import { useStocks } from "@hooks/stocks"
import { Modal } from "@components/Modal"
import { Content } from "@components/Common"
import { Button } from "@components/Buttons"
import { useAppContext } from "@contexts/index"
import { Header, Table } from "@components/Table"
import { CreateStock, EditStock } from "@forms/stocks"

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
  const { state } = useAppContext()
  const [show, setShow] = useState(false)
  const [stock, setStock] = useState<StockType>(null)

  const { headers, fetchData, addData, editData, deleteData, error, loading } =
    useStocks()

  useEffect(() => {
    fetchData()
    // eslint-disable-next-line
  }, [])

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
          <Button
            iconed
            onClick={() => {
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
          </Button>
          <Button
            iconed
            loading={loading.delete}
            onClick={() => deleteData(row._id)}
          >
            <Image
              src="/icons/Delete.svg"
              alt="search-icon"
              height={16}
              width={16}
            />
          </Button>
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
          loading={loading.fetch}
          rows={renderData(state.stocks.stocks)}
        />
        <Modal
          show={show}
          title={stock ? "Edit Stock" : "Add Stock"}
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
