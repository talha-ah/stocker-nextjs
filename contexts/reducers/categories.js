export const CategoriesInitialState = {
  categories: [],
  categoriesFetched: false,
}

export const CategoriesTypes = {
  ADD_CATEGORY: "ADD_CATEGORY",
  SET_CATEGORIES: "SET_CATEGORIES",
  UPDATE_CATEGORY: "UPDATE_CATEGORY",
  DELETE_CATEGORY: "DELETE_CATEGORY",
}

export const CategoriesReducer = (state, action) => {
  switch (action.type) {
    case CategoriesTypes.SET_CATEGORIES:
      return {
        ...state,
        categoriesFetched: true,
        categories: action.payload.categories,
      }
    case CategoriesTypes.ADD_CATEGORY:
      return {
        ...state,
        categories: [action.payload.category, ...state.categories],
      }
    case CategoriesTypes.UPDATE_CATEGORY:
      const categories = [...state.categories]
      const categoryIndex = categories.findIndex(
        (category) => String(category._id) === String(action.payload._id)
      )
      categories[categoryIndex] = action.payload.category
      return {
        ...state,
        categories,
      }
    case CategoriesTypes.DELETE_CATEGORY:
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
