import { useState, useEffect } from "react"

import { useAPI } from "@utils/api"
import { endpoints } from "@utils/constants"
import { useAppContext, StockTypes, NotifierTypes } from "@contexts/index"

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

const defaultLoading = {
  fetch: false,
  add: false,
  edit: false,
  delete: false,
}

const defaultError = {
  fetch: null,
  add: null,
  edit: null,
  delete: null,
}

export const useStocks = () => {
  const { api } = useAPI()
  const { state, dispatch } = useAppContext()

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
      if (state.stocks.stocksFetched) return

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

      dispatch({
        type: StockTypes.SET_STOCKS,
        payload: { stocks: result },
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
      setLoading({ ...loading, add: true })

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

      dispatch({
        type: StockTypes.ADD_STOCK,
        payload: { stock: response.data },
      })

      triggerNotification("success", "Stock added successfully.")

      cb && cb()
    } catch (error) {
      setError({ ...error, add: error?.data })
      triggerNotification("error", error?.message)
    } finally {
      setLoading({ ...loading, add: false })
    }
  }

  const editData = async (body, id, cb) => {
    try {
      setError(defaultError)
      setLoading({ ...loading, edit: true })

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

      dispatch({
        type: StockTypes.EDIT_STOCK,
        payload: { stock: response.data },
      })

      triggerNotification("success", "Stock updated successfully.")

      cb && cb()
    } catch (error) {
      setError({ ...error, edit: error?.data })
      triggerNotification("error", error?.message)
    } finally {
      setLoading({ ...loading, edit: false })
    }
  }

  const deleteData = async (id, cb) => {
    try {
      setError(defaultError)
      setLoading({ ...loading, delete: true })

      await api({
        method: "DELETE",
        uri: `${endpoints.stocks}/${id}`,
      })

      dispatch({
        type: StockTypes.DELETE_STOCK,
        payload: { _id: id },
      })

      triggerNotification("success", "Stock deleted successfully.")

      cb && cb()
    } catch (error) {
      setError({ ...error, delete: error?.data })
      triggerNotification("error", error?.message)
    } finally {
      setLoading({ ...loading, delete: false })
    }
  }

  return {
    error,
    headers,
    loading,
    addData,
    editData,
    fetchData,
    deleteData,
  }
}

export const useSearchStock = (query) => {
  const { state } = useAppContext()
  const [stocks, setStocks] = useState([])

  const fetchStocks = async () => {
    let searched = state.stocks.stocks

    searched = searched.filter(
      (stock) =>
        stock.description.toLowerCase().indexOf(query.toLowerCase()) > -1 ||
        stock.code.toLowerCase().indexOf(query.toLowerCase()) > -1
    )

    const result = searched.map((stock) => ({
      ...stock,
      value: stock._id,
      label: stock.description,
    }))

    setStocks(result)
  }

  useEffect(() => {
    query ? fetchStocks() : setStocks([])
    // eslint-disable-next-line
  }, [query])

  return { stocks }
}
