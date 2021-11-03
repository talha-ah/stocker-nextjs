import { useState, useEffect } from "react"

import { api } from "@utils/api"
import { endpoints } from "@utils/constants"
import { useAppContext } from "@contexts/index"

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
  const { state } = useAppContext()
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
        sr: row.sr,
        _id: row._id,
        key: row._id,
        code: row.code,
        location: row.location,
        inventory: row.inventory,
        cost_price: row.cost_price,
        sale_price: row.sale_price,
        category: row.category.name,
        description: row.description,
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
        uri: endpoints.stocks,
        body: JSON.stringify(body),
      })

      const category = state.categories.categories.find(
        (category) => String(category._id) === String(body.category)
      )

      let result = [
        ...data,
        {
          ...response.data,
          key: response.data._id,
          category: category.name,
        },
      ]

      setData(result)
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

export const useSearchStock = (text, filterArray) => {
  const [stocks, setStocks] = useState([])
  const [stocksError, setStocksError] = useState("")
  const [stocksLoading, setStocksLoading] = useState(false)

  const fetchStocks = async () => {
    try {
      setStocksLoading(true)

      const response = await api({
        method: "GET",
        uri: `${endpoints.stocks}?search=${text}`,
      })

      const result = response.data.map((stock) => ({
        ...stock,
        value: stock._id,
        label: stock.description,
      }))

      setStocks(result)
    } catch (error) {
      setStocksError(error.message)
    } finally {
      setStocksLoading(false)
    }
  }

  useEffect(() => {
    text ? fetchStocks() : setStocks([])
    // eslint-disable-next-line
  }, [text])

  return { stocks, stocksError, stocksLoading }
}
