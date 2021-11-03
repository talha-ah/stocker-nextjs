import Image from "next/image"
import styled from "styled-components"
import { useState, useRef, useEffect } from "react"

import { generateId } from "@utils/common"
import { useDebounce } from "@hooks/debounce"
import { DangerText } from "@components/Texts"

type SelectorType = {
  primary?: boolean
}

type OptionType = {
  active?: boolean
  onClick?: any
}

type NonOptionType = {
  button?: boolean
}

export type SelectType = {
  value?: string
  label?: string
} | null

const Container = styled.div`
  width: 100%;
  display: flex;
  position: relative;
  flex-direction: column;
  transition: all 0.3s ease 0s;
`

const Selector = styled.div<SelectorType>`
  width: 100%;
  height: 34px;
  overflow: hidden;
  position: relative;
  transition: all 0.3s ease 0s;
  border-bottom: ${({ theme }) => theme.borders.input};
  border-radius: ${({ theme }) => theme.borders.radius.default};
  background-color: ${({ primary, theme }) =>
    primary ? theme.colors.bg : theme.colors.white};
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

const Input = styled.input`
  border: 0;
  outline: 0;
  width: 100%;
  height: 100%;
  font-size: 14px;
  transition: all 0.3s ease 0s;
  background-color: transparent;
  padding: 0px ${({ theme }) => theme.gaps.semiLight};
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
  transform: translate(0px, 60px);
  padding: ${({ theme }) => theme.gaps.light} 0px;
  filter: drop-shadow(0px 4px 8px rgba(0, 0, 0, 0.1));
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.borders.radius.default};
`

const Option = styled.div<OptionType>`
  width: 100%;
  height: 34px;
  display: flex;
  font-size: 14px;
  cursor: pointer;
  align-items: center;
  font-weight: normal;
  justify-content: space-between;
  padding: 0px ${({ theme }) => theme.gaps.semiLight};

  &:hover {
    background-color: ${({ theme }) => theme.colors.bg};
  }
`

const NonOption = styled.div<NonOptionType>`
  width: 100%;
  display: flex;
  font-size: 14px;
  font-weight: normal;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  padding: 0px ${({ theme }) => theme.gaps.light};

  &:hover {
    cursor: ${({ button }) => (button ? "pointer" : "default")};
    text-decoration: ${({ button }) => (button ? "underline" : "none")};
  }
`

export const SearchSelect = ({
  name,
  label,
  error,
  value,
  primary,
  loading,
  options,
  onSearch,
  onSelect,
  onCreate,
  placeholder,
}: {
  options: any
  name: string
  onSelect: any
  onSearch: any
  onCreate?: any
  value?: string
  label?: string
  error?: string
  primary?: boolean
  loading?: boolean
  placeholder?: string
}) => {
  const [query, setQuery] = useState("")
  const [open, setOpen] = useState(false)

  const debouncedQuery = useDebounce(query, 500)

  useEffect(() => {
    onSearch && onSearch(debouncedQuery)
    // eslint-disable-next-line
  }, [debouncedQuery])

  // ============= > Handle outside click
  const ref = useRef(null)

  const toggle = (e?: any) => {
    setOpen(() => e && e.target === ref.current)
  }

  useEffect(() => {
    document.addEventListener("click", toggle)
    return () => document.removeEventListener("click", toggle)
  }, [])

  // Handle outside click < =============

  return (
    <Container onClick={(e) => e.stopPropagation()}>
      {label && <label htmlFor={name}>{label}</label>}

      <Selector primary={primary}>
        <Input
          ref={ref}
          type="text"
          name="query"
          onClick={toggle}
          autoComplete="off"
          placeholder={placeholder}
          value={value ? value : query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <SelectorIcon>
          <Image
            src="/icons/Search.svg"
            alt="search-icon"
            width={24}
            height={24}
          />
        </SelectorIcon>
      </Selector>
      {error && <DangerText>{error}</DangerText>}
      {open && (
        <Options>
          {loading ? (
            <NonOption>
              <span>Loading...</span>
            </NonOption>
          ) : (
            <>
              {options.map((option: any) => (
                <Option
                  key={generateId()}
                  onClick={() => {
                    toggle()
                    setQuery("")
                    onSelect && onSelect(option)
                  }}
                >
                  <span>{option.label}</span>
                </Option>
              ))}
              {onCreate ? (
                <NonOption
                  button
                  onClick={() => {
                    toggle()
                    setQuery("")
                    onCreate && onCreate()
                  }}
                >
                  <span>or Create One</span>
                </NonOption>
              ) : (
                options.length === 0 && (
                  <NonOption>
                    <span>Search something</span>
                  </NonOption>
                )
              )}
            </>
          )}
        </Options>
      )}
    </Container>
  )
}
