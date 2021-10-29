import Image from "next/image"
import styled from "styled-components"

import { generateId } from "@utils/common"
import { Heading } from "@components/Texts"

const HeaderContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`

const Icons = styled.div`
  color: red;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.gaps.light};
`

const StyledImage = styled(Image)`
  color: red !important;
`

const ButtonIcon = styled.button`
  border: 0 !important;
  padding: 0 !important;
  background-color: transparent !important;
`

export const Header = () => {
  return (
    <HeaderContainer>
      <Heading>Categories</Heading>
      <Icons>
        <ButtonIcon>
          <StyledImage
            src="/icons/Search.svg"
            alt="search-icon"
            width={24}
            height={24}
          />
        </ButtonIcon>
        <ButtonIcon>
          <StyledImage
            src="/icons/Plus.svg"
            alt="search-icon"
            width={24}
            height={24}
          />
        </ButtonIcon>
        <ButtonIcon>
          <StyledImage
            src="/icons/Settings.svg"
            alt="search-icon"
            width={24}
            height={24}
          />
        </ButtonIcon>
      </Icons>
    </HeaderContainer>
  )
}

const TableContainer = styled.table`
  width: 100%;
  border-collapse: collapse;
  color: ${({ theme }) => theme.colors.text};
  font-family: Segoe UI, Arial, Helvetica, sans-serif;

  & tr {
    border-radius: 60px;
  }

  & tr:nth-child(even) {
    background-color: ${({ theme }) => theme.colors.accent};
  }

  & tr:hover {
    background-color: ${({ theme }) => theme.colors.white};
  }

  & th {
    text-align: left;
    color: ${({ theme }) => theme.colors.text};
  }

  & td,
  & th {
    padding: ${({ theme }) => theme.gaps.light};
    border-bottom: ${({ theme }) => theme.borders.tableBorder};
  }
`

export const Table = ({ data }: { data: any }) => {
  return (
    <TableContainer>
      <thead>
        <tr>
          {data.headers.map((header: any) => (
            <th key={header.key}>{header.name}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.rows.map((row: any) => (
          <tr key={generateId()}>
            {data.headers.map((header: any) => (
              <td key={generateId()}>{row[header.field]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </TableContainer>
  )
}
