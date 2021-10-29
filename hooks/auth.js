import { useState } from "react"
import { useRouter } from "next/router"

import { api } from "@utils/api"
import { endpoints } from "@utils/constants"
import { getBrowserItem } from "@utils/browser-utility"

import { useAuth, Actions } from "../store"

export const useLogin = () => {
  const { dispatch } = useAuth()

  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const doLogin = async ({ email, password }) => {
    try {
      setLoading(true)
      const response = await api({
        method: "POST",
        uri: endpoints.login,
        body: JSON.stringify({
          email,
          password,
        }),
      })

      dispatch({
        type: Actions.SET_AUTH,
        payload: { user: response.user, token: response.token },
      })
      setLoading(false)
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  return { doLogin, loading, error }
}

export const useRegister = () => {
  const router = useRouter()
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const doRegister = async ({ email, password }) => {
    try {
      setLoading(true)
      await api({
        method: "POST",
        uri: endpoints.register,
        body: JSON.stringify({
          email,
          password,
        }),
      })

      setLoading(false)
      router.replace("/")
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  return { doRegister, loading, error }
}

export const useLoadUser = () => {
  const router = useRouter()
  const { dispatch } = useAuth()

  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  const loadUser = async () => {
    try {
      const token = getBrowserItem()

      if (!token) {
        setTimeout(() => {
          setLoading(false)
          return
        }, 5000)
      } else {
        const data = await api({
          uri: Constants.PROFILE,
          token: token,
        })

        dispatch({
          type: actionTypes.SET_AUTH,
          payload: { token: token, user: data.user },
        })

        setLoading(false)
        router.push("/app")
      }
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  return { loadUser, loading, error }
}
