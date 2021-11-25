import { useContext, createContext, useReducer } from "react"

import { AuthInitialState, AuthReducer, AuthTypes } from "./reducers/auth"
import { StockTypes, StockReducer, StockInitialState } from "./reducers/stocks"
import { OrderTypes, OrderReducer, OrderInitialState } from "./reducers/orders"
import {
  NotifierTypes,
  NotifierReducer,
  NotifierInitialState,
} from "./reducers/notifier"
import {
  QuotationTypes,
  QuotationReducer,
  QuotationInitialState,
} from "./reducers/quotations"
import {
  CategoryTypes,
  CategoryReducer,
  CategoryInitialState,
} from "./reducers/categories"
import {
  CustomerTypes,
  CustomerReducer,
  CustomerInitialState,
} from "./reducers/customers"

const combineReducers = (slices) => (prevState, action) =>
  Object.keys(slices).reduce(
    (nextState, nextProp) => ({
      ...nextState,
      [nextProp]: slices[nextProp](prevState[nextProp], action),
    }),
    prevState
  )

const AppReducer = combineReducers({
  auth: AuthReducer,
  orders: OrderReducer,
  stocks: StockReducer,
  customers: CustomerReducer,
  categories: CategoryReducer,
  quotations: QuotationReducer,
  notifications: NotifierReducer,
})

const AppInitialState = {
  auth: AuthInitialState,
  orders: OrderInitialState,
  stocks: StockInitialState,
  customers: CustomerInitialState,
  categories: CategoryInitialState,
  quotations: QuotationInitialState,
  notifications: NotifierInitialState,
}

export const AppContext = createContext({
  state: AppInitialState,
  dispatch: (arg1) => undefined,
  notify: (arg1, arg2) => undefined,
})

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, AppInitialState)

  const notify = (type, message) => {
    dispatch({
      type: NotifierTypes.ADD_NOTIFICATION,
      payload: {
        type: type,
        message: message,
      },
    })
  }

  return (
    <AppContext.Provider value={{ state, dispatch, notify }}>
      {children}
    </AppContext.Provider>
  )
}

export {
  AuthTypes,
  StockTypes,
  OrderTypes,
  NotifierTypes,
  CategoryTypes,
  CustomerTypes,
  QuotationTypes,
}

export const useAppContext = () => useContext(AppContext)
