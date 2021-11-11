import Image from "next/image"
import styled from "styled-components"
import { useState, useEffect } from "react"

import { generateId } from "@utils/common"
import { Heading } from "@components/Texts"
import { Spinner } from "@components/Spinner"
import { IconButton } from "@components/Buttons"
import { Pagination } from "@components/Pagination"
import { SearchIconInput } from "@components/SearchInput"

type TableType = {
  hover?: boolean
  width?: string
  hoverRow?: any
}

const HeaderContainer = styled.div`
  width: 100%;
  height: 30px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.gaps.light};
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

const TableScroll = styled.div`
  max-height: 720px;
  overflow-y: scroll;

  ::-webkit-scrollbar {
    width: 2px;
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 10%;
    background-color: ${({ theme }) => theme.colors.primary};
  }
`

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
    cursor: ${({ hoverRow }) => (hoverRow ? "pointer" : "default")};
  }

  & tr:hover {
    background-color: ${({ theme, hover }) =>
      hover ? theme.colors.white : "transparent"};
  }

  & th {
    top: 0;
    position: sticky;
    position: -webkit-sticky; // this is for all Safari (Desktop & iOS), not for Chrome
    z-index: 1; // any positive value, layer order is global

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

const calculateTotal = (headers: any, data: any, totalField: string) => {
  let total_value = 0
  data.map((d: any) => (total_value += d[totalField]))

  let index = 0
  const rows = headers.map((header: any, ind: number) => (
    <td key={generateId()}>
      {header.field === totalField && (index = ind) && total_value}
    </td>
  ))

  rows[index - 1] = <td key={rows[index - 1].key}>Sub Total</td>

  return rows
}

export const Header = ({
  name,
  title,
  error,
  primary,
  loading,
  onSearch,
  value = "",
  placeholder,
  actions = true,
  add = () => null,
}: {
  add?: any
  title: string
  name?: string
  onSearch?: any
  value?: string
  error?: string
  actions?: boolean
  primary?: boolean
  loading?: boolean
  placeholder?: string
}) => {
  return (
    <HeaderContainer>
      <Heading>{title}</Heading>
      {actions && (
        <Icons>
          <SearchIconInput
            name={name}
            value={value}
            error={error}
            primary={primary}
            loading={loading}
            onSearch={onSearch}
            placeholder={placeholder}
          />
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

const LIMIT = 50

export const Table = ({
  id,
  rows,
  headers,
  loading,
  totalField,
  onClickRow,
  hover = true,
  paginate = true,
}: {
  rows: any
  id?: string
  headers: any
  hover?: boolean
  onClickRow?: any
  loading?: boolean
  paginate?: boolean
  totalField?: any
}) => {
  const [data, setData] = useState<any[]>([])
  const [page, setPage] = useState<number>(1)

  useEffect(() => {
    if (paginate) {
      const trimStart = (page - 1) * LIMIT
      const trimEnd = trimStart + LIMIT
      const slicedArray = rows.slice(trimStart, trimEnd)
      setData(slicedArray)
    } else {
      setData(rows)
    }
    // eslint-disable-next-line
  }, [page, rows, loading])

  return (
    <>
      <TableScroll>
        <TableContainer id={id} hover={hover} hoverRow={onClickRow}>
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
                  <Spinner size={16} text="Loading..." position="left" />
                </td>
              </tr>
            ) : (
              data?.map((row: any) => (
                <tr
                  key={generateId()}
                  onClick={() => onClickRow && onClickRow(row)}
                >
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
            {totalField && rows.length > 0 && (
              <tr>{calculateTotal(headers, rows, totalField)}</tr>
            )}
          </tbody>
        </TableContainer>
      </TableScroll>
      {rows.length > LIMIT && (
        <Pagination
          currentPage={page}
          totalPages={Math.ceil(rows.length / LIMIT)}
          onChange={(value: number) => setPage(value)}
        />
      )}
    </>
  )
}
