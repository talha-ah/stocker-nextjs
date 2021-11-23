import { useState } from "react"

import { useAPI } from "@utils/api"
import { endpoints } from "@utils/constants"
import { toTitleCase, truncate } from "@utils/common"
import { OrderTypes, useAppContext, QuotationTypes } from "@contexts/index"

const headers = [
  { key: 1, name: "Quotation #", field: "order_id", align: "left" },
  { key: 2, name: "Customer", field: "customer", align: "left" },
  { key: 3, name: "Display Id", field: "display_id", align: "left" },
  { key: 4, name: "Type", field: "type", align: "left" },
  { key: 5, name: "Total Price", field: "total_price", align: "left" },
  { key: 6, name: "Stocks", field: "stocks_length", align: "left" },
  { key: 7, name: "Actions", field: "actions", align: "right" },
]

const defaultLoading = {
  fetch: false,
  toOrder: false,
  cancelQuotation: false,
}

const defaultError = {
  fetch: null,
  toOrder: null,
  cancelQuotation: null,
}

export const useQuotations = () => {
  const { api } = useAPI()
  const { state, dispatch, notify } = useAppContext()

  const [error, setError] = useState(defaultError)
  const [loading, setLoading] = useState(defaultLoading)

  const fetchData = async () => {
    try {
      setError(defaultError)
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
        balance: truncate(row.balance, 2),
        customer: row.created_for.first_name,
        total_price: truncate(row.total_price, 2),
        installments: `${row.installments} - ${row.payments.length}`,
      }))

      dispatch({
        type: QuotationTypes.SET_QUOTATIONS,
        payload: { quotations: result },
      })
    } catch (error) {
      setError({ ...error, fetch: error?.data })
      notify("error", error?.message)
    } finally {
      setLoading({ ...loading, fetch: false })
    }
  }

  const toOrder = async (_id, cb) => {
    try {
      setError(defaultError)
      setLoading({ ...loading, toOrder: true })

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

      notify("success", "Order added successfully.")

      cb && cb()
    } catch (error) {
      setError({ ...error, toOrder: error?.data })
      notify("error", error?.message)
    } finally {
      setLoading({ ...loading, toOrder: false })
    }
  }

  const cancelQuotation = async (id, cb) => {
    try {
      setError(defaultError)
      setLoading({ ...loading, cancelQuotation: true })

      await api({
        method: "DELETE",
        uri: `${endpoints.orders}/${id}`,
      })

      dispatch({
        type: QuotationTypes.REMOVE_QUOTATION,
        payload: { _id: id },
      })

      notify("success", "Quotation canceled successfully.")

      cb && cb()
    } catch (error) {
      setError({ ...error, cancelQuotation: error?.data })
      notify("error", error?.message)
    } finally {
      setLoading({ ...loading, cancelQuotation: false })
    }
  }

  return {
    error,
    headers,
    loading,
    toOrder,
    fetchData,
    cancelQuotation,
  }
}
