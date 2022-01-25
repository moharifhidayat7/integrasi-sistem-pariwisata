import { useEffect, useState } from 'react'
import Layout from '../../../components/Layouts/Admin'
import Content from '../../../components/Content'
import { useSession } from 'next-auth/react'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"
import { formatRp } from '@helpers/functions'
import _ from 'lodash'
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
  TextInput,
  SearchInput,
  Text,
  Avatar,
  toaster,
} from 'evergreen-ui'
import { useRouter } from 'next/router'
import axios from 'axios'

const Start = () => {
  const [startDate, setStartDate] = useState(new Date());
  return (
    <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
  );
};

const Penjualan = () => {
  const [roles, setRoles] = useState([])
  const [data, setData] = useState([])
  const { data: session, status } = useSession()
  const [value, setValue] = useState([])
  const [showDelete, setShowDelete] = useState(false)
  const [showUserForm, setShowUserForm] = useState(false)
  const [search, setSearch] = useState('')
  const [limit, setLimit] = useState(5)
  const [currentPage, setCurrentPage] = useState(1)
  const [selectRole, setSelectRole] = useState(null)
  const [squery, setSquery] = useState('')

  const [start, setStart] = useState('')
  const [end, setEnd] = useState('')

  const router = useRouter()

  const mutate = async () => {
    await axios
      .get(
        process.env.NEXT_PUBLIC_API_URI +
          '/orders?status=success'
      )
      .then((res) => {
        setData(res.data)
      })
  }

  const download = async (start, end) => {
    axios({
      method: 'post',
      url: 'https://rumahdigitalgombengsari.com/api/export/penjualan',
      responseType: 'blob',
      data: {
        start:start,
        end: end
      },
    }).then(response=>{
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `laporan-penjualan.xlsx`);
      document.body.appendChild(link);
      link.click();
    })
    
  }

  useEffect(() => {
    const json = async () =>
      await axios
        .get(
          process.env.NEXT_PUBLIC_API_URI +
            '/orders?status=success'
        )
        .then((res) => {
          setData(res.data)
        })

    json()
  }, [])

  useEffect(()=> {
    const json = async () =>
      await axios
        .get(
          process.env.NEXT_PUBLIC_API_URI +
            `/orders?status=success&${start != ''?'created_at_gte='+start: ''}&${end != ''?'created_at_lte='+end: ''}`
        )
        .then((res) => {
          setData(res.data)
        })

    json()
  }, [start, end])

  return (
    <Layout title='Laporan Penjualan'>
      <Content>
        <Content.Header
          title='Laporan Penjualan'
        />
        <Content.Body>
          <Pane>
            <Pane className='row' marginY={10}>
              <Pane
                className='col-md-9 col-sm-12 d-inline-flex gap-2 flex-wrap justify-content-start align-items-center'
                paddingY={5}
              >
                <Text color='muted'>Dari</Text>
                <TextInput type='date' name="start-date" width='auto' value={start} onChange={(e)=>setStart(e.target.value)}/>
                <Text color='muted'>Sampai</Text>
                <TextInput type='date' name="end-date" width='auto' value={end} onChange={(e)=>setEnd(e.target.value)}/>
                
                <Button
                  iconBefore={ResetIcon}
                  onClick={(e) => {
                    setStart('')
                    setEnd('')
                  }}
                >
                  Reset
                </Button>
              </Pane>
              <Pane className='col-md-3 col-sm-12 d-flex justify-content-end' paddingY={5}>
                <Button appearance='primary' onClick={(e)=>{download(start, end)}}>Download XLS</Button>
              </Pane>
            </Pane>
            <Pane overflowX='auto'>
              <Pane>
                <Table overflowX='auto'>
                  <Table.Head borderRadius={4}>
                    <Table.TextHeaderCell>
                      Tanggal
                    </Table.TextHeaderCell>
                    <Table.TextHeaderCell>No. Pesanan</Table.TextHeaderCell>
                    <Table.TextHeaderCell>User</Table.TextHeaderCell>
                    <Table.TextHeaderCell>Email</Table.TextHeaderCell>
                    <Table.TextHeaderCell>Harga Produk</Table.TextHeaderCell>
                    <Table.TextHeaderCell>Ongkir</Table.TextHeaderCell>
                    <Table.TextHeaderCell>Admin</Table.TextHeaderCell>
                    <Table.TextHeaderCell>Total</Table.TextHeaderCell>
                  </Table.Head>
                  <Table.Body>
                    {data &&
                      data.map((order, index) => (
                        <Table.Row
                          key={order.id}
                          height='auto'
                          paddingY={5}
                        >
                          <Table.TextCell
                          >{new Date(order.created_at).toLocaleString('id-ID', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour12: false,
                          })}</Table.TextCell>
                          <Table.TextCell>{order.id}
                          </Table.TextCell>
                          <Table.TextCell>{order.users_permissions_user.name}
                          </Table.TextCell>
                          <Table.TextCell>{order.users_permissions_user.email}</Table.TextCell>
                          <Table.TextCell>
                          {formatRp(
                              _.sumBy(
                                order.items,
                                (k) =>
                                  k.qty * (k.variation.price + k.variation.fee)
                              )
                            )}
                          </Table.TextCell>
                          <Table.TextCell>{formatRp(order.ongkir)}</Table.TextCell>
                          <Table.TextCell>{formatRp(
                              _.sumBy(
                                order.items,
                                (k) =>
                                  k.qty *k.variation.fee
                              )
                            )}</Table.TextCell>
                          <Table.TextCell>
                          {formatRp(
                              _.sumBy(
                                order.items,
                                (k) =>
                                  k.qty * (k.variation.price + k.variation.fee)
                              ) + order.ongkir
                            )}
                          </Table.TextCell>
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

export default Penjualan
