import "@styles/globals.css"

import { useEffect } from "react"
import type { AppProps } from "next/app"
import { createGlobalStyle, ThemeProvider } from "styled-components"

import { useLoadUser } from "@hooks/auth"
import { colors, gaps, borders, sidebar } from "@utils/theme"

import { AuthProvider } from "../store"

const theme = {
  gaps,
  colors,
  borders,
  sidebar,
}

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  label {
    margin: 0;
    width: 100%;
    display: block;
    font-size: 12px;
    font-weight: 600;
    line-height: auto;
    text-decoration: none;
    transition: all 0.3s ease 0s;
    color: ${theme.colors.placeholder};
    margin-bottom: ${theme.gaps.extraLight};
    font-family: Segoe UI, Helvetica Neue, Arial, sans-serif, Apple Color Emoji,
      Segoe UI Emoji, Segoe UI Symbol;
  }
  input {
    border: 0;
    outline: 0;
    width: 100%;
    height: 34px;
    transition: all 0.3s ease 0s;
    padding: 0px ${theme.gaps.semiLight};
    border-bottom: ${theme.borders.input};
    background-color: ${theme.colors.white};
    border-radius: ${theme.borders.radius.default};
    font-family: Segoe UI, Helvetica Neue, Arial, sans-serif, Apple Color Emoji,
      Segoe UI Emoji, Segoe UI Symbol;

    :focus {
      border-bottom: ${theme.borders.inputActive};
    }
  }
  textarea {
    border: 0;
    outline: 0;
    width: 100%;
    height: 34px;
    overflow: hidden;
    resize: vertical;
    min-height: 80px;
    border-bottom: ${theme.borders.input};
    background-color: ${theme.colors.white};
    border-radius: ${theme.borders.radius.default};
    padding: ${theme.gaps.light} ${theme.gaps.semiLight};
    font-family: Segoe UI, Helvetica Neue, Arial, sans-serif, Apple Color Emoji,
      Segoe UI Emoji, Segoe UI Symbol;

    :focus {
      border-bottom: ${theme.borders.inputActive};
    }
  }
`

export default function App({ Component, pageProps }: AppProps) {
  const { loadUser, loading, error } = useLoadUser()

  useEffect(() => {
    loadUser()
  }, [loadUser])

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <AuthProvider>
        {loading ? "Loading..." : <Component {...pageProps} />}
      </AuthProvider>
    </ThemeProvider>
  )
}
