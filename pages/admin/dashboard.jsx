import Layout from '@components/Layouts/Admin'
import Content from '@components/Content'
import { formatRp } from '@helpers/functions'
import _ from 'lodash'
import { XSquare } from 'react-bootstrap-icons'
import {
  Dialog,
  Button,
  Table,
  Card,
  Pane,
  Strong,
  EditIcon,
  Text,
  SearchInput,
  EyeOpenIcon,
  SelectMenu,
  toaster,
  Heading,
  IconButton,
  Badge,
  Overlay,
  TrashIcon,
  ResetIcon,
  PlusIcon,
} from 'evergreen-ui'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import Link from 'next/link'
import axios from 'axios'
import Konfirmasi from '@components/Dialogs/Konfirmasi'

const Dashboard = () => {
  const [data, setData] = useState([])
  const [value, setValue] = useState([])
  const [showDelete, setShowDelete] = useState(false)
  const router = useRouter()
  const [search, setSearch] = useState('')
  const [selectPenjual, setSelectPenjual] = useState(null)
  const [penjual, setPenjual] = useState([])
  const [squery, setSquery] = useState('')
  const [overlay, setOverlay] = useState(false)
  const [row, setRow] = useState('')
  const [konfirmasi, setKonfirmasi] = useState(false)
  const [rowData, setRowData] = useState([])

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
            `/orders?status_contains=unpaid&id_contains=${search}&_sort=status:desc${squery}`
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
            `/orders?status_contains=unpaid&id_contains=${search}&_sort=status:desc${squery}`
        )
        .then((res) => {
          setData(res.data)
        })
    }
    json()
  }, [search, squery])

  const onDelete = async (e) => {
    axios
      .put(process.env.NEXT_PUBLIC_API_URI + '/orders/' + e, {
        status: 'canceled',
      })
      .then(function (response) {
        setShowDelete(false)
        toastMessage()
        mutate()
      })
      .catch(function (error) {
        console.log(error)
      })
  }
  return (
    <Layout title='Dashboard'>
      <Konfirmasi
        data={rowData}
        isShown={konfirmasi}
        setIsShown={setKonfirmasi}
        toastMessage={toastMessage}
        mutate={mutate}
      />
      <Dialog
        isShown={showDelete}
        title={`Batalkan Pesanan "#${rowData.id}"`}
        intent='danger'
        onCloseComplete={() => {
          setShowDelete(false)
        }}
        confirmLabel='Delete'
        onConfirm={() => onDelete(rowData.id)}
      >
        Apakah anda yakin ingin membatalkan pesanan &quot;#{rowData.id}&quot;?
      </Dialog>
      <Overlay
        isShown={overlay}
        onExited={() => setOverlay(false)}
        containerProps={{
          zIndex: 1100,
          className: 'd-flex justify-content-center align-items-center',
          cursor: 'pointer',
        }}
        shouldCloseOnClick={true}
      >
        <div style={{ position: 'relative', height: '95%', width: '50%' }}>
          <Image
            alt={'bukti'}
            src={process.env.NEXT_PUBLIC_API_URI + row}
            layout='fill'
            objectFit='contain'
          />
        </div>
        <XSquare
          color='white'
          size={30}
          style={{ position: 'absolute', top: '40px', right: '40px' }}
          onClick={() => setOverlay(false)}
        />
      </Overlay>
      <Content>
        <Content.Body>
          <Pane className='mt-5'>
            <Heading is='h1' size={900} className='pb-4 mt-4'>
              Dashboard
            </Heading>
            <Pane>
              <Heading is='h2' size={800} className='pb-2 mt-2'>
                Pesanan yang belum dikofirmasi
              </Heading>
              <Pane overflowX='auto'>
                <Pane>
                  <Table overflowX='auto'>
                    <Table.Head borderRadius={4}>
                      <Table.TextHeaderCell
                        flexBasis={50}
                        flexShrink={0}
                        flexGrow={0}
                      >
                        No.
                      </Table.TextHeaderCell>
                      <Table.TextHeaderCell>User</Table.TextHeaderCell>
                      <Table.TextHeaderCell flexBasis={400}
                            flexShrink={0}
                            flexGrow={0}>
                        Alamat Pengiriman
                      </Table.TextHeaderCell>
                      <Table.TextHeaderCell>Item</Table.TextHeaderCell>
                      <Table.TextHeaderCell>Total</Table.TextHeaderCell>
                      <Table.TextHeaderCell>Admin</Table.TextHeaderCell>
                      <Table.TextHeaderCell>Resi</Table.TextHeaderCell>
                      <Table.TextHeaderCell>
                        Bukti Transfer
                      </Table.TextHeaderCell>
                      <Table.TextHeaderCell textAlign='center'>
                        Aksi
                      </Table.TextHeaderCell>
                    </Table.Head>
                    <Table.Body>
                      {data &&
                        data.map((order, index) => (
                          <Table.Row
                            key={order.id}
                            height='auto'
                            paddingY={10}
                            marginY={5}
                            borderRadius={4}
                            className='shadow-sm'
                          >
                            <Table.Cell
                              flexBasis={50}
                              flexShrink={0}
                              flexGrow={0}
                            >
                              <Strong>#{order.id}</Strong>
                            </Table.Cell>
                            <Table.TextCell>
                              <Strong>
                                {order.users_permissions_user.name}
                              </Strong>
                            </Table.TextCell>
                            <Table.TextCell flexBasis={400}
                            flexShrink={0}
                            flexGrow={0}>
                              <Strong>{order.name}</Strong>
                              <br />
                              {order.address.line1}
                              <br />
                              {order.address.city}
                              <br />
                              {order.address.postcode}
                            </Table.TextCell>
                            <Table.TextCell overflow='none'>
                              {order.items.map((it, index) => {
                                return (
                                  <span
                                    key={
                                      'order' +
                                      order.id +
                                      it.variation.variation
                                    }
                                  >
                                    {it.qty} x{' '}
                                    <a
                                      href={'/produk/' + it.product.id}
                                      target='_blank'
                                      rel='noreferrer'
                                    >
                                      {it.product.name}
                                    </a>{' '}
                                    ({it.variation.variation}) <br />
                                  </span>
                                )
                              })}
                            </Table.TextCell>
                            <Table.TextCell isNumber>
                              {formatRp(
                                _.sumBy(
                                  order.items,
                                  (k) =>
                                    k.qty *
                                    (k.variation.price + k.variation.fee)
                                ) + order.ongkir
                              )}
                            </Table.TextCell>
                            <Table.TextCell isNumber>
                              {formatRp(
                                _.sumBy(
                                  order.items,
                                  (k) => k.qty * k.variation.fee
                                )
                              )}
                            </Table.TextCell>

                            <Table.TextCell>{order.resi}</Table.TextCell>
                            <Table.TextCell>
                              {order.konfirmasi != null && (
                                <Button
                                  iconBefore={EyeOpenIcon}
                                  onClick={() => {
                                    setRow(order.konfirmasi.url)
                                    setOverlay(true)
                                  }}
                                >
                                  Lihat Bukti
                                </Button>
                              )}
                            </Table.TextCell>
                            <Table.Cell className='d-flex justify-content-end align-items-center gap-1'>
                              {(order.status != 'sent') &
                              (order.status != 'success') &
                              (order.status != 'canceled') ? (
                                <>
                                  {/* <Button
                                  onClick={() => {
                                    setKonfirmasi(true)
                                    setRowData(order)
                                  }}
                                >
                                  Lihat Item
                                </Button> */}
                                  {order.konfirmasi != null && (
                                    <Button
                                      appearance='primary'
                                      intent='success'
                                      onClick={() => {
                                        setKonfirmasi(true)
                                        setRowData(order)
                                      }}
                                    >
                                      Konfirmasi
                                    </Button>
                                  )}
                                  <Button
                                    appearance='primary'
                                    intent='danger'
                                    onClick={() => {
                                      setShowDelete(true)
                                      setRowData(order)
                                    }}
                                  >
                                    Batalkan
                                  </Button>
                                </>
                              ) : (
                                <Text>
                                  {order.status == 'sent'
                                    ? 'Sedang di Kirim'
                                    : order.status}
                                </Text>
                              )}
                            </Table.Cell>
                          </Table.Row>
                        ))}
                    </Table.Body>
                  </Table>
                </Pane>
              </Pane>
            </Pane>
          </Pane>
        </Content.Body>
      </Content>
    </Layout>
  )
}

export default Dashboard
