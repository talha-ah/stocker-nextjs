import { useState } from "react"

import { api } from "@utils/api"
import { toTitleCase } from "@utils/common"
import { endpoints } from "@utils/constants"

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
  const [data, setData] = useState([])

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

      setData(result)
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
      response.data.customer = response.data.created_for.first_name
      response.data.stocks_length = response.data.stocks.length

      const result = response.data

      setData([result, ...data])
      cb()
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

      const clonedData = [...data]

      const orderIndex = clonedData.findIndex(
        (order) => String(order._id) === String(id)
      )

      clonedData[
        orderIndex
      ].installments = `${response.data.installments} - ${response.data.payments.length}`
      clonedData[orderIndex].balance =
        clonedData[orderIndex].balance - body.value

      setData(clonedData)
      cb()
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

      const result = data.filter((d) => String(d._id) !== String(id))

      setData(result)
      cb()
    } catch (error) {
      setError({ cancelOrder: error.message })
    } finally {
      setLoading({ cancelOrder: false })
    }
  }

  return {
    data,
    error,
    headers,
    loading,
    addData,
    fetchData,
    addPayment,
    cancelOrder,
  }
}
