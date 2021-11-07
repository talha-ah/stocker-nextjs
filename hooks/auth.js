import { useRouter } from "next/router"
import { useState, useEffect } from "react"

import { api } from "@utils/api"
import { endpoints } from "@utils/constants"
import { getBrowserItem } from "@utils/browser-utility"

import { useStocks } from "@hooks/stocks"
import { useOrders } from "@hooks/orders"
import { useCustomers } from "@hooks/customers"
import { useCategories } from "@hooks/categories"
import { useAppContext, AuthTypes } from "@contexts/index"

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
      setLoading(false)
    } finally {
    }
  }

  return { doLogin, loading, error }
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

export const AuthWrapper = ({ children }) => {
  const router = useRouter()
  const { dispatch } = useAppContext()
  const { fetchData: fetchStocks } = useStocks()
  const { fetchData: fetchOrders } = useOrders()
  const { fetchData: fetchCustomers } = useCustomers()
  const { fetchData: fetchCategories } = useCategories()

  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  const checkAuth = async () => {
    try {
      const token = getBrowserItem()
      if (!token) {
        if (router.asPath.startsWith("/app")) {
          router.replace("/")
        } else {
          router.replace(router.asPath)
        }
        return
      }

      const response = await api({
        uri: endpoints.profile,
      })
      await fetchCategories()
      await fetchCustomers()
      await fetchOrders()
      await fetchStocks()

      dispatch({
        type: AuthTypes.LOGIN,
        payload: { token: token, user: response.data },
      })

      if (router.asPath.startsWith("/app")) {
        router.replace(router.asPath)
      } else {
        router.replace("/app")
      }
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    checkAuth()
    // eslint-disable-next-line
  }, [])

  if (loading) return <div>Loading...</div>

  return children
}
