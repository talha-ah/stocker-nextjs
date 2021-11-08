import styled from "styled-components"

type MainType = {
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
  background-color: #f5f5f5;
  width: ${({ width }) => width || "100%"};
  flex-direction: ${({ flexDirection }) => flexDirection || "column"};
`

export const Content = styled.main`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.gaps.light};
`

export const FlexRow = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: ${({ theme }) => theme.gaps.light};
`

export const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.gaps.light};
`

export const Card = styled.div`
  width: 100%;
  display: flex;
  padding: 10px 20px;
  border-radius: 5px;
  color: rgb(0, 0, 0);
  flex-direction: column;
  transition: all 0.3s ease 0s;
  background-color: transparent;
  border: 2px solid rgb(4, 6, 8);
  box-shadow: rgb(210 239 253) 6px 6px;
  gap: ${({ theme }) => theme.gaps.light};
  font-family: Segoe UI, Helvetica Neue, Arial, sans-serif, Apple Color Emoji,
    Segoe UI Emoji, Segoe UI Symbol, SF Pro Display, -apple-system, acumin-pro,
    BlinkMacSystemFont;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`
