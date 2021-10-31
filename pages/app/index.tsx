import Head from "next/head"
import type { NextPage } from "next"

import { Layout } from "@layouts/layout"
import { Select } from "@components/Select"

const App: NextPage = () => {
  return (
    <Layout>
      <Head>
        <title>Home - Stocker</title>
        <meta name="description" content="stocker" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h3>Home</h3>
      <Select
        multi
        required
        name="category"
        label="Category"
        placeholder="Category"
        onChange={(value: any) => console.log(value)}
        options={[
          { label: "Bulbs", value: "bulbs" },
          { label: "LEDs", value: "leds" },
          { label: "Pliers", value: "pliers" },
        ]}
      />
    </Layout>
  )
}

export default App
