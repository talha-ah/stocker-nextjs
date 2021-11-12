import Head from "next/head"
import { useEffect } from "react"
import type { NextPage } from "next"
import styled from "styled-components"
import { useRouter } from "next/router"

import { DoLogin } from "@forms/auth"
import { useLogin } from "@hooks/auth"
import { Logo } from "@components/Buttons"
import { Main, Container } from "@components/Common"
import { BigHeading, Small, Heading } from "@components/Texts"

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

const Login: NextPage = () => {
  const router = useRouter()

  const { doLogin, loading, error } = useLogin()

  const onSubmit = async (body: any) => {
    doLogin(body)
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
        <Logo>
          <Heading color="primary" onClick={() => router.replace("/")}>
            Stocker
          </Heading>
        </Logo>
        <FormWrapper>
          <Texts>
            <BigHeading>Welcome</BigHeading>
            <Small>Kindly login to continue</Small>
          </Texts>
          <DoLogin onSubmit={onSubmit} loading={loading} error={error} />
        </FormWrapper>
      </Main>
    </Container>
  )
}

export default Login
