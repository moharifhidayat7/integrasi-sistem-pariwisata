import Layout from '@components/Layout'
import LayoutContent from '@components/Layouts/ClientContent'
import { useState, useEffect, useContext } from 'react'
import { GlobalContext } from '@components/Contexts/KeranjangContext'
import { useSession, getSession } from 'next-auth/react'
import { clientAxios, formatRp, rajaOngkir } from '@helpers/functions'
import { Trash } from 'react-bootstrap-icons'
import _, { fromPairs } from 'lodash'
import axios from 'axios'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import Ongkir from '@components/Ongkir'
import { useRouter } from 'next/router'
const Bayar = ({ kamar }) => {
  const [isLoading, setIsLoading] = useState(false)
  const { data: session, status } = useSession()

  const router = useRouter()
  const [payment, setPayment] = useState([])
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: { errors },
  } = useForm()

  clientAxios.interceptors.request.use(
    function (config) {
      setIsLoading(true)
      return config
    },
    function (error) {
      // Do something with request error
      return Promise.reject(error)
    }
  )

  const onSubmit = async (postData) => {}

  return (
    <Layout title='Bayar' withFooter={false}>
      <LayoutContent>
        <div className='container'>
          <div className='contentPageTitle'>
            <h1>Booking</h1>
          </div>
          <div className='row g-5'>
            <div className='col-md-5 col-lg-4 order-md-last'></div>
            <div className='col-md-7 col-lg-8'>
              <h4 className='mb-3'>Kamar</h4>
              <div className='col-12'>
                <div className='list-group mb-3'>
                  <a
                    className='list-group-item list-group-item-action'
                    aria-current='true'
                  >
                    <div className='d-flex w-100 justify-content-between align-items-center'>
                      <div>
                        <h5 className='mb-1'>Kamar 1</h5>
                        <Link href={'/penginapan/' + 'ss'}>
                          <a>Peno HomeStay</a>
                        </Link>
                      </div>
                      <strong style={{ color: '#38b520' }}>
                        {formatRp(1122523)}
                      </strong>
                    </div>
                  </a>
                </div>
              </div>
              <h4 className='mb-3'>Detail</h4>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className='row g-3'>
                  <div className='col-sm-6'>
                    <label htmlFor='checkin' className='form-label'>
                      Check In
                    </label>
                    <input
                      type='date'
                      className='form-control'
                      id='checkin'
                      {...register('checkin', { required: 'Harus di isi!' })}
                    />
                    {errors.checkin && (
                      <div className='invalid-feedback d-block'>
                        {errors.checkin.message}
                      </div>
                    )}
                  </div>
                  <div className='col-sm-6'>
                    <label htmlFor='checkout' className='form-label'>
                      Check Out
                    </label>
                    <input
                      type='date'
                      className='form-control'
                      id='checkout'
                      {...register('checkout', { required: 'Harus di isi!' })}
                    />
                    {errors.checkOut && (
                      <div className='invalid-feedback d-block'>
                        {errors.checkout.message}
                      </div>
                    )}
                  </div>
                  <div className='col-sm-12'>
                    <label htmlFor='name' className='form-label'>
                      Nama Lengkap
                    </label>
                    <input
                      type='text'
                      className='form-control'
                      id='name'
                      {...register('name', { required: 'Harus di isi!' })}
                    />
                    {errors.name && (
                      <div className='invalid-feedback d-block'>
                        {errors.name.message}
                      </div>
                    )}
                  </div>
                  <div className='col-sm-6'>
                    <label htmlFor='email' className='form-label'>
                      Email
                    </label>
                    <input
                      type='text'
                      className='form-control'
                      id='email'
                      {...register('email', { required: 'Harus di isi!' })}
                    />
                    {errors.email && (
                      <div className='invalid-feedback d-block'>
                        {errors.email.message}
                      </div>
                    )}
                  </div>
                  <div className='col-sm-6'>
                    <label htmlFor='phone' className='form-label'>
                      Nomor Telepon
                    </label>
                    <input
                      type='text'
                      className='form-control'
                      id='phone'
                      {...register('phone', { required: 'Harus di isi!' })}
                    />
                    {errors.phone && (
                      <div className='invalid-feedback d-block'>
                        {errors.phone.message}
                      </div>
                    )}
                  </div>
                </div>

                <hr className='my-4' />

                <button
                  className='w-100 btn ispBtn-primary btn-lg'
                  type='submit'
                >
                  {isLoading ? (
                    <span
                      className='spinner-border spinner-border-sm me-2'
                      role='status'
                      aria-hidden='true'
                    />
                  ) : (
                    'Booking'
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </LayoutContent>
    </Layout>
  )
}

export default Bayar

export async function getServerSideProps(context) {
  const session = await getSession(context)

  const kamar = await axios
    .get(process.env.API_URI + '/rooms/' + context.params.id)
    .then((res) => res.data)
  return {
    props: { session, kamar },
  }
}
