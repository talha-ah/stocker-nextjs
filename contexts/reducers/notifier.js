import { generateId } from "@utils/common"

export const NotifierInitialState = []

export const NotifierTypes = {
  ADD_NOTIFICATION: "ADD_NOTIFICATION",
  REMOVE_NOTIFICATION: "REMOVE_NOTIFICATION",
}

export const NotifierReducer = (state, action) => {
  switch (action.type) {
    case NotifierTypes.ADD_NOTIFICATION:
      const key = generateId()
      action.payload["key"] = key

      return [action.payload, ...state]

    case NotifierTypes.REMOVE_NOTIFICATION:
      return state.filter(
        (notifier) => String(notifier.key) !== String(action.payload.key)
      )

    default:
      return state
  }
}
