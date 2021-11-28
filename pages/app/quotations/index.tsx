import Head from "next/head"
import type { NextPage } from "next"
import styled from "styled-components"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

import DateUtility from "@utils/date"
import { Layout } from "@layouts/layout"
import { Modal } from "@components/Modal"
import { Button } from "@components/Buttons"
import { generateReceipt } from "@utils/pdfs"
import { Divider } from "@components/Divider"
import { Confirm } from "@components/Confirm"
import { useAppContext } from "@contexts/index"
import { Header, Table } from "@components/Table"
import { useQuotations } from "@hooks/quotations"
import { Content, FlexRow } from "@components/Common"
import { calculateDiscount, truncate } from "@utils/common"
import { Description, SubHeading } from "@components/Texts"
import { Receipt, Delete, Plus, Eye, Edit } from "@components/icons"

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
    router.prefetch("/app/quotations/edit")
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    const filtered = state.quotations.quotations.filter((option: any) => {
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
  }, [query, state.quotations.quotations])

  const renderData = (rows: any) => {
    return rows.map((row: any) => ({
      ...row,
      actions: (
        <Actions>
          <Confirm
            title="Add Order"
            onConfirm={() => toOrder(row._id)}
            message="Are you sure you want to create an order for this quotation?"
            trigger={({ open }: { open: any }) => (
              <Button
                small
                iconed
                hover={false}
                onClick={open}
                loading={loading.toOrder}
              >
                <Plus />
              </Button>
            )}
          />
          <Button
            small
            iconed
            hover={false}
            onClick={() => {
              setQuotation(row)
              setShowQuotation(true)
            }}
          >
            <Eye />
          </Button>
          <Button
            small
            iconed
            hover={false}
            onClick={() => router.push(`/app/quotations/edit/${row._id}`)}
          >
            <Edit />
          </Button>
          <Button
            small
            iconed
            hover={false}
            onClick={() => generateReceipt(row)}
          >
            <Receipt />
          </Button>
          <Confirm
            title="Delete Quotation"
            onConfirm={() => cancelQuotation(row._id)}
            message="Are you sure you want to delete this quotation?"
            trigger={({ open }: { open: any }) => (
              <Button
                small
                iconed
                hover={false}
                onClick={open}
                disabled={row.items > 0}
                loading={loading.cancelQuotation}
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
  const [quotation, setQuotation] = useState<any | null>(null)
  const [showQuotation, setShowQuotation] = useState<boolean>(false)

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
      name: "Quantity",
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

        {quotation && (
          <Modal
            width={800}
            show={showQuotation}
            title={`Quotation #: ${quotation.order_id}`}
            setShow={(s: boolean) => setShowQuotation(s)}
          >
            <FlexRow marginBottom={8}>
              <FlexRow>
                <SubHeading>Customer: </SubHeading>
                <Description>{quotation.created_for.first_name}</Description>
              </FlexRow>
              <FlexRow>
                <SubHeading>Created At: </SubHeading>
                <Description>
                  {DateUtility.formatDate(quotation.createdAt)}
                </Description>
              </FlexRow>
            </FlexRow>
            <Divider />
            <Table
              paginate
              totalField="amount"
              headers={stockHeaders}
              rows={renderStocks(quotation.stocks)}
            />
            <Actions style={{ marginTop: 16 }}>
              <Button
                primary
                onClick={() => {
                  setQuotation(quotation)
                  setShowQuotation(true)
                }}
              >
                Edit
              </Button>
            </Actions>
          </Modal>
        )}
      </Content>
    </Layout>
  )
}

export default Quotations
