import styled from "styled-components"

import { SubHeading } from "@components/Texts"

type SpinnerType = {
  size?: number
  text?: string
  color?: "primary" | "white" | "text"
  position?: "top" | "bottom" | "left" | "right"
}

const SpinnerWrapper = styled.div<SpinnerType>`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.gaps.light};
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
    border-color: ${({ theme, color = "text" }) => theme.colors[color]}
      rgb(0, 0, 0, 0.2) rgb(0, 0, 0, 0.2);

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

export const Spinner = ({
  size,
  text,
  position,
  color = "white",
}: SpinnerType) => {
  return (
    <SpinnerWrapper size={size} position={position} color={color}>
      <span />
      {text && <SubHeading color={color}>{text}</SubHeading>}
    </SpinnerWrapper>
  )
}
