import { useState } from "react"

import api from "@utility/api"
import { endpoints } from "@utility/constants"

export const useLogin = () => {
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const doLogin = async ({ email, password }) => {
    try {
      setLoading(true)
      const user = await api({
        method: "POST",
        url: endpoints.login,
        body: JSON.stringify({
          email,
          password,
        }),
      })

      setData(user)
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  return { data, doLogin, loading, error }
}
