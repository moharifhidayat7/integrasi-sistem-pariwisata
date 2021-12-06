import { useEffect, useState } from 'react'
import Layout from '@components/Layouts/Admin'
import Content from '@components/Content'
import { useSession } from 'next-auth/react'
import {
  Dialog,
  Button,
  Table,
  Pane,
  EditIcon,
  IconButton,
  TrashIcon,
  PlusIcon,
  ResetIcon,
  SelectMenu,
  SearchInput,
  Text,
  Avatar,
  toaster,
} from 'evergreen-ui'
import { useRouter } from 'next/router'
import UserForm from '@components/Dialogs/EditUserForm'
import axios from 'axios'
const PaketWisata = () => {
  const [roles, setRoles] = useState([])
  const [data, setData] = useState([])
  const { data: session, status } = useSession()
  const [value, setValue] = useState([])
  const [showDelete, setShowDelete] = useState(false)
  const [showUserForm, setShowUserForm] = useState(false)
  const [search, setSearch] = useState('')
  const [start, setStart] = useState(0)
  const [limit, setLimit] = useState(5)
  const [currentPage, setCurrentPage] = useState(1)
  const [selectRole, setSelectRole] = useState(null)
  const [squery, setSquery] = useState('')

  const router = useRouter()

  const toastMessage = () => {
    toaster.success('Data Berhasil di Edit', {
      duration: 4,
    })
  }

  const onDelete = (id) => {
    axios
      .delete(`${process.env.NEXT_PUBLIC_API_URI}/users/${id}`, {
        headers: {
          Authorization: `Bearer ${session.jwt}`,
        },
      })
      .then((response) => {
        setShowDelete(false)
        mutate()
      })
      .catch((error) => console.log(error))
  }
  return (
    <Layout title='Paket Wisata'>
      <Dialog
        isShown={showDelete}
        title={`Hapus "${value.name}"`}
        intent='danger'
        onCloseComplete={() => {
          setShowDelete(false)
        }}
        overlayProps={{ zIndex: 2500 }}
        confirmLabel='Delete'
        onConfirm={() => onDelete(value.id)}
      >
        Apakah anda yakin ingin menghapus &quot;{value.name}&quot;?
      </Dialog>

      <Content>
        <Content.Header
          title='Paket Wisata'
          button={
            <Button
              appearance='primary'
              size='large'
              onClick={() => router.push(`${router.asPath}/tambah`)}
              iconBefore={PlusIcon}
            >
              Tambah Paket Wisata
            </Button>
          }
        />
        <Content.Body>
          <Pane></Pane>
        </Content.Body>
        {/* <Content.Pagination
          page={currentPage}
          onPageChange={(i) => {
            setCurrentPage(i)
            setStart(limit * i - limit)
          }}
        /> */}
      </Content>
    </Layout>
  )
}

export default PaketWisata
