import styled from "styled-components"

type PrimaryType = {
  primary?: boolean
}

export const BigText = styled.h1<PrimaryType>`
  margin: 0;
  font-size: 64px;
  font-weight: 500;
  line-height: 140%;
  text-align: center;
  margin-bottom: 48px;
  text-decoration: none;
  transition: all 0.3s ease 0s;
  color: ${({ theme, primary }) =>
    primary ? theme.colors.primary : theme.colors.text};
  font-family: Segoe UI, Helvetica Neue, Arial, sans-serif, Apple Color Emoji,
    Segoe UI Emoji, Segoe UI Symbol;
`

export const BigHeading = styled.p<PrimaryType>`
  margin: 0;
  font-size: 36px;
  font-weight: 500;
  line-height: auto;
  text-decoration: none;
  transition: all 0.3s ease 0s;
  color: ${({ theme, primary }) =>
    primary ? theme.colors.primary : theme.colors.text};
  font-family: Segoe UI, Helvetica Neue, Arial, sans-serif, Apple Color Emoji,
    Segoe UI Emoji, Segoe UI Symbol;
`

export const Heading = styled.p<PrimaryType>`
  margin: 0;
  font-size: 18px;
  font-weight: bold;
  line-height: auto;
  text-decoration: none;
  transition: all 0.3s ease 0s;
  color: ${({ theme, primary }) =>
    primary ? theme.colors.primary : theme.colors.text};
  font-family: Segoe UI, Helvetica Neue, Arial, sans-serif, Apple Color Emoji,
    Segoe UI Emoji, Segoe UI Symbol;
`

export const SubHeading = styled.p<PrimaryType>`
  margin: 0;
  font-size: 14px;
  font-weight: 500;
  line-height: auto;
  text-decoration: none;
  transition: all 0.3s ease 0s;
  color: ${({ theme, primary }) =>
    primary ? theme.colors.primary : theme.colors.text};
  font-family: Segoe UI, Helvetica Neue, Arial, sans-serif, Apple Color Emoji,
    Segoe UI Emoji, Segoe UI Symbol;
`

export const Description = styled.p<PrimaryType>`
  margin: 0;
  font-size: 20px;
  font-weight: 400;
  line-height: auto;
  text-decoration: none;
  transition: all 0.3s ease 0s;
  color: ${({ theme, primary }) =>
    primary ? theme.colors.primary : theme.colors.text};
  font-family: Segoe UI, Helvetica Neue, Arial, sans-serif, Apple Color Emoji,
    Segoe UI Emoji, Segoe UI Symbol;
`

export const SemiSmall = styled.p<PrimaryType>`
  margin: 0;
  font-size: 14px;
  font-weight: 400;
  line-height: auto;
  text-decoration: none;
  transition: all 0.3s ease 0s;
  color: ${({ theme, primary }) =>
    primary ? theme.colors.primary : theme.colors.text};
  font-family: Segoe UI, Helvetica Neue, Arial, sans-serif, Apple Color Emoji,
    Segoe UI Emoji, Segoe UI Symbol;
`

export const Small = styled.p`
  margin: 0;
  font-size: 12px;
  font-weight: 400;
  line-height: auto;
  text-decoration: none;
  transition: all 0.3s ease 0s;
  color: ${({ theme }) => theme.colors.placeholder};
  font-family: Segoe UI, Helvetica Neue, Arial, sans-serif, Apple Color Emoji,
    Segoe UI Emoji, Segoe UI Symbol;
`

export const Placeholder = styled.p`
  margin: 0;
  font-size: 14px;
  font-weight: 400;
  line-height: auto;
  text-decoration: none;
  transition: all 0.3s ease 0s;
  color: ${({ theme }) => theme.colors.placeholder};
  font-family: Segoe UI, Helvetica Neue, Arial, sans-serif, Apple Color Emoji,
    Segoe UI Emoji, Segoe UI Symbol;
`

export const Link = styled.a`
  margin: 0;
  font-size: 14px;
  font-weight: 400;
  line-height: auto;
  text-decoration: none;
  transition: all 0.3s ease 0s;
  color: ${({ theme }) => theme.colors.placeholder};
  font-family: Segoe UI, Helvetica Neue, Arial, sans-serif, Apple Color Emoji,
    Segoe UI Emoji, Segoe UI Symbol;

  &:hover,
  &:focus,
  &:active {
    text-decoration: underline;
    color: ${({ theme }) => theme.colors.primary};
  }
`

export const DangerText = styled(Small)`
  color: ${({ theme }) => theme.colors.error};
`

export const Label = styled.label`
  margin: 0;
  width: 100%;
  display: flex;
  font-size: 12px;
  font-weight: 600;
  line-height: auto;
  align-items: center;
  text-decoration: none;
  transition: all 0.3s ease 0s;
  color: ${({ theme }) => theme.colors.placeholder};
  margin-bottom: ${({ theme }) => theme.gaps.extraLight};
  font-family: Segoe UI, Helvetica Neue, Arial, sans-serif, Apple Color Emoji,
    Segoe UI Emoji, Segoe UI Symbol;
`
