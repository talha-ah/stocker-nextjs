import { useState } from "react"

import { api } from "@utils/api"
import { toTitleCase } from "@utils/common"
import { endpoints } from "@utils/constants"
import { useAppContext, QuotationTypes, OrderTypes } from "@contexts/index"

const headers = [
  { key: 2, name: "Quotation #", field: "order_id", align: "left" },
  { key: 1, name: "Customer", field: "customer", align: "left" },
  { key: 2, name: "Display Id", field: "display_id", align: "left" },
  { key: 3, name: "Type", field: "type", align: "left" },
  { key: 4, name: "Total Price", field: "total_price", align: "left" },
  { key: 5, name: "Stocks", field: "stocks_length", align: "left" },
  { key: 8, name: "Actions", field: "actions", align: "right" },
]

export const useQuotations = () => {
  const { state, dispatch } = useAppContext()

  const [loading, setLoading] = useState({
    fetch: false,
    toOrder: false,
  })

  const [error, setError] = useState({
    fetch: null,
    toOrder: null,
  })

  const fetchData = async () => {
    try {
      setLoading({ ...loading, fetch: true })
      if (state.quotations.quotationsFetched) return

      const response = await api({
        method: "GET",
        uri: `${endpoints.orders}?status=quotation`,
      })

      const result = response.data.map((row) => ({
        ...row,
        key: row._id,
        type: toTitleCase(row.type),
        stocks_length: row.stocks.length,
        customer: row.created_for.first_name,
        installments: `${row.installments} - ${row.payments.length}`,
      }))

      dispatch({
        type: QuotationTypes.SET_QUOTATIONS,
        payload: { quotations: result },
      })
    } catch (error) {
      setError({ ...error, fetch: error.message })
    } finally {
      setLoading({ ...loading, fetch: false })
    }
  }

  const toOrder = async (_id) => {
    try {
      await api({
        method: "PUT",
        uri: `${endpoints.orders}/${_id}`,
        body: JSON.stringify({ status: "active" }),
      })

      const quotation = state.quotations.quotations.find(
        (quot) => String(quot._id) === String(_id)
      )

      dispatch({
        type: QuotationTypes.REMOVE_QUOTATION,
        payload: { _id },
      })

      dispatch({
        type: OrderTypes.ADD_ORDER,
        payload: { order: quotation },
      })
    } catch (error) {
      setError({ ...error, fetch: error.message })
    } finally {
      setLoading({ ...loading, fetch: false })
    }
  }

  return {
    error,
    headers,
    loading,
    toOrder,
    fetchData,
  }
}
