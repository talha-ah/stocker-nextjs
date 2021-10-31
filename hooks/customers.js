import { useState, useEffect } from "react"

import { api } from "@utils/api"
import { endpoints } from "@utils/constants"

const headers = [
  { key: 1, name: "Name", field: "name" },
  { key: 2, name: "Email", field: "email" },
  { key: 3, name: "Phone", field: "phone" },
  { key: 4, name: "Address", field: "address_one" },
  { key: 5, name: "Details", field: "description" },
  { key: 6, name: "Sales", field: "sales" },
  { key: 7, name: "Balance", field: "balance" },
  { key: 8, name: "Actions", field: "actions" },
]

export const useCustomers = () => {
  const [data, setData] = useState([])

  const [addError, setAddError] = useState("")
  const [fetchError, setFetchError] = useState("")

  const [addLoading, setAddLoading] = useState(false)
  const [fetchLoading, setFetchLoading] = useState(true)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const response = await api({
        method: "GET",
        uri: `${endpoints.users}?role=customer`,
      })

      const result = response.data.map((row) => ({
        key: row._id,
        email: row.email,
        phone: row.phone,
        name: row.first_name,
        address_one: row.address_one,
        description: row.description,
        sales: row.sales,
        balance: row.balance,
      }))

      setData(result)
    } catch (error) {
      setFetchError(error.message)
    } finally {
      setFetchLoading(false)
    }
  }

  const addData = async (body) => {
    try {
      setAddLoading(true)
      const response = await api({
        method: "POST",
        uri: endpoints.customers,
        body: JSON.stringify(body),
      })

      setData(response)
    } catch (error) {
      setAddError(error.message)
    } finally {
      setAddLoading(false)
    }
  }

  return {
    data,
    addData,
    headers,
    addError,
    fetchData,
    fetchError,
    addLoading,
    fetchLoading,
  }
}
