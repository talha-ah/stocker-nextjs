export const CustomerInitialState = {
  customers: [],
  customersFetched: false,
}

export const CustomerTypes = {
  ADD_CUSTOMER: "ADD_CUSTOMER",
  EDIT_CUSTOMER: "EDIT_CUSTOMER",
  SET_CUSTOMERS: "SET_CUSTOMERS",
  DELETE_CUSTOMER: "DELETE_CUSTOMER",
}

export const CustomerReducer = (state, action) => {
  switch (action.type) {
    case CustomerTypes.SET_CUSTOMERS:
      return {
        ...state,
        customersFetched: true,
        customers: action.payload.customers,
      }
    case CustomerTypes.ADD_CUSTOMER:
      return {
        ...state,
        customers: [action.payload.customer, ...state.customers],
      }
    case CustomerTypes.EDIT_CUSTOMER:
      const customers = [...state.customers]
      const customerIndex = customers.findIndex(
        (customer) =>
          String(customer._id) === String(action.payload.customer._id)
      )
      customers[customerIndex] = action.payload.customer
      return {
        ...state,
        customers,
      }
    case CustomerTypes.DELETE_CUSTOMER:
      return {
        ...state,
        customers: state.customers.filter(
          (customer) => String(customer._id) !== String(action.payload._id)
        ),
      }
    default:
      return state
  }
}
