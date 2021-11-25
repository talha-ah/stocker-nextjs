import styled from "styled-components"
import { useState, useEffect } from "react"

import { truncate } from "@utils/common"
import { Empty } from "@components/Empty"
import { generateId } from "@utils/common"
import { Heading } from "@components/Texts"
import { FlexRow } from "@components/Common"
import { Button } from "@components/Buttons"
import { Spinner } from "@components/Spinner"
import { Plus, Settings } from "@components/icons"
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
`

const Icons = styled.div`
  color: red;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.light}px;
`

type TableScrollType = {
  height: number
}

const TableScroll = styled.div<TableScrollType>`
  overflow-y: scroll;
  max-height: ${({ height }) => height}px;

  ::-webkit-scrollbar {
    width: 2px;
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 10%;
    background-color: ${({ theme }) => theme.palette.primary};
  }
`

const TableContainer = styled.table<TableType>`
  width: 100%;
  font-size: 14px;
  font-weight: 400;
  table-layout: auto;
  border-collapse: collapse;
  color: ${({ theme }) => theme.palette.placeholder};
  font-family: Segoe UI, Arial, Helvetica, sans-serif;

  & tr {
    border-radius: 60px;
    border-bottom: ${({ theme }) => theme.mixins.tables.borders.default};
  }

  & tbody > tr:hover {
    cursor: ${({ hoverRow }) => (hoverRow ? "pointer" : "default")};
    background-color: ${({ theme, hover }) =>
      hover ? theme.palette.white : "transparent"};
  }

  & th {
    top: 0;
    position: sticky;
    position: -webkit-sticky; // this is for all Safari (Desktop & iOS), not for Chrome
    z-index: 1; // any positive value, layer order is global

    text-align: left;
    color: ${({ theme }) => theme.palette.text};
    background-color: ${({ theme }) => theme.palette.white};
  }

  & td,
  & th {
    padding: ${({ theme }) => theme.spacing.light}px
      ${({ theme }) => theme.spacing.semiLight}px;

    max-width: 100px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
`

const TotalRow = styled.tr`
  bottom: 0;
  position: sticky;
  position: -webkit-sticky; // this is for all Safari (Desktop & iOS), not for Chrome
  z-index: 1; // any positive value, layer order is global
  background-color: ${({ theme }) => theme.palette.white};
`

const calculateTotal = (headers: any, data: any, totalField: string) => {
  let total_value = 0
  data.map((d: any) => (total_value += d[totalField]))

  let index = 0
  const rows = headers.map((header: any, ind: number) => (
    <td key={generateId()}>
      {header.field === totalField && (index = ind) && truncate(total_value, 2)}
    </td>
  ))

  rows[index - 1] = <td key={rows[index - 1].key}>Total</td>

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
        <>
          <SearchIconInput
            name={name}
            value={value}
            error={error}
            primary={primary}
            loading={loading}
            onSearch={onSearch}
            placeholder={placeholder}
          />
          <Icons>
            <Button iconed onClick={add}>
              <Plus size={24} />
            </Button>
            <Button iconed>
              <Settings size={24} />
            </Button>
          </Icons>
        </>
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
  height = 720,
  hover = true,
  paginate = true,
}: {
  rows: any
  id?: string
  headers: any
  hover?: boolean
  height?: number
  onClickRow?: any
  totalField?: any
  loading?: boolean
  paginate?: boolean
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
      <TableScroll height={height}>
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
          </tbody>
          <tfoot>
            {totalField && rows.length > 0 && (
              <TotalRow style={{ textAlign: "right" }}>
                {calculateTotal(headers, rows, totalField)}
              </TotalRow>
            )}
          </tfoot>
        </TableContainer>
      </TableScroll>
      {data.length === 0 && (
        <FlexRow justifyContent="center" style={{ height: 600 }}>
          <Empty />
        </FlexRow>
      )}
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
