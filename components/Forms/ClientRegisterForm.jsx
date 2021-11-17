import { useState, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { clientAxios } from '@helpers/functions'

import Link from 'next/link'
import style from './Login.module.scss'

const ClientRegisterForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()
  const [isLoading, setIsLoading] = useState(false)

  const password = useRef({})
  password.current = watch('password', '')

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

  const onSubmit = async (data) => {
    if (data.password == data.password2)
      await clientAxios
        .post('/auth/local/register', {
          ...data,
        })
        .then((response) => {
          // Handle success.
          setIsLoading(false)
          console.log('Well done!')
          console.log('User profile', response.data.user)
          console.log('User token', response.data.jwt)
        })
        .catch((error) => {
          // Handle error.
          console.log('An error occurred:', error.response)
        })
  }

  return (
    <div className={`col-12 col-sm-12 col-md-8 col-xl-6 mx-auto ${style.mtop}`}>
      <h1 className={`mb-4 text-center ${style.htitle}`}>Daftar</h1>
      <form className='row g-3' onSubmit={handleSubmit(onSubmit)}>
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
            {...register('email', { required: true })}
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
        <div>
          <label htmlFor='password' className='form-label'>
            Kata Sandi
          </label>
          <input
            type='password'
            className='form-control'
            id='password'
            {...register('password', {
              required: true,
              minLength: { value: 8, message: 'Kata sandi minimal 8 karakter' },
            })}
          />
        </div>
        <div>
          <label htmlFor='password2' className='form-label'>
            Konfirmasi Kata Sandi
          </label>
          <input
            type='password'
            className='form-control'
            id='password2'
            {...register('password2', {
              required: true,
              validate: (value) =>
                value === password.current || 'Kata sandi tidak cocok',
            })}
          />
        </div>
        <div className='d-grid'>
          <button
            type='submit'
            className='btn btn-lg ispBtn-primary mb-3 p-3'
            disabled={isLoading}
          >
            {isLoading ? (
              <span
                className='spinner-border spinner-border-sm me-2'
                role='status'
                aria-hidden='true'
              />
            ) : (
              'Daftar'
            )}
          </button>
        </div>
        <div className='text-center'>
          <div className='mb-4'>
            <span className='text-muted'>atau</span>
          </div>
          <div className='mb-4'>
            <Link href='/login'>
              <a>Masuk dengan akun Anda</a>
            </Link>
          </div>
        </div>
      </form>
    </div>
  )
}

export default ClientRegisterForm
