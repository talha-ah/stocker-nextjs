/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  publicRuntimeConfig: {
    staticFolder: "/public",
    apiPath: process.env.API_PATH,
    apiVersion: process.env.API_VERSION,
    env: process.env.ENV,
  },
}
