import {
  Form as SForm,
  Input as SInput,
  TextArea as STextArea,
} from "semantic-ui-react"
import styled from "styled-components"

import { device } from "@utils/constants"

type WidthType = {
  width?: string
}

export const Form = styled(SForm)<WidthType>`
  padding 20px;
  width: ${({ width }) => width || "100%"};
  max-width: ${({ width }) => width || "100%"};

  @media (${device.tablet}) {
    & {
      width: 100%;
      max-width: 100%;
    }
  }
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
  <SForm.Field
    name={name}
    type={type}
    error={error}
    label={label}
    control={SInput}
    required={required}
    placeholder={placeholder || label}
  />
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
