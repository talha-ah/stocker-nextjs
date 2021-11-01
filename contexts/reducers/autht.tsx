import { createContext, Dispatch, useReducer, useContext } from "react"

import {
  itemKey,
  setBrowserItem,
  removeBrowserItem,
} from "@utils/browser-utility"

export enum AuthTypes {
  LOGIN = "LOGIN",
  LOGOUT = "LOGOUT",
  SET_USER = "SET_USER",
  SET_LOADING = "SET_LOADING",
  SET_DARK_MODE = "SET_DARK_MODE",
}

export type AuthInitialStateType = {
  user: any
  token: string
  auth: boolean
  darkMode: boolean
}

export type AuthActions =
  | {
      type: AuthTypes.LOGIN
      payload: {
        user: any
        token: string
      }
    }
  | {
      type: AuthTypes.LOGOUT
      payload: {
        auth?: boolean | undefined
      }
    }
  | {
      type: AuthTypes.SET_USER
      payload: {
        user: any
      }
    }
  | {
      type: AuthTypes.SET_DARK_MODE
      payload: {
        darkMode: boolean
      }
    }

export const AuthReducer = (
  state: AuthInitialStateType,
  action: AuthActions
) => {
  switch (action.type) {
    case AuthTypes.LOGIN:
      const { token, user } = action.payload
      setBrowserItem(itemKey, token)
      return {
        ...state,
        auth: true,
        user: user,
        token: token,
      }
    case AuthTypes.LOGOUT:
      removeBrowserItem()
      return {
        ...state,
        user: "",
        token: "",
        auth: false,
      }
    case AuthTypes.SET_USER:
      return {
        ...state,
        user: action.payload.user,
      }
    case AuthTypes.SET_DARK_MODE:
      return {
        ...state,
        darkMode: !action.payload.darkMode,
      }
    default:
      return state
  }
}

export const AuthInitialState = {
  user: "",
  token: "",
  auth: false,
  darkMode: false,
}

type AppInitialStateType = {
  auth: AuthInitialStateType
}

const initialState = {
  auth: AuthInitialState,
}

export const AppContext = createContext<{
  state: AppInitialStateType
  dispatch: Dispatch<AuthActions>
}>({
  state: initialState,
  dispatch: () => null,
})

const mainReducer = ({ auth }: AppInitialStateType, action: AuthActions) => ({
  products: AuthReducer(auth, action),
})

export const AuthProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(mainReducer, initialState)

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  )
}

// export const AuthState = () => useContext(AuthContext)
