import styled from "styled-components"

import { device } from "@utils/constants"

type WidthType = {
  width?: string
}

type MainType = {
  width?: string
  flexDirection?: string
}

type SectionType = {
  width?: string
  flexDirection?: string
}

export const Container = styled.div`
  padding: 0;
  display: flex;
  height: 100vh;
  min-height: 100vh;
  align-items: center;
  flex-direction: column;
  justify-content: center;
`

export const Main = styled.main<MainType>`
  flex: 1;
  display: flex;
  padding: 5rem 0;
  align-items: center;
  justify-content: center;
  width: ${({ width }) => width || "100%"};
  background-color: #f5f5f5;
  flex-direction: ${({ flexDirection }) => flexDirection || "column"};
`

export const Section = styled.section<SectionType>`
  flex: 1;
  display: flex;
  padding: 5rem 0;
  align-items: center;
  justify-content: center;
  width: ${({ width }) => width || "100%"};
  flex-direction: ${({ flexDirection }) => flexDirection || "column"};
`

export const Grid = styled.div`
  display: flex;
  flex-wrap: wrap;
  max-width: 800px;
  margin-top: 3rem;
  align-items: center;
  justify-content: center;

  @media (${device.tablet}) {
    & {
      width: 100%;
      flex-direction: column;
    }
  }
`

export const FlexRow = styled.div`
  display: flex;
  align-items: center;
`

export const JustifyBetweenRow = styled(FlexRow)`
  justify-content: space-between;
`

export const Box = styled.div`
  overflow: hidden;
  margin: 20px auto;
  padding: 10px 20px;
  border-radius: 5px;
  border: 2px solid rgb(4, 6, 8);
  background: rgb(255, 255, 255);
  transition: transform 0.2s ease 0s;
  box-shadow: rgb(210 239 253) 8px 8px;
`

export const Code = styled.code`
  background: #fafafa;
  border-radius: 5px;
  padding: 0.75rem;
  font-size: 1.1rem;
  font-family: Menlo, Monaco, Lucida Console, Liberation Mono, DejaVu Sans Mono,
    Bitstream Vera Sans Mono, Courier New, monospace;
`

export const Text = styled.span`
  line-height: 1.5;
  font-weight: 800;
  font-size: 1.5rem;
  text-align: center;
  color: rgb(0, 0, 0);
  text-decoration: none;
  transition: all 0.3s ease 0s;
  transition: all 0.3s ease 0s;
  background-color: transparent;
  font-family: SF Pro Display, -apple-system, acumin-pro, BlinkMacSystemFont,
    Segoe UI, Helvetica Neue, Arial, sans-serif, Apple Color Emoji,
    Segoe UI Emoji, Segoe UI Symbol;
`

export const MuteText = styled.span`
  color: ${({ theme }) => theme.colors.grey};
`

export const DangerText = styled.span`
  color: ${({ theme }) => theme.colors.danger};
`

export const SuccessText = styled.span`
  color: ${({ theme }) => theme.colors.success};
`

export const LightText = styled.span`
  font-size: 12px;
  font-size: 10px;
  font-weight: 500;
  line-height: 10px;
  margin-bottom: 1em;
  color: rgb(153, 153, 153);
  transition: all 0.3s ease 0s;
  font-family: SF Pro Display, -apple-system, acumin-pro, BlinkMacSystemFont,
    Segoe UI, Helvetica Neue, Arial, sans-serif, Apple Color Emoji,
    Segoe UI Emoji, Segoe UI Symbol;
`

export const BoldText = styled.h5`
  font-size: 18px;
  line-height: 1.2;
  font-weight: 800;
  color: rgb(0, 0, 0);
  text-decoration: none;
  transition: all 0.3s ease 0s;
  transition: all 0.3s ease 0s;
  background-color: transparent;
  font-family: SF Pro Display, -apple-system, acumin-pro, BlinkMacSystemFont,
    Segoe UI, Helvetica Neue, Arial, sans-serif, Apple Color Emoji,
    Segoe UI Emoji, Segoe UI Symbol;
`

export const HeaderText = styled.h5`
  font-size: 4rem;
  font-weight: 800;
  margin: 20px auto;
  line-height: 1.15;
  color: rgb(0, 0, 0);
  text-decoration: none;
  transition: all 0.3s ease 0s;
  transition: all 0.3s ease 0s;
  background-color: transparent;
  font-family: SF Pro Display, -apple-system, acumin-pro, BlinkMacSystemFont,
    Segoe UI, Helvetica Neue, Arial, sans-serif, Apple Color Emoji,
    Segoe UI Emoji, Segoe UI Symbol;

  & a {
    color: rgb(0, 0, 0);
    text-decoration: none;
  }
  & a:hover,
  & a:focus,
  & a:active {
    color: #0070f3;
    text-decoration: none;
    text-decoration: underline;
  }
`
