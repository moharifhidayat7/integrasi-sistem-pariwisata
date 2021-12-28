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
import Image from 'next/image'
const Bayar = ({ kamar }) => {
  const [isLoading, setIsLoading] = useState(false)
  const { data: session, status } = useSession()
  const [valid, setValid] = useState(false)
  const router = useRouter()
  const [payment, setPayment] = useState([])
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    setError,
    watch,
    formState: { errors },
  } = useForm()

  const wIn = watch('checkin')
  const wOut = watch('checkout')

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

  const onSubmit = async (postData) => {
    setIsLoading(true)
    await axios
      .post(process.env.NEXT_PUBLIC_API_URI + '/bookings', {
        ...postData,
        users_permissions_user: session.id,
        room: kamar.id,
        price: kamar.price,
      })
      .then((res) => {
        router.push('/booking/bayar/' + res.data.id)
      })
      .catch((e) => {
        console.log(e)
        setIsLoading(false)
      })
  }

  useEffect(() => {
    // console.log((new Date(wOut) - new Date(wIn)) / (1000 * 3600 * 24))
    if ((new Date(wOut) - new Date(wIn)) / (1000 * 3600 * 24) == 0) {
      setValid(true)
    } else if ((new Date(wOut) - new Date(wIn)) / (1000 * 3600 * 24) < 0) {
      setValid(false)
    } else if (isNaN(new Date(wOut) - new Date(wIn)) / (1000 * 3600 * 24)) {
      setValid(false)
    } else {
      setValid(true)
    }
  }, [wIn, wOut])

  return (
    <Layout title='Bayar' withFooter={false}>
      <LayoutContent>
        <div className='container'>
          <div className='contentPageTitle'>
            <h1>Booking</h1>
          </div>
          <div className='row g-5'>
            <div className='col-md-5 col-lg-4 order-md-last'>
              <h4 className='mb-3'>Kamar</h4>
              <a
                className='list-group-item list-group-item-action'
                aria-current='true'
              >
                <div className='d-flex w-100 justify-content-between align-items-center'>
                  <div>
                    <h5 className='mb-1'>{kamar.name}</h5>
                    <span>
                      {(new Date(wOut) - new Date(wIn)) / (1000 * 3600 * 24) ==
                        0 && <>1 Malam x {formatRp(kamar.price)}</>}
                      {(new Date(wOut) - new Date(wIn)) / (1000 * 3600 * 24) <
                        0 && '-'}
                      {(new Date(wOut) - new Date(wIn)) / (1000 * 3600 * 24) >=
                        1 && (
                        <>
                          {isNaN(
                            (new Date(wOut) - new Date(wIn)) /
                              (1000 * 3600 * 24)
                          )
                            ? '1'
                            : (new Date(wOut) - new Date(wIn)) /
                              (1000 * 3600 * 24)}{' '}
                          Malam x {formatRp(kamar.price)}
                        </>
                      )}
                    </span>
                    <br />
                    <Link href={'/penginapan/' + kamar.object.id}>
                      <a target='_blank'>{kamar.object.name}</a>
                    </Link>
                  </div>
                  <strong style={{ color: '#38b520' }}>
                    {(new Date(wOut) - new Date(wIn)) / (1000 * 3600 * 24) ==
                      0 && <>{formatRp(1 * kamar.price)}</>}
                    {(new Date(wOut) - new Date(wIn)) / (1000 * 3600 * 24) <
                      0 && '-'}
                    {(new Date(wOut) - new Date(wIn)) / (1000 * 3600 * 24) >=
                      1 && (
                      <>
                        {formatRp(
                          (isNaN(
                            (new Date(wOut) - new Date(wIn)) /
                              (1000 * 3600 * 24)
                          )
                            ? 1
                            : (new Date(wOut) - new Date(wIn)) /
                              (1000 * 3600 * 24)) * kamar.price
                        )}
                      </>
                    )}
                  </strong>
                </div>
              </a>
              {/* <div className='card'>
                <div style={{ height: '15rem', position: 'relative' }}>
                  <Image
                    src={process.env.NEXT_PUBLIC_API_URI + kamar.gallery[0].url}
                    alt={kamar.gallery[0].name}
                    layout='fill'
                    objectFit='cover'
                    className='rounded'
                  />
                </div>
                <div className='card-body'>
                  <h5 className='card-title'>{kamar.name}</h5>
                  <p className='card-text'>
                          Some quick example text to build on the card title and
                          make up the bulk of the cards content.
                        </p>
                  <div className='d-flex justify-content-between align-items-center'>
                    <span style={{ color: '#38b520', fontSize: '1.3rem' }}>
                      {formatRp(kamar.price)}/Malam
                    </span>
                  </div>
                </div>
              </div> */}
            </div>
            <div className='col-md-7 col-lg-8'>
              <h4 className='mb-3'>Detail</h4>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className='row g-3'>
                  <div className='col-sm-6'>
                    <label htmlFor='checkin' className='form-label'>
                      Check In *
                    </label>
                    <input
                      type='date'
                      className='form-control'
                      id='checkin'
                      min={new Date().toISOString().slice(0, 10)}
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
                      Check Out *
                    </label>
                    <input
                      type='date'
                      className='form-control'
                      id='checkout'
                      min={new Date().toISOString().slice(0, 10)}
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
                      Nama Lengkap *
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
                      Email *
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
                      Nomor Telepon *
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
                  disabled={!valid}
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
