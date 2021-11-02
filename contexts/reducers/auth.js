import {
  itemKey,
  setBrowserItem,
  removeBrowserItem,
} from "@utils/browser-utility"

export const AuthInitialState = {
  user: "",
  token: "",
  auth: false,
  darkMode: false,
}

export const AuthTypes = {
  LOGIN: "LOGIN",
  LOGOUT: "LOGOUT",
  SET_USER: "SET_USER",
  SET_DARK_MODE: "SET_DARK_MODE",
}

export const AuthReducer = (state, action) => {
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
        darkMode: !state.darkMode,
      }
    default:
      return state
  }
}
