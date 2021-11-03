import { useState } from "react"

import { api } from "@utils/api"
import { endpoints } from "@utils/constants"

const headers = [
  { key: 1, name: "Customer", field: "customer" },
  { key: 2, name: "Display ID", field: "display_id" },
  { key: 3, name: "type", field: "type" },
  { key: 4, name: "Price", field: "total_price" },
  { key: 5, name: "Stocks", field: "stocks_length" },
  { key: 6, name: "Installments", field: "installments" },
  { key: 8, name: "Actions", field: "actions" },
]

export const useOrders = () => {
  const [data, setData] = useState([])

  const [addError, setAddError] = useState("")
  const [fetchError, setFetchError] = useState("")

  const [addLoading, setAddLoading] = useState(false)
  const [fetchLoading, setFetchLoading] = useState(true)

  const fetchData = async () => {
    try {
      const response = await api({
        method: "GET",
        uri: endpoints.orders,
      })

      const result = response.data.map((row) => ({
        key: row._id,
        _id: row._id,
        customer: row.created_for.first_name,
        display_id: row.display_id,
        type: row.type,
        total_price: row.total_price,
        stocks_length: row.stocks.length,
        installments: row.installments,
      }))

      setData(result)
    } catch (error) {
      setFetchError(error.message)
    } finally {
      setFetchLoading(false)
    }
  }

  const addData = async (body, cb) => {
    try {
      setAddLoading(true)

      const response = await api({
        method: "POST",
        uri: endpoints.customers,
        body: JSON.stringify(body),
      })

      const result = response.data
      // result.key = result._id
      // result.name = result.first_name
      // result.balance = result.balance.value

      // setData([result, ...data])
      cb()
    } catch (error) {
      setAddError(error.message)
    } finally {
      setAddLoading(false)
    }
  }

  return {
    data,
    addData,
    headers,
    addError,
    fetchData,
    fetchError,
    addLoading,
    fetchLoading,
  }
}
