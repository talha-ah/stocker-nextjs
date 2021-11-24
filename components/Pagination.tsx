import styled from "styled-components"

import { Button } from "@components/Buttons"
import { ChevronLeft, ChevronRight } from "@components/icons"

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  gap: ${({ theme }) => theme.spacing.extraLight}px;
  margin-top: ${({ theme }) => theme.spacing.semiLight}px;
  padding: ${({ theme }) => theme.spacing.light}px
    ${({ theme }) => theme.spacing.default}px;
`

type ButtonType = {
  active?: boolean
}

const ButtonContainer = styled.button<ButtonType>`
  border: 0;
  outline: 0;
  width: 30px;
  height: 30px;
  cursor: pointer;
  transition: all 0.3s ease 0s;
  border-radius: ${({ theme }) => theme.shape.borderRadius.light}px;
  color: ${({ theme, active }) =>
    active ? theme.palette.white : theme.palette.text};
  background-color: ${({ theme, active }) =>
    active ? theme.palette.primary : "transparent"};

  :hover {
    background-color: ${({ theme, active }) =>
      active ? theme.palette.primary : "rgba(0, 0, 0, 0.1)"};
  }
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
      <Button
        iconed
        disabled={currentPage - 1 === 0}
        onClick={() => onChange(currentPage - 1)}
      >
        <ChevronLeft />
      </Button>
      {pages().map((page) => (
        <ButtonContainer
          key={page}
          active={page === currentPage}
          onClick={() => onChange(page)}
        >
          {page}
        </ButtonContainer>
      ))}
      <Button
        iconed
        disabled={currentPage + 1 > totalPages}
        onClick={() => onChange(currentPage + 1)}
      >
        <ChevronRight />
      </Button>
    </Container>
  )
}
