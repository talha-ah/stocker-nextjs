import Head from "next/head"
import type { NextPage } from "next"
import styled from "styled-components"
import { useState, useEffect } from "react"

import { Layout } from "@layouts/layout"
import { Modal } from "@components/Modal"
import { Content } from "@components/Common"
import { Button } from "@components/Buttons"
import { Confirm } from "@components/Confirm"
import { useAppContext } from "@contexts/index"
import { Delete, Edit } from "@components/icons"
import { Header, Table } from "@components/Table"
import { useCategories } from "@hooks/categories"
import { CreateCategory, EditCategory } from "@forms/categories"

const Actions = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  gap: ${({ theme }) => theme.spacing.light}px;
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
  const [query, setQuery] = useState<any>("")
  const [dataList, setDataList] = useState([])
  const [category, setCategory] = useState<CategoryType>(null)

  const { error, loading, headers, addData, editData, fetchData, deleteData } =
    useCategories()

  useEffect(() => {
    fetchData()
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    const filtered = state.categories.categories.filter(
      (option: any) =>
        !option.name ||
        option.name.toLowerCase().indexOf(query.toLowerCase()) > -1
    )
    setDataList(filtered)
    // eslint-disable-next-line
  }, [query, state.categories.categories])

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
            small
            iconed
            hover={false}
            onClick={() => {
              setCategory(row)
              setShow((s) => !s)
            }}
          >
            <Edit />
          </Button>
          <Confirm
            title="Delete Category"
            onConfirm={() => deleteData(row._id)}
            message="Are you sure you want to delete this category?"
            trigger={({ open }: { open: any }) => (
              <Button
                small
                iconed
                hover={false}
                onClick={open}
                loading={loading.delete}
              >
                <Delete />
              </Button>
            )}
          />
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
        <Header
          title="Categories"
          name={"search_categories"}
          add={() => setShow((s) => !s)}
          placeholder={"Search Categories"}
          onSearch={(value: any) => setQuery(value)}
        />
        <Table
          headers={headers}
          loading={loading.fetch}
          rows={renderData(dataList)}
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
