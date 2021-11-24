export const palette = {
  primary: "#585a96",
  accent: "#f2f2f2",
  black: "#000000",
  white: "#ffffff",
  error: "#c4314b",
  warning: "#a16114",
  success: "#237b4b",
  divider: "#dbdbdb",
  label: "#686868",
  border: "#c7c7c7",
  disabled: "#c7c7c7",

  mode: "light",

  // Light
  bg: "#f5f5f5",
  text: "#252525",
  secondary: "#e1e1e1",
  placeholder: "#686868",

  darkBg: "#1f1f1f",
  darkText: "#d6d6d6",
  darkSecondary: "#292929",
  darkPlaceholder: "#adadad",
}

export const shape = {
  borderRadius: {
    light: 2,
    default: 4,
    bold: 6,
  },
}

export const spacing = {
  extraLight: 4,
  light: 8,
  semiLight: 16,
  default: 24,
  bold: 32,
  extraBold: 64,
}

export const mixins = {
  sidebar: {
    minWidth: 196,
  },
  toolbar: {
    height: 48,
  },
  inputs: {
    borders: {
      transparent: `2px solid transparent`,
      primary: `2px solid ${palette.primary}`,
    },
  },
  tables: {
    borders: {
      divider: `1px solid ${palette.divider}`,
    },
  },
  borders: {
    light: `2px solid ${palette.border}`,
  },
}

export const zIndex = {
  appBar: 1100,
  drawer: 1200,
  modal: 1300,
  notifier: 1400,
  tooltip: 1500,
}
