import { useEffect, useState } from "react"

import { Button } from "@components/Buttons"
import { Spinner } from "@components/Spinner"
import { useAppContext } from "@contexts/index"
import { Select, SelectType } from "@components/Select"
import { Form, Input, TextArea } from "@components/Inputs"

export const CreateStock = ({
  error,
  loading,
  onSubmit,
}: {
  error?: any
  onSubmit: any
  loading?: boolean
}) => {
  const { state } = useAppContext()
  const [category, setCategory] = useState<SelectType[]>([])

  const submitHandler = async (e: any) => {
    e.preventDefault()

    const body: any = {
      category: category[0]?.value,
    }
    Array.from(e.target).forEach((input: any) => {
      input.name && (body[input.name] = input.value)
    })

    onSubmit(body, () => {
      e.target.reset()
    })
  }

  return (
    <Form onSubmit={submitHandler}>
      <Select
        primary
        required
        name="category"
        label="Category"
        value={category}
        placeholder="Category"
        error={error?.category}
        onChange={(value: any) => setCategory(value)}
        options={state.categories.categories.map((category: any) => ({
          label: category?.name,
          value: category?._id,
        }))}
      />
      <Input
        primary
        required
        type="text"
        name="code"
        label="Code"
        placeholder="Code"
        error={error?.code}
      />
      <Input
        primary
        required
        type="number"
        name="cost_price"
        label="Cost Price"
        placeholder="Cost Price"
        error={error?.cost_price}
      />
      <Input
        primary
        required
        type="number"
        name="sale_price"
        label="Sale Price"
        placeholder="Sale Price"
        error={error?.sale_price}
      />
      <Input
        primary
        required
        type="number"
        name="inventory"
        label="Inventory"
        placeholder="Inventory"
        error={error?.inventory}
      />
      <Input
        primary
        required
        type="text"
        name="location"
        label="Location"
        placeholder="Location"
        error={error?.location}
      />
      <TextArea
        primary
        name="description"
        label="Description"
        placeholder="Description"
        error={error?.description}
      />

      <Button type="submit">
        {loading ? (
          <Spinner size={16} text="Loading..." position="left" />
        ) : (
          "Create"
        )}
      </Button>
    </Form>
  )
}

export const EditStock = ({
  value,
  error,
  loading,
  onSubmit,
}: {
  value: any
  error?: any
  onSubmit: any
  loading?: boolean
}) => {
  const { state } = useAppContext()
  const [category, setCategory] = useState<SelectType[]>([])

  const submitHandler = async (e: any) => {
    e.preventDefault()

    const body: any = {
      category: category[0]?.value,
    }
    Array.from(e.target).forEach((input: any) => {
      input.name && (body[input.name] = input.value)
    })

    onSubmit(body, () => {
      e.target.reset()
    })
  }

  useEffect(() => {
    const cat: any = state.categories.categories.find(
      (d: any) => String(d._id) === String(value.category_id)
    )

    if (cat)
      setCategory([
        {
          label: cat?.name,
          value: cat?._id,
        },
      ])

    // eslint-disable-next-line
  }, [])

  return (
    <Form onSubmit={submitHandler}>
      <Select
        primary
        required
        name="category"
        label="Category"
        value={category}
        placeholder="Category"
        error={error?.category}
        onChange={(value: any) => setCategory(value)}
        options={state.categories.categories.map((category: any) => ({
          label: category?.name,
          value: category?._id,
        }))}
      />
      <Input
        primary
        required
        type="text"
        name="code"
        label="Code"
        placeholder="Code"
        error={error?.code}
        defaultValue={value.code}
      />
      <Input
        primary
        required
        type="number"
        name="cost_price"
        label="Cost Price"
        placeholder="Cost Price"
        error={error?.cost_price}
        defaultValue={value.cost_price}
      />
      <Input
        primary
        required
        type="number"
        name="sale_price"
        label="Sale Price"
        placeholder="Sale Price"
        error={error?.sale_price}
        defaultValue={value.sale_price}
      />
      <Input
        primary
        required
        type="number"
        name="inventory"
        label="Inventory"
        placeholder="Inventory"
        error={error?.inventory}
        defaultValue={value.inventory}
      />
      <Input
        primary
        required
        type="text"
        name="location"
        label="Location"
        placeholder="Location"
        error={error?.location}
        defaultValue={value.location}
      />
      <TextArea
        primary
        name="description"
        label="Description"
        placeholder="Description"
        error={error?.description}
        defaultValue={value.description}
      />

      <Button type="submit">
        {loading ? (
          <Spinner size={16} text="Loading..." position="left" />
        ) : (
          "Edit"
        )}
      </Button>
    </Form>
  )
}
