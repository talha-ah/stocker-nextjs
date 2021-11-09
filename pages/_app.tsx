import "@styles/globals.css"

import type { AppProps } from "next/app"
import { createGlobalStyle, ThemeProvider } from "styled-components"

import { AuthWrapper } from "@hooks/auth"
import { AppProvider } from "@contexts/index"
import { Notifier } from "@components/Notifier"
import { colors, gaps, borders, sidebar } from "@utils/theme"

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
    scroll-behavior: smooth;
  }
`

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <AppProvider>
        <AuthWrapper>
          <Component {...pageProps} />
        </AuthWrapper>
        <Notifier title="Success" message="Login was successful." />
      </AppProvider>
    </ThemeProvider>
  )
}
