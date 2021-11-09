import { Button } from "@components/Buttons"
import { Spinner } from "@components/Spinner"
import { Form, Input } from "@components/Inputs"

export const AddPayment = ({
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
        error={error?.value}
        label="Payment value"
        placeholder="Payment value"
      />

      <Button type="submit">
        {loading ? (
          <Spinner size={16} text="Loading..." position="left" />
        ) : (
          "Add"
        )}
      </Button>
    </Form>
  )
}
