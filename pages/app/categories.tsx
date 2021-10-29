import Head from "next/head"
import type { NextPage } from "next"
import styled from "styled-components"

import { Layout } from "@layouts/layout"
import { Header } from "@components/Table"

const Content = styled.div`
  width: 100%;
`

const App: NextPage = () => {
  return (
    <Layout>
      <Head>
        <title>Categories - Stocker</title>
        <meta name="description" content="stocker" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Content>
        <Header />
      </Content>
    </Layout>
  )
}

export default App
