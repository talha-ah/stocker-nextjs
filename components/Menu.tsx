import React from "react"
import Link from "next/link"
import styled from "styled-components"
import { useRouter } from "next/router"

import { generateId } from "@utils/common"
import { SubHeading } from "@components/Texts"

type ItemType = {
  active?: boolean
}

const Container = styled.div<ItemType>`
  width: 100%;
`

const Item = styled.div<ItemType>`
  width: 100%;
  display: flex;
  margin: 4px 0px;
  cursor: pointer;
  padding: 8px 24px;
  position: relative;
  align-items: center;
  flex-direction: row;
  transition: all 0.3s ease 0s;

  background-color: ${({ active, theme }) =>
    active ? theme.palette.white : "transparent"};
  filter: drop-shadow(0px 4px 8px rgba(0, 0, 0, 0.1));
  border-radius: ${({ theme }) => theme.shape.borderRadius.default}px;

  &:hover {
    background-color: ${({ theme }) => theme.palette.white};
  }

  & a {
    color: red;
  }

  ::before {
    top: 50%;
    left: 12px;
    width: 4px;
    height: 50%;
    content: "";
    position: absolute;
    transform: translate(-50%, -50%);
    border-radius: ${({ theme }) => theme.shape.borderRadius.default}px;
    background-color: ${({ active, theme }) =>
      active ? theme.palette.primary : "transparent"};
  }
`

const sidebarMenuList = [
  {
    exact: true,
    url: "/app",
    name: "Home",
  },
  {
    name: "Customers",
    url: "/app/customers",
  },
  {
    name: "Categories",
    url: "/app/categories",
  },
  {
    name: "Stocks",
    url: "/app/stocks",
  },
  {
    name: "Quotations",
    url: "/app/quotations",
  },
  {
    exact: true,
    name: "Orders",
    url: "/app/orders",
  },
  {
    name: "Add Order",
    url: "/app/orders/add",
  },
  {
    name: "Sale Reports",
    url: "/app/sales",
  },
]

export const Menu = () => {
  const router = useRouter()

  return (
    <Container>
      {sidebarMenuList.map((item) => (
        <Link key={generateId()} href={item.url} passHref>
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
    </Container>
  )
}
