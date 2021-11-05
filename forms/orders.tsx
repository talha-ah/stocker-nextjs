import { Button } from "@components/Buttons"
import { Form, Input } from "@components/Inputs"

export const AddPayment = ({
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
    const value = e.target.value.value
    const unit = "PKR"
    onSubmit({ value, unit }, () => e.target.reset())
  }

  return (
    <Form onSubmit={submitHandler}>
      <Input
        primary
        required
        name="value"
        type="number"
        error={error}
        label="Payment value"
        placeholder="Payment value"
      />

      <Button type="submit">{loading ? "Loading..." : "Add"}</Button>
    </Form>
  )
}
