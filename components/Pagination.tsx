import styled from "styled-components"

import { IconButton } from "@components/Buttons"
import { ChevronLeft, ChevronRight } from "@components/icons"

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  gap: ${({ theme }) => theme.spacing.light}px;
  margin-top: ${({ theme }) => theme.spacing.semiLight}px;
  padding: ${({ theme }) => theme.spacing.light}px
    ${({ theme }) => theme.spacing.default}px;
`

type ButtonType = {
  active?: boolean
}

const Button = styled.button<ButtonType>`
  border: 0;
  outline: 0;
  cursor: pointer;
  padding: 5px 10px;
  border-radius: ${({ theme }) => theme.shape.borderRadius.light}px;
  color: ${({ theme, active }) =>
    active ? theme.palette.white : theme.palette.text};
  background-color: ${({ theme, active }) =>
    active ? theme.palette.primary : "transparent"};
`

export const Pagination = ({
  onChange,
  totalPages,
  currentPage,
}: {
  onChange: any
  totalPages: number
  currentPage: number
}) => {
  const pages = () => {
    const pages = []
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i)
    }
    return pages
  }

  return (
    <Container>
      <IconButton
        disabled={currentPage - 1 === 0}
        onClick={() => onChange(currentPage - 1)}
      >
        <ChevronLeft />
      </IconButton>
      {pages().map((page) => (
        <Button
          key={page}
          active={page === currentPage}
          onClick={() => onChange(page)}
        >
          {page}
        </Button>
      ))}
      <IconButton
        disabled={currentPage + 1 > totalPages}
        onClick={() => onChange(currentPage + 1)}
      >
        <ChevronRight />
      </IconButton>
    </Container>
  )
}
