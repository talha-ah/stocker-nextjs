import React from "react"
import Link from "next/link"
import styled from "styled-components"

import { SubHeading } from "./Texts"

type ItemType = {
  active?: boolean
}

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
    color: red !important;
  }
`

const sidebarMenuList = [
  {
    id: 1,
    name: "Home",
    url: "/app",
    active: true,
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
    name: "Sale Reports",
    url: "/app/sales",
  },
  {
    id: 6,
    name: "Receipts",
    url: "/app/receipts",
  },
]

export default function Menu() {
  return sidebarMenuList.map((item) => (
    <Item key={item.id} active={item.active}>
      <Link href={item.url} passHref>
        <SubHeading>{item.name}</SubHeading>
      </Link>
    </Item>
  ))
}
