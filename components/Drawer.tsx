import Image from "next/image"
import styled from "styled-components"
import { useCallback, useEffect, useState } from "react"

import { Heading } from "@components/Texts"
import { IconButton } from "@components/Buttons"

const Container = styled.div`
  width: 100%;
  background: rgba(0, 0, 0, 0.5);
  padding: ${({ theme }) => theme.gaps.default};

  position: fixed;
  bottom: 0;
  right: 0;
  top: 0;

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
  width: 400px;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.gaps.semiLight};
  padding: ${({ theme }) => theme.gaps.default};
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.borders.radius.default};
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

export const Drawer = (props: any) => {
  const [show, setShow] = useState(false)

  const toggleShow = useCallback(
    (state: boolean) => {
      setShow(state)
      props.setShow(state)
    },
    [props]
  )

  useEffect(() => {
    toggleShow(props.show)
    // eslint-disable-next-line
  }, [toggleShow, props.show])

  return (
    <Container
      onClick={() => toggleShow(false)}
      className={`${show ? "is-open" : ""}`}
    >
      <Body onClick={(event) => event.stopPropagation()}>
        <Header>
          <Heading>{props.title}</Heading>
          <IconButton onClick={() => toggleShow(false)}>
            <Image
              src="/icons/Cross.svg"
              alt="search-icon"
              width={24}
              height={24}
            />
          </IconButton>
        </Header>
        <Content>{props.children}</Content>
      </Body>
    </Container>
  )
}
