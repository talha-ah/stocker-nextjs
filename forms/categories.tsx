import { Button } from "@components/Buttons"
import { Form, Input } from "@components/Inputs"

export const CreateCategory = ({
  error,
  loading,
  onSubmit,
}: {
  onSubmit: any
  loading?: boolean
  error?: string | null
}) => {
  const submitHandler = async (e: any) => {
    e.preventDefault()
    const name = e.target.name.value
    onSubmit({ name }, () => e.target.reset())
  }

  return (
    <Form onSubmit={submitHandler}>
      <Input
        primary
        required
        type="text"
        name="name"
        error={error}
        label="Category Name"
        placeholder="Category name"
      />

      <Button type="submit">{loading ? "Loading..." : "Create"}</Button>
    </Form>
  )
}

export const EditCategory = ({
  error,
  value,
  loading,
  onSubmit,
}: {
  value: string
  onSubmit: any
  loading?: boolean
  error?: string | null
}) => {
  const submitHandler = async (e: any) => {
    e.preventDefault()
    const name = e.target.name.value
    onSubmit({ name }, () => e.target.reset())
  }

  return (
    <Form onSubmit={submitHandler}>
      <Input
        primary
        required
        type="text"
        name="name"
        error={error}
        defaultValue={value}
        label="Category Name"
        placeholder="Category name"
      />

      <Button type="submit">{loading ? "Loading..." : "Edit"}</Button>
    </Form>
  )
}
