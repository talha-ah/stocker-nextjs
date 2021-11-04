import { useState } from "react"

import { Button } from "@components/Buttons"
import { useAppContext } from "@contexts/index"
import { Select, SelectType } from "@components/Select"
import { Form, Input, TextArea } from "@components/Inputs"

export const CreateStock = ({
  onSubmit,
  loading,
  error,
}: {
  onSubmit: any
  loading?: boolean
  error?: string | null
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
      setCategory([])
    })
  }

  return (
    <Form onSubmit={submitHandler}>
      <Select
        primary
        required
        error={error}
        name="category"
        label="Category"
        value={category}
        placeholder="Category"
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
        error={error}
        placeholder="Code"
      />
      <Input
        primary
        required
        type="text"
        error={error}
        name="cost_price"
        label="Cost Price"
        placeholder="Cost Price"
      />
      <Input
        primary
        required
        type="text"
        error={error}
        name="sale_price"
        label="Sale Price"
        placeholder="Sale Price"
      />
      <Input
        primary
        required
        type="text"
        error={error}
        name="inventory"
        label="Inventory"
        placeholder="Inventory"
      />
      <Input
        primary
        required
        type="text"
        error={error}
        name="location"
        label="Location"
        placeholder="Location"
      />
      <TextArea
        primary
        error={error}
        name="description"
        label="Description"
        placeholder="Description"
      />

      <Button type="submit">{loading ? "Loading..." : "Create"}</Button>
    </Form>
  )
}
