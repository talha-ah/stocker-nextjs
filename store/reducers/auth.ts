import { createContext, useContext } from "react"

import * as Actions from "../actions"
import {
  itemKey,
  setBrowserItem,
  removeBrowserItem,
} from "@utils/browser-utility"

export interface AuthStateI {
  user: any
  token: string
  auth: boolean
  loading: boolean
  darkMode: boolean
}

export interface AuthActionI {
  type: string
  payload?: any
}

export const AuthState = {
  user: "",
  token: "",
  auth: false,
  loading: false,
  darkMode: false,
}

export const AuthReducer = (state: AuthStateI, action: AuthActionI) => {
  switch (action.type) {
    case Actions.SET_AUTH:
      if (state.auth) {
        removeBrowserItem()
        return {
          ...state,
          user: "",
          token: "",
          auth: false,
        }
      } else {
        const { token, user } = action.payload
        setBrowserItem(itemKey, token)
        return {
          ...state,
          auth: true,
          user: user,
          token: token,
        }
      }
    case Actions.SET_USER:
      return {
        ...state,
        user: action.payload.user,
      }
    case Actions.SET_LOADING:
      return {
        ...state,
        loading: action.payload.loading,
      }
    case Actions.SET_DARK_MODE:
      return {
        ...state,
        darkMode: !state.darkMode,
      }
    default:
      return state
  }
}

export const AuthContext = createContext(AuthState)

export const useAuth = () => useContext(AuthContext)
