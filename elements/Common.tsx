import styled from "styled-components"

import { device } from "@utility/constants"

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
  font-size: 1.5rem;
  text-align: center;
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

export const BoldText = styled.span`
  font-weight: bold;
`

export const HeaderText = styled.h1<WidthType>`
  margin: 0;
  font-size: 4rem;
  line-height: 1.15;
  text-align: center;
  margin: 15px 0 !important;
  width: ${({ width }) => width || "100%"};

  @media (${device.tablet}) {
    & {
      width: 100%;
    }
  }

  & a {
    color: #0070f3;
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
