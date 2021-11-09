import Image from "next/image"
import { useEffect } from "react"
import styled from "styled-components"

import { toTitleCase } from "@utils/common"
import { IconButton } from "@components/Buttons"
import { SubHeading, Placeholder } from "@components/Texts"
import { useAppContext, NotifierTypes } from "@contexts/index"

type ContainerType = {
  place: number
  type?: "success" | "warning" | "error"
}

const Container = styled.div<ContainerType>`
  width: 345px;
  height: 76px;
  display: flex;
  overflow: hidden;
  flex-direction: column;
  background-color: rgba(255, 255, 255, 0.66);
  gap: ${({ theme }) => theme.gaps.extraLight};
  filter: drop-shadow(0px 4px 8px rgba(0, 0, 0, 0.1));
  border-radius: ${({ theme }) => theme.borders.radius.default};
  padding: ${({ theme }) => theme.gaps.semiLight}
    ${({ theme }) => theme.gaps.semiLight};
  border-bottom: 2px solid
    ${({ theme, type }) =>
      type === "success"
        ? theme.colors.success
        : type === "warning"
        ? theme.colors.warning
        : type === "error"
        ? theme.colors.error
        : theme.colors.primary};

  position: absolute;
  z-index: 150;
  right: ${({ theme }) => theme.gaps.defaultN}px;
  bottom: ${({ theme, place }) =>
    place * theme.gaps.defaultN + place * 76 + theme.gaps.defaultN}px;
`

const Header = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`

const timeouts: string[] = []

export const Notifier = () => {
  const { state, dispatch } = useAppContext()

  useEffect(() => {
    state.notifications.forEach((notification) => {
      const timeoutIndex = timeouts.findIndex((t) => t === notification.key)
      if (timeoutIndex === -1) {
        timeouts.push(notification.key)
        setTimeout(() => {
          removeNotification(notification.key)
          timeouts.splice(timeoutIndex, 1)
        }, 3000)
      }
    })

    // eslint-disable-next-line
  }, [state.notifications])

  const removeNotification = (key: any) => {
    dispatch({
      type: NotifierTypes.REMOVE_NOTIFICATION,
      payload: {
        key,
      },
    })
  }

  return state.notifications.map((notification: any, index: number) => (
    <Container
      place={index}
      className="is-open"
      key={notification.key}
      type={notification.type}
    >
      <Header>
        <SubHeading>{toTitleCase(notification.type)}</SubHeading>
        <IconButton onClick={() => removeNotification(notification.key)}>
          <Image
            src="/icons/Cross.svg"
            alt="search-icon"
            width={16}
            height={16}
          />
        </IconButton>
      </Header>
      <Placeholder>{notification.message}</Placeholder>
    </Container>
  ))
}
