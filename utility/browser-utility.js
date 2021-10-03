export class BrowserUtility {
  static get = (key) => {
    const temp = window.localStorage.getItem(key)
    if (temp) {
      return JSON.parse(temp)
    }
    return null
  }

  static save = (key, obj) => {
    window.localStorage.setItem(key, JSON.stringify(obj))
  }

  static remove = (key) => {
    window.localStorage.removeItem(key)
  }

  static removeAll = () => {
    window.localStorage.clear()
  }
}
