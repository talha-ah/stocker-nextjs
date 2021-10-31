import { useState, useEffect } from "react"

import { api } from "@utils/api"
import { endpoints } from "@utils/constants"

const headers = [
  { key: 1, name: "Sr.", field: "sr" },
  { key: 2, name: "Description", field: "description" },
  { key: 3, name: "Cost Price", field: "cost_price" },
  { key: 4, name: "Sale Price", field: "sale_price" },
  { key: 5, name: "Inventory", field: "inventory" },
  { key: 6, name: "Location", field: "location" },
  { key: 7, name: "Code", field: "code" },
  { key: 8, name: "Category", field: "category" },
  { key: 9, name: "Actions", field: "actions" },
]

export const useStocks = () => {
  const [data, setData] = useState([])

  const [addError, setAddError] = useState("")
  const [fetchError, setFetchError] = useState("")

  const [addLoading, setAddLoading] = useState(false)
  const [fetchLoading, setFetchLoading] = useState(true)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const response = await api({
        method: "GET",
        uri: endpoints.stocks,
      })

      const result = response.data.map((row, ind) => ({
        sr: ind + 1,
        key: row._id,
        description: row.description,
        cost_price: row.cost_price,
        sale_price: row.sale_price,
        inventory: row.inventory,
        location: row.location,
        code: row.code,
        category: row.category.name,
      }))

      setData(result)
    } catch (error) {
      setFetchError(error.message)
    } finally {
      setFetchLoading(false)
    }
  }

  const addData = async (body) => {
    try {
      setAddLoading(true)
      const response = await api({
        method: "POST",
        uri: endpoints.stocks,
        body: JSON.stringify(body),
      })

      setData(response)
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
