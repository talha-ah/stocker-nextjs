import Head from "next/head"
import type { NextPage } from "next"
import styled from "styled-components"

import { Layout } from "@layouts/layout"
import { Card } from "@components/Common"
import { Header } from "@components/Table"

const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  gap: ${({ theme }) => theme.gaps.default};
`

const SalesReports: NextPage = () => {
  return (
    <Layout>
      <Head>
        <title>Sales Reports - Stocker</title>
        <meta name="description" content="stocker" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Content>
        <Card>
          <Header title="Sales" actions={false} />
        </Card>
        <Card>
          <Header title="Profits" actions={false} />
        </Card>
      </Content>
    </Layout>
  )
}

export default SalesReports
