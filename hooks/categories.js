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

  const [fetchError, setFetchError] = useState("")
  const [fetchLoading, setFetchLoading] = useState(true)

  const [addError, setAddError] = useState("")
  const [addLoading, setAddLoading] = useState(false)

  const [editError, setEditError] = useState(null)
  const [editLoading, setEditLoading] = useState(false)

  const [deleteError, setDeleteError] = useState(null)
  const [deleteLoading, setDeleteLoading] = useState(false)

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

  const editData = async (body, id, cb) => {
    try {
      setEditLoading(true)

      const response = await api({
        method: "PUT",
        uri: `${endpoints.categories}/${id}`,
        body: JSON.stringify(body),
      })

      dispatch({
        type: CategoriesTypes.EDIT_CATEGORY,
        payload: { category: response.data },
      })

      const categories = [...data]
      const categoryIndex = categories.findIndex(
        (category) => String(category._id) === String(response.data._id)
      )
      categories[categoryIndex] = response.data

      console.log("updated categories", categories)

      setData(categories)
      cb()
    } catch (error) {
      setEditError(error.message)
    } finally {
      setEditLoading(false)
    }
  }

  const deleteData = async (id) => {
    try {
      setDeleteLoading(true)

      await api({
        method: "DELETE",
        uri: `${endpoints.categories}/${id}`,
      })

      dispatch({
        type: CategoriesTypes.DELETE_CATEGORY,
        payload: { _id: id },
      })

      const result = data.filter(
        (category) => String(category._id) !== String(id)
      )

      setData(result)
    } catch (error) {
      setDeleteError(error.message)
    } finally {
      setDeleteLoading(false)
    }
  }

  return {
    data,
    addData,
    headers,
    editData,
    addError,
    editError,
    fetchData,
    fetchError,
    deleteData,
    addLoading,
    editLoading,
    deleteError,
    fetchLoading,
    deleteLoading,
  }
}
