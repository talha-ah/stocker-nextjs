import styled from "styled-components"

import { colors } from "@utils/theme"

export const BigText = styled.h1`
  margin: 0;
  font-size: 64px;
  font-weight: 500;
  line-height: 140%;
  text-align: center;
  text-decoration: none;
  color: ${colors.black};
  transition: all 0.3s ease 0s;
  font-family: Segoe UI, Helvetica Neue, Arial, sans-serif, Apple Color Emoji,
    Segoe UI Emoji, Segoe UI Symbol;
`

export const BigHeading = styled.p`
  margin: 0;
  font-size: 36px;
  font-weight: 500;
  line-height: auto;
  text-decoration: none;
  color: ${colors.black};
  transition: all 0.3s ease 0s;
  font-family: Segoe UI, Helvetica Neue, Arial, sans-serif, Apple Color Emoji,
    Segoe UI Emoji, Segoe UI Symbol;
`

export const Heading = styled.p`
  margin: 0;
  font-size: 18px;
  font-weight: bold;
  line-height: auto;
  text-decoration: none;
  color: ${colors.black};
  transition: all 0.3s ease 0s;
  font-family: Segoe UI, Helvetica Neue, Arial, sans-serif, Apple Color Emoji,
    Segoe UI Emoji, Segoe UI Symbol;
`

export const SubHeading = styled.p`
  margin: 0;
  font-size: 14px;
  font-weight: 500;
  line-height: auto;
  text-decoration: none;
  color: ${colors.black};
  transition: all 0.3s ease 0s;
  font-family: Segoe UI, Helvetica Neue, Arial, sans-serif, Apple Color Emoji,
    Segoe UI Emoji, Segoe UI Symbol;
`

export const Description = styled.p`
  margin: 0;
  font-size: 20px;
  font-weight: 400;
  line-height: auto;
  text-decoration: none;
  color: ${colors.black};
  transition: all 0.3s ease 0s;
  font-family: Segoe UI, Helvetica Neue, Arial, sans-serif, Apple Color Emoji,
    Segoe UI Emoji, Segoe UI Symbol;
`

export const SemiSmall = styled.p`
  margin: 0;
  font-size: 14px;
  font-weight: 400;
  line-height: auto;
  text-decoration: none;
  color: ${colors.black};
  transition: all 0.3s ease 0s;
  font-family: Segoe UI, Helvetica Neue, Arial, sans-serif, Apple Color Emoji,
    Segoe UI Emoji, Segoe UI Symbol;
`

export const Small = styled.p`
  margin: 0;
  font-size: 12px;
  font-weight: 400;
  line-height: auto;
  text-decoration: none;
  color: ${colors.black};
  transition: all 0.3s ease 0s;
  font-family: Segoe UI, Helvetica Neue, Arial, sans-serif, Apple Color Emoji,
    Segoe UI Emoji, Segoe UI Symbol;
`

export const Placeholder = styled.p`
  margin: 0;
  font-size: 14px;
  font-weight: 400;
  line-height: auto;
  text-decoration: none;
  color: ${colors.black};
  transition: all 0.3s ease 0s;
  font-family: Segoe UI, Helvetica Neue, Arial, sans-serif, Apple Color Emoji,
    Segoe UI Emoji, Segoe UI Symbol;
`

export const Label = styled.p`
  margin: 0;
  font-size: 12px;
  font-weight: 500;
  line-height: auto;
  text-decoration: none;
  color: ${colors.black};
  transition: all 0.3s ease 0s;
  font-family: Segoe UI, Helvetica Neue, Arial, sans-serif, Apple Color Emoji,
    Segoe UI Emoji, Segoe UI Symbol;
`

export const Link = styled.a`
  margin: 0;
  font-size: 14px;
  font-weight: 400;
  line-height: auto;
  text-decoration: none;
  color: ${colors.black};
  transition: all 0.3s ease 0s;
  font-family: Segoe UI, Helvetica Neue, Arial, sans-serif, Apple Color Emoji,
    Segoe UI Emoji, Segoe UI Symbol;

  &:hover,
  &:focus,
  &:active {
    color: ${colors.primary};
    text-decoration: underline;
  }
`
