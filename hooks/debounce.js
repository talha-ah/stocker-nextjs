import { useState, useEffect } from "react"

export const useDebounce = (value, delay = 1000) => {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
    // eslint-disable-next-line
  }, [value])

  return debouncedValue
}
