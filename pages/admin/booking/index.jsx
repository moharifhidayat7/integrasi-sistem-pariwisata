import { useEffect, useState } from 'react'
import { formatRp } from '@helpers/functions'
import _ from 'lodash'
import Layout from '@components/Layouts/Admin'
import Content from '@components/Content'
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
  IconButton,
  Badge,
  Overlay,
  TrashIcon,
  ResetIcon,
  PlusIcon,
} from 'evergreen-ui'
import { useRouter } from 'next/router'
import Image from 'next/image'
import Link from 'next/link'
import axios from 'axios'
import Konfirmasi from '@components/Dialogs/Konfirmasi'

const Pesanan = () => {
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
            `/orders?id_contains=${search}&_sort=status:desc${squery}`
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
            `/orders?id_contains=${search}&_sort=status:desc${squery}`
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
    <Layout title='Pesanan'>
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
        <Content.Header
          title='Pesanan'
          // button={
          //   <Button
          //     appearance='primary'
          //     size='large'
          //     onClick={() => router.push(`${router.asPath}/tambah`)}
          //     iconBefore={PlusIcon}
          //   >
          //     Buat Pesanan
          //   </Button>
          // }
        />
        <Content.Body>
          <Pane>
            <Pane className='row' marginY={10}>
              <Pane
                className='col-md-9 col-sm-12 d-flex gap-2 justify-content-start align-items-center'
                paddingY={5}
              >
                {/* <Text color='muted'>Filter</Text>
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
                </Button> */}
              </Pane>
              <Pane className='col-md-3 col-sm-12' paddingY={5}>
                <SearchInput
                  width='100%'
                  placeholder='Cari No. Pesanan ...'
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </Pane>
            </Pane>
            <Pane overflowX='auto'>
              <Pane>
                <Table overflowX='auto'>
                  <Table.Head borderRadius={4}>
                    <Table.TextHeaderCell
                      flexBasis={100}
                      flexShrink={0}
                      flexGrow={0}
                    >
                      No.
                    </Table.TextHeaderCell>
                    <Table.TextHeaderCell>User</Table.TextHeaderCell>
                    <Table.TextHeaderCell>
                      Alamat Pengiriman
                    </Table.TextHeaderCell>
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
                          key={order.id}
                          height='auto'
                          paddingY={10}
                          marginY={5}
                          borderRadius={4}
                          className='shadow-sm'
                        >
                          <Table.Cell
                            flexBasis={100}
                            flexShrink={0}
                            flexGrow={0}
                          >
                            <Strong>#{order.id}</Strong>
                          </Table.Cell>
                          <Table.TextCell>
                            <Strong>{order.users_permissions_user.name}</Strong>
                          </Table.TextCell>
                          <Table.TextCell>
                            <Strong>{order.name}</Strong>
                            <br />
                            {order.address.line1}
                            <br />
                            {order.address.city}
                            <br />
                            {order.address.postcode}
                          </Table.TextCell>
                          <Table.TextCell>
                            {order.items.map((it, index) => {
                              return (
                                <span
                                  key={
                                    'order' + order.id + it.variation.variation
                                  }
                                >
                                  {it.qty} x {it.product.name} (
                                  {it.variation.variation}) <br />
                                </span>
                              )
                            })}
                          </Table.TextCell>
                          <Table.TextCell isNumber>
                            {formatRp(
                              _.sumBy(
                                order.items,
                                (k) => k.qty * k.variation.price
                              ) +
                                order.ongkir +
                                order.fee
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
                          <Table.Cell className='d-flex justify-content-end align-items-center gap-1'></Table.Cell>
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
