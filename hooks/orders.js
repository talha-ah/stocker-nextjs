import { useState } from "react"

import { useAPI } from "@utils/api"
import { endpoints } from "@utils/constants"
import { toTitleCase, truncate } from "@utils/common"
import {
  OrderTypes,
  useAppContext,
  NotifierTypes,
  QuotationTypes,
} from "@contexts/index"

const headers = [
  { key: 1, name: "Order #", field: "order_id", align: "left" },
  { key: 2, name: "Customer", field: "customer", align: "left" },
  { key: 3, name: "Display Id", field: "display_id", align: "left" },
  { key: 4, name: "Type", field: "type", align: "left" },
  { key: 5, name: "Total Price", field: "total_price", align: "left" },
  { key: 6, name: "Stocks", field: "stocks_length", align: "left" },
  { key: 7, name: "Balance", field: "balance", align: "left" },
  { key: 8, name: "Actions", field: "actions", align: "right" },
]

const defaultLoading = {
  fetch: false,
  addPayment: false,
  cancelOrder: false,
  addGeneralPayment: false,
  add: {
    active: false,
    quotation: false,
  },
}

const defaultError = {
  add: {
    paymentType: null,
    created_for: null,
    stocks: null,
  },
  fetch: null,
  addPayment: null,
  cancelOrder: null,
  addGeneralPayment: null,
}

export const useOrders = () => {
  const { api } = useAPI()
  const { state, dispatch } = useAppContext()
  const [customerOrders, setCustomerOrders] = useState([])

  const [error, setError] = useState(defaultError)
  const [loading, setLoading] = useState(defaultLoading)

  const triggerNotification = (type, message) => {
    dispatch({
      type: NotifierTypes.ADD_NOTIFICATION,
      payload: {
        type: type,
        message: message,
      },
    })
  }

  const fetchData = async () => {
    try {
      setError(defaultError)
      setLoading({ ...loading, fetch: true })
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
        balance: truncate(row.balance, 2),
        customer: row.created_for.first_name,
        total_price: truncate(row.total_price, 2),
        installments: `${row.installments} - ${row.payments.length}`,
      }))

      dispatch({
        type: OrderTypes.SET_ORDERS,
        payload: { orders: result },
      })
    } catch (error) {
      setError({ ...error, fetch: error?.data })
      triggerNotification("error", error?.message)
    } finally {
      setLoading({ ...loading, fetch: false })
    }
  }

  const addData = async (body, cb) => {
    try {
      setError(defaultError)
      setLoading({ ...loading, add: { [body.status]: true } })

      const response = await api({
        method: "POST",
        uri: endpoints.orders,
        body: JSON.stringify(body),
      })

      response.data.key = response.data._id
      response.data.type = toTitleCase(response.data.type)
      response.data.stocks_length = response.data.stocks.length
      response.data.customer = response.data.created_for.first_name
      response.data.installments = `${response.data.installments} - ${response.data.payments.length}`

      const result = response.data

      if (body.status === "quotation") {
        dispatch({
          type: QuotationTypes.ADD_QUOTATION,
          payload: { quotation: result },
        })
        triggerNotification("success", "Quotation added successfully.")
      } else {
        dispatch({
          type: OrderTypes.ADD_ORDER,
          payload: { order: result },
        })
        triggerNotification("success", "Order added successfully.")
      }

      cb && cb(response.data)
    } catch (error) {
      setError({ ...error, add: error?.data })
      triggerNotification("error", error?.message)
    } finally {
      setLoading({ ...loading, add: { [body.status]: false } })
    }
  }

  const addPayment = async (body, id, cb) => {
    try {
      setError(defaultError)
      setLoading({ ...loading, addPayment: true })

      const response = await api({
        method: "POST",
        uri: `${endpoints.ordersPayment}/${id}`,
        body: JSON.stringify(body),
      })

      dispatch({
        type: OrderTypes.ADD_PAYMENT,
        payload: {
          order: {
            _id: id,
            value: body.value,
            payments: response.data.payments.length,
            installments: response.data.installments,
          },
        },
      })

      triggerNotification("success", "Payment added successfully.")

      cb && cb()
    } catch (error) {
      setError({ ...error, addPayment: error?.data })
      triggerNotification("error", error?.message)
    } finally {
      setLoading({ ...loading, addPayment: false })
    }
  }

  const addGeneralPayment = async (body, cb) => {
    try {
      setError(defaultError)
      setLoading({ ...loading, addGeneralPayment: true })

      const response = await api({
        method: "POST",
        body: JSON.stringify(body),
        uri: endpoints.ordersGeneralPayment,
      })

      dispatch({
        type: OrderTypes.ADD_GENERAL_PAYMENT,
        payload: { orders: response.data },
      })

      triggerNotification("success", "Payment added successfully.")

      cb && cb()
    } catch (error) {
      setError({ ...error, addGeneralPayment: error?.data })
      triggerNotification("error", error?.message)
    } finally {
      setLoading({ ...loading, addGeneralPayment: false })
    }
  }

  const cancelOrder = async (id) => {
    try {
      setError(defaultError)
      setLoading({ ...loading, cancelOrder: true })

      await api({
        method: "DELETE",
        uri: `${endpoints.orders}/${id}`,
      })

      dispatch({
        type: OrderTypes.CANCEL_ORDER,
        payload: { _id: id },
      })

      triggerNotification("success", "Order cancelled successfully.")

      cb && cb()
    } catch (error) {
      setError({ ...error, cancelOrder: error?.data })
      triggerNotification("error", error?.message)
    } finally {
      setLoading({ ...loading, cancelOrder: false })
    }
  }

  const fetchCustomerOrders = (id, tab) => {
    let orders = []

    if (tab) {
      orders = state.orders.orders.filter((order) => {
        return (
          String(order.created_for._id) === String(id) &&
          (tab === "paid" ? order.paid : !order.paid)
        )
      })
    } else {
      orders = state.orders.orders.filter(
        (order) => String(order.created_for._id) === String(id)
      )
    }

    setCustomerOrders(orders)
  }

  return {
    error,
    headers,
    loading,
    addData,
    fetchData,
    addPayment,
    cancelOrder,
    customerOrders,
    addGeneralPayment,
    fetchCustomerOrders,
  }
}
