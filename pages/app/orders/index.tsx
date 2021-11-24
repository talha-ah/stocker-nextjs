import Head from "next/head"
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
import { Confirm } from "@components/Confirm"
import { generateReceipt } from "@utils/pdfs"
import { useAppContext } from "@contexts/index"
import { Header, Table } from "@components/Table"
import { Delete, Receipt, Plus } from "@components/icons"

const Actions = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  gap: ${({ theme }) => theme.spacing.light}px;
`

const Orders: NextPage = () => {
  const router = useRouter()
  const { state } = useAppContext()
  const [show, setShow] = useState(false)
  const [query, setQuery] = useState<any>("")
  const [dataList, setDataList] = useState([])
  const [order, setOrder] = useState<any | null>(null)

  const { headers, fetchData, loading, addPayment, cancelOrder, error } =
    useOrders()

  useEffect(() => {
    fetchData()
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    const filtered = state.orders.orders.filter(
      (option: any) =>
        !option.order_id ||
        !option.display_id ||
        option.display_id.toLowerCase().indexOf(query.toLowerCase()) > -1 ||
        String(option.order_id).toLowerCase().indexOf(query.toLowerCase()) > -1
    )
    setDataList(filtered)
    // eslint-disable-next-line
  }, [query, state.orders.orders])

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
              small
              iconed
              hover={false}
              onClick={() => {
                setOrder(row)
                setShow((s) => !s)
              }}
            >
              <Plus />
            </Button>
          )}
          <Button
            small
            iconed
            hover={false}
            onClick={() => {
              generateReceipt(row)
            }}
          >
            <Receipt />
          </Button>
          <Confirm
            title="Delete Order"
            onConfirm={() => cancelOrder(row._id)}
            message="Are you sure you want to delete this order?"
            trigger={({ open }: { open: boolean }) => (
              <Button
                small
                iconed
                hover={false}
                onClick={open}
                disabled={row.items > 0}
                loading={loading.cancelOrder}
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
        <title>Orders - Stocker</title>
        <meta name="description" content="stocker" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Content>
        <Header
          title="Orders"
          name={"search_orders"}
          placeholder={"Search Order"}
          add={() => router.push("/app/orders/add")}
          onSearch={(value: any) => setQuery(value)}
        />
        <Table
          paginate
          headers={headers}
          loading={loading.fetch}
          rows={renderData(dataList)}
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
