import "@styles/globals.css"

import type { AppProps } from "next/app"
import { createGlobalStyle, ThemeProvider } from "styled-components"

import { colors, gaps, borders, sidebar } from "@utils/theme"

import { AppProvider } from "../contexts"

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
`

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <AppProvider>
        <Component {...pageProps} />
      </AppProvider>
    </ThemeProvider>
  )
}
