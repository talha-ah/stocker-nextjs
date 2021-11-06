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

type TableType = {
  hover?: boolean
  width?: string
}

const TableContainer = styled.table<TableType>`
  width: 100%;
  font-size: 14px;
  font-weight: 400;
  table-layout: auto;
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
    background-color: ${({ theme, hover }) =>
      hover ? theme.colors.white : "transparent"};
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

    max-width: 100px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
`

const calculateTotal = (headers: any, data: any, total_field: string) => {
  let total_value = 0
  data.map((d: any) => (total_value += d[total_field]))

  let index = 0
  const rows = headers.map((header: any, ind: number) => (
    <td key={generateId()}>
      {header.field === total_field && (index = ind) && total_value}
    </td>
  ))

  rows[index - 1] = <td key={rows[index - 1].key}>Sub Total</td>

  return rows
}

export const Table = ({
  id,
  rows,
  headers,
  loading,
  total_field,
  hover = true,
}: {
  rows: any
  id?: string
  headers: any
  hover?: boolean
  loading?: boolean
  total_field?: string
}) => {
  return (
    <TableContainer id={id} hover={hover}>
      <thead>
        <tr>
          {headers?.map((header: any) => (
            <th
              key={header.key}
              // width={header.width}
              style={{
                textAlign: header.align || "center",
                width: header.width,
              }}
            >
              {header.name}
            </th>
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
                <td
                  key={generateId()}
                  style={{ textAlign: header.align || "center" }}
                >
                  {row[header.field]}
                </td>
              ))}
            </tr>
          ))
        )}
        {total_field && <tr>{calculateTotal(headers, rows, total_field)}</tr>}
      </tbody>
    </TableContainer>
  )
}
