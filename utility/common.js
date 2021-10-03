export default class CommonUtility {
  static currencyFormat = (value, currency) =>
    isNaN(value || 0)
      ? value
      : new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: currency || "USD",
        }).format(value || 0)

  static isNotEmpty = (item) =>
    item !== undefined && item !== null && item !== "" && item.length !== 0

  static truncateString = (text, ellipsisString) =>
    (text || "").length > ellipsisString
      ? text.substring(0, ellipsisString) + "..."
      : text

  static numberWithCommas = (x) =>
    x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")

  static objectToParams = (obj) => {
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

  static base64ToBlob = (base64) => {
    var byteString = atob(base64.split(",")[1])
    var ab = new ArrayBuffer(byteString.length)
    var ia = new Uint8Array(ab)

    for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i)
    }
    return new Blob([ab], { type: "image/png" })
  }

  static removeDuplicateRow = (array, key) => [
    ...array.reduce((map, obj) => map.set(obj[key], obj), new Map()).values(),
  ]

  static toTitleCase = (phrase) =>
    phrase
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")

  static addressText = (address) => {
    return ` ${address?.address_line_one}
		${address?.address_line_two ? `, ${address?.address_line_two}` : ""}
		${address?.city ? ` ${address?.city}` : ""}
		${address?.state ? ` ${address?.state}` : ""}
		${address?.country ? ` ${address?.country}` : ""}
		${address?.zip ? ` ${address?.zip}` : ""}`
  }

  static timeoutPromise = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms))
  }

  static roundNumber = (num) => Math.round((num + Number.EPSILON) * 100) / 100

  static downloadFile = (url, fileName) => {
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
}
