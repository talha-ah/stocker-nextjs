import { useContext, createContext, useReducer } from "react"

import { AuthInitialState, AuthReducer, AuthTypes } from "./reducers/auth"
import {
  CategoriesTypes,
  CategoriesReducer,
  CategoriesInitialState,
} from "./reducers/categories"

// combine reducers ala Redux: each can handle its own slice
const combineReducers = (slices) => (prevState, action) =>
  // I like to use array.reduce, you can also just write a for..in loop
  Object.keys(slices).reduce(
    (nextState, nextProp) => ({
      ...nextState,
      [nextProp]: slices[nextProp](prevState[nextProp], action),
    }),
    prevState
  )

const AppReducer = combineReducers({
  auth: AuthReducer,
  categories: CategoriesReducer,
})

const AppInitialState = {
  auth: AuthInitialState,
  categories: CategoriesInitialState,
}

export const AppContext = createContext({
  state: AppInitialState,
  dispatch: () => undefined,
})

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, AppInitialState)

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  )
}

export { AuthTypes, CategoriesTypes }

export const useAppContext = () => useContext(AppContext)
