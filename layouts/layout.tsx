import Image from "next/image"
import { useState } from "react"
import styled from "styled-components"

import { Menu } from "@components/Menu"
import { useLogout } from "@hooks/auth"
import { Burger } from "@components/icons"
import { Heading } from "@components/Texts"
import { FlexRow } from "@components/Common"
import { Button } from "@components/Buttons"
import { Confirm } from "@components/Confirm"

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
`

const Header = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.light}px;
  padding: 12px ${({ theme }) => theme.spacing.semiLight}px;
  background-color: ${({ theme }) => theme.palette.primary};
  min-height: ${({ theme }) => theme.mixins.toolbar.height}px;
`

const WhiteHeading = styled(Heading)`
  color: ${({ theme }) => theme.palette.white};
`

const Avatar = styled.div`
  width: 24px;
  height: 24px;
  display: flex;
  cursor: pointer;
  border-radius: 50%;
  align-items: center;
  background-color: white;
  justify-content: center;
`

const Page = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
`

type SideBarType = {
  open?: boolean
}

const Sidebar = styled.div<SideBarType>`
  height: 100%;
  display: flex;
  overflow: hidden;
  flex-direction: column;
  transition: all 0.3s ease 0s;
  border-right: 1px solid white;
  padding: ${({ theme }) => theme.spacing.light}px
    ${({ open, theme }) => (open ? theme.spacing.light : 0)}px;
  width: ${({ open, theme }) => (open ? theme.mixins.sidebar.minWidth : 0)}px;
`

const Content = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: auto;
  scroll-behavior: smooth;
  padding: ${({ theme }) => theme.spacing.default}px;

  ::-webkit-scrollbar {
    width: 2px;
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 10%;
    background-color: ${({ theme }) => theme.palette.primary};
  }
`

export const Layout = ({ children }: { children: any }) => {
  const { doLogout } = useLogout()
  const [isOpen, setIsOpen] = useState(true)

  return (
    <Container>
      <Header>
        <FlexRow>
          <Button iconed onClick={() => setIsOpen((s) => !s)}>
            <Burger size={24} color="white" />
          </Button>
          <WhiteHeading>Stocker</WhiteHeading>
        </FlexRow>

        <Confirm
          title="Logout"
          onConfirm={() => doLogout()}
          message="Are you sure you want to logout?"
          trigger={({ open }: { open: any }) => (
            <Avatar onClick={open}>
              <Image
                src="/images/avatar.png"
                alt="avatar"
                width={25}
                height={25}
              />
            </Avatar>
          )}
        />
      </Header>
      <Page>
        <Sidebar open={isOpen}>
          <Menu />
        </Sidebar>
        <Content>{children}</Content>
      </Page>
    </Container>
  )
}
