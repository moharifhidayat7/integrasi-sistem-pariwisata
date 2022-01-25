import { useEffect, useState } from 'react'
import Layout from '../../../components/Layouts/Admin'
import Content from '../../../components/Content'
import { useSession } from 'next-auth/react'
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

const Booking = () => {
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
  const [objek, setObjek] = useState([])

  const router = useRouter()

  const download = async (start, end) => {
    axios({
      method: 'post',
      url: 'https://rumahdigitalgombengsari.com/api/export/booking',
      responseType: 'blob',
      data: {
        start:start,
        end: end
      },
    }).then(response=>{
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `laporan-booking.xlsx`);
      document.body.appendChild(link);
      link.click();
    })
    
  }

  useEffect(() => {
    
    const json = async () => {
      const objek = await axios
      .get(process.env.NEXT_PUBLIC_API_URI + '/objects')
      .then((res) => {
        return res.data
      })
      await axios
      .get(
        process.env.NEXT_PUBLIC_API_URI +
          '/bookings?status=success'
      )
      .then((res) => {
        setData(res.data.map(d=>({...d, penginapan: objek.filter(o=>o.id==d.room.object)[0].name})))
      })
    }
      

    json()

    
  }, [])

  useEffect(()=> {
    const json = async () =>{
      const objek = await axios
      .get(process.env.NEXT_PUBLIC_API_URI + '/objects')
      .then((res) => {
        return res.data
      })
      await axios
      .get(
        process.env.NEXT_PUBLIC_API_URI +
          `/bookings?status=success&${start != ''?'created_at_gte='+start: ''}&${end != ''?'created_at_lte='+end: ''}`
      )
      .then(res => {
        setData(res.data.map(d=>({...d, penginapan: objek.filter(o=>o.id==d.room.object)[0].name})))
      })
    }
      
      
    json()
  }, [start, end])

  return (
    <Layout title='Laporan Booking'>
      <Content>
        <Content.Header
          title='Laporan Booking'
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
                    <Table.TextHeaderCell>No. Booking</Table.TextHeaderCell>
                    <Table.TextHeaderCell>Pemesan</Table.TextHeaderCell>
                    <Table.TextHeaderCell>Email</Table.TextHeaderCell>
                    <Table.TextHeaderCell>Penginapan</Table.TextHeaderCell>
                    <Table.TextHeaderCell>Kamar</Table.TextHeaderCell>
                    <Table.TextHeaderCell>Cek In</Table.TextHeaderCell>
                    <Table.TextHeaderCell>Cek Out</Table.TextHeaderCell>
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
                          <Table.TextCell>{order.name}
                          </Table.TextCell>
                          <Table.TextCell>{order.email}</Table.TextCell>
                          <Table.TextCell>
                          {order.penginapan}
                          </Table.TextCell>
                          <Table.TextCell>{order.room.name}</Table.TextCell>
                          <Table.TextCell>{order.checkin}</Table.TextCell>
                          <Table.TextCell>
                          {order.checkout}
                          </Table.TextCell>
                          <Table.TextCell>
                          {formatRp(order.price)}
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

export default Booking
