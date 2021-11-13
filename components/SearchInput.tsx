import styled from "styled-components"
import { useState, useEffect } from "react"

import { Search } from "@components/icons"
import { Spinner } from "@components/Spinner"
import { useDebounce } from "@hooks/debounce"
import { IconButton } from "@components/Buttons"

type InputType = {
  width?: number
  small?: boolean
  primary?: boolean
}

const SearchBar = styled.div<InputType>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.gaps.light};
  padding-right: ${({ theme }) => theme.gaps.light};
  height: ${({ small }) => (small ? "24px" : "30px")};
  width: ${({ width }) => (width ? `${width}px` : "100%")};
  border-bottom: ${({ theme }) => theme.borders.inputActive};
  border-radius: ${({ theme }) => theme.borders.radius.default};
  background-color: ${({ primary, theme }) =>
    primary ? theme.colors.bg : theme.colors.white};
`

const Icon = styled.div`
  color: red;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Input = styled.input<InputType>`
  border: 0;
  outline: 0;
  width: 100%;
  height: 100%;
  font-size: 14px;
  transition: all 0.3s ease 0s;
  background-color: transparent;
  border-radius: ${({ theme }) => theme.borders.radius.default};
  padding-left: ${({ theme, small }) =>
    small ? theme.gaps.light : theme.gaps.semiLight};
  font-family: Segoe UI, Helvetica Neue, Arial, sans-serif, Apple Color Emoji,
    Segoe UI Emoji, Segoe UI Symbol;
`

export const SearchIconInput = ({
  name,
  error,
  primary,
  loading,
  onSearch,
  value = "",
  placeholder,
}: {
  name?: string
  onSearch?: any
  value?: string
  error?: string
  primary?: boolean
  loading?: boolean
  placeholder?: string
}) => {
  const [query, setQuery] = useState<string>("")

  const debouncedQuery = useDebounce(query, 100)

  useEffect(() => {
    onSearch && onSearch(debouncedQuery)
    // eslint-disable-next-line
  }, [debouncedQuery])

  useEffect(() => {
    setQuery(value)
    // eslint-disable-next-line
  }, [value])

  return (
    <SearchBar>
      <Input
        id={name}
        name={name}
        type="search"
        value={query}
        primary={primary}
        placeholder={placeholder}
        onChange={(e) => setQuery(e.target.value)}
      />
      <IconButton onClick={() => onSearch(query)}>
        {loading ? (
          <Spinner size={16} />
        ) : (
          <Icon>
            <Search size={24} />
          </Icon>
        )}
      </IconButton>
    </SearchBar>
  )
}
