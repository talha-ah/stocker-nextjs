import Head from "next/head"
import Image from "next/image"
import type { NextPage } from "next"
import styled from "styled-components"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

import { Layout } from "@layouts/layout"
import { Modal } from "@components/Modal"
import { useOrders } from "@hooks/orders"
import { AddPayment } from "@forms/orders"

import { generateReceipt } from "@utils/pdfs"
import { IconButton } from "@components/Buttons"
import { Header, Table } from "@components/Table"

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

const Orders: NextPage = () => {
  const router = useRouter()
  const [show, setShow] = useState(false)
  const [order, setOrder] = useState<any | null>(null)

  const { data, headers, fetchData, loading, addPayment, cancelOrder, error } =
    useOrders()

  useEffect(() => {
    fetchData()
    // eslint-disable-next-line
  }, [])

  const onSubmit = async (body: any, cb: any) => {
    addPayment(body, order._id, () => {
      setShow((s) => !s)
      cb()
    })
  }

  const renderData = (rows: any) => {
    return rows.map((row: any) => ({
      ...row,
      actions: (
        <Actions>
          {row.type === "Installments" && row.balance > 0 && (
            <IconButton
              onClick={() => {
                setOrder(row)
                setShow((s) => !s)
              }}
            >
              <Image
                src="/icons/Plus.svg"
                alt="search-icon"
                height={16}
                width={16}
              />
            </IconButton>
          )}
          <IconButton
            onClick={() => {
              generateReceipt(row)
            }}
          >
            <Image
              src="/icons/Receipt.svg"
              alt="search-icon"
              height={16}
              width={16}
            />
          </IconButton>
          <IconButton
            onClick={() => cancelOrder(row._id)}
            disabled={row.items > 0 || loading.cancelOrder}
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
        <Modal
          show={show}
          title={"Add Payment"}
          setShow={(s: boolean) => setShow(s)}
        >
          <AddPayment
            onSubmit={onSubmit}
            error={error.addPayment}
            loading={loading.addPayment}
          />
        </Modal>
      </Content>
    </Layout>
  )
}

export default Orders
