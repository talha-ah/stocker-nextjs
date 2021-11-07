export const OrderInitialState = {
  orders: [],
  ordersFetched: false,
}

export const OrderTypes = {
  ADD_ORDER: "ADD_ORDER",
  SET_ORDERS: "SET_ORDERS",
  ADD_PAYMENT: "ADD_PAYMENT",
  CANCEL_ORDER: "CANCEL_ORDER",
  UPDATE_STATUS: "UPDATE_STATUS",
}

export const OrderReducer = (state, action) => {
  switch (action.type) {
    case OrderTypes.SET_ORDERS:
      return {
        ...state,
        ordersFetched: true,
        orders: action.payload.orders,
      }
    case OrderTypes.ADD_ORDER:
      return {
        ...state,
        orders: [action.payload.order, ...state.orders],
      }
    case OrderTypes.ADD_PAYMENT:
      const orders = [...state.orders]
      const orderIndex = orders.findIndex(
        (order) => String(order._id) === String(action.payload.order._id)
      )
      orders[
        orderIndex
      ].installments = `${action.payload.order.installments} - ${action.payload.order.payments}`
      orders[orderIndex].balance =
        orders[orderIndex].balance - action.payload.order.value

      return {
        ...state,
        orders,
      }
    case OrderTypes.UPDATE_STATUS:
      const cloned = [...state.orders]
      const clonedIndex = cloned.findIndex(
        (clone) => String(clone._id) === String(action.payload._id)
      )
      cloned[clonedIndex].status = action.payload.status

      return {
        ...state,
        orders: cloned,
      }
    case OrderTypes.CANCEL_ORDER:
      return {
        ...state,
        orders: state.orders.filter(
          (order) => String(order._id) !== String(action.payload._id)
        ),
      }
    default:
      return state
  }
}
