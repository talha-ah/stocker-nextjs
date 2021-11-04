import { useState, useEffect } from "react"

import { api } from "@utils/api"
import { endpoints } from "@utils/constants"

const headers = [
  { key: 1, name: "Name", field: "name", align: "left" },
  { key: 2, name: "Email", field: "email", align: "left" },
  { key: 3, name: "Phone", field: "phone", align: "left" },
  { key: 4, name: "Address", field: "address_one", align: "left" },
  { key: 5, name: "Details", field: "description", align: "left" },
  { key: 6, name: "Sales", field: "orders", align: "left" },
  { key: 7, name: "Balance", field: "balance", align: "left" },
  { key: 8, name: "Actions", field: "actions", align: "right" },
]

export const useCustomers = () => {
  const [data, setData] = useState([])

  const [loading, setLoading] = useState({
    fetch: true,
    add: false,
    edit: false,
    delete: false,
  })

  const [error, setError] = useState({
    fetch: null,
    add: null,
    edit: null,
    delete: null,
  })

  const fetchData = async () => {
    try {
      const response = await api({
        method: "GET",
        uri: endpoints.customers,
      })

      const result = response.data.map((row) => ({
        ...row,
        key: row._id,
        name: row.first_name,
        balance: row.balance.value,
      }))

      setData(result)
    } catch (error) {
      setError({ fetch: error.message })
    } finally {
      setLoading({ fetch: false })
    }
  }

  const addData = async (body, cb) => {
    try {
      setLoading({ add: true })

      const response = await api({
        method: "POST",
        uri: endpoints.customers,
        body: JSON.stringify(body),
      })

      const result = response.data
      result.key = result._id
      result.name = result.first_name
      result.balance = result.balance.value

      setData([result, ...data])
      cb()
    } catch (error) {
      setError({ add: error.message })
    } finally {
      setLoading({ add: false })
    }
  }

  const editData = async (body, id, cb) => {
    try {
      setLoading({ edit: true })

      const response = await api({
        method: "PUT",
        uri: `${endpoints.customers}/${id}`,
        body: JSON.stringify(body),
      })

      response.data.key = response.data._id
      response.data.name = response.data.first_name
      response.data.balance = response.data.balance.value

      const result = [...data]
      const dIndex = result.findIndex(
        (d) => String(d._id) === String(response.data._id)
      )
      result[dIndex] = response.data

      setData(result)
      cb()
    } catch (error) {
      setError({ edit: error.message })
    } finally {
      setLoading({ edit: false })
    }
  }

  const deleteData = async (id) => {
    try {
      setLoading({ delete: true })

      await api({
        method: "DELETE",
        uri: `${endpoints.customers}/${id}`,
      })

      const result = data.filter((d) => String(d._id) !== String(id))

      setData(result)
    } catch (error) {
      setError({ delete: error.message })
    } finally {
      setLoading({ delete: false })
    }
  }

  return {
    data,
    error,
    headers,
    loading,
    addData,
    editData,
    fetchData,
    deleteData,
  }
}

export const useSearchCustomer = (text) => {
  const [customers, setCustomers] = useState([])
  const [customersError, setCustomersError] = useState("")
  const [customersLoading, setCustomersLoading] = useState(false)

  const fetchCustomers = async () => {
    try {
      setCustomersLoading(true)

      const response = await api({
        method: "GET",
        uri: `${endpoints.customers}?search=${text}`,
      })

      const result = response.data.map((customer) => ({
        ...customer,
        value: customer._id,
        label: customer.first_name,
      }))

      setCustomers(result)
    } catch (error) {
      setCustomersError(error.message)
    } finally {
      setCustomersLoading(false)
    }
  }

  useEffect(() => {
    text ? fetchCustomers() : setCustomers([])
    // eslint-disable-next-line
  }, [text])

  return { customers, customersLoading, customersError }
}
