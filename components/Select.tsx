import styled from "styled-components"
import { useState, useRef, useEffect } from "react"

import { generateId } from "@utils/common"
import { ChevronDown } from "@components/icons"
import { DangerText, Label } from "@components/Texts"

type SelectorType = {
  primary?: boolean
}

type OptionType = {
  active?: boolean
}

export type SelectType = {
  value: string
  label: string
} | null

const Container = styled.div`
  width: 100%;
  display: flex;
  position: relative;
  flex-direction: column;
  transition: all 0.3s ease 0s;
  margin-bottom: ${({ theme }) => theme.gaps.semiLight};
`

const DangerTextS = styled(DangerText)`
  left: 0;
  bottom: -16px;
  position: absolute;
`

const Selector = styled.div<SelectorType>`
  border: 0;
  outline: 0;
  width: 100%;
  height: 34px;
  display: flex;
  font-size: 14px;
  cursor: pointer;
  overflow: hidden;
  position: relative;
  align-items: center;
  justify-content: flex-start;
  transition: all 0.3s ease 0s;
  padding: 0px ${({ theme }) => theme.gaps.semiLight};
  border-radius: ${({ theme }) => theme.borders.radius.default};
  background-color: ${({ primary, theme }) =>
    primary ? theme.colors.bg : theme.colors.white};
  font-family: Segoe UI, Helvetica Neue, Arial, sans-serif, Apple Color Emoji,
    Segoe UI Emoji, Segoe UI Symbol;
`

const SelectorIcon = styled.div`
  top: 0;
  height: 100%;
  display: flex;
  position: absolute;
  align-items: center;
  justify-content: center;
  right: ${({ theme }) => theme.gaps.semiLight};
`

const InputContainer = styled.div`
  width: 100%;
  padding: 0px ${({ theme }) => theme.gaps.semiLight}
    ${({ theme }) => theme.gaps.light};
`

const Input = styled.input`
  border: 0;
  outline: 0;
  width: 100%;
  height: 34px;
  font-size: 14px;
  transition: all 0.3s ease 0s;
  padding: 0px ${({ theme }) => theme.gaps.semiLight};
  background-color: ${({ theme }) => theme.colors.bg};
  border-bottom: ${({ theme }) => theme.borders.input};
  border-radius: ${({ theme }) => theme.borders.radius.default};
  font-family: Segoe UI, Helvetica Neue, Arial, sans-serif, Apple Color Emoji,
    Segoe UI Emoji, Segoe UI Symbol;

  :focus {
    border-bottom: ${({ theme }) => theme.borders.inputActive};
  }
`

const Options = styled.div`
  top: 0;
  left: 0;
  width: 100%;
  z-index: 90;
  display: flex;
  overflow-y: auto;
  max-height: 366px;
  position: absolute;
  flex-direction: column;
  align-items: flex-start;
  inset: 0px auto auto 0px;
  transition: all 0.3s ease 0s;
  justify-content: space-between;
  transform: translate(0px, 56px);
  padding: ${({ theme }) => theme.gaps.light} 0px;
  filter: drop-shadow(0px 4px 8px rgba(0, 0, 0, 0.1));
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.borders.radius.default};

  ::-webkit-scrollbar {
    width: 2px;
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 10%;
    background-color: ${({ theme }) => theme.colors.primary};
  }
`

const Option = styled.div<OptionType>`
  width: 100%;
  display: flex;
  font-size: 14px;
  cursor: pointer;
  align-items: center;
  justify-content: space-between;
  font-weight: ${({ active }) => (active ? 500 : "normal")};
  padding: ${({ theme }) => theme.gaps.light}
    ${({ theme }) => theme.gaps.semiLight};

  &:hover {
    background-color: ${({ theme }) => theme.colors.bg};
  }
`

const Dot = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.primary};
`

export const Select = (props: any) => {
  const [open, setOpen] = useState(false)

  function isItemInSelection(item: any) {
    return props.value.some((current: any) => current?.value === item.value)
  }

  const toggle = () => setOpen((s) => !s)

  const onSelect = (item: any) => () => {
    if (!props.value.some((current: any) => current?.value === item?.value)) {
      if (!props.multi) {
        setQuery("")
        setOpen(false)
        props.onChange([item])
      } else if (props.multi) {
        props.onChange([...props.value, item])
      }
    } else {
      let selectionAfterRemoval = props.value
      selectionAfterRemoval = selectionAfterRemoval.filter(
        (current: any) => current?.value !== item.value
      )
      props.onChange([...selectionAfterRemoval])
      setQuery("")
      !props.multi && setOpen(false)
    }
  }

  // Filtering
  const [query, setQuery] = useState("")

  const filter = (options: any) => {
    return options.filter(
      (option: any) =>
        option.label.toLowerCase().indexOf(query.toLowerCase()) > -1
    )
  }

  // Handle outside click
  const ref = useRef(null)

  const close = (e: any) => {
    setQuery("")
    setOpen(() => e && e.target === ref.current)
  }

  useEffect(() => {
    document.addEventListener("click", close)
    return () => document.removeEventListener("click", close)
  }, [])

  return (
    <Container onClick={(e) => e.stopPropagation()}>
      {props.label && (
        <Label htmlFor={props.name}>
          {props.label}
          {props.required && <DangerText>&nbsp;*</DangerText>}
        </Label>
      )}

      <Selector primary={props.primary} ref={ref} onClick={toggle}>
        {props.multi
          ? props.value.length !== 0
            ? `${props.value.length} item(s) selected`
            : props.placeholder
          : props.value[0]?.label || props.placeholder}

        <SelectorIcon>
          <ChevronDown size={24} />
        </SelectorIcon>
      </Selector>
      {props.error && <DangerTextS>{props.error}</DangerTextS>}
      {open && (
        <Options>
          <InputContainer>
            <Input
              type="text"
              name="query"
              autoComplete="off"
              placeholder="Search"
              onChange={(e) => setQuery(e.target.value)}
            />
          </InputContainer>
          {filter(props.options).map((option: any) => (
            <Option
              key={generateId()}
              onClick={onSelect(option)}
              active={isItemInSelection(option)}
            >
              <span>{option.label}</span>
              <span>{isItemInSelection(option) && <Dot />}</span>
            </Option>
          ))}
        </Options>
      )}
    </Container>
  )
}
