import Head from "next/head"
import type { NextPage } from "next"
import styled from "styled-components"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

import { Layout } from "@layouts/layout"
import { Content } from "@components/Common"
import { Button } from "@components/Buttons"
import { generateReceipt } from "@utils/pdfs"
import { useAppContext } from "@contexts/index"
import { Header, Table } from "@components/Table"
import { useQuotations } from "@hooks/quotations"
import { Receipt, Delete, Plus } from "@components/icons"

const Actions = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  gap: ${({ theme }) => theme.spacing.light}px;
`

const Quotations: NextPage = () => {
  const router = useRouter()
  const { state } = useAppContext()
  const [query, setQuery] = useState<any>("")
  const [dataList, setDataList] = useState([])
  const { headers, fetchData, toOrder, loading, cancelQuotation } =
    useQuotations()

  useEffect(() => {
    fetchData()
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    const filtered = state.quotations.quotations.filter(
      (option: any) =>
        !option.order_id ||
        !option.display_id ||
        option.display_id.toLowerCase().indexOf(query.toLowerCase()) > -1 ||
        String(option.order_id).toLowerCase().indexOf(query.toLowerCase()) > -1
    )
    setDataList(filtered)
    // eslint-disable-next-line
  }, [query, state.quotations.quotations])

  const renderData = (rows: any) => {
    return rows.map((row: any) => ({
      ...row,
      actions: (
        <Actions>
          <Button
            iconed
            loading={loading.toOrder}
            onClick={() => toOrder(row._id)}
          >
            <Plus />
          </Button>
          <Button iconed onClick={() => generateReceipt(row)}>
            <Receipt />
          </Button>
          <Button
            iconed
            onClick={() => cancelQuotation(row._id)}
            disabled={row.items > 0 || loading.cancelQuotation}
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
        <title>Quotations - Stocker</title>
        <meta name="description" content="stocker" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Content>
        <Header
          title="Quotations"
          name={"search_quotations"}
          placeholder={"Search Quotations"}
          add={() => router.push("/app/orders/add")}
          onSearch={(value: any) => setQuery(value)}
        />
        <Table
          paginate
          headers={headers}
          loading={loading.fetch}
          rows={renderData(dataList)}
        />
      </Content>
    </Layout>
  )
}

export default Quotations
