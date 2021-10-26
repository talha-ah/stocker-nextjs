export const colors = {
  primary: "#585a96",
  // accent: "#D400FF",
  black: "#000000",
  white: "#ffffff",
  error: "#c4314b",
  warning: "#a16114",
  success: "#237b4b",
  divider: "#dbdbdb",
  label: "#686868",
  disabled: "#c7c7c7",

  lightBg: "#f5f5f5",
  lightText: "#252525",
  lightSecondary: "#5c5b5b",
  lightPlaceholder: "#686868",
  darkBg: "#1f1f1f",
  darkText: "#d6d6d6",
  darkSecondary: "#292929",
  darkPlaceholder: "#adadad",
}

export const texts = {
  bigText: {
    fontSize: "64px",
    lineHeight: "140%",
    fontFamily: "Segoe UI",
    textDecoration: "none",
  },
  bigHeading: {
    fontSize: "36px",
    fontFamily: "Segoe UI",
    textDecoration: "none",
  },
  heading: {
    fontSize: "18px",
    fontWeight: "bold",
    fontStyle: "normal",
    fontFamily: "Segoe UI",
    textDecoration: "none",
  },
  subHeading: {
    fontSize: "14px",
    fontFamily: "Segoe UI",
    textDecoration: "none",
  },
  description: {
    fontSize: "20px",
    fontStyle: "normal",
    fontWeight: "normal",
    fontFamily: "Segoe UI",
    textDecoration: "none",
  },
  semiSmall: {
    fontSize: "12px",
    fontStyle: "normal",
    fontWeight: "normal",
    fontFamily: "Segoe UI",
    textDecoration: "none",
  },
  small: {
    fontSize: "14px",
    fontStyle: "normal",
    fontWeight: "normal",
    fontFamily: "Segoe UI",
    textDecoration: "none",
  },
  placeholder: {
    fontSize: "14px",
    fontStyle: "normal",
    fontWeight: "normal",
    fontFamily: "Segoe UI",
    textDecoration: "none",
  },
  label: {
    fontSize: "12px",
    fontFamily: "Segoe UI",
    textDecoration: "none",
  },
  link: {
    fontSize: "14px",
    fontStyle: "normal",
    fontWeight: "normal",
    fontFamily: "Segoe UI",
    textDecoration: "none",
  },
  linkHover: {
    fontSize: "14px",
    fontStyle: "normal",
    fontWeight: "normal",
    fontFamily: "Segoe UI",
    textDecoration: "underline",
  },
  button: {
    fontSize: "14px",
    fontWeight: "500",
    fontStyle: "normal",
    fontFamily: "Segoe UI",
    textDecoration: "none",
  },
}

export const radius = {
  primary: 4,
}

export const buttons = {
  primary: {
    border: 0,
    outline: 0,
    ...texts.button,
    color: colors.white,
    padding: "6.5px 12px",
    borderRadius: radius.primary,
    backgroundColor: colors.primary,
  },
}
