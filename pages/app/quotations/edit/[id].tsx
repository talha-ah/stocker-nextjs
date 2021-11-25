import Head from "next/head"
import type { NextPage } from "next"
import styled from "styled-components"
import { useRouter } from "next/router"
import { useState, useEffect } from "react"

import { Layout } from "@layouts/layout"
import { Input } from "@components/Inputs"
import { Delete } from "@components/icons"
import { Button } from "@components/Buttons"
import { generateReceipt } from "@utils/pdfs"
import { useSearchStock } from "@hooks/stocks"
import { useAppContext } from "@contexts/index"
import { Header, Table } from "@components/Table"
import { useQuotations } from "@hooks/quotations"
import { Content, FlexRow } from "@components/Common"
import { Select, SelectType } from "@components/Select"
import { SearchSelect } from "@components/SearchSelect"
import { Description, SubHeading } from "@components/Texts"
import { calculateDiscount, toTitleCase, truncate } from "@utils/common"

const Buttons = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.default}px;
  margin: ${({ theme }) => theme.spacing.default}px 0px;
`

const Actions = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.light};
`

const headers = [
  { key: 1, name: "Sr.", field: "sr", align: "left", width: "100px" },
  { key: 2, name: "Description", field: "description", align: "left" },
  { key: 3, name: "Code", field: "code", align: "left" },
  { key: 4, name: "Price", field: "sale_price", align: "left", width: "100px" },
  { key: 5, name: "Qty", field: "qty", align: "left", width: "100px" },
  { key: 6, name: "Disc %", field: "discount", align: "left", width: "100px" },
  {
    key: 7,
    name: "Disc Price",
    field: "discount_price",
    align: "right",
    width: "100px",
  },
  {
    key: 8,
    name: "Total Price",
    field: "total_price",
    align: "right",
  },
  { key: 9, name: "Actions", field: "actions", align: "center" },
]

const paymentTypes = [
  {
    label: "Cash",
    value: "cash",
  },
  {
    label: "Installments",
    value: "installments",
  },
]

