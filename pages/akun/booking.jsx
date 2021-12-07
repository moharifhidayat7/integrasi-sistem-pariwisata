import Layout from '@components/Layouts/Akun'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { clientAxios } from '@helpers/functions'
import { useSession, getSession } from 'next-auth/react'
import { formatRp } from '@helpers/functions'
const Profil = () => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm()
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const { data: session, status } = useSession()
  const [booking, setBooking] = useState([])

  clientAxios.interceptors.request.use(
    function (config) {
      setIsLoading(true)
      return config
    },
    function (error) {
      return Promise.reject(error)
    }
  )
  // const getObj = async (id) => {
  //   const k = await axios
  //     .get(process.env.NEXT_PUBLIC_API_URI + '/rooms?id=' + id)
  //     .then((res) => res.data)
  //   return k
  // }

  useEffect(() => {
    const json = async () => {
      await axios
        .get(
          process.env.NEXT_PUBLIC_API_URI +
            '/bookings?users_permissions_user=' +
            session.id
        )
        .then((res) => {
          setBooking(res.data)
        })
    }
    json()
  }, [])
  return (
    <Layout title='Booking'>
      <div className='list-group'>
        {booking.map((order, index) => {
          return (
            <Link href={'/booking/bayar/' + order.id} key={order.id}>
              <a
                className='list-group-item list-group-item-action'
                aria-current='true'
              >
                <div className='d-flex w-100 justify-content-between'>
                  <h5 className='mb-1'>Booking #{order.id}</h5>
                  {/* <small>
                    {new Date(order.created_at).toLocaleString('id-ID', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour12: false,
                      hour: '2-digit',
                      minute: '2-digit',
                      second: '2-digit',
                    })}
                  </small> */}
                  <span style={{ color: '#38b520' }}>
                    {formatRp(
                      ((new Date(order.checkout) - new Date(order.checkin)) /
                        (1000 * 3600 * 24)) *
                        order.room.price
                    )}
                  </span>
                </div>
                {/* <div className='d-flex justify-content-between'>
                  <span></span>
                  <span>
                    Total :{' '}
                    
                  </span>
                </div> */}
                {/* <span>
                  Penginapan : {JSON.stringify(getObj(order.room.id))}
                </span> */}
                <span>
                  Check In :{' '}
                  {new Date(order.checkin).toLocaleString('id-ID', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour12: false,
                  })}
                </span>
                <br />
                <span>
                  Check Out :{' '}
                  {new Date(order.checkout).toLocaleString('id-ID', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour12: false,
                  })}
                </span>
                <br />
                <span>
                  Status : {order.status == 'unpaid' && 'Belum Dibayar'}
                  {order.status == 'paid' && 'Sudah Dibayar'}
                  {order.status == 'waiting' && 'Menunggu Konfirmasi'}
                  {order.status == 'success' && 'Sukses'}
                  {order.status == 'canceled' && 'Dibatalkan'}
                </span>
              </a>
            </Link>
          )
        })}
      </div>
    </Layout>
  )
}

export default Profil
export async function getServerSideProps(context) {
  const session = await getSession(context)

  return {
    props: { session },
  }
}
