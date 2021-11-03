import DateUtility from "./date"
import { getBrowserItem, removeBrowserItem } from "./browser-utility"

export const api = ({
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

      console.log(`[API Data at ${DateUtility.getLocaleDate()}]:`, data)
      resolve(data)
    } catch (err: any) {
      if (err.status) {
        if (err.status === 403) {
          removeBrowserItem()
        }
        const error = await err.json()
        console.log(`[API Error at ${DateUtility.getLocaleDate()}]:`, error)
        reject(error)
      } else {
        console.log(`[API Error at ${DateUtility.getLocaleDate()}]:`, err)
        reject(err)
      }
    }
  })
