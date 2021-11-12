import { useState, useEffect } from "react"

import { useAPI } from "@utils/api"
import { truncate } from "@utils/common"
import { endpoints } from "@utils/constants"
import { useAppContext, CustomerTypes, NotifierTypes } from "@contexts/index"

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

const defaultLoading = {
  fetch: false,
  add: false,
  edit: false,
  delete: false,
}

const defaultError = {
  fetch: null,
  add: null,
  edit: null,
  delete: null,
}

export const useCustomers = () => {
  const { api } = useAPI()
  const { state, dispatch } = useAppContext()

  const [error, setError] = useState(defaultError)
  const [loading, setLoading] = useState(defaultLoading)

  const triggerNotification = (type, message) => {
    dispatch({
      type: NotifierTypes.ADD_NOTIFICATION,
      payload: {
        type: type,
        message: message,
      },
    })
  }

  const fetchData = async () => {
    try {
      setError(defaultError)
      setLoading({ ...loading, fetch: true })
      if (state.customers.customersFetched) return

      const response = await api({
        method: "GET",
        uri: endpoints.customers,
      })

      const result = response.data.map((row) => ({
        ...row,
        key: row._id,
        name: row.first_name,
        balance: truncate(row.balance.value),
      }))

      dispatch({
        type: CustomerTypes.SET_CUSTOMERS,
        payload: { customers: result },
      })
    } catch (error) {
      setError({ ...error, fetch: error?.data })
      triggerNotification("error", error?.message)
    } finally {
      setLoading({ ...loading, fetch: false })
    }
  }

  const addData = async (body, cb) => {
    try {
      setError(defaultError)
      setLoading({ ...loading, add: true })

      const response = await api({
        method: "POST",
        uri: endpoints.customers,
        body: JSON.stringify(body),
      })

      const result = response.data
      result.key = result._id
      result.name = result.first_name
      result.balance = result.balance.value

      dispatch({
        type: CustomerTypes.ADD_CUSTOMER,
        payload: { customer: result },
      })

      triggerNotification("success", "Customer added successfully.")

      cb && cb(result)
    } catch (error) {
      setError({ ...error, add: error?.data })
      triggerNotification("error", error?.message)
    } finally {
      setLoading({ ...loading, add: false })
    }
  }

  const editData = async (body, id, cb) => {
    try {
      setError(defaultError)
      setLoading({ ...loading, edit: true })

      const response = await api({
        method: "PUT",
        uri: `${endpoints.customers}/${id}`,
        body: JSON.stringify(body),
      })

      response.data.key = response.data._id
      response.data.name = response.data.first_name
      response.data.balance = response.data.balance.value

      dispatch({
        type: CustomerTypes.EDIT_CUSTOMER,
        payload: { customer: response.data },
      })

      triggerNotification("success", "Customer updated successfully.")

      cb && cb()
    } catch (error) {
      setError({ ...error, edit: error?.data })
      triggerNotification("error", error?.message)
    } finally {
      setLoading({ ...loading, edit: false })
    }
  }

  const deleteData = async (_id, cb) => {
    try {
      setError(defaultError)
      setLoading({ ...loading, delete: true })

      await api({
        method: "DELETE",
        uri: `${endpoints.customers}/${_id}`,
      })

      dispatch({
        type: CustomerTypes.DELETE_CUSTOMER,
        payload: { _id },
      })

      triggerNotification("success", "Customer deleted successfully.")

      cb && cb()
    } catch (error) {
      setError({ ...error, delete: error?.data })
      triggerNotification("error", error?.message)
    } finally {
      setLoading({ ...loading, delete: false })
    }
  }

  const fetchCustomer = (id) => {
    return state.customers.customers.find(
      (customer) => String(customer._id) === String(id)
    )
  }

  return {
    error,
    headers,
    loading,
    addData,
    editData,
    fetchData,
    deleteData,
    fetchCustomer,
  }
}

export const useSearchCustomer = (query) => {
  const { state } = useAppContext()
  const [customers, setCustomers] = useState([])

  const fetchCustomers = async () => {
    let searched = state.customers.customers

    searched = searched.filter(
      (stock) =>
        stock.first_name.toLowerCase().indexOf(query.toLowerCase()) > -1
    )

    const result = searched.map((customer) => ({
      ...customer,
      value: customer._id,
      label: customer.first_name,
    }))

    setCustomers(result)
  }

  useEffect(() => {
    query ? fetchCustomers() : setCustomers([])
    // eslint-disable-next-line
  }, [query])

  return { customers }
}
