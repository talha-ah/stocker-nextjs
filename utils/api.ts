import DateUtility from "./date"
import { getBrowserItem, removeBrowserItem } from "./browser-utility"

export const useAPI = () => {
  const api = ({
    method = "GET",
    uri,
    body,
    headers,
  }: {
    method?: string
    uri: string
    body?: any
    headers?: any
  }) =>
    new Promise(async (resolve, reject) => {
      try {
        const token = getBrowserItem()

        const myHeaders = new Headers()
        myHeaders.append("Content-Type", "application/json")
        token && myHeaders.append("Authorization", `Bearer ${token}`)

        const response = await fetch(uri, {
          method,
          headers: headers || myHeaders,
          body,
        })

        if (!response.ok) throw response
        let data = await response.json()
        if (process && process.env.NODE_ENV === "development") {
          console.log(`[API Data at ${DateUtility.getLocaleDate()}]:`, data)
        }

        resolve(data)
      } catch (err: any) {
        if (err.status) {
          if (err.status === 403) removeBrowserItem()

          if (err.statusText === "Not Found") reject(err)

          const error = await err.json()
          console.log(`[API Error at ${DateUtility.getLocaleDate()}]:`, error)
          console.log(`Error for Body`, body)
          reject(error)
        } else {
          console.log(`[API Error at ${DateUtility.getLocaleDate()}]:`, err)
          console.log(`Error for Body`, body)
          reject(err)
        }
      }
    })

  return {
    api,
  }
}
