import DateUtility from "./date"

const api = ({ method = "GET", uri, body, headers, token }) =>
  new Promise(async (resolve, reject) => {
    try {
      var myHeaders = new Headers()
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
    } catch (err) {
      if (err.status) {
        const error = await err.json()
        console.log(`[API Error at ${DateUtility.getLocaleDate()}]:`, error)
        reject(error)
      } else {
        console.log(`[API Error at ${DateUtility.getLocaleDate()}]:`, err)
        reject(err)
      }
    }
  })

export default api
