import { Button as SButton } from "semantic-ui-react"
import styled from "styled-components"

export const Button = styled(SButton)`
  border: 0;
  outline: 0;
  font-size: 14px;
  font-weight: 500;
  padding: 6.5px 12px;
  margin: 0 !important;
  text-decoration: none;
  transition: all 0.3s ease 0s;
  color: ${({ theme }) => theme.colors.white} !important;
  background: ${({ theme }) => theme.colors.primary} !important;
  border-radius: ${({ theme }) => theme.borders.radius.default} !important;
  font-family: Segoe UI, Helvetica Neue, Arial, sans-serif, Apple Color Emoji,
    Segoe UI Emoji, Segoe UI Symbol;
`

export const NeutralButton = styled(SButton)`
  border: 0;
  outline: 0;
  font-size: 14px;
  font-weight: 500;
  padding: 6.5px 12px;
  margin: 0 !important;
  text-decoration: none;
  transition: all 0.3s ease 0s;
  color: ${({ theme }) => theme.colors.primary} !important;
  background: ${({ theme }) => theme.colors.white} !important;
  border-radius: ${({ theme }) => theme.borders.radius.default} !important;
  font-family: Segoe UI, Helvetica Neue, Arial, sans-serif, Apple Color Emoji,
    Segoe UI Emoji, Segoe UI Symbol;
`

export const BorderedButton = styled(SButton)`
  outline: 0;
  font-size: 14px;
  font-weight: 500;
  padding: 6.5px 12px;
  margin: 0 !important;
  text-decoration: none;
  background: none !important;
  transition: all 0.3s ease 0s;
  color: ${({ theme }) => theme.colors.primary} !important;
  border-radius: ${({ theme }) => theme.borders.radius.default} !important;
  border: ${({ theme }) => theme.borders.light} !important;
  font-family: Segoe UI, Helvetica Neue, Arial, sans-serif, Apple Color Emoji,
    Segoe UI Emoji, Segoe UI Symbol;
`

export const GhostButton = styled(SButton)`
  border: 0;
  outline: 0;
  font-size: 14px;
  font-weight: 500;
  padding: 6.5px 12px;
  margin: 0 !important;
  text-decoration: none;
  background: none !important;
  transition: all 0.3s ease 0s;
  color: ${({ theme }) => theme.colors.primary} !important;
  border-radius: ${({ theme }) => theme.borders.radius.default} !important;
  font-family: Segoe UI, Helvetica Neue, Arial, sans-serif, Apple Color Emoji,
    Segoe UI Emoji, Segoe UI Symbol;
`

export const Anchor = styled.button`
  margin: 0;
  top: 20px;
  left: 20px;
  cursor: pointer;
  font-size: 18px;
  line-height: 1.2;
  font-weight: bold;
  position: absolute;
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
