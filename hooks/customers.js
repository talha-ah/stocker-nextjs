import { useState } from "react"

import { api } from "@utils/api"
import { endpoints } from "@utils/constants"

export const useAddCustomer = () => {
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const addCustomer = async (body) => {
    try {
      setLoading(true)
      const response = await api({
        method: "POST",
        uri: endpoints.customers,
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

  return { addCustomer, data, loading, error }
}
