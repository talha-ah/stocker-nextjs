import styled from "styled-components"

type ButtonType = {
  fluid?: boolean
  loading?: boolean
}

export const BaseButton = styled.button<ButtonType>`
  border: 0;
  margin: 0;
  outline: 0;
  height: 34px;
  display: block;
  font-size: 14px;
  font-size: 1rem;
  cursor: pointer;
  font-weight: 500;
  padding: 6.5px 12px;
  text-decoration: none;
  transition: all 0.3s ease 0s;
  width: ${({ fluid }) => fluid && "100%"};
  border-radius: ${({ theme }) => theme.borders.radius.default};
  font-family: Segoe UI, Helvetica Neue, Arial, sans-serif, Apple Color Emoji,
    Segoe UI Emoji, Segoe UI Symbol;

  // &:hover {
  //   transform: translateY(-2px);
  // }
`

export const Button = styled(BaseButton)`
  color: ${({ theme }) => theme.colors.white};
  background: ${({ theme }) => theme.colors.primary};
`

export const NeutralButton = styled(BaseButton)`
  color: ${({ theme }) => theme.colors.primary};
  background: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.borders.radius.default};
`

export const BorderedButton = styled(BaseButton)`
  color: ${({ theme }) => theme.colors.primary};
  border: ${({ theme }) => theme.borders.light};
  border-radius: ${({ theme }) => theme.borders.radius.default};
`

export const GhostButton = styled(BaseButton)`
  background: transparent;
  color: ${({ theme }) => theme.colors.primary};
  border-radius: ${({ theme }) => theme.borders.radius.default};
`

export const IconButton = styled.button`
  border: 0;
  margin: 0;
  outline: 0;
  padding: 0;
  display: flex;
  cursor: pointer;
  background: none;
  align-items: center;
  text-decoration: none;
  background-color: none;
  justify-content: center;
  transition: all 0.3s ease 0s;
`

export const Anchor = styled.button`
  margin: 0;
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

export const Logo = styled.div`
  top: 20px;
  left: 20px;
  cursor: pointer;
  position: absolute;
  font-family: Segoe UI, Helvetica Neue, Arial, sans-serif, Apple Color Emoji,
    Segoe UI Emoji, Segoe UI Symbol, SF Pro Display, -apple-system, acumin-pro,
    BlinkMacSystemFont;
`
