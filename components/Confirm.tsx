import { useState } from "react"
import styled from "styled-components"

import { Cross } from "@components/icons"
import { Button } from "@components/Buttons"
import { Heading, Description } from "@components/Texts"

const Container = styled.div`
  width: 100%;
  background: rgba(0, 0, 0, 0.5);
  padding: ${({ theme }) => theme.spacing.default}px;

  position: fixed;
  bottom: 0;
  right: 0;
  top: 0;
  z-index: ${({ theme }) => theme.zIndex.confirm};

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

const Body = styled.div`
  width: 500px;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.light}px;
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

const Actions = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  gap: ${({ theme }) => theme.spacing.light}px;
  margin-top: ${({ theme }) => theme.spacing.semiLight}px;
`

export const Confirm = (props: any) => {
  const [show, setShow] = useState(false)

  const toggleShow = () => setShow(!show)

  return (
    <>
      {props.trigger({ open: toggleShow })}
      <Container className={show ? "is-open" : ""}>
        <Body>
          <Header>
            <Heading>{props.title || "Confirm"}</Heading>
            <Button iconed onClick={toggleShow}>
              <Cross />
            </Button>
          </Header>
          <Content>
            <Description>{props.message}</Description>
          </Content>
          <Actions>
            <Button neutral onClick={toggleShow}>
              Cancel
            </Button>
            <Button primary onClick={() => props.onConfirm(toggleShow)}>
              Confirm
            </Button>
          </Actions>
        </Body>
      </Container>
    </>
  )
}
