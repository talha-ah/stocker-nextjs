import Image from "next/image"
import styled from "styled-components"

import { IconButton } from "@components/Buttons"

const SearchBar = styled.div`
  width: 300px;
  height: 24px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.gaps.light};
`

const StyledImage = styled(Image)`
  color: red !important;
`

const Input = styled.input`
  width: 100%;
  height: 100%;
  padding: 0 ${({ theme }) => theme.gaps.light};
`

export const SearchIconInput = () => {
  return (
    <SearchBar>
      <Input
        id="search"
        name="search"
        type="search"
        placeholder="Search"
        style={{ width: 0 }}
      />
      <IconButton onClick={() => alert("Search")}>
        <StyledImage
          src="/icons/Search.svg"
          alt="search-icon"
          width={24}
          height={24}
        />
      </IconButton>
    </SearchBar>
  )
}
