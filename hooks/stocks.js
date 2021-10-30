import { useState } from "react"

import { api } from "@utils/api"
import { endpoints } from "@utils/constants"

export const useAddStock = () => {
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const addStock = async (body) => {
    try {
      setLoading(true)
      const response = await api({
        method: "POST",
        uri: endpoints.stocks,
        body: JSON.stringify(body),
      })

      setData(response)
      setLoading(false)
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  return { addStock, data, loading, error }
}
