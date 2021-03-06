import { Button } from "@components/Buttons"
import { Form, Input } from "@components/Inputs"

export const CreateCategory = ({
  error,
  loading,
  onSubmit,
}: {
  error?: any
  onSubmit: any
  loading?: boolean
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
        error={error?.name}
        label="Category Name"
        placeholder="Category name"
      />

      <Button type="submit" primary loading={loading}>
        Create
      </Button>
    </Form>
  )
}

export const EditCategory = ({
  error,
  value,
  loading,
  onSubmit,
}: {
  error?: any
  value?: any
  onSubmit: any
  loading?: boolean
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
        error={error?.name}
        label="Category Name"
        defaultValue={value.name}
        placeholder="Category name"
      />

      <Button type="submit" primary loading={loading}>
        Edit
      </Button>
    </Form>
  )
}
