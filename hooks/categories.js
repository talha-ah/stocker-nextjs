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

  const fetchData = async () => {
    try {
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
        uri: `${endpoints.categories}/${id}`,
        body: JSON.stringify(body),
      })

      dispatch({
        type: CategoryTypes.EDIT_CATEGORY,
        payload: { category: response.data },
      })

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
        uri: `${endpoints.categories}/${id}`,
      })

      dispatch({
        type: CategoryTypes.DELETE_CATEGORY,
        payload: { _id: id },
      })
    } catch (error) {
      setError({ delete: error.message })
    } finally {
      setLoading({ delete: false })
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
