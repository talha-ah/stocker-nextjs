import Image from "next/image"
import styled from "styled-components"
import { useState, useRef, useEffect } from "react"

import { generateId } from "@utils/common"
import { DangerText } from "@components/Texts"

const Container = styled.div`
  width: 100%;
  display: flex;
  position: relative;
  flex-direction: column;
  transition: all 0.3s ease 0s;
`

type InputContainerType = {
  primary?: boolean
}

const InputContainer = styled.div<InputContainerType>`
  width: 100%;
  height: 34px;
  display: flex;
  index: 1;
  position: relative;
  cursor: pointer;
  flex-direction: row;
  align-items: center;
  transition: all 0.3s ease 0s;
  justify-content: space-between;
  padding: 0px ${({ theme }) => theme.gaps.semiLight};
  background-color: ${({ primary, theme }) =>
    primary ? theme.colors.bg : theme.colors.white};
  border-radius: ${({ theme }) => theme.borders.radius.default};
`

const Input = styled.div`
  border: 0;
  outline: 0;
  index: 0;
  width: 100%;
  height: 100%;
  display: flex;
  font-size: 14px;
  position: relative;
  align-items: center;
  justify-content: flex-start;
  transition: all 0.3s ease 0s;
  border-bottom: ${({ theme }) => theme.borders.input};
  font-family: Segoe UI, Helvetica Neue, Arial, sans-serif, Apple Color Emoji,
    Segoe UI Emoji, Segoe UI Symbol;
`

const Options = styled.div`
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  position: absolute;
  flex-direction: column;
  align-items: flex-start;
  inset: 0px auto auto 0px;
  transition: all 0.3s ease 0s;
  justify-content: space-between;
  transform: translate(0px, 56px);
  padding: ${({ theme }) => theme.gaps.light} 0px;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.borders.radius.default};
`

type OptionType = {
  active?: boolean
}

const Option = styled.div<OptionType>`
  width: 100%;
  height: 34px;
  display: flex;
  font-size: 14px;
  cursor: pointer;
  align-items: center;
  justify-content: space-between;
  padding: 0px ${({ theme }) => theme.gaps.semiLight};
  font-weight: ${({ active }) => (active ? 500 : "normal")};

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

type SelectionType = {
  value?: string
  label?: string
} | null

export const Select = (props: any) => {
  const [isOpen, setIsOpen] = useState(false)
  const [selection, setSelection] = useState<SelectionType[]>([])

  const toggling = (e: any) => {
    e.stopPropagation()
    setIsOpen(!isOpen)
  }

  const onSelect = (item: any) => () => {
    if (!selection.some((current) => current?.value === item?.value)) {
      if (!props.multi) {
        setSelection([item])
        setIsOpen(false)
        props.onChange([item])
      } else if (props.multi) {
        setSelection([...selection, item])
        props.onChange([...selection, item])
      }
    } else {
      let selectionAfterRemoval = selection
      selectionAfterRemoval = selectionAfterRemoval.filter(
        (current) => current?.value !== item.value
      )
      setSelection([...selectionAfterRemoval])
      props.onChange([...selectionAfterRemoval])
    }
  }

  function isItemInSelection(item: any) {
    return selection.some((current) => current?.value === item.value)
  }

  // Handle outside click
  const ref = useRef(null)
  const close = (e: any) => {
    setIsOpen(() => e && e.target === ref.current)
  }

  useEffect(() => {
    document.addEventListener("click", close)
    return () => document.removeEventListener("click", close)
  }, [])

  return (
    <Container>
      {props.label && <label htmlFor={props.name}>{props.label}</label>}
      <InputContainer
        ref={ref}
        id={props.name}
        onClick={toggling}
        primary={props.primary}
      >
        <Input>
          {props.multi
            ? selection.length !== 0
              ? `${selection.length} item(s) selected`
              : props.placeholder
            : selection[0]?.label || props.placeholder}
        </Input>
        <Image
          src="/icons/ChevronDown.svg"
          alt="search-icon"
          width={24}
          height={24}
        />
      </InputContainer>
      {props.error && <DangerText>{props.error}</DangerText>}
      {isOpen && (
        <Options>
          {props.options.map((option: any) => (
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
