import { useContext, createContext, useReducer } from "react"

import { AuthInitialState, AuthReducer, AuthTypes } from "./reducers/auth"

export const AppContext = createContext({
  state: AuthInitialState,
  dispatch: () => undefined,
})

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, AuthInitialState)

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  )
}

export { AuthTypes }

export const useAppContext = () => useContext(AppContext)
