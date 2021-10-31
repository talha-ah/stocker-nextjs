import { useState, useEffect } from "react"

import { api } from "@utils/api"
import { endpoints } from "@utils/constants"

const headers = [
  { key: 1, name: "Name", field: "name" },
  { key: 2, name: "Items", field: "items" },
  { key: 3, name: "Actions", field: "actions" },
]

export const useCategories = () => {
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
        uri: endpoints.categories,
      })

      const result = response.data.map((row) => ({
        key: row._id,
        name: row.name,
        items: row.items,
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
        uri: endpoints.categories,
        body: JSON.stringify(body),
      })

      setData([{ ...response.data, items: 0 }, ...data])
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
