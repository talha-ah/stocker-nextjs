import Head from "next/head"
import { useEffect } from "react"
import type { NextPage } from "next"
import styled from "styled-components"
import { useRouter } from "next/router"

import { Layout } from "@layouts/layout"
import { useOrders } from "@hooks/orders"
import { Header, Table } from "@components/Table"

const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.gaps.light};
`
const Orders: NextPage = () => {
  const router = useRouter()

  const { data, headers, fetchData, loading } = useOrders()

  useEffect(() => {
    fetchData()
    // eslint-disable-next-line
  }, [])

  const renderData = (rows: any) => {
    return rows
  }

  return (
    <Layout>
      <Head>
        <title>Orders - Stocker</title>
        <meta name="description" content="stocker" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Content>
        <Header add={() => router.push("/app/orders/add")} title="Orders" />
        <Table
          headers={headers}
          rows={renderData(data)}
          loading={loading.fetch}
        />
      </Content>
    </Layout>
  )
}

export default Orders
