import styled from "styled-components"

import { device } from "@utils/constants"
import { DangerText } from "@components/Texts"

type WidthType = {
  width?: string
}

type InputType = {
  primary?: boolean
}

export const Form = styled.form<WidthType>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: ${({ width }) => width || "100%"};
  gap: ${({ theme }) => theme.gaps.semiLight};
  max-width: ${({ width }) => width || "100%"};

  @media (${device.tablet}) {
    & {
      width: 100%;
      max-width: 100%;
    }
  }
`

const InputContainer = styled.div`
  width: 100%;
`

const StyledInput = styled.input<InputType>`
  background-color: ${({ primary, theme }) =>
    primary ? theme.colors.bg : theme.colors.white};
`

const StyledTextArea = styled.textarea<InputType>`
  background-color: ${({ primary, theme }) =>
    primary ? theme.colors.bg : theme.colors.white};
`

export const Input = ({
  name,
  label,
  type,
  error,
  primary,
  required,
  placeholder,
}: {
  name?: string
  type?: string
  label?: string
  required?: any
  primary?: boolean
  placeholder?: string
  error?: string | null
}) => (
  <InputContainer>
    {label && <label htmlFor={name}>{label}</label>}
    <StyledInput
      id={name}
      name={name}
      primary={primary}
      required={required}
      type={type || "text"}
      placeholder={placeholder}
    />
    {error && <DangerText>{error}</DangerText>}
  </InputContainer>
)

export const TextArea = ({
  name,
  label,
  error,
  primary,
  required,
  placeholder,
}: {
  name?: string
  label?: string
  required?: any
  primary?: boolean
  placeholder?: string
  error?: string | null
}) => (
  <InputContainer>
    {label && <label htmlFor={name}>{label}</label>}
    <StyledTextArea
      id={name}
      name={name}
      primary={primary}
      required={required}
      placeholder={placeholder}
    />
    {error && <DangerText>{error}</DangerText>}
  </InputContainer>
)
