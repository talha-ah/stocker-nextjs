import Head from "next/head"
import Link from "next/link"
import type { NextPage } from "next"
import { useRouter } from "next/router"

import { Main, Container } from "@components/Common"
import { Form, InputField } from "@components/Inputs"
import { Button, GhostButton, Anchor } from "@components/Buttons"
import { DangerText, BigHeading, Small } from "@components/Texts"

import { useLogin } from "@hooks/auth"
import styled from "styled-components"

const FormWrapper = styled.div`
  width: 100%;
  display: flex;
  max-width: 400px;
  align-items: center;
  flex-direction: column;
  justify-content: space-between;
  gap: ${({ theme }) => theme.gaps.default};
`

const Texts = styled.div`
  width: 100%;
`

const Actions = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: ${({ theme }) => theme.gaps.light};
`

const Login: NextPage = () => {
  const router = useRouter()

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
        <Anchor onClick={() => router.back()}>&larr; Back</Anchor>
        <FormWrapper>
          <Texts>
            <BigHeading>Welcome</BigHeading>
            <Small>Kindly register to continue</Small>
          </Texts>
          <Form onSubmit={onSubmit}>
            <InputField
              required
              name="name"
              type="text"
              label="Name"
              placeholder="name"
            />

            <InputField
              required
              name="email"
              type="email"
              label="Email Address"
              placeholder="name@domain.com"
            />

            <InputField
              required
              name="password"
              type="password"
              label="Password"
              placeholder="*********"
            />

            <InputField
              required
              name="secret"
              type="password"
              label="Secret"
              placeholder="XXXX XXXX XXXX"
            />

            {error && <DangerText>{error}</DangerText>}

            <Actions>
              <Button fluid type="submit" loading={loading}>
                Register
              </Button>
              <Link href="/login" passHref>
                <GhostButton fluid>Login</GhostButton>
              </Link>
            </Actions>
          </Form>
        </FormWrapper>
      </Main>
    </Container>
  )
}

export default Login
