export const StockInitialState = {
  stocks: [],
  stocksFetched: false,
}

export const StockTypes = {
  ADD_STOCK: "ADD_STOCK",
  EDIT_STOCK: "EDIT_STOCK",
  SET_STOCKS: "SET_STOCKS",
  DELETE_STOCK: "DELETE_STOCK",
}

export const StockReducer = (state, action) => {
  switch (action.type) {
    case StockTypes.SET_STOCKS:
      return {
        ...state,
        stocksFetched: true,
        stocks: action.payload.stocks,
      }
    case StockTypes.ADD_STOCK:
      return {
        ...state,
        stocks: [action.payload.stock, ...state.stocks],
      }
    case StockTypes.EDIT_STOCK:
      const stocks = [...state.stocks]
      const stockIndex = stocks.findIndex(
        (stock) => String(stock._id) === String(action.payload.stock._id)
      )
      stocks[stockIndex] = action.payload.stock
      return {
        ...state,
        stocks,
      }
    case StockTypes.DELETE_STOCK:
      return {
        ...state,
        stocks: state.stocks.filter(
          (stock) => String(stock._id) !== String(action.payload._id)
        ),
      }
    default:
      return state
  }
}
