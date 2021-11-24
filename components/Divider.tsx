import styled from "styled-components"

type HRType = {
  fluid?: boolean
}

export const Divider = styled.hr<HRType>`
  border: none;
  width: ${({ fluid }) => fluid && "100%"};
  border-top: 1px dashed ${({ theme }) => theme.palette.divider};
`
