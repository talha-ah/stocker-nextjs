const host = "http://localhost:5000"
const base = host + "/api/v1"

export const endpoints = {
  login: base + "/auth/login",
  register: base + "/auth/register",

  // Categories
  categories: base + "/categories",
}

export const screens = {
  mobileS: "320px",
  mobileM: "375px",
  mobileL: "425px",
  tablet: "768px",
  laptop: "1024px",
  laptopL: "1440px",
  desktop: "2560px",
}

export const device = {
  mobileS: `(min-width: ${screens.mobileS})`,
  mobileM: `(min-width: ${screens.mobileM})`,
  mobileL: `(min-width: ${screens.mobileL})`,
  tablet: `(min-width: ${screens.tablet})`,
  laptop: `(min-width: ${screens.laptop})`,
  laptopL: `(min-width: ${screens.laptopL})`,
  desktop: `(min-width: ${screens.desktop})`,
  desktopL: `(min-width: ${screens.desktop})`,
}
