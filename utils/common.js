export const currencyFormat = (value, currency) =>
  isNaN(value || 0)
    ? value
    : new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: currency || "USD",
      }).format(value || 0)

export const isNotEmpty = (item) =>
  item !== undefined && item !== null && item !== "" && item.length !== 0

export const truncateString = (text, ellipsisString) =>
  (text || "").length > ellipsisString
    ? text.substring(0, ellipsisString) + "..."
    : text

export const numberWithCommas = (x) =>
  x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")

export const objectToParams = (obj) => {
  let str = ""
  for (const key in obj) {
    if (obj[key] !== undefined && obj[key] !== null) {
      if (str != "") {
        str += "&"
      }
      str += key + "=" + encodeURIComponent(obj[key])
    }
  }
  return str
}

export const base64ToBlob = (base64) => {
  var byteString = atob(base64.split(",")[1])
  var ab = new ArrayBuffer(byteString.length)
  var ia = new Uint8Array(ab)

  for (var i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i)
  }
  return new Blob([ab], { type: "image/png" })
}

export const removeDuplicateRow = (array, key) => [
  ...array.reduce((map, obj) => map.set(obj[key], obj), new Map()).values(),
]

export const toTitleCase = (phrase) =>
  phrase
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")

export const addressText = (address) => {
  return ` ${address?.address_line_one}
		${address?.address_line_two ? `, ${address?.address_line_two}` : ""}
		${address?.city ? ` ${address?.city}` : ""}
		${address?.state ? ` ${address?.state}` : ""}
		${address?.country ? ` ${address?.country}` : ""}
		${address?.zip ? ` ${address?.zip}` : ""}`
}

export const timeoutPromise = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export const roundNumber = (num) =>
  Math.round((num + Number.EPSILON) * 100) / 100

export const downloadFile = (url, fileName) => {
  // for non-IE
  const req = new XMLHttpRequest()
  req.open("GET", url, true)
  req.responseType = "blob"
  req.onload = function () {
    //Convert the Byte Data to BLOB object.
    const blob = new Blob([req.response], { type: "application/octetstream" })

    //Check the Browser type and download the File.
    const isIE = false || !!document.documentMode
    if (isIE) {
      window.navigator.msSaveBlob(blob, fileName)
    } else {
      const url = window.URL || window.webkitURL
      const link = url.createObjectURL(blob)
      const a = document.createElement("a")
      a.setAttribute("download", fileName)
      a.setAttribute("href", link)
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
    }
  }
  req.send()
}

export const generateId = (prefix = "", length = 7) => {
  let result = prefix
  for (let i = 0; i < length; i++) {
    const random = Math.random()
    result += String.fromCharCode(
      Math.floor(random * 26) + (random < 0.5 ? 65 : 97)
    )
  }
  return result
}