const EditQuotation: NextPage = () => {
  const router = useRouter()
  const { notify } = useAppContext()

  const [rows, setRows] = useState<any>([])

  const [paymentType, setPaymentType] = useState<SelectType[]>([
    paymentTypes[0],
  ])

  const { updateQuotation, fetchQuotation, loading, error } = useQuotations()

  const [stockQuery, setstockQuery] = useState("")
  const { stocks } = useSearchStock(stockQuery)

  const [address, setAddress] = useState<string>("")
  const [orderId, setOrderId] = useState<string>("")
  const [displayId, setDisplayId] = useState<string>("")
  const [customer, setCustomer] = useState<any | null>(null)

  useEffect(() => {
    const { id } = router.query
    const quotation: any = fetchQuotation(id)

    if (quotation) {
      setOrderId(quotation?.order_id)
      setDisplayId(quotation?.display_id)
      setCustomer(quotation?.created_for)
      setAddress(quotation?.shipping_address?.address_one)
      setPaymentType([
        {
          label: toTitleCase(quotation?.type),
          value: quotation?.type,
        },
      ])
      setRows(
        quotation?.stocks.map((item: any) => ({
          ...item.stock_id,
          qty: item.quantity,
          value: item.stock_id._id,
          total_price: item.sale_price,
          discount: item.discount.value,
          label: item.stock_id.description,
          discount_price: item.discount.value,
        }))
      )
    } else {
      notify("error", "Quotation not found")
    }

    // eslint-disable-next-line
  }, [])

  const addStock = (value: any) => {
    const rowsCloned = [...rows]

    const rowIndex = rowsCloned.findIndex(
      (row) => String(row.value) === String(value.value)
    )

    if (rowIndex === -1) {
      rowsCloned.push({
        ...value,
        qty: 1,
        discount: 0,
        discount_price: 0,
        total_price: value.sale_price,
      })
    } else {
      rowsCloned[rowIndex].qty++
    }

    setRows(rowsCloned)
    setstockQuery("")
  }

  const removeStock = (id: string) => {
    const rowsCloned = [...rows]

    setRows(rowsCloned.filter((d: any) => String(d._id) !== String(id)))
  }

  const onChangeRowInput = (e: any, field: any, row: any) => {
    const name = e.target.name
    const value = e.target.value

    const clonedRows = [...rows]
    const elemIndex = clonedRows.findIndex(
      (elem: any) => String(elem._id) === String(row._id)
    )
    clonedRows[elemIndex][field] = value
    setRows(clonedRows)

    setTimeout(() => {
      const element = document.getElementById(name)
      element?.focus()
    }, 0)
  }

  const onSubmit = async () => {
    const body = {
      installments: 1,
      type: paymentType[0]?.value,
      address_one: address || customer?.address_one,
      address_two: customer?.address_two,
      postal_code: customer?.postal_code,
      city: customer?.city,
      state: customer?.state,
      country: customer?.country,
      stocks: rows.map((row: any) => ({
        stock_id: row.value,
        quantity: String(row.qty),
        discount_type: "percentage",
        price: String(row.sale_price),
        discount: String(row.discount),
      })),
    }

    const { id } = router.query

    updateQuotation(body, id, (data: any) => {
      generateReceipt(data)
      router.back()
    })
  }

  const renderData = (rows: any) => {
    return rows.map((row: any) => ({
      ...row,
      sale_price: (
        <Input
          small
          min={0}
          type="number"
          marginBottom={0.1}
          value={row.sale_price}
          name={`sale_price${row._id}`}
          onChange={(e: any) => onChangeRowInput(e, "sale_price", row)}
        />
      ),
      qty: (
        <Input
          small
          min={0}
          type="number"
          value={row.qty}
          marginBottom={0.1}
          name={`qty${row._id}`}
          onChange={(e: any) => onChangeRowInput(e, "qty", row)}
        />
      ),
      discount: (
        <Input
          small
          min={0}
          type="number"
          marginBottom={0.1}
          value={row.discount}
          name={`discount${row._id}`}
          onChange={(e: any) => onChangeRowInput(e, "discount", row)}
        />
      ),
      discount_price: truncate(
        calculateDiscount(row.sale_price, row.qty, row.discount).discount,
        2
      ),
      total_price: truncate(
        calculateDiscount(row.sale_price, row.qty, row.discount).value,
        2
      ),
      actions: (
        <Actions>
          <Button
            small
            iconed
            hover={false}
            onClick={() => removeStock(row._id)}
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
        <title>Update Quotation - Stocker</title>
        <meta name="description" content="stocker" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Content>
        <FlexRow>
          <Header title="Update Quotation" actions={false} />
        </FlexRow>
        <FlexRow marginBottom={8}>
          <FlexRow>
            <SubHeading>Quotation #: </SubHeading>
            <Description>{orderId}</Description>
          </FlexRow>
          <FlexRow>
            <SubHeading>Display ID: </SubHeading>
            <Description>{displayId}</Description>
          </FlexRow>
          <FlexRow>
            <SubHeading>Customer: </SubHeading>
            <Description>{customer?.first_name}</Description>
          </FlexRow>
        </FlexRow>

        <FlexRow>
          <Select
            required
            search={false}
            name="paymentType"
            value={paymentType}
            label="Payment Type"
            options={paymentTypes}
            placeholder="Payment Type"
            error={error?.updateQuotation?.paymentType}
            onChange={(value: any) => setPaymentType(value)}
          />
          <Input
            name="address"
            label="Address"
            value={address}
            placeholder="Address"
            onChange={(e: any) => setAddress(e.target.value)}
          />
          <SearchSelect
            required
            name="stocks"
            label="Stock"
            options={stocks}
            placeholder="Search Stock"
            error={error?.updateQuotation?.stocks}
            onSelect={(value: any) => addStock(value)}
            onSearch={(text: string) => setstockQuery(text)}
          />
        </FlexRow>

        <Table
          height={600}
          hover={false}
          headers={headers}
          id="edit_quotation"
          rows={renderData(rows)}
          totalField="total_price"
        />

        {rows.length > 0 && (
          <Buttons>
            <Button
              primary
              onClick={onSubmit}
              loading={loading.updateQuotation}
            >
              Update
            </Button>
          </Buttons>
        )}
      </Content>
    </Layout>
  )
}

export default EditQuotation
