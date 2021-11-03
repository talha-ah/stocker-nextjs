import { Button } from "@components/Buttons"
import { Form, Input, TextArea } from "@components/Inputs"

export const CreateCustomer = ({
  error,
  loading,
  onSubmit,
}: {
  onSubmit: any
  error: any
  loading: boolean
}) => {
  return (
    <Form onSubmit={onSubmit}>
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
