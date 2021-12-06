import Layout from '@components/Layout'
import LayoutContent from '@components/Layouts/ClientContent'
import { useState, useEffect, useContext } from 'react'
import { GlobalContext } from '@components/Contexts/KeranjangContext'
import { useSession, getSession } from 'next-auth/react'
import { clientAxios, formatRp } from '@helpers/functions'
import { Trash, Upload } from 'react-bootstrap-icons'
import _ from 'lodash'
import Image from 'next/image'
import axios from 'axios'
import { useRouter } from 'next/router'

const Bayar = ({ order, payment }) => {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [bukti, setBukti] = useState()
  const { keranjang, setKeranjang } = useContext(GlobalContext)

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
    formData.append('ref', 'order')
    formData.append('refId', router.query.id)
    formData.append('field', 'konfirmasi')

    await clientAxios
      .post('/upload', formData)
      .then((res) => {
        router.push('/marketplace/bayar/status')
      })
      .catch((e) => {
        setIsLoading(false)
        console.log(e)
      })
  }

  const konfirm = async () => {
    clientAxios
      .put('/orders/' + router.query.id, {
        status: 'success',
      })
      .then((res) => {
        router.reload()
      })
      .catch((e) => {
        setIsLoading(false)
      })
  }

  return (
    <Layout title='Pembayaran' withFooter={false}>
      <LayoutContent>
        <div className='container'>
          <div className='contentPageTitle'>
            <h1>
              {order.konfirmasi != null ? 'Status Pesanan' : 'Pembayaran'}
            </h1>
          </div>
          <div className='row g-5'>
            <div className='col-md-5 col-lg-4 order-md-last'>
              <h4 className='d-flex justify-content-between align-items-center mb-3'>
                <span>Barang</span>
                <span className='badge bg-danger rounded-pill'>
                  {order != null && order.items.length}
                </span>
              </h4>
              <div className='list-group mb-3'>
                {order.items != null &&
                  order.items.map((item, index) => {
                    return (
                      <a
                        key={index}
                        className='list-group-item list-group-item-action'
                        aria-current='true'
                      >
                        <div className='d-flex w-100 justify-content-between'>
                          <h5 className='mb-1'>{item.product.name}</h5>
                        </div>
                        <p className='mb-1'>
                          {item.qty} x {item.variation.variation}
                          {` (${formatRp(item.variation.price)})`}
                        </p>
                        <small style={{ color: '#38b520' }}>
                          {formatRp(item.variation.price * item.qty)}
                        </small>
                      </a>
                    )
                  })}
                <li className='list-group-item d-flex justify-content-between'>
                  <span>Ongkos Kirim :</span>
                  <strong style={{ color: '#38b520' }}>
                    {formatRp(order.ongkir)}
                  </strong>
                </li>
                <li className='list-group-item d-flex justify-content-between'>
                  <span>Biaya Admin :</span>
                  <strong style={{ color: '#38b520' }}>
                    {formatRp(order.fee)}
                  </strong>
                </li>
                <li className='list-group-item d-flex justify-content-between'>
                  <span>Total :</span>
                  <strong style={{ color: '#38b520' }}>
                    {formatRp(
                      _.sumBy(order.items, (k) => k.qty * k.variation.price) +
                        order.ongkir +
                        order.fee
                    )}
                  </strong>
                </li>
              </div>
              {order.status == 'sent' ? (
                <button
                  type='button'
                  className='btn ispBtn-primary my-2'
                  style={{ width: '100%' }}
                  onClick={() => konfirm()}
                >
                  {isLoading ? (
                    <span
                      className='spinner-border spinner-border-sm me-2'
                      role='status'
                      aria-hidden='true'
                    />
                  ) : (
                    'Konfirmasi Terima'
                  )}
                </button>
              ) : order.status == 'success' ? (
                ''
              ) : (
                <div>
                  <strong>Upload Bukti Pembayaran</strong>
                  <div className='form-group pt-2'>
                    {order.konfirmasi == null ? (
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
                    ) : order.status == 'success' ? (
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
              )}
            </div>
            <div className='col-md-7 col-lg-8'>
              {order.konfirmasi == null ? (
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
                                process.env.NEXT_PUBLIC_API_URI + payment.qr.url
                              }
                              alt='QRIS'
                              layout='fill'
                              objectFit='contain'
                            />
                          </div>
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
              ) : order.status == 'sent' ? (
                <span>
                  Pesanan anda sedang dikirim dengan No. Resi {order.resi} (JNE){' '}
                  <br />
                  <a
                    href='https://rajaongkir.com/'
                    target='_blank'
                    rel='noreferrer'
                  >
                    Lacak Paket{' '}
                  </a>
                </span>
              ) : order.status == 'paid' ? (
                'Pembayaran Sudah di Konfirmasi, Barang akan segera dikirim'
              ) : order.status == 'success' ? (
                'Pesanan Sudah di Terima'
              ) : (
                'Pesanan Sedang Menunggu Konfirmasi Admin'
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

  const order = await axios
    .get(process.env.API_URI + '/orders/' + context.params.id)
    .then((res) => res.data)

  const payment = await axios
    .get(process.env.API_URI + '/payment')
    .then((res) => res.data)

  return {
    props: { session, order, payment },
  }
}
