import Head from "next/head"
import Link from "next/link"
import type { NextPage } from "next"

import Card from "@elements/Card"
import { Link as ALink } from "@elements/Button"
import { Container, Main, HeaderText, BoldText } from "@elements/Common"

const Home: NextPage = () => {
  return (
    <Container>
      <Head>
        <title>Stock Management System</title>
        <meta name="description" content="stock management" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Main width="100%">
        <HeaderText>
          <BoldText>Stock Management System</BoldText>
        </HeaderText>

        <Link href="/login" passHref>
          <ALink>Login &rarr;</ALink>
        </Link>

        <Card />
      </Main>
    </Container>
  )
}

export default Home
