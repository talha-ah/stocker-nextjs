import styled from "styled-components"

import { device } from "@utils/constants"

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
