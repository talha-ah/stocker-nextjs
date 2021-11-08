import styled from "styled-components"

import { SubHeading } from "@components/Texts"

type SpinnerType = {
  size?: number
  text?: string
  position?: "top" | "bottom" | "left" | "right"
}

const SpinnerWrapper = styled.div<SpinnerType>`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.gaps.default};
  flex-direction: ${({ position }) =>
    position === "top"
      ? "column"
      : position === "bottom"
      ? "column-reverse"
      : position === "left"
      ? "row"
      : "row-reverse"};

  span {
    width: ${({ size, theme }) => `${size}px` || theme.gaps.default};
    height: ${({ size, theme }) => `${size}px` || theme.gaps.default};
    display: block;
    border-radius: 50%;
    border-width: 1.5px;
    border-style: solid;
    box-sizing: border-box;
    border-color: rgb(0, 120, 212) rgb(199, 224, 244) rgb(199, 224, 244);
    border-image: initial;
    animation-name: spinner;
    animation-duration: 1.3s;
    animation-iteration-count: infinite;
    animation-timing-function: cubic-bezier(0.53, 0.21, 0.29, 0.67);
  }

  @keyframes spinner {
    from {
      transform: rotate(0deg);
    }

    to {
      transform: rotate(360deg);
    }
  }
`

export const Spinner = ({ size, text, position }: SpinnerType) => {
  return (
    <SpinnerWrapper size={size} position={position}>
      <span />
      {text && <SubHeading>{text}</SubHeading>}
    </SpinnerWrapper>
  )
}
