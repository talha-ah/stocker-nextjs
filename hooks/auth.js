import { useState } from "react"

import api from "@utils/api"
import { endpoints } from "@utils/constants"

import { useAuth, Actions } from "../store"

export const useLogin = () => {
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const { state, dispatch } = useAuth()

  const doLogin = async ({ email, password }) => {
    try {
      setLoading(true)
      const user = await api({
        method: "POST",
        uri: endpoints.login,
        body: JSON.stringify({
          email,
          password,
        }),
      })

      setData(user)
      dispatch({ type: Actions.SET_AUTH })
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  return { data, doLogin, loading, error }
}
