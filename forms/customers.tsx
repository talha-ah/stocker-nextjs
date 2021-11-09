import { Button } from "@components/Buttons"
import { Spinner } from "@components/Spinner"
import { Form, Input, TextArea } from "@components/Inputs"

export const CreateCustomer = ({
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
        name="first_name"
        placeholder="Name"
        error={error?.first_name}
      />
      <Input
        primary
        type="email"
        name="email"
        label="Email"
        placeholder="Email"
        error={error?.email}
      />
      <Input
        primary
        type="text"
        name="phone"
        label="Phone"
        placeholder="Phone"
        error={error?.phone}
      />
      <Input
        primary
        type="text"
        label="Address"
        name="address_one"
        placeholder="Address"
        error={error?.address_one}
      />
      <TextArea
        primary
        label="Details"
        name="description"
        placeholder="Details"
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

export const EditCustomer = ({
  error,
  value,
  loading,
  onSubmit,
}: {
  value: any
  error?: any
  onSubmit: any
  loading?: boolean
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
        name="first_name"
        placeholder="Name"
        error={error?.first_name}
        defaultValue={value.first_name}
      />
      <Input
        primary
        type="email"
        name="email"
        label="Email"
        placeholder="Email"
        error={error?.email}
        defaultValue={value.email}
      />
      <Input
        primary
        type="text"
        name="phone"
        label="Phone"
        placeholder="Phone"
        error={error?.phone}
        defaultValue={value.phone}
      />
      <Input
        primary
        type="text"
        label="Address"
        name="address_one"
        placeholder="Address"
        error={error?.address_one}
        defaultValue={value.address_one}
      />
      <TextArea
        primary
        name="description"
        label="Description"
        error={error?.description}
        placeholder="Description"
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
