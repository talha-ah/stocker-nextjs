import Head from "next/head"
import type { NextPage } from "next"
import styled from "styled-components"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

import DateUtility from "@utils/date"
import { Layout } from "@layouts/layout"
import { Modal } from "@components/Modal"
import { useOrders } from "@hooks/orders"
import { AddPayment } from "@forms/orders"
import { Button } from "@components/Buttons"
import { Confirm } from "@components/Confirm"
import { Divider } from "@components/Divider"
import { generateReceipt } from "@utils/pdfs"
import { useAppContext } from "@contexts/index"
import { Header, Table } from "@components/Table"
import { Content, FlexRow } from "@components/Common"
import { calculateDiscount, truncate } from "@utils/common"
import { Description, SubHeading } from "@components/Texts"
import { Delete, Receipt, Plus, Eye } from "@components/icons"

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

  const [query, setQuery] = useState<any>("")
  const [show, setShow] = useState<boolean>(false)
  const [dataList, setDataList] = useState<any>([])
  const [order, setOrder] = useState<any | null>(null)

  const { headers, fetchData, loading, addPayment, cancelOrder, error } =
    useOrders()

  useEffect(() => {
    fetchData()
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    const filtered = state.orders.orders.filter((option: any) => {
      if (query) {
        return (
          (option.order_id &&
            String(option.order_id)
              .toLowerCase()
              .indexOf(String(query.toLowerCase())) > -1) ||
          String(option.created_for.first_name)
            .toLowerCase()
            .indexOf(String(query.toLowerCase())) > -1
        )
      } else {
        return true
      }
    })
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
              setOrder(row)
              setShowOrder(true)
            }}
          >
            <Eye />
          </Button>
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
            trigger={({ open }: { open: any }) => (
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

  // ================================ View Order
  const [showOrder, setShowOrder] = useState<boolean>(false)

  const renderStocks = (rows: any) =>
    rows.map((row: any) => ({
      sr: row.stock_id.sr,
      description: row.stock_id.description,
      code: row.stock_id.code,
      sale_price: row.sale_price,
      quantity: row.quantity,
      discount: row.discount.value,
      location: row.stock_id.location,
      amount: truncate(
        calculateDiscount(row.sale_price, row.quantity, row.discount.value)
          .value,
        2
      ),
    }))

  const stockHeaders = [
    { key: 1, name: "Sr.", field: "sr", align: "left", width: "10px" },
    {
      key: 2,
      name: "Description",
      field: "description",
      align: "left",
      width: "auto",
    },
    {
      key: 3,
      name: "Price",
      field: "sale_price",
      align: "right",
      width: "100px",
    },
    {
      key: 4,
      name: "Qty",
      field: "quantity",
      align: "right",
      width: "auto",
    },
    {
      key: 5,
      name: "Disc %",
      field: "discount",
      align: "right",
      width: "auto",
    },
    {
      key: 6,
      name: "Amount",
      field: "amount",
      align: "right",
      width: "auto",
    },
  ]
  // View Order =================================

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
          totalField={["total_price", "balance"]}
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
        {order && (
          <Modal
            width={800}
            show={showOrder}
            title={`Order #: ${order.order_id}`}
            setShow={(s: boolean) => setShowOrder(s)}
          >
            <FlexRow marginBottom={8}>
              <FlexRow>
                <SubHeading>Customer: </SubHeading>
                <Description>{order.created_for.first_name}</Description>
              </FlexRow>
              <FlexRow>
                <SubHeading>Created At: </SubHeading>
                <Description>
                  {DateUtility.formatDate(order.createdAt)}
                </Description>
              </FlexRow>
            </FlexRow>
            <Divider />
            <Table
              paginate
              totalField="amount"
              headers={stockHeaders}
              rows={renderStocks(order.stocks)}
            />
          </Modal>
        )}
      </Content>
    </Layout>
  )
}

export default Orders
