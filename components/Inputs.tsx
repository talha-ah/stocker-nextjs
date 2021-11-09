import styled from "styled-components"

import { device } from "@utils/constants"
import { DangerText, Label } from "@components/Texts"

type WidthType = {
  width?: string
}

type InputType = {
  width?: number
  small?: boolean
  primary?: boolean
}

export const Form = styled.form<WidthType>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: ${({ width }) => width || "100%"};
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
  position: relative;
  margin-bottom: ${({ theme }) => theme.gaps.semiLight};
`

const StyledInput = styled.input<InputType>`
  border: 0;
  outline: 0;
  transition: all 0.3s ease 0s;
  height: ${({ small }) => (small ? "24px" : "34px")};
  border-bottom: ${({ theme }) => theme.borders.input};
  width: ${({ width }) => (width ? `${width}px` : "100%")};
  border-radius: ${({ theme }) => theme.borders.radius.default};
  padding: 0px
    ${({ theme, small }) => (small ? theme.gaps.light : theme.gaps.semiLight)};
  font-family: Segoe UI, Helvetica Neue, Arial, sans-serif, Apple Color Emoji,
    Segoe UI Emoji, Segoe UI Symbol;
  background-color: ${({ primary, theme }) =>
    primary ? theme.colors.bg : theme.colors.white};

  :focus {
    border-bottom: ${({ theme }) => theme.borders.inputActive};
  }
`

const StyledTextArea = styled.textarea<InputType>`
  border: 0;
  outline: 0;
  width: 100%;
  height: 34px;
  overflow: hidden;
  resize: vertical;
  min-height: 80px;
  border-bottom: ${({ theme }) => theme.borders.input};
  border-radius: ${({ theme }) => theme.borders.radius.default};
  padding: ${({ theme }) => theme.gaps.light}
    ${({ theme }) => theme.gaps.semiLight};
  background-color: ${({ primary, theme }) =>
    primary ? theme.colors.bg : theme.colors.white};
  font-family: Segoe UI, Helvetica Neue, Arial, sans-serif, Apple Color Emoji,
    Segoe UI Emoji, Segoe UI Symbol;

  :focus {
    border-bottom: ${({ theme }) => theme.borders.inputActive};
  }
`

const DangerTextS = styled(DangerText)`
  left: 0;
  bottom: -16px;
  position: absolute;
`

export const Input = ({
  min,
  name,
  type,
  label,
  small,
  width,
  error,
  value,
  primary,
  pattern,
  required,
  onChange,
  placeholder,
  defaultValue,
}: {
  min?: number
  name?: string
  type?: string
  width?: number
  label?: string
  value?: string
  onChange?: any
  small?: boolean
  pattern?: string
  primary?: boolean
  inputMode?: string
  required?: boolean
  defaultValue?: any
  placeholder?: string
  error?: string | null
}) => (
  <InputContainer>
    {label && (
      <Label htmlFor={name}>
        {label}
        {required && <DangerText>&nbsp;*</DangerText>}
      </Label>
    )}
    <StyledInput
      min={min}
      id={name}
      name={name}
      width={width}
      value={value}
      small={small}
      pattern={pattern}
      primary={primary}
      required={required}
      onChange={onChange}
      type={type || "text"}
      placeholder={placeholder}
      defaultValue={defaultValue}
    />
    {error && <DangerTextS>{error}</DangerTextS>}
  </InputContainer>
)

export const TextArea = ({
  name,
  label,
  error,
  value,
  primary,
  required,
  onChange,
  placeholder,
  defaultValue,
}: {
  name?: string
  label?: string
  value?: string
  onChange?: any
  primary?: boolean
  required?: boolean
  placeholder?: string
  defaultValue?: string
  error?: string | null
}) => (
  <InputContainer>
    {label && (
      <Label htmlFor={name}>
        {label}
        {required && <DangerText>&nbsp;*</DangerText>}
      </Label>
    )}
    <StyledTextArea
      id={name}
      name={name}
      value={value}
      primary={primary}
      required={required}
      onChange={onChange}
      placeholder={placeholder}
      defaultValue={defaultValue}
    />
    {error && <DangerText>{error}</DangerText>}
  </InputContainer>
)
