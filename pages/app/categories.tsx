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
    headers,
    addData,
    editData,
    fetchData,
    deleteData,
    addLoading,
    editLoading,
    fetchLoading,
    deleteLoading,
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
          rows={data.map((row: any) => ({
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
                  disabled={row.items > 0 || deleteLoading}
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
          }))}
          headers={headers}
          loading={fetchLoading}
        />
        {category ? (
          <Modal
            show={show}
            title="Edit Category"
            setShow={(s: boolean) => setShow(s)}
          >
            <EditCategory
              onSubmit={onEdit}
              loading={editLoading}
              value={category?.name}
            />
          </Modal>
        ) : (
          <Modal
            show={show}
            title="Add Category"
            setShow={(s: boolean) => setShow(s)}
          >
            <CreateCategory onSubmit={onSubmit} loading={addLoading} />
          </Modal>
        )}
      </Content>
    </Layout>
  )
}

export default Categories
