import Head from "next/head"
import type { NextPage } from "next"
import { useRouter } from "next/router"
import { useState, useEffect } from "react"

import DateUtility from "@utils/date"
import { Layout } from "@layouts/layout"
import { useStocks } from "@hooks/stocks"
import { useOrders } from "@hooks/orders"
import { Header, Table } from "@components/Table"
import { Content, FlexRow } from "@components/Common"
import { Description, SubHeading } from "@components/Texts"

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

const headers = [
  { key: 1, name: "Date", field: "date", align: "left" },
  { key: 2, name: "Order #", field: "order_id", align: "left" },
  { key: 3, name: "Customer", field: "customer", align: "left" },
  { key: 4, name: "Quantity", field: "qty", align: "right" },
  { key: 5, name: "Cost Price", field: "cost_price", align: "right" },
  { key: 6, name: "Sale Price", field: "sale_price", align: "right" },
  { key: 7, name: "Discount", field: "discount", align: "right" },
]

const SingleStock: NextPage = () => {
  const router = useRouter()

  const [orders, setOrders] = useState<any[]>([])
  const [stock, setStock] = useState<StockType | undefined>(null)

  const { getStockOrders } = useOrders()
  const { loading, fetchOne } = useStocks()

  useEffect(() => {
    const { id } = router.query
    setStock(fetchOne(id))

    let stockOrders = getStockOrders(id)
    setOrders(
      stockOrders.map((order: any) => {
        const orderStock = order.stocks.find(
          (st: any) => String(st.stock_id._id) === String(id)
        )
        return {
          ...orderStock,
          order_id: order.order_id,
          customer: order.created_for.first_name,
          qty: orderStock.quantity,
          sale_price: orderStock.sale_price,
          cost_price: orderStock.cost_price,
          discount: orderStock.discount.value,
          date: DateUtility.formatDate(order.createdAt),
        }
      })
    )

    // eslint-disable-next-line
  }, [])

  return (
    <Layout>
      <Head>
        <title>Stock - Stocker</title>
        <meta name="description" content="stocker" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Content>
        <Header title="Stocks" actions={false} />
        <FlexRow marginBottom={8}>
          <FlexRow>
            <SubHeading>Details : </SubHeading>
            <Description>{stock?.description}</Description>
          </FlexRow>
          <FlexRow>
            <SubHeading>Code: </SubHeading>
            <Description>{stock?.code}</Description>
          </FlexRow>
          <FlexRow>
            <SubHeading>Location: </SubHeading>
            <Description>{stock?.location}</Description>
          </FlexRow>
        </FlexRow>
        <FlexRow marginBottom={8}>
          <FlexRow>
            <SubHeading>Cost Price: </SubHeading>
            <Description>{stock?.cost_price}</Description>
          </FlexRow>
          <FlexRow>
            <SubHeading>Sale Price: </SubHeading>
            <Description>{stock?.sale_price}</Description>
          </FlexRow>
          <FlexRow>
            <SubHeading>Inventory: </SubHeading>
            <Description>{stock?.inventory}</Description>
          </FlexRow>
        </FlexRow>
        {console.log(orders)}
        <Table rows={orders} headers={headers} loading={loading.fetch} />
      </Content>
    </Layout>
  )
}

export default SingleStock
