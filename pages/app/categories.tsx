import Head from "next/head"
import Image from "next/image"
import type { NextPage } from "next"
import styled from "styled-components"
import { useState, useEffect } from "react"

import { Layout } from "@layouts/layout"
import { Modal } from "@components/Modal"
import { IconButton } from "@components/Buttons"
import { Header, Table } from "@components/Table"
import { useCategories } from "@hooks/categories"
import { CreateCategory, EditCategory } from "@forms/categories"

const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.gaps.light};
`

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
  const [show, setShow] = useState(false)

  const [category, setCategory] = useState<CategoryType>(null)

  const {
    data,
    error,
    loading,
    headers,
    addData,
    editData,
    fetchData,
    deleteData,
  } = useCategories()

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
          <IconButton
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
          </IconButton>
          <IconButton
            onClick={() => deleteData(row._id)}
            disabled={row.items > 0 || loading.delete}
          >
            <Image
              src="/icons/Delete.svg"
              alt="search-icon"
              height={16}
              width={16}
            />
          </IconButton>
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
          rows={renderData(data)}
          loading={loading.fetch}
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
