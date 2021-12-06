import { useEffect, useState } from 'react'
import Layout from '../../../components/Layouts/Admin'
import Content from '../../../components/Content'
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
const User = () => {
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

  const mutate = async () => {
    await axios
      .get(
        process.env.NEXT_PUBLIC_API_URI +
          '/users?name_contains=' +
          search +
          '&_sort=role.id:desc,name:asc' +
          squery
      )
      .then((res) => {
        setData(res.data)
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

  useEffect(() => {
    const json = async () =>
      await axios
        .get(
          process.env.NEXT_PUBLIC_API_URI +
            '/users?name_contains=' +
            search +
            '&_sort=role.id:desc,name:asc' +
            squery
        )
        .then((res) => {
          setData(res.data)
        })

    json()
  }, [squery, search])

  useEffect(() => {
    const getRoles = async () => {
      await axios
        .get(process.env.NEXT_PUBLIC_API_URI + '/users-permissions/roles')
        .then((res) => {
          setRoles(res.data.roles.filter((role) => role.id != 2))
        })
    }
    getRoles()
  }, [])

  return (
    <Layout title='User'>
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
      <UserForm
        data={value}
        mutate={mutate}
        toastMessage={toastMessage}
        isShown={showUserForm}
        setIsShown={setShowUserForm}
      />
      <Content>
        <Content.Header
          title='User'
          button={
            <Button
              appearance='primary'
              size='large'
              onClick={() => router.push(`${router.asPath}/tambah`)}
              iconBefore={PlusIcon}
            >
              Tambah User
            </Button>
          }
        />
        <Content.Body>
          <Pane>
            <Pane className='row' marginY={10}>
              <Pane
                className='col-md-12 col-sm-12 col-lg-9 d-flex gap-2 justify-content-start align-items-center'
                paddingY={5}
              >
                <Text color='muted'>Filter</Text>
                <SelectMenu
                  title='Hak Akses ...'
                  options={[
                    { label: 'Semua', value: '' },
                    ...roles.map((role) => ({
                      label: role.name,
                      value: role.id,
                    })),
                  ]}
                  selected={selectRole}
                  onSelect={(item) => {
                    if (item.value == '') {
                      setSelectRole()
                      setSearch('')
                      setSquery('')
                    } else {
                      setSelectRole(item.label)
                      setSquery('&role=' + item.value)
                    }
                  }}
                >
                  <Button>{selectRole || 'Hak Akses ...'}</Button>
                </SelectMenu>
                <Button
                  iconBefore={ResetIcon}
                  onClick={(e) => {
                    setSelectRole()
                    setSearch('')
                    setSquery('')
                  }}
                >
                  Reset
                </Button>
              </Pane>
              <Pane className='col-md-12 col-sm-12 col-lg-3' paddingY={5}>
                <SearchInput
                  width='100%'
                  placeholder='Cari User ...'
                  onChange={(e) => setSearch(e.target.value)}
                />
              </Pane>
            </Pane>
            <Pane overflowX='auto'>
              <Pane>
                <Table overflowX='auto'>
                  <Table.Head borderRadius={4}>
                    <Table.TextHeaderCell
                      flexBasis={80}
                      flexShrink={0}
                      flexGrow={0}
                    >
                      Foto
                    </Table.TextHeaderCell>
                    <Table.TextHeaderCell>Nama</Table.TextHeaderCell>
                    <Table.TextHeaderCell>Email</Table.TextHeaderCell>
                    <Table.TextHeaderCell>Hak Akses</Table.TextHeaderCell>
                    <Table.TextHeaderCell textAlign='center'>
                      Aksi
                    </Table.TextHeaderCell>
                  </Table.Head>
                  <Table.Body>
                    {data &&
                      data.map((user, index) => (
                        <Table.Row
                          key={user.id}
                          height='auto'
                          paddingY={5}
                          marginY={5}
                          borderRadius={4}
                          className='shadow-sm'
                        >
                          <Table.Cell
                            flexBasis={80}
                            flexShrink={0}
                            flexGrow={0}
                          >
                            <Avatar name={user.name && user.name} size={50} />
                          </Table.Cell>
                          <Table.TextCell>
                            {user.name && user.name}
                          </Table.TextCell>
                          <Table.TextCell>{user.email}</Table.TextCell>
                          <Table.TextCell>
                            <Pane flexBasis={120}>
                              <Text color='blue500'>{user.role.name}</Text>
                            </Pane>
                          </Table.TextCell>

                          <Table.Cell className='d-block d-lg-flex justify-content-end align-items-center gap-1'>
                            {/* <Button iconBefore={ResetIcon}>Reset</Button> */}
                            <Button
                              appearance='primary'
                              iconBefore={EditIcon}
                              onClick={() => {
                                setValue(user)
                                setShowUserForm(true)
                              }}
                            >
                              Edit
                            </Button>
                            <IconButton
                              icon={TrashIcon}
                              intent='danger'
                              appearance='primary'
                              onClick={() => {
                                setValue(user)
                                setShowDelete(true)
                              }}
                            />
                          </Table.Cell>
                        </Table.Row>
                      ))}
                  </Table.Body>
                </Table>
              </Pane>
            </Pane>
          </Pane>
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

export default User
