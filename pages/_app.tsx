import "@styles/globals.css"
import "semantic-ui-css/semantic.min.css"

import type { AppProps } from "next/app"
import { createGlobalStyle, ThemeProvider } from "styled-components"

import { colors, gaps, borders } from "@utils/theme"

import { AuthProvider } from "../store"

const theme = {
  gaps,
  colors,
  borders,
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
    border: 0 !important;
    outline: 0 !important;
    width: 100% !important;
    transition: all 0.3s ease 0s;
    border-bottom: ${theme.borders.input} !important;
    background-color: ${theme.colors.white} !important;
    font-family: Segoe UI, Helvetica Neue, Arial, sans-serif, Apple Color Emoji,
      Segoe UI Emoji, Segoe UI Symbol;

    :focus {
      border-bottom: ${theme.borders.inputActive} !important;
    }
  }
`

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </ThemeProvider>
  )
}
