import Head from "next/head"
import type { NextPage } from "next"
import styled from "styled-components"
import { useState, useEffect } from "react"

import { Layout } from "@layouts/layout"
import { useStocks } from "@hooks/stocks"
import { Modal } from "@components/Modal"
import { Content } from "@components/Common"
import { Button } from "@components/Buttons"
import { useAppContext } from "@contexts/index"
import { Edit, Delete } from "@components/icons"
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
  const [query, setQuery] = useState<any>("")
  const [dataList, setDataList] = useState([])
  const [stock, setStock] = useState<StockType>(null)

  const { headers, fetchData, addData, editData, deleteData, error, loading } =
    useStocks()

  useEffect(() => {
    fetchData()
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    const filtered = state.stocks.stocks.filter(
      (option: any) =>
        option.code.toLowerCase().indexOf(query.toLowerCase()) > -1 ||
        option.description.toLowerCase().indexOf(query.toLowerCase()) > -1 ||
        option.location.toLowerCase().indexOf(query.toLowerCase()) > -1 ||
        String(option.sr).toLowerCase().indexOf(query.toLowerCase()) > -1
    )
    setDataList(filtered)
    // eslint-disable-next-line
  }, [query])

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
            <Edit />
          </Button>
          <Button
            iconed
            loading={loading.delete}
            onClick={() => deleteData(row._id)}
          >
            <Delete />
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
        <Header
          title="Stocks"
          name={"search_stocks"}
          placeholder={"Search Stocks"}
          add={() => setShow((s) => !s)}
          onSearch={(value: any) => setQuery(value)}
        />
        <Table
          headers={headers}
          loading={loading.fetch}
          rows={renderData(dataList)}
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
