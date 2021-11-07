import { useState } from "react"

import { api } from "@utils/api"
import { toTitleCase } from "@utils/common"
import { endpoints } from "@utils/constants"
import { useAppContext, OrderTypes } from "@contexts/index"

const headers = [
  { key: 1, name: "Customer", field: "customer", align: "left" },
  { key: 2, name: "Display ID", field: "display_id", align: "left" },
  { key: 3, name: "type", field: "type", align: "left" },
  { key: 4, name: "Price", field: "total_price", align: "left" },
  { key: 5, name: "Stocks", field: "stocks_length", align: "left" },
  { key: 6, name: "Installments", field: "installments", align: "left" },
  { key: 7, name: "Balance", field: "balance", align: "left" },
  { key: 8, name: "Actions", field: "actions", align: "right" },
]

export const useOrders = () => {
  const { state, dispatch } = useAppContext()

  const [loading, setLoading] = useState({
    fetch: true,
    add: {
      active: false,
      quotation: false,
    },
    addPayment: false,
    cancelOrder: false,
  })

  const [error, setError] = useState({
    fetch: null,
    add: null,
    addPayment: null,
    cancelOrder: null,
  })

  const fetchData = async () => {
    try {
      if (state.orders.ordersFetched) return

      const response = await api({
        method: "GET",
        uri: endpoints.orders,
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
        type: OrderTypes.SET_ORDERS,
        payload: { orders: result },
      })
    } catch (error) {
      setError({ fetch: error.message })
    } finally {
      setLoading({ fetch: false })
    }
  }

  const addData = async (body, cb) => {
    try {
      setLoading({ add: { [body.status]: true } })

      const response = await api({
        method: "POST",
        uri: endpoints.orders,
        body: JSON.stringify(body),
      })

      response.data.key = response.data._id
      response.data.stocks_length = response.data.stocks.length
      response.data.customer = response.data.created_for.first_name

      const result = response.data

      dispatch({
        type: OrderTypes.ADD_ORDER,
        payload: { order: result },
      })

      cb && cb(response.data)
    } catch (error) {
      setError({ add: error.message })
    } finally {
      setLoading({ add: { [body.status]: false } })
    }
  }

  const addPayment = async (body, id, cb) => {
    try {
      setLoading({ addPayment: true })

      const response = await api({
        method: "POST",
        uri: `${endpoints.ordersPayment}/${id}`,
        body: JSON.stringify(body),
      })

      dispatch({
        type: CategoriesTypes.ADD_PAYMENT,
        payload: {
          order: {
            _id: id,
            value: body.value,
            payments: response.data.payments.length,
            installments: response.data.installments,
          },
        },
      })
      cb && cb()
    } catch (error) {
      setError({ addPayment: error.message })
    } finally {
      setLoading({ addPayment: false })
    }
  }

  const cancelOrder = async (id) => {
    try {
      setLoading({ cancelOrder: true })

      await api({
        method: "DELETE",
        uri: `${endpoints.orders}/${id}`,
      })

      dispatch({
        type: OrderTypes.CANCEL_ORDER,
        payload: { _id: id },
      })

      cb && cb()
    } catch (error) {
      setError({ cancelOrder: error.message })
    } finally {
      setLoading({ cancelOrder: false })
    }
  }

  return {
    error,
    headers,
    loading,
    addData,
    fetchData,
    addPayment,
    cancelOrder,
  }
}
