import styled from "styled-components"
import Image from "next/image"

import Menu from "@components/Menu"
import { Heading } from "@components/Texts"

const Container = styled.div`
  width: 100%;
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.bg};
  display: flex;
  flex-direction: column;
`

const Header = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  padding: 0 24px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.gaps.light};
  background-color: ${({ theme }) => theme.colors.primary};
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
  width: 200px;
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
  return (
    <Container>
      <Header>
        <Heading>Stock Management System</Heading>
        <Avatar>
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
