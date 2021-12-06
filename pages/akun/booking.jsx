import Layout from '@components/Layouts/Akun'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { clientAxios } from '@helpers/functions'
import { useSession, getSession } from 'next-auth/react'
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

  clientAxios.interceptors.request.use(
    function (config) {
      setIsLoading(true)
      return config
    },
    function (error) {
      return Promise.reject(error)
    }
  )

  const onSubmit = (postData) => {
    clientAxios
      .put(process.env.NEXT_PUBLIC_API_URI + '/users/' + data.id, postData)
      .then((res) => {
        setIsLoading(false)
        alert('Edit Profil Berhasil')
      })
  }

  useEffect(() => {
    const json = async () => {
      await axios
        .get(process.env.NEXT_PUBLIC_API_URI + '/users/me', {
          headers: {
            Authorization: `Bearer ${session.jwt}`,
          },
        })
        .then((res) => {
          setData(res.data)
          setValue('name', res.data.name)
          setValue('email', res.data.email)
          setValue('address', res.data.address)
          setValue('phone', res.data.phone)
        })
    }
    json()
  }, [])
  return (
    <Layout title='Booking'>
      {/* <form className='row g-3' onSubmit={handleSubmit(onSubmit)}>
        <div className='col-md-12'>
          <label htmlFor='name' className='form-label text-left'>
            Nama
          </label>
          <input
            type='text'
            className='form-control'
            id='name'
            placeholder='Nama lengkap'
            {...register('name', { required: true })}
          />
        </div>
        <div className='col-md-6'>
          <label htmlFor='email' className='form-label text-left'>
            Email
          </label>
          <input
            type='email'
            className='form-control'
            id='email'
            placeholder='name@example.com'
            disabled
            {...register('email')}
          />
        </div>
        <div className='col-md-6'>
          <label htmlFor='phone' className='form-label text-left'>
            Nomor Telepon
          </label>
          <input
            type='phome'
            className='form-control'
            id='phone'
            placeholder='0xxxxxxxxx'
            {...register('phone')}
          />
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
            {...register('address')}
          />
        </div>

        <div className='d-flex justify-content-end'>
          <button
            type='submit'
            className='btn ispBtn-primary mb-3 p-2'
            disabled={isLoading}
          >
            {isLoading ? (
              <span
                className='spinner-border spinner-border-sm me-2'
                role='status'
                aria-hidden='true'
              />
            ) : (
              'Submit'
            )}
          </button>
        </div>
      </form> */}
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
