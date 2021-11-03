import Head from "next/head"
import Link from "next/link"
import { useEffect } from "react"
import type { NextPage } from "next"
import styled from "styled-components"
import { useRouter } from "next/router"

import { useLogin } from "@hooks/auth"
import { Form, Input } from "@components/Inputs"
import { Main, Container } from "@components/Common"
import { BigHeading, Small } from "@components/Texts"
import { Button, GhostButton } from "@components/Buttons"

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

  const { doLogin, loading, error } = useLogin()

  const onSubmit = async (e: any) => {
    e.preventDefault()
    const email = e.target.email.value
    const password = e.target.password.value
    doLogin({ email, password })
  }

  useEffect(() => {
    router.prefetch("/register")
    router.prefetch("/app")
    // eslint-disable-next-line
  }, [])

  return (
    <Container>
      <Head>
        <title>Login - Stocker</title>
        <meta name="description" content="stocker" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Main width="100%">
        {/* <Anchor onClick={() => router.back()}>&larr; Back</Anchor> */}
        <FormWrapper>
          <Texts>
            <BigHeading>Welcome</BigHeading>
            <Small>Kindly login to continue</Small>
          </Texts>
          <Form onSubmit={onSubmit}>
            <Input
              required
              name="email"
              type="email"
              error={error}
              label="Email Address"
              placeholder="name@domain.com"
            />

            <Input
              required
              error={error}
              name="password"
              type="password"
              label="Password"
              placeholder="*********"
            />

            <Actions>
              <Button fluid type="submit">
                {loading ? "Loading..." : "Login"}
              </Button>
              <Link href="/register" passHref>
                <GhostButton fluid>Create new account</GhostButton>
              </Link>
            </Actions>
          </Form>
        </FormWrapper>
      </Main>
    </Container>
  )
}

export default Login
