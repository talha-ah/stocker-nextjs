import { useState } from "react"

import { api } from "@utils/api"
import { endpoints } from "@utils/constants"

export const useAddOrder = () => {
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const addOrder = async (body) => {
    try {
      setLoading(true)
      const response = await api({
        method: "POST",
        uri: endpoints.orders,
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

  return { addOrder, data, loading, error }
}
