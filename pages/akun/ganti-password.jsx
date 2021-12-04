import Layout from '@components/Layouts/Akun'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { clientAxios } from '@helpers/functions'
import { useSession, getSession, signOut } from 'next-auth/react'
const Profil = () => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    setError,
    formState: { errors },
  } = useForm()
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const { data: session, status } = useSession()
  const currentPassword = useRef({})
  currentPassword.current = watch('newPassword', '')
  clientAxios.interceptors.request.use(
    function (config) {
      setIsLoading(true)
      return config
    },
    function (error) {
      return Promise.reject(error)
    }
  )

  const onSubmit = (data) => {
    clientAxios
      .post('/profiles/change-password', data, {
        headers: {
          Authorization: `Bearer ${session.jwt}`,
        },
      })
      .then(function (response) {
        setIsLoading(false)
        reset()
        signOut({ callbackUrl: '/' })
      })
      .catch(function (error) {
        setIsLoading(false)
        console.log(error)
        setError('currentPassword', 'Password Salah')
      })
  }

  return (
    <Layout title='Profil'>
      <form className='row g-3' onSubmit={handleSubmit(onSubmit)}>
        <div className='col-md-12'>
          <label htmlFor='currentPassword' className='form-label text-left'>
            Password Lama *
          </label>
          <input
            type='password'
            className='form-control'
            id='currentPassword'
            placeholder='Password Lama'
            {...register('currentPassword', {
              required: 'Harus di isi!',
            })}
          />
        </div>
        <div className='col-md-12'>
          <label htmlFor='newPassword' className='form-label text-left'>
            Password Baru *
          </label>
          <input
            type='password'
            className='form-control'
            id='newPassword'
            placeholder='Password Baru'
            {...register('newPassword', {
              required: 'Harus di isi!',
              minLength: {
                value: 8,
                message: 'Password minimal 8 karakter',
              },
            })}
          />
        </div>
        <div className='col-md-12'>
          <label htmlFor='confirmNewPassword' className='form-label text-left'>
            Konfirmasi Password Baru *
          </label>
          <input
            type='password'
            className='form-control'
            id='confirmNewPassword'
            placeholder='Konfirmasi Password Baru'
            {...register('confirmNewPassword', {
              required: 'Harus di isi!',
              validate: (value) =>
                value === currentPassword.current || 'Password tidak sesuai',
            })}
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
      </form>
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
