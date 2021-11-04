import { Button } from "@components/Buttons"
import { Form, Input, TextArea } from "@components/Inputs"

export const CreateCustomer = ({
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

    const body: any = {}
    Array.from(e.target).forEach((input: any) => {
      input.name && (body[input.name] = input.value)
    })

    onSubmit(body, () => {
      e.target.reset()
    })
  }

  return (
    <Form onSubmit={submitHandler}>
      <Input
        primary
        required
        type="text"
        label="Name"
        error={error}
        name="first_name"
        placeholder="Name"
      />
      <Input
        primary
        type="email"
        name="email"
        label="Email"
        error={error}
        placeholder="Email"
      />
      <Input
        primary
        type="text"
        name="phone"
        label="Phone"
        error={error}
        placeholder="Phone"
      />
      <Input
        primary
        type="text"
        label="Address"
        error={error}
        name="address_one"
        placeholder="Address"
      />
      <TextArea
        primary
        label="Details"
        error={error}
        name="description"
        placeholder="Details"
      />

      <Button type="submit">{loading ? "Loading..." : "Create"}</Button>
    </Form>
  )
}

export const EditCustomer = ({
  error,
  value,
  loading,
  onSubmit,
}: {
  value: any
  onSubmit: any
  loading?: boolean
  error?: string | null
}) => {
  const submitHandler = async (e: any) => {
    e.preventDefault()

    const body: any = {}
    Array.from(e.target).forEach((input: any) => {
      input.name && (body[input.name] = input.value)
    })

    onSubmit(body, () => {
      e.target.reset()
    })
  }

  return (
    <Form onSubmit={submitHandler}>
      <Input
        primary
        required
        type="text"
        label="Name"
        error={error}
        name="first_name"
        placeholder="Name"
        defaultValue={value.first_name}
      />
      <Input
        primary
        type="email"
        name="email"
        label="Email"
        error={error}
        placeholder="Email"
        defaultValue={value.email}
      />
      <Input
        primary
        type="text"
        name="phone"
        label="Phone"
        error={error}
        placeholder="Phone"
        defaultValue={value.phone}
      />
      <Input
        primary
        type="text"
        label="Address"
        error={error}
        name="address_one"
        placeholder="Address"
        defaultValue={value.address_one}
      />
      <TextArea
        primary
        error={error}
        name="description"
        label="Description"
        placeholder="Description"
        defaultValue={value.description}
      />

      <Button type="submit">{loading ? "Loading..." : "Create"}</Button>
    </Form>
  )
}
