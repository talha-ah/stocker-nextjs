import Head from "next/head"
import Link from "next/link"
import type { NextPage } from "next"

import { Link as ALink } from "@components/Button"
import { Container, Main, HeaderText } from "@components/Common"

const Home: NextPage = () => {
  return (
    <Container>
      <Head>
        <title>Stock Management System</title>
        <meta name="description" content="stock management" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Main width="100%">
        <HeaderText>Stock Management System</HeaderText>

        <Link href="/login" passHref>
          <ALink>Login &rarr;</ALink>
        </Link>
      </Main>
    </Container>
  )
}

export default Home
