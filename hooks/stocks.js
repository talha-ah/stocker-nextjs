import { useState, useEffect } from "react"

import { api } from "@utils/api"
import { endpoints } from "@utils/constants"
import { useAppContext } from "@contexts/index"

const headers = [
  { key: 1, name: "Sr.", field: "sr", align: "left", width: "10px" },
  {
    key: 2,
    name: "Description",
    field: "description",
    align: "left",
    width: "auto",
  },
  { key: 3, name: "Code", field: "code", align: "left", width: "100px" },
  {
    key: 4,
    name: "Cost Price",
    field: "cost_price",
    align: "left",
    width: "100px",
  },
  {
    key: 5,
    name: "Sale Price",
    field: "sale_price",
    align: "left",
    width: "100px",
  },
  {
    key: 6,
    name: "Inventory",
    field: "inventory",
    align: "left",
    width: "100px",
  },
  {
    key: 7,
    name: "Category",
    field: "category",
    align: "left",
    width: "auto",
  },
  {
    key: 8,
    name: "Location",
    field: "location",
    align: "left",
    width: "auto",
  },
  { key: 9, name: "Actions", field: "actions", align: "right", width: "100px" },
]

export const useStocks = () => {
  const { state } = useAppContext()
  const [data, setData] = useState([])

  const [loading, setLoading] = useState({
    fetch: true,
    add: false,
    edit: false,
    delete: false,
  })

  const [error, setError] = useState({
    fetch: null,
    add: null,
    edit: null,
    delete: null,
  })

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
        category_id: row.category._id,
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
      setLoading({ add: true })

      const response = await api({
        method: "POST",
        uri: endpoints.stocks,
        body: JSON.stringify(body),
      })

      const category = state.categories.categories.find(
        (category) => String(category._id) === String(body.category)
      )

      response.data.key = response.data._id
      response.data.category = category.name
      response.data.category_id = category._id

      let result = [response.data, ...data]

      setData(result)
      cb()
    } catch (error) {
      setError({ add: error.message })
    } finally {
      setLoading({ add: false })
    }
  }

  const editData = async (body, id, cb) => {
    try {
      setLoading({ edit: true })

      const response = await api({
        method: "PUT",
        uri: `${endpoints.stocks}/${id}`,
        body: JSON.stringify(body),
      })

      const category = state.categories.categories.find(
        (category) => String(category._id) === String(body.category)
      )

      response.data.key = response.data._id
      response.data.category = category.name
      response.data.category_id = category._id

      const result = [...data]
      const dIndex = result.findIndex(
        (d) => String(d._id) === String(response.data._id)
      )
      result[dIndex] = response.data

      setData(result)
      cb()
    } catch (error) {
      setError({ edit: error.message })
    } finally {
      setLoading({ edit: false })
    }
  }

  const deleteData = async (id) => {
    try {
      setLoading({ delete: true })

      await api({
        method: "DELETE",
        uri: `${endpoints.stocks}/${id}`,
      })

      const result = data.filter((d) => String(d._id) !== String(id))

      setData(result)
    } catch (error) {
      setError({ delete: error.message })
    } finally {
      setLoading({ delete: false })
    }
  }

  return {
    data,
    error,
    headers,
    loading,
    addData,
    editData,
    fetchData,
    deleteData,
  }
}

export const useSearchStock = (text) => {
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
