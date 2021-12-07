import Layout from '@components/Layout'
import LayoutContent from '@components/Layouts/ClientContent'
import { useState, useEffect, useContext } from 'react'
import { GlobalContext } from '@components/Contexts/KeranjangContext'
import { useSession, getSession } from 'next-auth/react'
import { clientAxios, formatRp, rajaOngkir } from '@helpers/functions'
import { Trash, Upload } from 'react-bootstrap-icons'
import _, { fromPairs } from 'lodash'
import axios from 'axios'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import Ongkir from '@components/Ongkir'
import { useRouter } from 'next/router'
import Image from 'next/image'
const Bayar = ({ booking, object, payment }) => {
  const [isLoading, setIsLoading] = useState(false)
  const { data: session, status } = useSession()
  const [bukti, setBukti] = useState('')
  const router = useRouter()
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    setError,
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

  const upload = async () => {
    const formData = new FormData()
    formData.append('files', bukti[0])
    formData.append('ref', 'booking')
    formData.append('refId', router.query.id)
    formData.append('field', 'konfirmasi')

    await clientAxios
      .post('/upload', formData)
      .then((res) => {
        router.push('/booking/bayar/status')
      })
      .catch((e) => {
        setIsLoading(false)
        console.log(e)
      })
  }

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
                    <h5 className='mb-1'>{booking.room.name}</h5>
                    <span>
                      {(new Date(booking.checkout) -
                        new Date(booking.checkin)) /
                        (1000 * 3600 * 24)}{' '}
                      Malam x {formatRp(booking.room.price)}
                    </span>
                    <br />
                    <Link href={'/penginapan/' + object.id}>
                      <a target='_blank'>{object.name}</a>
                    </Link>
                  </div>
                  <strong style={{ color: '#38b520' }}>
                    {formatRp(
                      ((new Date(booking.checkout) -
                        new Date(booking.checkin)) /
                        (1000 * 3600 * 24)) *
                        booking.room.price
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
              <div className='mt-3 d-flex flex-column'>
                <div className='form-group'>Upload Bukti Pembayaran</div>

                <div className='form-group pt-2'>
                  {booking.konfirmasi == null ? (
                    <>
                      <input
                        type='file'
                        className='custom-file-input form-control'
                        id='bukti'
                        accept='image/*'
                        onChange={(e) => setBukti(e.target.files)}
                        hidden
                      />
                      <label
                        htmlFor='bukti'
                        style={{ cursor: 'pointer', width: '100%' }}
                      >
                        <div
                          className='border p-3 text-center rounded text-muted'
                          style={{ backgroundColor: '#eeeeee' }}
                        >
                          {bukti ? (
                            bukti[0].name
                          ) : (
                            <>
                              <Upload /> pilih foto bukti transfer
                            </>
                          )}
                        </div>
                      </label>
                      <button
                        type='button'
                        className='btn ispBtn-primary my-2'
                        style={{ width: '100%' }}
                        onClick={() => upload()}
                        disabled={!bukti}
                      >
                        {isLoading ? (
                          <span
                            className='spinner-border spinner-border-sm me-2'
                            role='status'
                            aria-hidden='true'
                          />
                        ) : (
                          <>
                            <Upload /> Upload
                          </>
                        )}
                      </button>
                    </>
                  ) : booking.status == 'success' ? (
                    ''
                  ) : (
                    <button
                      type='button'
                      className='btn ispBtn-primary my-2'
                      style={{ width: '100%' }}
                      disabled={true}
                    >
                      Sedang Menunggu Konfirmasi Admin
                    </button>
                  )}
                </div>
              </div>
            </div>
            <div className='col-md-7 col-lg-8'>
              {booking.status == 'canceled' ? (
                <>
                  <h4 className='mb-3'>Transaksi Dibatalkan</h4>
                </>
              ) : booking.status == 'success' ? (
                <>
                  <h4 className='mb-3'>Transaksi Booking Selesai</h4>
                </>
              ) : (booking.konfirmasi != null) &
                (booking.status != 'success') ? (
                <>
                  <h4 className='mb-3'>Sedang Menunggu Konfirmasi Admin</h4>
                </>
              ) : (
                booking.status == 'unpaid' && (
                  <>
                    <h4 className='mb-3'>
                      Lakukan Pembayaran ke salah satu rekening berikut:
                    </h4>
                    {payment.qr && (
                      <>
                        <div className='py-4'>
                          <strong>QRIS</strong>
                        </div>
                        <div className='d-inline-flex flex-wrap gap-2'>
                          <div className='card d-flex flex-row'>
                            <div
                              className='rekLinkAja'
                              style={{
                                width: '200px',
                                height: '200px',
                                position: 'relative',
                              }}
                            >
                              <Image
                                src={
                                  process.env.NEXT_PUBLIC_API_URI +
                                  payment.qr.url
                                }
                                alt='QRIS'
                                layout='fill'
                                objectFit='contain'
                              />
                            </div>
                          </div>
                          <div className='ms-2'>
                            <strong>SEKRETARIAT POKDARWIS GOMBENGSARI</strong>
                            <br />
                            <br />
                            Cara bayar dengan QRIS : <br />
                            1. Buka aplikasi E-Wallet berlogo QRIS
                            <br />
                            2. Scan & Cek
                            <br />
                            3. Bayar
                          </div>
                        </div>
                      </>
                    )}
                    {(payment.BRI ||
                      payment.BCA ||
                      payment.MANDIRI ||
                      payment.BNI) && (
                      <>
                        <div className='py-4'>
                          <strong>Rekening Bank</strong>
                        </div>
                        <div className='d-inline-flex flex-wrap gap-2'>
                          {payment.BRI.rek && (
                            <div className='card p-3 d-flex flex-row justify-content-between align-items-center'>
                              <div
                                className='rekImg'
                                style={{
                                  width: '100px',
                                  height: '4rem',
                                  position: 'relative',
                                  marginRight: '20px',
                                }}
                              >
                                <Image
                                  src='/BRI.png'
                                  alt='rekening bri'
                                  layout='fill'
                                  objectFit='contain'
                                />
                              </div>
                              <div>
                                <strong>{payment.BRI.name}</strong>
                                <br />
                                <strong>{payment.BRI.rek}</strong>
                              </div>
                            </div>
                          )}
                          {payment.MANDIRI.rek && (
                            <div className='card p-3 d-flex flex-row justify-content-between align-items-center'>
                              <div
                                className='rekImg'
                                style={{
                                  width: '100px',
                                  height: '4rem',
                                  position: 'relative',
                                  marginRight: '20px',
                                }}
                              >
                                <Image
                                  src='/MANDIRI.png'
                                  alt='rekening mandiri'
                                  layout='fill'
                                  objectFit='contain'
                                />
                              </div>
                              <div>
                                <strong>{payment.MANDIRI.name}</strong>
                                <br />
                                <strong>{payment.MANDIRI.rek}</strong>
                              </div>
                            </div>
                          )}
                          {payment.BCA.rek && (
                            <div className='card p-3 d-flex flex-row justify-content-between align-items-center'>
                              <div
                                className='rekImg'
                                style={{
                                  width: '100px',
                                  height: '4rem',
                                  position: 'relative',
                                  marginRight: '20px',
                                }}
                              >
                                <Image
                                  src='/BCA.png'
                                  alt='rekening bca'
                                  layout='fill'
                                  objectFit='contain'
                                />
                              </div>
                              <div>
                                <strong>{payment.BCA.name}</strong>
                                <br />
                                <strong>{payment.BCA.rek}</strong>
                              </div>
                            </div>
                          )}
                          {payment.BNI.rek && (
                            <div className='card p-3 d-flex flex-row justify-content-between align-items-center'>
                              <div
                                className='rekImg'
                                style={{
                                  width: '100px',
                                  height: '4rem',
                                  position: 'relative',
                                  marginRight: '20px',
                                }}
                              >
                                <Image
                                  src='/BNI.png'
                                  alt='rekening bni'
                                  layout='fill'
                                  objectFit='contain'
                                />
                              </div>
                              <div>
                                <strong>{payment.BNI.name}</strong>
                                <br />
                                <strong>{payment.BNI.rek}</strong>
                              </div>
                            </div>
                          )}
                        </div>
                      </>
                    )}
                  </>
                )
              )}
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

  const booking = await axios
    .get(process.env.API_URI + '/bookings/' + context.params.id)
    .then((res) => res.data)
  const object = await axios
    .get(process.env.API_URI + '/objects?id=' + booking.room.object)
    .then((res) => res.data[0])

  const payment = await axios
    .get(process.env.API_URI + '/payment')
    .then((res) => res.data)
  return {
    props: { session, booking, object, payment },
  }
}
