import Head from "next/head"
import type { NextPage } from "next"

import { Layout } from "layouts/layout"

const App: NextPage = () => {
  return (
    <Layout>
      <Head>
        <title>Stocker</title>
        <meta name="description" content="stocker" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h3>Application Content</h3>
    </Layout>
  )
}

export default App
