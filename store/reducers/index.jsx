import React, { useReducer } from "react"

import { useAuth, AuthState, AuthReducer, AuthContext } from "./auth"

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, AuthState)

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  )
}

export { useAuth, AuthProvider }
