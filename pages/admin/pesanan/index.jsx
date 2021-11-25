import { useEffect, useState } from 'react'
import { formatRp } from '@helpers/functions'
import Layout from '@components/Layouts/Admin'
import Content from '@components/Content'
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
} from 'evergreen-ui'
import { useRouter } from 'next/router'
import Image from 'next/image'
import Link from 'next/link'
import axios from 'axios'
const Pesanan = () => {
  const [data, setData] = useState([])
  const [value, setValue] = useState([])
  const [showDelete, setShowDelete] = useState(false)
  const router = useRouter()
  const [search, setSearch] = useState('')
  const [selectPenjual, setSelectPenjual] = useState(null)
  const [penjual, setPenjual] = useState([])
  const [squery, setSquery] = useState('')

  const toastMessage = () => {
    toaster.success('Data Berhasil di Edit', {
      duration: 4,
    })
  }

  const mutate = () => {
    const json = async () => {
      await axios
        .get(
          process.env.NEXT_PUBLIC_API_URI +
            `/orders?id_contains=${search}&_sort=created_at:desc${squery}`
        )
        .then((res) => {
          setData(res.data)
        })
    }
    json()
  }

  useEffect(() => {
    const json = async () => {
      await axios
        .get(
          process.env.NEXT_PUBLIC_API_URI +
            `/orders?id_contains=${search}&_sort=created_at:desc${squery}`
        )
        .then((res) => {
          setData(res.data)
        })
    }
    json()
  }, [search, squery])

  return (
    <Layout title='Pesanan'>
      <Dialog
        isShown={showDelete}
        title={`Hapus "${value.name}"`}
        intent='danger'
        onCloseComplete={() => {
          setShowDelete(false)
        }}
        confirmLabel='Delete'
        onConfirm={() => onDelete(value.id)}
      >
        Apakah anda yakin ingin menghapus &quot;{value.name}&quot;?
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
              Buat Pesanan
            </Button>
          }
        />
        <Content.Body>
          <Pane>
            {/* <Pane className='row' marginY={10}>
              <Pane
                className='col-md-9 col-sm-12 d-flex gap-2 justify-content-start align-items-center'
                paddingY={5}
              >
                <Text color='muted'>Filter</Text>
                <SelectMenu
                  title='Penjual ...'
                  options={[{ label: 'Semua', value: '' }, ...penjual]}
                  selected={selectPenjual}
                  onSelect={(item) => {
                    if (item.value == '') {
                      setSelectPenjual()
                      setSquery('')
                    } else {
                      setSelectPenjual(item.label)
                      setSquery('&object=' + item.value)
                    }
                  }}
                >
                  <Button>{selectPenjual || 'Penjual ...'}</Button>
                </SelectMenu>
                <Button
                  iconBefore={ResetIcon}
                  onClick={(e) => {
                    setSelectPenjual()
                    setSearch('')
                    setSquery('')
                  }}
                >
                  Reset
                </Button>
              </Pane>
              <Pane className='col-md-3 col-sm-12' paddingY={5}>
                <SearchInput
                  width='100%'
                  placeholder='Cari Produk ...'
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </Pane>
            </Pane> */}
            <Pane overflowX='auto'>
              <Pane>
                <Table overflowX='auto'>
                  <Table.Head borderRadius={4}>
                    <Table.TextHeaderCell>No.</Table.TextHeaderCell>
                    <Table.TextHeaderCell>Pembeli</Table.TextHeaderCell>
                    <Table.TextHeaderCell>Item</Table.TextHeaderCell>
                    <Table.TextHeaderCell>Total</Table.TextHeaderCell>
                    <Table.TextHeaderCell>Resi</Table.TextHeaderCell>
                    <Table.TextHeaderCell>Bukti Transfer</Table.TextHeaderCell>
                    <Table.TextHeaderCell textAlign='center'>
                      Aksi
                    </Table.TextHeaderCell>
                  </Table.Head>
                  <Table.Body>
                    {data &&
                      data.map((order, index) => (
                        <Table.Row
                          key={index}
                          height='auto'
                          paddingY={10}
                          marginY={5}
                          borderRadius={4}
                          className='shadow-sm'
                        >
                          <Table.Cell>
                            <Strong>#222</Strong>
                          </Table.Cell>
                          <Table.TextCell>
                            <Strong>asdsdsd</Strong>
                          </Table.TextCell>
                          <Table.TextCell>sdsd</Table.TextCell>
                          <Table.TextCell>asdasd</Table.TextCell>
                          <Table.TextCell isNumber>asdsadsd</Table.TextCell>
                          <Table.TextCell>sdsd</Table.TextCell>
                          <Table.Cell className='d-flex justify-content-end align-items-center gap-1'>
                            <Link href={`${router.asPath}/${order.id}`}>
                              <a>
                                <Button
                                  appearance='primary'
                                  iconBefore={EditIcon}
                                >
                                  Edit
                                </Button>
                              </a>
                            </Link>
                            <IconButton
                              icon={TrashIcon}
                              intent='danger'
                              appearance='primary'
                              onClick={(e) => {
                                setValue(order)
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
        {/* <Content.Pagination /> */}
      </Content>
    </Layout>
  )
}

export default Pesanan
