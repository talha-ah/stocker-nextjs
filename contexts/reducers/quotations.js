export const QuotationInitialState = {
  quotations: [],
  quotationsFetched: false,
}

export const QuotationTypes = {
  ADD_QUOTATION: "ADD_QUOTATION",
  SET_QUOTATIONS: "SET_QUOTATIONS",
}

export const QuotationReducer = (state, action) => {
  switch (action.type) {
    case QuotationTypes.SET_QUOTATIONS:
      return {
        ...state,
        quotationsFetched: true,
        quotations: action.payload.quotations,
      }
    case QuotationTypes.ADD_QUOTATION:
      return {
        ...state,
        quotations: [action.payload.quotation, ...state.quotations],
      }
    default:
      return state
  }
}
