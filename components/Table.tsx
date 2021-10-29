import Image from "next/image"
import styled from "styled-components"

import { Heading } from "@components/Texts"

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`

const Icons = styled.div`
  color: red;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.gaps.light};
`

const StyledImage = styled(Image)`
  color: red !important;
`

const ButtonIcon = styled.button`
  border: 0 !important;
  padding: 0 !important;
  background-color: transparent !important;
`

export const Header = () => {
  return (
    <Container>
      <Heading>Categories</Heading>
      <Icons>
        <ButtonIcon>
          <StyledImage
            src="/icons/Search.svg"
            alt="search-icon"
            width={24}
            height={24}
          />
        </ButtonIcon>
        <ButtonIcon>
          <StyledImage
            src="/icons/Plus.svg"
            alt="search-icon"
            width={24}
            height={24}
          />
        </ButtonIcon>
        <ButtonIcon>
          <StyledImage
            src="/icons/Settings.svg"
            alt="search-icon"
            width={24}
            height={24}
          />
        </ButtonIcon>
      </Icons>
    </Container>
  )
}
