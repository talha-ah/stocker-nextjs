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
import { Content } from "@components/Common"
import { Button } from "@components/Buttons"
import { generateReceipt } from "@utils/pdfs"
import { useAppContext } from "@contexts/index"
import { Header, Table } from "@components/Table"

const Actions = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  gap: ${({ theme }) => theme.gaps.light};
`

const Orders: NextPage = () => {
  const router = useRouter()
  const { state } = useAppContext()
  const [show, setShow] = useState(false)
  const [order, setOrder] = useState<any | null>(null)

  const { headers, fetchData, loading, addPayment, cancelOrder, error } =
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
            <Button
              iconed
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
            </Button>
          )}
          <Button
            iconed
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
          </Button>
          <Button
            iconed
            disabled={row.items > 0}
            loading={loading.cancelOrder}
            onClick={() => cancelOrder(row._id)}
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
        <title>Orders - Stocker</title>
        <meta name="description" content="stocker" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Content>
        <Header add={() => router.push("/app/orders/add")} title="Orders" />
        <Table
          paginate
          headers={headers}
          loading={loading.fetch}
          rows={renderData(state.orders.orders)}
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
