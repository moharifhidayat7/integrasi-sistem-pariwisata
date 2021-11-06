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
  SearchInput,
  Text,
} from 'evergreen-ui'
import { useRouter } from 'next/router'
import Image from 'next/image'
import Link from 'next/link'
import ControlledSwitch from '@components/ControlledSwitch'
import SingleSelectedItem from '@components/SingleSelectedItem'

const Produk = () => {
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
          title='Produk'
          button={
            <Button
              appearance='primary'
              size='large'
              onClick={() => router.push(`${router.asPath}/tambah`)}
              iconBefore={PlusIcon}
            >
              Tambah Produk
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
                <SingleSelectedItem name='Kategori ...' />
                <SingleSelectedItem name='Penjual ...' />
              </Pane>
              <Pane className='col-md-3 col-sm-12' paddingY={5}>
                <SearchInput width='100%' placeholder='Cari Produk ...' />
              </Pane>
            </Pane>
            <Pane overflowX='auto'>
              <Pane>
                <Table border={0} overflowX='auto'>
                  <Table.Head borderRadius={4}>
                    <Table.TextHeaderCell>Foto</Table.TextHeaderCell>
                    <Table.TextHeaderCell>Nama Produk</Table.TextHeaderCell>
                    <Table.TextHeaderCell>Kategori</Table.TextHeaderCell>
                    <Table.TextHeaderCell>Penjual</Table.TextHeaderCell>
                    <Table.TextHeaderCell>Harga</Table.TextHeaderCell>
                    <Table.TextHeaderCell>Tampilkan</Table.TextHeaderCell>
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
                        <Table.Cell>
                          <Pane
                            width={80}
                            height={80}
                            position='relative'
                            borderRadius={4}
                            overflow='hidden'
                          >
                            <Image
                              alt='Mountains'
                              src='https://picsum.photos/300'
                              layout='fill'
                              objectFit='cover'
                            />
                          </Pane>
                        </Table.Cell>
                        <Table.TextCell>
                          <Strong>
                            ASDASDSDasdas asdas das asd asd dasd asd
                          </Strong>
                        </Table.TextCell>
                        <Table.TextCell>
                          <Pane flexBasis={120}>
                            <Link href='#'>
                              <a>
                                <Badge color='blue'>Kopi</Badge>
                              </a>
                            </Link>
                          </Pane>
                        </Table.TextCell>
                        <Table.TextCell>
                          <Link href='#'>
                            <a>
                              <Text color='blue500'>Pengelola</Text>
                            </a>
                          </Link>
                        </Table.TextCell>
                        <Table.TextCell isNumber>
                          <Strong color='green500'>{formatRp(882923)}</Strong>
                        </Table.TextCell>
                        <Table.TextCell>
                          <ControlledSwitch />
                        </Table.TextCell>
                        <Table.Cell className='d-flex justify-content-end align-items-center gap-1'>
                          <Button appearance='primary' iconBefore={EditIcon}>
                            Edit
                          </Button>
                          <IconButton
                            icon={TrashIcon}
                            intent='danger'
                            appearance='primary'
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
        <Content.Pagination />
      </Content>
    </Layout>
  )
}

export default Produk
