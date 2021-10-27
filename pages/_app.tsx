import "@styles/globals.css"
import "semantic-ui-css/semantic.min.css"

import type { AppProps } from "next/app"
import { createGlobalStyle, ThemeProvider } from "styled-components"

import { AuthProvider } from "../store"

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
`

const theme = {
  colors: {
    primary: "#585a96",
    // accent: "#D400FF",
    black: "#000000",
    white: "#ffffff",
    error: "#c4314b",
    warning: "#a16114",
    success: "#237b4b",
    divider: "#dbdbdb",
    label: "#686868",
    border: "#c7c7c7",
    disabled: "#c7c7c7",

    lightBg: "#f5f5f5",
    lightText: "#252525",
    lightSecondary: "#5c5b5b",
    lightPlaceholder: "#686868",
    darkBg: "#1f1f1f",
    darkText: "#d6d6d6",
    darkSecondary: "#292929",
    darkPlaceholder: "#adadad",
  },
  borders: {
    radius: 4,
    light: "2px solid #c7c7c7",
  },
  gaps: {
    extraLight: "8px",
    light: "16px",
    default: "24px",
    bold: "32px",
    extraBold: "64px",
  },
}

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
