import { useState } from "react"

import { api } from "@utils/api"
import { endpoints } from "@utils/constants"

import { useAppContext, CategoriesTypes } from "@contexts/index"

const headers = [
  { key: 1, name: "Name", field: "name", align: "left" },
  { key: 2, name: "Items", field: "items", align: "left" },
  { key: 3, name: "Actions", field: "actions", align: "right" },
]

export const useCategories = () => {
  const [data, setData] = useState([])
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
        type: CategoriesTypes.ADD_CATEGORY,
        payload: { category: result },
      })

      setData([result, ...data])
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
        type: CategoriesTypes.EDIT_CATEGORY,
        payload: { category: response.data },
      })

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
        uri: `${endpoints.categories}/${id}`,
      })

      dispatch({
        type: CategoriesTypes.DELETE_CATEGORY,
        payload: { _id: id },
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
