import Head from "next/head"
import type { NextPage } from "next"
import styled from "styled-components"
import { useRouter } from "next/router"
import { useState, useEffect } from "react"

import { Layout } from "@layouts/layout"
import { truncate } from "@utils/common"
import { useStocks } from "@hooks/stocks"
import { Modal } from "@components/Modal"
import { Button } from "@components/Buttons"
import { Confirm } from "@components/Confirm"
import { useAppContext } from "@contexts/index"
import { Header, Table } from "@components/Table"
import { Edit, Delete, Eye } from "@components/icons"
import { Content, FlexRow } from "@components/Common"
import { CreateStock, EditStock } from "@forms/stocks"
import { Description, SubHeading } from "@components/Texts"

const Actions = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  gap: ${({ theme }) => theme.spacing.light}px;
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
  const router = useRouter()

  const { state } = useAppContext()
  const [show, setShow] = useState(false)
  const [query, setQuery] = useState<any>("")
  const [dataList, setDataList] = useState([])
  const [stock, setStock] = useState<StockType>(null)
  const [totalCost, setTotalCost] = useState<number>(0)
  const [totalSale, setTotalSale] = useState<number>(0)

  const { headers, fetchData, addData, editData, deleteData, error, loading } =
    useStocks()

  useEffect(() => {
    fetchData()
    // eslint-disable-next-line
  }, [])
  useEffect(() => {
    let sale = 0
    let cost = 0

    state.stocks.stocks.forEach((s: any) => {
      sale += s.sale_price
      cost += s.cost_price
    })

    setTotalCost(truncate(cost, 2))
    setTotalSale(truncate(sale, 2))
    // eslint-disable-next-line
  }, [state.stocks.stocks])

  useEffect(() => {
    const filtered = state.stocks.stocks.filter(
      (option: any) =>
        !option.code ||
        !option.location ||
        !option.description ||
        option.code.toLowerCase().indexOf(query.toLowerCase()) > -1 ||
        option.location.toLowerCase().indexOf(query.toLowerCase()) > -1 ||
        option.description.toLowerCase().indexOf(query.toLowerCase()) > -1 ||
        String(option.sr).toLowerCase().indexOf(query.toLowerCase()) > -1
    )
    setDataList(filtered)
    // eslint-disable-next-line
  }, [query, state.stocks.stocks])

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
            small
            iconed
            hover={false}
            onClick={() => router.push(`/app/stocks/${row._id}`)}
          >
            <Eye />
          </Button>
          <Button
            small
            iconed
            hover={false}
            onClick={() => {
              setStock(row)
              setShow((s) => !s)
            }}
          >
            <Edit />
          </Button>
          <Confirm
            title="Delete Stock"
            onConfirm={() => deleteData(row._id)}
            message="Are you sure you want to delete this stock?"
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

        <FlexRow gap={18} marginBottom={8}>
          <SubHeading>Total Cost: </SubHeading>
          <Description>{totalCost}</Description>
          <SubHeading>Total Sale: </SubHeading>
          <Description>{totalSale}</Description>
        </FlexRow>

        <Table
          height={700}
          headers={headers}
          loading={loading.fetch}
          rows={renderData(dataList)}
          totalField={["cost_price", "sale_price", "inventory"]}
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
