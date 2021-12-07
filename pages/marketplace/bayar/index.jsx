import Layout from '@components/Layout'
import LayoutContent from '@components/Layouts/ClientContent'
import { useState, useEffect, useContext } from 'react'
import { GlobalContext } from '@components/Contexts/KeranjangContext'
import { useSession, getSession } from 'next-auth/react'
import { clientAxios, formatRp, rajaOngkir } from '@helpers/functions'
import { Trash } from 'react-bootstrap-icons'
import _, { fromPairs } from 'lodash'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import Ongkir from '@components/Ongkir'
import { useRouter } from 'next/router'
const Bayar = ({ kota }) => {
  const [isLoading, setIsLoading] = useState(false)
  const { data: session, status } = useSession()
  const [active, setActive] = useState({ cost: [{ value: 0 }] })
  const [ongkir, setOngkir] = useState()
  const router = useRouter()
  const [payment, setPayment] = useState([])
  const { keranjang, addItemToList, removeItemFromList, setKeranjang } =
    useContext(GlobalContext)
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: { errors },
  } = useForm()
  const [userData, setUserData] = useState([])
  const watchCity = watch('city')
  const sameAddress = (e) => {
    if (e.target.checked) {
      setValue('name', userData.name)
      setValue('phone', userData.phone)
      setValue('line1', userData.address.line1)
      setValue('postcode', userData.address.postcode)
      setValue(
        'city',
        kota.filter(
          (f) =>
            f.city_name.toLowerCase() == userData.address.city.toLowerCase()
        )[0].city_id
      )
    } else {
      reset()
    }
  }

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
    const json = {
      name: postData.name,
      address: {
        line1: postData.line1,
        city: kota.filter((f) => f.city_id == postData.city)[0].city_name,
        postcode: postData.postcode,
      },
      phone: postData.phone,
      items: keranjang,
      ongkir: active.cost[0].value,
      fee: payment.fee,
      users_permissions_user: session.id,
    }
    await clientAxios
      .post(process.env.NEXT_PUBLIC_API_URI + '/orders', json)
      .then((res) => {
        setKeranjang(null)
        localStorage.setItem('keranjang', null)
        router.push('/marketplace/bayar/' + res.data.id)
      })
      .catch((e) => {
        setIsLoading(false)
        console.log(e)
      })
  }

  useEffect(() => {
    const json = async () => {
      await axios
        .get(process.env.NEXT_PUBLIC_API_URI + '/users/me', {
          headers: {
            Authorization: `Bearer ${await session.jwt}`,
          },
        })
        .then((res) => {
          setUserData(res.data)
        })
    }
    json()

    const pay = async () => {
      await axios
        .get(process.env.NEXT_PUBLIC_API_URI + '/payment')
        .then((res) => {
          setPayment(res.data)
        })
    }
    pay()
  }, [])

  useEffect(() => {
    if (watchCity == null || watchCity == '') {
      setOngkir()
      return
    }
    let weight = 0
    if (keranjang != null) {
      weight = keranjang.length * 700
    }
    if (weight == 0) {
      setOngkir()
      return
    }
    const json = async () => {
      await axios
        .get('/api/ongkir?destination=' + watchCity + '&weight=' + weight)
        .then((res) => {
          setOngkir(res.data)
          setActive({ cost: [{ value: 0 }] })
        })
    }
    json()
  }, [watchCity, keranjang])

  return (
    <Layout title='Bayar' withFooter={false}>
      <LayoutContent>
        <div className='container'>
          <div className='contentPageTitle'>
            <h1>Pembayaran</h1>
          </div>
          <div className='row g-5'>
            <div className='col-md-5 col-lg-4 order-md-last'>
              <h4 className='d-flex justify-content-between align-items-center mb-3'>
                <span>Keranjang</span>
                <span className='badge bg-danger rounded-pill'>
                  {keranjang != null && keranjang.length}
                </span>
              </h4>
              <div className='list-group mb-3'>
                {keranjang != null &&
                  keranjang.length > 0 &&
                  keranjang.map((item, index) => {
                    return (
                      <a
                        key={index}
                        className='list-group-item list-group-item-action'
                        aria-current='true'
                      >
                        <div className='d-flex w-100 justify-content-between'>
                          <h5 className='mb-1'>{item.product.name}</h5>
                          <button
                            type='button'
                            className='btn btn-danger btn-sm'
                            onClick={() => removeItemFromList(item)}
                          >
                            <Trash />
                          </button>
                        </div>
                        <p className='mb-1'>
                          {item.qty} x {item.variation.variation}
                          {` (${formatRp(
                            item.variation.price + item.variation.fee
                          )})`}
                        </p>
                        <small style={{ color: '#38b520' }}>
                          {formatRp(
                            (item.variation.price + item.variation.fee) *
                              item.qty
                          )}
                        </small>
                      </a>
                    )
                  })}

                <li className='list-group-item d-flex justify-content-between'>
                  <span>Ongkos Kirim :</span>
                  <strong style={{ color: '#38b520' }}>
                    {formatRp(active.cost[0].value)}
                  </strong>
                </li>
                <li className='list-group-item d-flex justify-content-between'>
                  <span>Total :</span>
                  <strong style={{ color: '#38b520' }}>
                    {formatRp(
                      _.sumBy(
                        keranjang,
                        (k) => k.qty * (k.variation.price + k.variation.fee)
                      ) + active.cost[0].value
                    )}
                  </strong>
                </li>
              </div>
            </div>
            <div className='col-md-7 col-lg-8'>
              <h4 className='mb-3'>Alamat Pengiriman</h4>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className='row g-3'>
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

                  <div className='col-12'>
                    <label htmlFor='address' className='form-label'>
                      Alamat
                    </label>
                    <input
                      type='text'
                      className='form-control'
                      id='address'
                      placeholder='1234 Main St'
                      {...register('line1', {
                        required: 'Harus di isi!',
                      })}
                    />
                    {errors.line1 && (
                      <div className='invalid-feedback d-block'>
                        {errors.line1.message}
                      </div>
                    )}
                  </div>
                  <div className='col-md-6'>
                    <label htmlFor='city' className='form-label'>
                      Kota
                    </label>
                    <select
                      className='form-select'
                      id='city'
                      {...register('city', {
                        required: 'Harus di isi!',
                      })}
                      defaultValue=''
                    >
                      <option value=''>Pilih Kota...</option>
                      {kota.map((k) => {
                        return (
                          <option key={k.city_id} value={k.city_id}>
                            {k.city_name}
                          </option>
                        )
                      })}
                    </select>
                    {errors.city && (
                      <div className='invalid-feedback d-block'>
                        {errors.city.message}
                      </div>
                    )}
                  </div>
                  <div className='col-md-6'>
                    <label htmlFor='zip' className='form-label'>
                      Kode Pos
                    </label>
                    <input
                      type='text'
                      className='form-control'
                      id='zip'
                      placeholder=''
                      {...register('postcode', {
                        required: 'Harus di isi!',
                      })}
                    />
                    {errors.postcode && (
                      <div className='invalid-feedback d-block'>
                        {errors.postcode.message}
                      </div>
                    )}
                  </div>
                </div>
                <hr className='my-4' />
                <div className='form-check'>
                  <input
                    type='checkbox'
                    className='form-check-input'
                    id='same-address'
                    onChange={sameAddress}
                  />
                  <label className='form-check-label' htmlFor='same-address'>
                    Alamat pengiriman sama dengan alamat akun saya
                  </label>
                </div>

                <hr className='my-4' />

                <h4 className='mb-3'>Jasa Pengiriman</h4>
                <div className='d-flex flex-wrap gap-2 mb-3'>
                  {ongkir
                    ? ongkir[0].costs.map((jasa) => {
                        return (
                          <Ongkir
                            data={jasa}
                            active={active}
                            key={jasa.service}
                            onClick={() => setActive(jasa)}
                          />
                        )
                      })
                    : 'Pilih Kota Tujuan Pengiriman ...'}
                </div>

                <button
                  className='w-100 btn ispBtn-primary btn-lg'
                  type='submit'
                  disabled={active.cost[0].value != 0 ? false : true}
                >
                  {isLoading ? (
                    <span
                      className='spinner-border spinner-border-sm me-2'
                      role='status'
                      aria-hidden='true'
                    />
                  ) : (
                    'Bayar'
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
  const kota = await rajaOngkir.get('/city').then((res) => {
    return res.data.rajaongkir.results
  })
  return {
    props: { session, kota },
  }
}
