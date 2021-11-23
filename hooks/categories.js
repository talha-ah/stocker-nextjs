import { useState } from "react"

import { useAPI } from "@utils/api"
import { endpoints } from "@utils/constants"
import { useAppContext, CategoryTypes } from "@contexts/index"

const headers = [
  { key: 1, name: "Name", field: "name", align: "left" },
  { key: 2, name: "Items", field: "items", align: "left" },
  { key: 3, name: "Actions", field: "actions", align: "right" },
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

export const useCategories = () => {
  const { api } = useAPI()
  const { state, dispatch, notify } = useAppContext()

  const [error, setError] = useState(defaultError)
  const [loading, setLoading] = useState(defaultLoading)

  const fetchData = async () => {
    try {
      setError(defaultError)
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
      setError({ ...error, fetch: error?.data })
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
        uri: endpoints.categories,
        body: JSON.stringify(body),
      })

      response.data.items = 0
      const result = response.data

      dispatch({
        type: CategoryTypes.ADD_CATEGORY,
        payload: { category: result },
      })

      notify("success", "Category added successfully.")

      cb && cb()
    } catch (error) {
      setError({ ...error, add: error?.data })
      notify("error", error?.message)
    } finally {
      setLoading({ ...loading, add: false })
    }
  }

  const editData = async (body, _id, cb) => {
    try {
      setError(defaultError)
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

      notify("success", "Category updated successfully.")

      cb && cb()
    } catch (error) {
      setError({ ...error, edit: error?.data })
      notify("error", error?.message)
    } finally {
      setLoading({ ...loading, edit: false })
    }
  }

  const deleteData = async (_id, cb) => {
    try {
      setError(defaultError)
      setLoading({ ...loading, delete: true })

      await api({
        method: "DELETE",
        uri: `${endpoints.categories}/${_id}`,
      })

      dispatch({
        type: CategoryTypes.DELETE_CATEGORY,
        payload: { _id },
      })

      notify("success", "Category deleted successfully.")

      cb && cb()
    } catch (error) {
      setError({ ...error, delete: error?.data })
      notify("error", error?.message)
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
