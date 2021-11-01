import { useState } from "react"
import { useRouter } from "next/router"

import { api } from "@utils/api"
import { endpoints } from "@utils/constants"
import { getBrowserItem } from "@utils/browser-utility"

import { useAppContext, AuthTypes } from "@contexts/index"

export const useLogin = () => {
  const router = useRouter()
  const { dispatch } = useAppContext()

  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const doLogin = async (body) => {
    try {
      setLoading(true)
      const response = await api({
        method: "POST",
        uri: endpoints.login,
        body: JSON.stringify(body),
      })

      dispatch({
        type: AuthTypes.LOGIN,
        payload: { user: response.user, token: response.data.token },
      })
      router.push("/app")
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

  const doRegister = async (body) => {
    try {
      setLoading(true)
      await api({
        method: "POST",
        uri: endpoints.register,
        body: JSON.stringify(body),
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

export const useCheckUser = () => {
  const router = useRouter()
  const { dispatch } = useAppContext()

  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  const loadUser = async () => {
    try {
      const token = getBrowserItem()
      if (!token) return

      const response = await api({
        uri: endpoints.profile,
      })

      dispatch({
        type: AuthTypes.LOGIN,
        payload: { token: token, user: response.data },
      })

      router.push("/app")
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  return { loadUser, loading, error }
}

export const useLogout = () => {
  const router = useRouter()
  const { dispatch } = useAppContext()

  const doLogout = async () => {
    dispatch({ type: AuthTypes.LOGOUT })
    router.push("/")
  }

  return { doLogout }
}
