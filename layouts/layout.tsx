import Image from "next/image"
import styled from "styled-components"

import Menu from "@components/Menu"
import { useLogout } from "@hooks/auth"
import { Heading } from "@components/Texts"
import { IconButton } from "@components/Buttons"

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.bg};
`

const Header = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  padding: 0 ${({ theme }) => theme.gaps.semiLight};
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.gaps.light};
  background-color: ${({ theme }) => theme.colors.primary};
`

const Brand = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: center;
  gap: ${({ theme }) => theme.gaps.semiLight};
`

const WhiteHeading = styled(Heading)`
  color: ${({ theme }) => theme.colors.white};
`

const Avatar = styled.div`
  width: 25px;
  height: 25px;
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
  padding: 8px;
  display: flex;
  flex-direction: column;
  border-right: 1px solid white;
`

const Content = styled.div`
  width: 100%;
  height: 100%;
  padding: ${({ theme }) => theme.gaps.default};
`

export const Layout = ({ children }: { children: any }) => {
  const { doLogout } = useLogout()

  return (
    <Container>
      <Header>
        <Brand>
          <IconButton>
            <Image
              src="/icons/Burger.svg"
              alt="burger-icon"
              width={24}
              height={24}
            />
          </IconButton>
          <WhiteHeading>Stock Management System</WhiteHeading>
        </Brand>
        <Avatar onClick={() => doLogout()}>
          <Image src="/images/avatar.png" alt="avatar" width={25} height={25} />
        </Avatar>
      </Header>
      <Page>
        <Sidebar>
          <Menu />
        </Sidebar>
        <Content>{children}</Content>
      </Page>
    </Container>
  )
}
