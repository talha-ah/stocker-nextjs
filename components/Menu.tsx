import React from "react"
import Link from "next/link"
import styled from "styled-components"
import { useRouter } from "next/router"

import { generateId } from "@utils/common"
import { SubHeading } from "@components/Texts"

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
  padding: 8px 24px;
  position: relative;
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

  ::before {
    top: 50%;
    left: 12px;
    width: 4px;
    height: 50%;
    content: "";
    position: absolute;
    transform: translate(-50%, -50%);
    border-radius: ${({ theme }) => theme.borders.radius.default};
    background-color: ${({ active, theme }) =>
      active ? theme.colors.primary : "transparent"};
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
    <Div>
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
    </Div>
  )
}
