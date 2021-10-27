import Head from "next/head"
import Link from "next/link"
import type { NextPage } from "next"

import { Button, Anchor } from "@components/Buttons"
import { Main, Container } from "@components/Common"
import { BigText, DangerText } from "@components/Texts"
import { Form, InputField } from "@components/FormField"

import { useLogin } from "@hooks/auth"

const Login: NextPage = () => {
  const { data, doLogin, loading, error } = useLogin()

  const onSubmit = async (e: any) => {
    e.preventDefault()
    const email = e.target.email.value
    const password = e.target.password.value
    doLogin({ email, password })
  }

  return (
    <Container>
      <Head>
        <title>Login - Stock Management</title>
        <meta name="description" content="stock management" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Main width="100%">
        <BigText>Stock Management System</BigText>

        <Form onSubmit={onSubmit} width="600px">
          <InputField
            required
            name="email"
            type="email"
            label="Email Address"
          />

          <InputField
            required
            name="password"
            type="password"
            label="Password"
          />

          <Button type="submit" loading={loading}>
            Login
          </Button>
          {error && <DangerText>{error}</DangerText>}
        </Form>

        <Link href="/" passHref>
          <Anchor>&larr; Back</Anchor>
        </Link>
      </Main>
    </Container>
  )
}

export default Login
