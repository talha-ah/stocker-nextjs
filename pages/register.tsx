import Head from "next/head"
import type { NextPage } from "next"
import styled from "styled-components"
import { useRouter } from "next/router"

import { DoRegister } from "@forms/auth"
import { useRegister } from "@hooks/auth"
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
  gap: ${({ theme }) => theme.spacing.default}px;
`

const Texts = styled.div`
  width: 100%;
`

const Register: NextPage = () => {
  const router = useRouter()
  const { doRegister, loading, error } = useRegister()

  const onSubmit = async (body: any) => {
    doRegister(body)
  }

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
            <Small>Kindly register to continue</Small>
          </Texts>
          <DoRegister onSubmit={onSubmit} loading={loading} error={error} />
        </FormWrapper>
      </Main>
    </Container>
  )
}

export default Register
