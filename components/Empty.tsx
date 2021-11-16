import styled from "styled-components"

import { Empty as EmptyIcon } from "@components/icons"
import { Heading, SemiSmall } from "@components/Texts"

const Content = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-between;
  gap: ${({ theme }) => theme.gaps.bold};
`

const ContentItem = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
`

export const Empty = () => {
  return (
    <Content>
      <ContentItem>
        <EmptyIcon />
      </ContentItem>
      <ContentItem>
        <Heading>You do not have any data here yet!</Heading>
        <SemiSmall>Click on the plus icon to add some</SemiSmall>
      </ContentItem>
    </Content>
  )
}
