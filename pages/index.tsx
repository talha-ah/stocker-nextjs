import Head from "next/head"
import Link from "next/link"
import Image from "next/image"
import { useEffect } from "react"
import type { NextPage } from "next"
import styled from "styled-components"
import { useRouter } from "next/router"

import { Container, Main } from "@components/Common"
import { Heading, SemiSmall } from "@components/Texts"
import { Button, GhostButton } from "@components/Buttons"

const Content = styled.div`
  width: 100%;
  display: flex;
  max-width: 550px;
  align-items: center;
  flex-direction: column;
  justify-content: space-between;
  gap: ${({ theme }) => theme.gaps.bold};
`

const ContentItem = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
`

const ContentActions = styled.div`
  width: 100%;
  display: flex;
  max-width: 220px;
  align-items: center;
  flex-direction: column;
  gap: ${({ theme }) => theme.gaps.light};
`

const BlackHeading = styled(Heading)`
  color: ${({ theme }) => theme.colors.black};
`

const Home: NextPage = () => {
  const router = useRouter()

  useEffect(() => {
    router.prefetch("/login")
    // eslint-disable-next-line
  }, [])

  return (
    <Container>
      <Head>
        <title>Stocker</title>
        <meta name="description" content="stocker" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Main width="100%">
        <Content>
          <ContentItem>
            <Image
              width={200}
              height={200}
              src="/images/people.png"
              alt="Picture of the author"
            />
          </ContentItem>
          <ContentItem>
            <BlackHeading>
              Welcome to Stocker! We’re glad you’re here.
            </BlackHeading>
            <SemiSmall>
              Stocker is your tool to create and manage your stocks.
            </SemiSmall>
          </ContentItem>
          <ContentActions>
            <Link href="/login" passHref>
              <Button fluid>Sign In</Button>
            </Link>
            <Link href="/register" passHref>
              <GhostButton fluid>Create new account</GhostButton>
            </Link>
          </ContentActions>
        </Content>
      </Main>
    </Container>
  )
}

export default Home
