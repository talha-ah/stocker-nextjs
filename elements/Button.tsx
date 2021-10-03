import { Button as SButton } from "semantic-ui-react"
import styled from "styled-components"

export const Button = styled(SButton)`
  background: "none" + "!important",
  border: "0.5px solid" + " !important",
  borderColor: ({ theme }) => theme.colors.black + "!important",
  color: ({ theme }) => theme.colors.black + "!important",
  &:hover {
    background: ${({ theme }) => theme.colors.black} !important;
    color: ${({ theme }) => theme.colors.white} !important;
  }
`

export const Link = styled.a`
  margin: 0;
  cursor: pointer;
  line-height: 1.5;
  font-size: 1.5rem;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.primary};
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`
