import { Form as SForm, TextArea as STextArea } from "semantic-ui-react"
import styled from "styled-components"

import { device } from "@utils/constants"

type WidthType = {
  width?: string
}

export const Form = styled(SForm)<WidthType>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: ${({ theme }) => theme.gaps.semiLight};
  width: ${({ width }) => width || "100%"};
  max-width: ${({ width }) => width || "100%"};

  @media (${device.tablet}) {
    & {
      width: 100%;
      max-width: 100%;
    }
  }
`

const Input = styled.div`
  width: 100%;
`

export const InputField = ({
  name,
  label,
  type,
  error,
  required,
  placeholder,
}: {
  name?: string
  label?: string
  type?: string
  error?: string
  required?: any
  placeholder?: string
}) => (
  <Input>
    <label htmlFor={name}>{label}</label>
    <input
      id={name}
      name={name}
      required={required}
      type={type || "text"}
      placeholder={placeholder}
    />
  </Input>
)

export const TextArea = ({
  name,
  label,
  error,
  required,
  placeholder,
}: {
  name?: string
  label?: string
  error?: string
  required?: any
  placeholder?: string
}) => (
  <SForm.Field
    name={name}
    error={error}
    label={label}
    control={STextArea}
    autoComplete="none"
    required={required}
    placeholder={placeholder || label}
  />
)
