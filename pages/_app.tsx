import "@styles/globals.css"
import "semantic-ui-css/semantic.min.css"

import type { AppProps } from "next/app"
import { createGlobalStyle, ThemeProvider } from "styled-components"

import theme from "@utility/theme"
import { AuthProvider } from "@contexts/auth"

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
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
