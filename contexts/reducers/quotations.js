export const QuotationInitialState = {
  quotations: [],
  quotationsFetched: false,
}

export const QuotationTypes = {
  ADD_QUOTATION: "ADD_QUOTATION",
  SET_QUOTATIONS: "SET_QUOTATIONS",
  REMOVE_QUOTATION: "REMOVE_QUOTATION",
  RESET_QUOTATIONS: "RESET_QUOTATIONS",
  UPDATE_QUOTATION: "UPDATE_QUOTATION",
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
    case QuotationTypes.UPDATE_QUOTATION:
      const quotations = [...state.quotations]
      const quotationIndex = quotations.findIndex(
        (quotation) =>
          String(quotation._id) === String(action.payload.quotation._id)
      )
      quotations[quotationIndex] = action.payload.quotation
      return {
        ...state,
        quotations,
      }
    case QuotationTypes.REMOVE_QUOTATION:
      return {
        ...state,
        quotations: state.quotations.filter(
          (quotation) => String(quotation._id) !== String(action.payload._id)
        ),
      }
    case QuotationTypes.RESET_QUOTATIONS:
      return QuotationInitialState
    default:
      return state
  }
}
