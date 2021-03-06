import React from "react"
import styled from "styled-components"

import { Spinner } from "@components/Spinner"

type ButtonType = {
  fluid?: boolean
  small?: boolean
  loading?: boolean
}

// type Props = {
//   id: number,
//   name: string;
//   // All other props
//   [x:string]: any;
// }

export const BaseButton = styled.button<ButtonType>`
  border: 0;
  margin: 0;
  outline: 0;
  display: block;
  cursor: pointer;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.3s ease 0s;
  width: ${({ fluid }) => fluid && "100%"};
  font-size: ${({ small }) => (small ? "12px" : "14px")};
  padding: ${({ small }) => (small ? "3px 6px" : "6.5px 12px")};
  border-radius: ${({ theme }) => theme.shape.borderRadius.default}px;
  font-family: Segoe UI, Helvetica Neue, Arial, sans-serif, Apple Color Emoji,
    Segoe UI Emoji, Segoe UI Symbol;

  // &:hover {
  //   transform: translateY(-2px);
  // }

  &:disabled {
    cursor: not-allowed;
  }
`

const ButtonPrimary = styled(BaseButton)`
  color: ${({ theme }) => theme.palette.white};
  background: ${({ theme }) => theme.palette.primary};
`

const NeutralButton = styled(BaseButton)`
  color: ${({ theme }) => theme.palette.primary};
  background: ${({ theme }) => theme.palette.white};
  border-radius: ${({ theme }) => theme.shape.borderRadius.default}px;
`

const BorderedButton = styled(BaseButton)`
  color: ${({ theme }) => theme.palette.primary};
  border: ${({ theme }) => theme.mixins.borders.light};
  border-radius: ${({ theme }) => theme.shape.borderRadius.default}px;
`

const GhostButton = styled(BaseButton)`
  background: transparent;
  color: ${({ theme }) => theme.palette.primary};
  border-radius: ${({ theme }) => theme.shape.borderRadius.default}px;
`

type IconButtonType = {
  small?: boolean
  hover?: boolean
}

export const IconButton = styled.button<IconButtonType>`
  border: 0;
  margin: 0;
  outline: 0;
  padding: 0;
  display: flex;
  cursor: pointer;
  background: none;
  align-items: center;
  text-decoration: none;
  justify-content: center;
  transition: all 0.3s ease 0s;
  background-color: transparent;
  width: ${({ small }) => (small ? "default" : "30px")};
  height: ${({ small }) => (small ? "default" : "30px")};
  border-radius: ${({ theme }) => theme.shape.borderRadius.light}px;

  :hover {
    background-color: ${({ hover }) =>
      hover ? "rgba(0, 0, 0, 0.1)" : "transparent"};
  }
`

// eslint-disable-next-line
export const Button = React.forwardRef((props: any, ref): JSX.Element => {
  const {
    ghost,
    iconed,
    primary,
    neutral,
    loading,
    bordered,
    children,
    disabled,
    hover = true,
    ...rest
  } = props

  if (iconed) {
    return (
      <IconButton
        {...rest}
        ref={ref}
        hover={hover}
        disabled={loading || disabled}
        onClick={(e) => {
          e.stopPropagation()
          rest.onClick && rest.onClick()
        }}
      >
        {loading ? <Spinner size={16} /> : children}
      </IconButton>
    )
  } else if (primary) {
    return (
      <ButtonPrimary {...rest} ref={ref} disabled={loading || disabled}>
        {loading ? (
          <Spinner size={16} text="Loading..." position="left" color="white" />
        ) : (
          children
        )}
      </ButtonPrimary>
    )
  } else if (neutral) {
    return (
      <NeutralButton {...rest} ref={ref} disabled={loading || disabled}>
        {loading ? (
          <Spinner
            size={16}
            text="Loading..."
            position="left"
            color="primary"
          />
        ) : (
          children
        )}
      </NeutralButton>
    )
  } else if (bordered) {
    return (
      <BorderedButton {...rest} ref={ref} disabled={loading || disabled}>
        {loading ? (
          <Spinner
            size={16}
            text="Loading..."
            position="left"
            color="primary"
          />
        ) : (
          children
        )}
      </BorderedButton>
    )
  } else if (ghost) {
    return (
      <GhostButton {...rest} ref={ref} disabled={loading || disabled}>
        {loading ? (
          <Spinner
            size={16}
            text="Loading..."
            position="left"
            color="primary"
          />
        ) : (
          children
        )}
      </GhostButton>
    )
  } else {
    return (
      <BaseButton {...rest} ref={ref} disabled={loading || disabled}>
        {loading ? (
          <Spinner
            size={16}
            text="Loading..."
            position="left"
            color="primary"
          />
        ) : (
          children
        )}
      </BaseButton>
    )
  }
})

export const TextButton = styled.button`
  margin: 0;
  border: 0;
  outline: 0;
  padding: 0;
  cursor: pointer;
  background-color: transparent;
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
    color: ${({ theme }) => theme.palette.primary};
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

type TabButtonType = {
  active?: boolean
}

export const TabButton = styled.div<TabButtonType>`
  border: 0;
  outline: 0;
  margin: 8px 0;
  padding: 0 8px;
  cursor: pointer;
  line-height: 32px;
  transition: all 0.3s ease 0s;
  background-color: transparent;
  color: ${({ theme, active }) =>
    active ? theme.palette.text : theme.palette.placeholder};
  border-bottom: 2px solid
    ${({ theme, active }) => (active ? theme.palette.primary : "transparent")};
`
