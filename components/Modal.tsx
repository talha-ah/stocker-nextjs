import styled from "styled-components"
import { useEffect, useState, useRef } from "react"

import { Cross } from "@components/icons"
import { Heading } from "@components/Texts"
import { Button } from "@components/Buttons"

const Container = styled.div`
  width: 100%;
  background: rgba(0, 0, 0, 0.5);
  padding: ${({ theme }) => theme.spacing.default}px;

  position: fixed;
  bottom: 0;
  right: 0;
  top: 0;
  z-index: 100;

  opacity: 0;
  visibility: hidden;
  transition: visibility 0s linear 300ms, opacity 300ms;

  display: flex;
  align-items: center;
  justify-content: center;

  &.is-open {
    opacity: 1;
    visibility: visible;
    transition: visibility 0s linear 0s, opacity 300ms;
  }
`

type BodyType = {
  width: number
}

const Body = styled.div<BodyType>`
  display: flex;
  flex-direction: column;
  width: ${({ width }) => width}px;
  gap: ${({ theme }) => theme.spacing.semiLight}px;
  padding: ${({ theme }) => theme.spacing.default}px;
  background-color: ${({ theme }) => theme.palette.white};
  border-radius: ${({ theme }) => theme.shape.borderRadius.default}px;
`

const Header = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`

const Content = styled.div`
  width: 100%;
`

export const Modal = (props: any) => {
  const [show, setShow] = useState(false)

  const toggleShow = (state: boolean) => {
    setShow(state)
    props.setShow(state)
  }

  useEffect(() => {
    toggleShow(props.show)
    // eslint-disable-next-line
  }, [props.show])

  // Handle outside click
  const ref = useRef(null)
  const close = (e: any) => {
    toggleShow(e && e.target !== ref.current)
  }

  useEffect(() => {
    const element = document.getElementById("modal")
    element?.addEventListener("click", close)
    return () => element?.removeEventListener("click", close)
    // eslint-disable-next-line
  }, [])

  return (
    <Container ref={ref} id="modal" className={show ? "is-open" : ""}>
      <Body width={props.width || 500}>
        <Header>
          <Heading>{props.title}</Heading>
          <Button iconed onClick={() => toggleShow(false)}>
            <Cross />
          </Button>
        </Header>
        <Content>{props.children}</Content>
      </Body>
    </Container>
  )
}
