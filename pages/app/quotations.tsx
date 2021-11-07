import Head from "next/head"
import Image from "next/image"
import { useEffect } from "react"
import type { NextPage } from "next"
import styled from "styled-components"

import { Layout } from "@layouts/layout"
import { Content } from "@components/Common"
import { generateReceipt } from "@utils/pdfs"
import { useAppContext } from "@contexts/index"
import { IconButton } from "@components/Buttons"
import { Header, Table } from "@components/Table"
import { useQuotations } from "@hooks/quotations"

const Actions = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  gap: ${({ theme }) => theme.gaps.light};
`

const Quotations: NextPage = () => {
  const { state } = useAppContext()

  const { headers, fetchData, toOrder, loading } = useQuotations()

  useEffect(() => {
    fetchData()
    // eslint-disable-next-line
  }, [])

  const renderData = (rows: any) => {
    return rows.map((row: any) => ({
      ...row,
      actions: (
        <Actions>
          <IconButton
            disabled={loading.toOrder}
            onClick={() => toOrder(row._id)}
          >
            <Image
              src="/icons/Plus.svg"
              alt="search-icon"
              height={16}
              width={16}
            />
          </IconButton>
          <IconButton onClick={() => generateReceipt(row)}>
            <Image
              src="/icons/Receipt.svg"
              alt="search-icon"
              height={16}
              width={16}
            />
          </IconButton>
          <IconButton
            // onClick={() => cancelOrder(row._id)}
            disabled={row.items > 0}
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
        <title>Quotations - Stocker</title>
        <meta name="description" content="stocker" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Content>
        <Header title="Quotations" actions={false} />
        <Table
          paginate
          headers={headers}
          loading={loading.fetch}
          rows={renderData(state.quotations.quotations)}
        />
      </Content>
    </Layout>
  )
}

export default Quotations
