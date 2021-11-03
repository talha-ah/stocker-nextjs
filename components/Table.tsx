import Image from "next/image"
import styled from "styled-components"

import { generateId } from "@utils/common"
import { Heading } from "@components/Texts"
import { IconButton } from "@components/Buttons"
import { SearchIconInput } from "@components/SearchInput"

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
  color: red;
`

export const Header = ({
  title,
  actions = true,
  add = () => null,
}: {
  title: string
  actions?: boolean
  add?: any
}) => {
  return (
    <HeaderContainer>
      <Heading>{title}</Heading>
      {actions && (
        <Icons>
          <SearchIconInput />
          <IconButton onClick={add}>
            <StyledImage
              src="/icons/Plus.svg"
              alt="search-icon"
              width={24}
              height={24}
            />
          </IconButton>
          <IconButton>
            <StyledImage
              src="/icons/Settings.svg"
              alt="search-icon"
              width={24}
              height={24}
            />
          </IconButton>
        </Icons>
      )}
    </HeaderContainer>
  )
}

const TableContainer = styled.table`
  width: 100%;
  font-size: 14px;
  font-weight: 400;
  border-collapse: collapse;
  color: ${({ theme }) => theme.colors.placeholder};
  font-family: Segoe UI, Arial, Helvetica, sans-serif;

  & tr {
    border-radius: 60px;
  }

  // & tr:nth-child(even) {
  //   background-color: ${({ theme }) => theme.colors.white};
  // }

  & tr:hover {
    background-color: ${({ theme }) => theme.colors.white};
  }

  & th {
    text-align: left;
    color: ${({ theme }) => theme.colors.text};
    background-color: ${({ theme }) => theme.colors.white};
  }

  & td,
  & th {
    padding: ${({ theme }) => theme.gaps.light}
      ${({ theme }) => theme.gaps.semiLight};
    border-bottom: ${({ theme }) => theme.borders.tableBorder};

    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
`

export const Table = ({
  rows,
  headers,
  loading,
}: {
  rows: any
  headers: any
  loading?: boolean
}) => {
  return (
    <TableContainer>
      <thead>
        <tr>
          {headers?.map((header: any) => (
            <th key={header.key}>{header.name}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {loading ? (
          <tr>
            <td colSpan={headers?.length} style={{ textAlign: "center" }}>
              Loading...
            </td>
          </tr>
        ) : (
          rows?.map((row: any) => (
            <tr key={generateId()}>
              {headers.map((header: any) => (
                <td key={generateId()}>{row[header.field]}</td>
              ))}
            </tr>
          ))
        )}
      </tbody>
    </TableContainer>
  )
}
