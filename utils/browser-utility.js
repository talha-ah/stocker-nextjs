export const itemKey = "stocker"

export const setBrowserItem = (key = itemKey, value) => {
  window.localStorage.setItem(key, value)
}

export const getBrowserItem = (key = itemKey) => {
  return window.localStorage.getItem(key)
}

export const saveBrowserObj = (key = itemKey, obj) => {
  window.localStorage.setItem(key, JSON.stringify(obj))
}

export const getBrowserObj = (key = itemKey) => {
  const temp = window.localStorage.getItem(key)
  if (temp) {
    return JSON.parse(temp)
  }
  return null
}

export const removeBrowserItem = (key = itemKey) => {
  window.localStorage.removeItem(key)
}

export const removeBrowserAll = () => {
  window.localStorage.clear()
}
