export const CategoryInitialState = {
  categories: [],
  categoriesFetched: false,
}

export const CategoryTypes = {
  ADD_CATEGORY: "ADD_CATEGORY",
  EDIT_CATEGORY: "EDIT_CATEGORY",
  SET_CATEGORIES: "SET_CATEGORIES",
  DELETE_CATEGORY: "DELETE_CATEGORY",
}

export const CategoryReducer = (state, action) => {
  switch (action.type) {
    case CategoryTypes.SET_CATEGORIES:
      return {
        ...state,
        categoriesFetched: true,
        categories: action.payload.categories,
      }
    case CategoryTypes.ADD_CATEGORY:
      return {
        ...state,
        categories: [action.payload.category, ...state.categories],
      }
    case CategoryTypes.EDIT_CATEGORY:
      const categories = [...state.categories]
      const categoryIndex = categories.findIndex(
        (category) =>
          String(category._id) === String(action.payload.category._id)
      )
      categories[categoryIndex] = action.payload.category
      return {
        ...state,
        categories,
      }
    case CategoryTypes.DELETE_CATEGORY:
      return {
        ...state,
        categories: state.categories.filter(
          (category) => String(category._id) !== String(action.payload._id)
        ),
      }
    default:
      return state
  }
}
