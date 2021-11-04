import Head from "next/head"
import { useState } from "react"
import type { NextPage } from "next"
import styled from "styled-components"

import { Layout } from "@layouts/layout"
import { useStocks } from "@hooks/stocks"
import { Modal } from "@components/Modal"
import { CreateStock } from "@forms/stocks"
import { Header, Table } from "@components/Table"

const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.gaps.light};
`

const Stocks: NextPage = () => {
  const [show, setShow] = useState(false)

  const { data, headers, addData, addError, addLoading, fetchLoading } =
    useStocks()

  const onSubmit = async (body: any, cb: any) => {
    addData(body, cb)
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
        <Table rows={data} headers={headers} loading={fetchLoading} />
        <Modal
          show={show}
          title="Add Stock"
          setShow={(s: boolean) => setShow(s)}
        >
          <CreateStock
            onSubmit={onSubmit}
            loading={addLoading}
            error={addError}
          />
        </Modal>
      </Content>
    </Layout>
  )
}

export default Stocks
