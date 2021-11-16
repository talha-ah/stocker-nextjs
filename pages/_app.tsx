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
    background-color: ${colors.bg};

    ::-webkit-scrollbar {
      width: 2px;
    }
  
    ::-webkit-scrollbar-thumb {
      border-radius: 10%;
      background-color: ${colors.primary};
    }
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
        <Notifier />
      </AppProvider>
    </ThemeProvider>
  )
}
