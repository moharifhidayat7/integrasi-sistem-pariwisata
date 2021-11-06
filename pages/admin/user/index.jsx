import { useState } from 'react'
import { formatRp } from '../../../src/helpers/functions'
import Layout from '../../../components/Layouts/Admin'
import Content from '../../../components/Content'
import CardUMKM from '../../../components/Cards/Umkm'
import {
  Dialog,
  Button,
  Table,
  Card,
  Pane,
  Strong,
  EditIcon,
  IconButton,
  Badge,
  TrashIcon,
  PlusIcon,
  ResetIcon,
  SearchInput,
  EyeOpenIcon,
  Text,
  Avatar,
} from 'evergreen-ui'
import { useRouter } from 'next/router'
import Image from 'next/image'
import Link from 'next/link'
import ControlledSwitch from '@components/ControlledSwitch'
import SingleSelectedItem from '@components/SingleSelectedItem'

const User = () => {
  const [value, setValue] = useState(0)
  const [showDelete, setShowDelete] = useState(false)
  const router = useRouter()

  const datas = [
    {
      id: 1,
      name: 'Kean Yoakley',
      image: 'https://picsum.photos/300',
      user: {
        id: 5,
        name: 'Imam',
      },
    },
    {
      id: 2,
      name: 'Stearne Yelding',
      image: 'https://picsum.photos/200',
      user: {
        id: 5,
        name: 'Imam',
      },
    },
    {
      id: 3,
      name: 'Tripp Perrington',
      image: 'https://picsum.photos/200',
      user: {
        id: 5,
        name: 'Imam',
      },
    },
    {
      id: 4,
      name: 'Cristiano Brimley',
      image: 'https://picsum.photos/200',
      user: {
        id: 5,
        name: 'Imam',
      },
    },
    {
      id: 5,
      name: 'Sybil Bryenton',
      image: 'https://picsum.photos/200',
      user: {
        id: 5,
        name: 'Imam',
      },
    },
    {
      id: 6,
      name: 'Putnem Pleasance',
      image: 'https://picsum.photos/200',
      user: {
        id: 5,
        name: 'Imam',
      },
    },
    {
      id: 7,
      name: 'Carri McGrill',
      image: 'https://picsum.photos/200',
      user: {
        id: 5,
        name: 'Imam',
      },
    },
    {
      id: 8,
      name: 'Clarette Reynoldson',
      image: 'https://picsum.photos/200',
      user: {
        id: 5,
        name: 'Imam',
      },
    },
    {
      id: 9,
      name: 'Judi Ludewig',
      image: 'https://picsum.photos/200',
      user: {
        id: 5,
        name: 'Imam',
      },
    },
    {
      id: 10,
      name: 'Lanette Kewish',
      image: 'https://picsum.photos/200',
      user: {
        id: 5,
        name: 'Imam',
      },
    },
  ]

  return (
    <Layout>
      <Dialog
        isShown={showDelete}
        title='Hapus "Puncak Asmoro"'
        intent='danger'
        onCloseComplete={() => {
          setShowDelete(false)
        }}
        confirmLabel='Delete'
      >
        Apakah anda yakin ingin menghapus item ini?
      </Dialog>
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
                className='col-md-9 col-sm-12 d-flex gap-2 justify-content-start align-items-center'
                paddingY={5}
              >
                <Text color='muted'>Filter</Text>
                <SingleSelectedItem name='Role ...' />
                <SingleSelectedItem name='Wisata/Penginapan/UMKM ...' />
              </Pane>
              <Pane className='col-md-3 col-sm-12' paddingY={5}>
                <SearchInput width='100%' placeholder='Cari User ...' />
              </Pane>
            </Pane>
            <Pane overflowX='auto'>
              <Pane>
                <Table border={0} overflowX='auto'>
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
                    <Table.TextHeaderCell>Role</Table.TextHeaderCell>
                    <Table.TextHeaderCell textAlign='center'>
                      Aksi
                    </Table.TextHeaderCell>
                  </Table.Head>
                  <Table.Body>
                    {datas.map((profile, index) => (
                      <Table.Row
                        key={index}
                        height='auto'
                        paddingY={5}
                        marginY={5}
                        borderRadius={4}
                        className='shadow-sm'
                      >
                        <Table.Cell flexBasis={80} flexShrink={0} flexGrow={0}>
                          <Avatar
                            src='https://upload.wikimedia.org/wikipedia/commons/a/a1/Alan_Turing_Aged_16.jpg'
                            name='Alan Turing'
                            size={50}
                          />
                        </Table.Cell>
                        <Table.TextCell>Imam</Table.TextCell>
                        <Table.TextCell>ASDASDSDasdas dasd asd</Table.TextCell>
                        <Table.TextCell>
                          <Pane flexBasis={120}>
                            <Link href='#'>
                              <a>
                                <Text color='blue500'>Pengelola</Text>
                              </a>
                            </Link>
                          </Pane>
                        </Table.TextCell>

                        <Table.Cell className='d-flex justify-content-end align-items-center gap-1'>
                          <Button iconBefore={EyeOpenIcon}>Detail</Button>
                          <Button appearance='primary' iconBefore={EditIcon}>
                            Edit
                          </Button>
                          <Button iconBefore={ResetIcon}>Reset</Button>
                          <IconButton icon={TrashIcon} intent='danger' />
                        </Table.Cell>
                      </Table.Row>
                    ))}
                  </Table.Body>
                </Table>
              </Pane>
            </Pane>
          </Pane>
        </Content.Body>
        <Content.Pagination />
      </Content>
    </Layout>
  )
}

export default User
