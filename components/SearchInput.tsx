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
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.light}px;
  height: ${({ small }) => (small ? "24px" : "30px")};
  padding-right: ${({ theme }) => theme.spacing.light}px;
  max-width: ${({ width }) => (width ? `${width}px` : "100%")};
  border-radius: ${({ theme }) => theme.shape.borderRadius.default}px;
  border-bottom: ${({ theme }) => theme.mixins.inputs.borders.primary};
  background-color: ${({ primary, theme }) =>
    primary ? theme.palette.bg : theme.palette.white};
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
  border-radius: ${({ theme }) => theme.shape.borderRadius.default}px;
  padding-left: ${({ theme, small }) =>
    small ? theme.spacing.light : theme.spacing.semiLight}px;
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
  width = 400,
  placeholder,
}: {
  name?: string
  onSearch?: any
  value?: string
  error?: string
  width?: number
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
    <SearchBar width={width}>
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
