import Link from "next/link"
import styled from "styled-components"

import { Form, Input } from "@components/Inputs"
import { Button, GhostButton } from "@components/Buttons"

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
  onSubmit: any
  loading?: boolean
  error?: string | null
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
  )
}

export const DoRegister = ({
  error,
  loading,
  onSubmit,
}: {
  onSubmit: any
  loading?: boolean
  error?: string | null
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
        error={error}
        type="text"
        label="Name"
        name="first_name"
        placeholder="name"
      />

      <Input
        required
        error={error}
        name="email"
        type="email"
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

      <Input
        required
        name="secret"
        error={error}
        label="Secret"
        type="password"
        placeholder="XXXX XXXX XXXX"
      />

      <Actions>
        <Button fluid type="submit">
          {loading ? "Loading..." : "Register"}
        </Button>
        <Link href="/login" passHref>
          <GhostButton fluid>Login</GhostButton>
        </Link>
      </Actions>
    </Form>
  )
}
