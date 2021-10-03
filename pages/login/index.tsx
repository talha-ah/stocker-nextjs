import Head from "next/head"
import Link from "next/link"
import type { NextPage } from "next"

import { useLogin } from "@hooks/auth"
import { Form, InputField } from "@elements/FormField"
import { Button, Link as ALink } from "@elements/Button"
import {
  Main,
  BoldText,
  Container,
  HeaderText,
  DangerText,
} from "@elements/Common"

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
        <HeaderText>
          <BoldText>Login</BoldText>
        </HeaderText>

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

          <Button fluid type="submit" loading={loading}>
            Login
          </Button>
          {error && <DangerText>{error}</DangerText>}
        </Form>

        <Link href="/" passHref>
          <ALink>&larr; Back</ALink>
        </Link>
      </Main>
    </Container>
  )
}

export default Login
