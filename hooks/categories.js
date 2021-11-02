import { useState } from "react"

import { api } from "@utils/api"
import { endpoints } from "@utils/constants"
import { useAppContext, CategoriesTypes } from "@contexts/index"

const headers = [
  { key: 1, name: "Name", field: "name" },
  { key: 2, name: "Items", field: "items" },
  { key: 3, name: "Actions", field: "actions" },
]

export const useCategories = () => {
  const [data, setData] = useState([])
  const { state, dispatch } = useAppContext()

  const [addError, setAddError] = useState("")
  const [fetchError, setFetchError] = useState("")

  const [addLoading, setAddLoading] = useState(false)
  const [fetchLoading, setFetchLoading] = useState(true)

  const fetchData = async () => {
    try {
      if (state.categories.categoriesFetched) {
        setData(state.categories.categories)
        return
      }

      const response = await api({
        method: "GET",
        uri: endpoints.categories,
      })

      const result = response.data.map((row) => ({
        _id: row._id,
        key: row._id,
        name: row.name,
        items: row.items,
      }))

      dispatch({
        type: CategoriesTypes.SET_CATEGORIES,
        payload: { categories: result },
      })

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
        uri: endpoints.categories,
        body: JSON.stringify(body),
      })

      const result = { ...response.data, items: 0 }

      dispatch({
        type: CategoriesTypes.ADD_CATEGORY,
        payload: { category: result },
      })

      setData([result, ...data])
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
