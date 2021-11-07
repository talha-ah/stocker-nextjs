import { useState } from "react"

import { api } from "@utils/api"
import { endpoints } from "@utils/constants"
import { useAppContext, CategoryTypes } from "@contexts/index"

const headers = [
  { key: 1, name: "Name", field: "name", align: "left" },
  { key: 2, name: "Items", field: "items", align: "left" },
  { key: 3, name: "Actions", field: "actions", align: "right" },
]

export const useCategories = () => {
  const { state, dispatch } = useAppContext()

  const [loading, setLoading] = useState({
    fetch: false,
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

  const fetchData = async () => {
    try {
      setLoading({ ...loading, fetch: true })
      if (state.categories.categoriesFetched) return

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
        type: CategoryTypes.SET_CATEGORIES,
        payload: { categories: result },
      })
    } catch (error) {
      setError({ ...error, fetch: error.message })
    } finally {
      setLoading({ ...loading, fetch: false })
    }
  }

  const addData = async (body, cb) => {
    try {
      setLoading({ ...loading, add: true })

      const response = await api({
        method: "POST",
        uri: endpoints.categories,
        body: JSON.stringify(body),
      })

      const result = response.data

      dispatch({
        type: CategoryTypes.ADD_CATEGORY,
        payload: { category: result },
      })

      cb()
    } catch (error) {
      setError({ ...error, add: error.message })
    } finally {
      setLoading({ ...loading, add: false })
    }
  }

  const editData = async (body, _id, cb) => {
    try {
      setLoading({ ...loading, edit: true })

      const response = await api({
        method: "PUT",
        uri: `${endpoints.categories}/${_id}`,
        body: JSON.stringify(body),
      })

      dispatch({
        type: CategoryTypes.EDIT_CATEGORY,
        payload: { category: response.data },
      })

      cb()
    } catch (error) {
      setError({ ...error, edit: error.message })
    } finally {
      setLoading({ ...loading, edit: false })
    }
  }

  const deleteData = async (_id) => {
    try {
      setLoading({ ...loading, delete: true })

      await api({
        method: "DELETE",
        uri: `${endpoints.categories}/${_id}`,
      })

      dispatch({
        type: CategoryTypes.DELETE_CATEGORY,
        payload: { _id },
      })
    } catch (error) {
      setError({ ...error, delete: error.message })
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
