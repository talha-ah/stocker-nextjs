import Image from "next/image"
import { useState } from "react"
import styled from "styled-components"

import { Menu } from "@components/Menu"
import { useLogout } from "@hooks/auth"
import { Burger } from "@components/icons"
import { Heading } from "@components/Texts"
import { FlexRow } from "@components/Common"
import { IconButton } from "@components/Buttons"

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
  gap: ${({ theme }) => theme.gaps.light};
  padding: 12px ${({ theme }) => theme.gaps.semiLight};
  background-color: ${({ theme }) => theme.colors.primary};
`

const WhiteHeading = styled(Heading)`
  color: ${({ theme }) => theme.colors.white};
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

const Sidebar = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  transition: all 0.3s ease 0s;
  border-right: 1px solid white;
  padding: ${({ theme }) => theme.gaps.light};
`

const Content = styled.div`
  width: 100%;
  height: 100%;
  padding: ${({ theme }) => theme.gaps.default};
`

export const Layout = ({ children }: { children: any }) => {
  const { doLogout } = useLogout()
  const [isOpen, setIsOpen] = useState(true)

  return (
    <Container>
      <Header>
        <FlexRow>
          <IconButton onClick={() => setIsOpen((s) => !s)}>
            <Burger size={24} color="white" />
          </IconButton>
          <WhiteHeading>Stocker</WhiteHeading>
        </FlexRow>
        <Avatar onClick={() => doLogout()}>
          <Image src="/images/avatar.png" alt="avatar" width={25} height={25} />
        </Avatar>
      </Header>
      <Page>
        {isOpen && (
          <Sidebar>
            <Menu />
          </Sidebar>
        )}
        <Content>{children}</Content>
      </Page>
    </Container>
  )
}
