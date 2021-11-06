import Head from "next/head"
import type { NextPage } from "next"
import styled from "styled-components"

import { Layout } from "@layouts/layout"
import { Header } from "@components/Table"

const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  gap: ${({ theme }) => theme.gaps.default};
`

const Card = styled.div`
  width: 100%;
  display: flex;
  padding: 10px 20px;
  border-radius: 5px;
  color: rgb(0, 0, 0);
  flex-direction: column;
  transition: all 0.3s ease 0s;
  background-color: transparent;
  border: 2px solid rgb(4, 6, 8);
  box-shadow: rgb(210 239 253) 6px 6px;
  gap: ${({ theme }) => theme.gaps.light};
  font-family: Segoe UI, Helvetica Neue, Arial, sans-serif, Apple Color Emoji,
    Segoe UI Emoji, Segoe UI Symbol, SF Pro Display, -apple-system, acumin-pro,
    BlinkMacSystemFont;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
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
