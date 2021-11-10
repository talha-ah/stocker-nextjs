import Head from "next/head"
import Image from "next/image"
import type { NextPage } from "next"
import styled from "styled-components"
import { useState, useEffect } from "react"

import { Layout } from "@layouts/layout"
import { Modal } from "@components/Modal"
import { Content } from "@components/Common"
import { Button } from "@components/Buttons"
import { useAppContext } from "@contexts/index"
import { Header, Table } from "@components/Table"
import { useCategories } from "@hooks/categories"
import { CreateCategory, EditCategory } from "@forms/categories"

const Actions = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  gap: ${({ theme }) => theme.gaps.light};
`

type CategoryType = {
  _id: string
  name: string
  items: number
  status: string
  createdAt: Date
  updatedAt: Date
} | null

const Categories: NextPage = () => {
  const { state } = useAppContext()
  const [show, setShow] = useState(false)
  const [category, setCategory] = useState<CategoryType>(null)

  const { error, loading, headers, addData, editData, fetchData, deleteData } =
    useCategories()

  useEffect(() => {
    fetchData()
    // eslint-disable-next-line
  }, [])

  const onSubmit = async (body: any, cb: any) => {
    addData(body, cb)
  }

  const onEdit = async (body: any, cb: any) => {
    editData(body, category?._id, () => {
      setShow(false)
      setCategory(null)
      cb()
    })
  }

  const renderData = (rows: any) => {
    return rows.map((row: any) => ({
      ...row,
      actions: (
        <Actions>
          <Button
            iconed
            onClick={() => {
              setCategory(row)
              setShow((s) => !s)
            }}
          >
            <Image
              src="/icons/Edit.svg"
              alt="search-icon"
              height={16}
              width={16}
            />
          </Button>
          <Button
            iconed
            disabled={row.items > 0}
            loading={loading.delete}
            onClick={() => deleteData(row._id)}
          >
            <Image
              src="/icons/Delete.svg"
              alt="search-icon"
              height={16}
              width={16}
            />
          </Button>
        </Actions>
      ),
    }))
  }

  return (
    <Layout>
      <Head>
        <title>Categories - Stocker</title>
        <meta name="description" content="stocker" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Content>
        <Header add={() => setShow((s) => !s)} title="Categories" />
        <Table
          headers={headers}
          loading={loading.fetch}
          rows={renderData(state.categories.categories)}
        />
        <Modal
          show={show}
          title={category ? "Edit Category" : "Add Category"}
          setShow={(s: boolean) => {
            setShow(s)
            if (!s) setCategory(null)
          }}
        >
          {category ? (
            <EditCategory
              value={category}
              onSubmit={onEdit}
              error={error.edit}
              loading={loading.edit}
            />
          ) : (
            <CreateCategory
              error={error.add}
              onSubmit={onSubmit}
              loading={loading.add}
            />
          )}
        </Modal>
      </Content>
    </Layout>
  )
}

export default Categories
