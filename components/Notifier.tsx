import { useEffect } from "react"
import styled from "styled-components"

import { Cross } from "@components/icons"
import { toTitleCase } from "@utils/common"
import { Button } from "@components/Buttons"
import { SubHeading, Placeholder } from "@components/Texts"
import { useAppContext, NotifierTypes } from "@contexts/index"

type ContainerType = {
  place: number
  type?: "success" | "warning" | "error"
}

const Container = styled.div<ContainerType>`
  width: 345px;
  display: flex;
  overflow: hidden;
  flex-direction: column;
  transition: all 0.3s ease 0s;
  gap: ${({ theme }) => theme.spacing.extraLight}px;
  filter: drop-shadow(0px 4px 8px rgba(0, 0, 0, 0.1));
  background-color: ${({ theme }) => theme.palette.white};
  border-radius: ${({ theme }) => theme.shape.borderRadius.default}px;
  padding: ${({ theme }) => theme.spacing.semiLight}px
    ${({ theme }) => theme.spacing.semiLight}px;
  border-left: 2px solid
    ${({ theme, type }) =>
      type === "success"
        ? theme.palette.success
        : type === "warning"
        ? theme.palette.warning
        : type === "error"
        ? theme.palette.error
        : theme.palette.primary};

  position: absolute;
  z-index: ${({ theme }) => theme.zIndex.notifier};
  right: ${({ theme }) => theme.spacing.default}px;
  bottom: ${({ theme, place }) =>
    place * theme.spacing.default + place * 76 + theme.spacing.default}px;
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
        }, 5000)
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

  return (
    <>
      {state.notifications.map((notification: any, index: number) => (
        <Container
          place={index}
          className="is-open"
          key={notification.key}
          type={notification.type}
        >
          <Header>
            <SubHeading>{toTitleCase(notification.type)}</SubHeading>
            <Button
              small
              iconed
              hover={false}
              onClick={() => removeNotification(notification.key)}
            >
              <Cross />
            </Button>
          </Header>
          <Placeholder>{notification.message}</Placeholder>
        </Container>
      ))}
    </>
  )
}
