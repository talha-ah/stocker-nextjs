import "@styles/globals.css"

import type { AppProps } from "next/app"
import { createGlobalStyle, ThemeProvider } from "styled-components"

import { AuthWrapper } from "@hooks/auth"
import { AppProvider } from "@contexts/index"
import { Notifier } from "@components/Notifier"
import { palette, spacing, shape, mixins, zIndex } from "@utils/theme"

const theme = {
  shape,
  mixins,
  zIndex,
  spacing,
  palette,
}

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    overflow-y: clip;
    box-sizing: border-box;
    background-color: ${palette.bg};

    ::-webkit-scrollbar {
      width: 2px;
    }
  
    ::-webkit-scrollbar-thumb {
      border-radius: 10%;
      background-color: ${palette.primary};
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
