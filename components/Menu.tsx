import React from "react"
import Link from "next/link"
import styled from "styled-components"
import { useRouter } from "next/router"

import { SubHeading } from "./Texts"

type ItemType = {
  active?: boolean
}

const Div = styled.div`
  width: ${({ theme }) => theme.sidebar.width};
`

const Item = styled.div<ItemType>`
  width: 100%;
  display: flex;
  margin: 8px 0px;
  cursor: pointer;
  padding: 8px 16px;
  align-items: center;
  flex-direction: row;
  transition: all 0.3s ease 0s;

  background-color: ${({ active, theme }) =>
    active ? theme.colors.white : "transparent"};
  border-radius: ${({ theme }) => theme.borders.radius.default};

  &:hover {
    background-color: ${({ theme }) => theme.colors.white};
  }

  & a {
    color: red;
  }
`

const sidebarMenuList = [
  {
    id: 1,
    exact: true,
    url: "/app",
    name: "Home",
  },
  {
    id: 2,
    name: "Categories",
    url: "/app/categories",
  },
  {
    id: 3,
    name: "Stocks",
    url: "/app/stocks",
  },
  {
    id: 4,
    name: "Customers",
    url: "/app/customers",
  },
  {
    id: 5,
    name: "Orders",
    url: "/app/orders",
  },
  {
    id: 6,
    name: "Sale Reports",
    url: "/app/sales",
  },
]

export const Menu = () => {
  const router = useRouter()

  return (
    <Div>
      {sidebarMenuList.map((item) => (
        <Link key={item.id} href={item.url} passHref>
          <Item
            active={
              item.exact
                ? router.asPath === item.url
                : router.asPath.startsWith(item.url)
            }
          >
            <SubHeading>{item.name}</SubHeading>
          </Item>
        </Link>
      ))}
    </Div>
  )
}
