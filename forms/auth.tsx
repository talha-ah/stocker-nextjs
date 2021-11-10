import Link from "next/link"
import styled from "styled-components"

import { Button } from "@components/Buttons"

import { Form, Input } from "@components/Inputs"

const Actions = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: ${({ theme }) => theme.gaps.light};
`

export const DoLogin = ({
  error,
  loading,
  onSubmit,
}: {
  error?: any
  onSubmit: any
  loading?: boolean
}) => {
  const submitHandler = async (e: any) => {
    e.preventDefault()
    const email = e.target.email.value
    const password = e.target.password.value
    onSubmit({ email, password })
  }

  return (
    <Form onSubmit={submitHandler}>
      <Input
        required
        name="email"
        type="email"
        error={error?.email}
        label="Email Address"
        placeholder="name@domain.com"
      />

      <Input
        required
        name="password"
        type="password"
        label="Password"
        error={error?.password}
        placeholder="*********"
      />

      <Actions>
        <Button primary fluid type="submit" loading={loading}>
          Login
        </Button>
        <Link href="/register" passHref>
          <Button fluid ghost>
            Create new account
          </Button>
        </Link>
      </Actions>
    </Form>
  )
}

export const DoRegister = ({
  error,
  loading,
  onSubmit,
}: {
  error?: any
  onSubmit: any
  loading?: boolean
}) => {
  const submitHandler = async (e: any) => {
    e.preventDefault()
    const email = e.target.email.value
    const secret = e.target.secret.value
    const password = e.target.password.value
    const first_name = e.target.first_name.value
    onSubmit({ first_name, email, password, secret })
  }

  return (
    <Form onSubmit={submitHandler}>
      <Input
        required
        type="text"
        label="Name"
        name="first_name"
        placeholder="name"
        error={error?.first_name}
      />

      <Input
        required
        name="email"
        type="email"
        error={error?.email}
        label="Email Address"
        placeholder="name@domain.com"
      />

      <Input
        required
        name="password"
        type="password"
        label="Password"
        error={error?.password}
        placeholder="*********"
      />

      <Input
        required
        name="secret"
        label="Secret"
        type="password"
        error={error?.secret}
        placeholder="XXXX XXXX XXXX"
      />

      <Actions>
        <Button fluid primary type="submit" loading={loading}>
          Register
        </Button>
        <Link href="/login" passHref>
          <Button ghost fluid>
            Login
          </Button>
        </Link>
      </Actions>
    </Form>
  )
}
