// import UserService from "../utility/services/user"
import React, { createContext, useState, useContext, useEffect } from "react"
import { useRouter } from "next/router"

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const { pathname, events, replace } = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(null)
  const [user, setUser] = useState(null)
  const [isAdmin, setIsAdmin] = useState(false)
  const [loading, setLoading] = useState(true)

  const setData = () => {
    if (window.top === window.self) {
      // setIsAuthenticated(UserService.isAuthenticated())
      // setIsAdmin(UserService.isAdmin())
      // setUser(UserService.getUserInfo())
    }
  }

  useEffect(() => {
    const loadToken = () => {
      setData()
      setLoading(false)
    }
    loadToken()
  }, [])

  useEffect(() => {
    // Check that a new route is OK
    const handleRouteChange = (url) => {
      if (
        url.indexOf("/login") < 0 &&
        (url.indexOf("/shopify/billing") > -1 || url.indexOf("/app") > -1) &&
        !isAuthenticated &&
        !loading
      ) {
        replace("/login")
      }
    }

    // Check that initial route is OK
    if (
      pathname.indexOf("/login") < 0 &&
      (pathname.indexOf("/shopify/billing") > -1 ||
        pathname.indexOf("/app") > -1) &&
      !isAuthenticated &&
      !loading
    ) {
      replace("/login")
    }

    // Monitor routes
    events.on("routeChangeStart", handleRouteChange)
    return () => {
      events.off("routeChangeStart", handleRouteChange)
    }
  }, [isAuthenticated])

  const login = () => {
    setData()
  }

  const logout = () => {
    // UserService.logout()

    setIsAuthenticated(false)
    setIsAdmin(false)
  }

  return (
    <AuthContext.Provider
      value={{ loading, user, isAuthenticated, isAdmin, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)

export const ProtectRoute = (Component) => () => {
  const { isAuthenticated, loading } = useAuth()
  if (loading || (!isAuthenticated && window.location.pathname !== "/")) {
    return null
  }
  return <Component />
}
