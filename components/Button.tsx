import { Button as SButton } from "semantic-ui-react"
import styled from "styled-components"

export const Button = styled(SButton)`
  border: 0;
  color: ${({ theme }) => theme.colors.white} !important;
  background: ${({ theme }) => theme.colors.primary} !important;
`

export const Anchor = styled.a`
  margin: 0;
  cursor: pointer;
  font-size: 18px;
  line-height: 1.2;
  font-weight: bold;
  padding: 10px 20px;
  border-radius: 5px;
  color: rgb(0, 0, 0);
  text-decoration: none;
  transition: all 0.3s ease 0s;
  background-color: transparent;
  border: 2px solid rgb(4, 6, 8);
  box-shadow: rgb(210 239 253) 6px 6px;
  font-family: Segoe UI, Helvetica Neue, Arial, sans-serif, Apple Color Emoji,
    Segoe UI Emoji, Segoe UI Symbol, SF Pro Display, -apple-system, acumin-pro,
    BlinkMacSystemFont;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`
