import { useState, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { clientAxios } from '@helpers/functions'

import Link from 'next/link'
import style from './Login.module.scss'
import router, { useRouter } from 'next/router'

const ClientRegisterForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors },
  } = useForm()
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const router = useRouter()
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
          setSuccess(true)
          router.push('/login')
        })
        .catch((error) => {
          // Handle error.
          setSuccess(false)
          setIsLoading(false)
          setError('email', { message: 'Email sudah digunakan!' })
        })
  }

  return (
    <div className={`col-12 col-sm-12 col-md-8 col-xl-6 mx-auto ${style.mtop}`}>
      <h1 className={`mb-4 text-center ${style.htitle}`}>Daftar</h1>
      <div
        className={`alert alert-success ${success ? 'd-block' : 'd-none'}`}
        role='alert'
      >
        Pendaftaran Berhasil.
      </div>
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
            {...register('name', { required: 'Harus di isi!' })}
          />
          {errors.name && (
            <div className='invalid-feedback d-block'>
              {errors.name.message}
            </div>
          )}
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
            {...register('email', { required: 'Harus di isi!' })}
          />
          {errors.email && (
            <div className='invalid-feedback d-block'>
              {errors.email.message}
            </div>
          )}
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
            id='address.line1'
            placeholder='1234 Main St'
            {...register('address.line1')}
          />
        </div>
        <div className='col-6'>
          <label htmlFor='address' className='form-label'>
            Kota
          </label>
          <input
            type='text'
            className='form-control'
            id='address.city'
            placeholder='Kota'
            {...register('address.city')}
          />
        </div>
        <div className='col-6'>
          <label htmlFor='address' className='form-label'>
            Kode Post
          </label>
          <input
            type='text'
            className='form-control'
            id='address.postcode'
            placeholder='Kode Pos'
            {...register('address.postcode')}
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
              required: 'Harus di isi!',
              minLength: { value: 8, message: 'Kata sandi minimal 8 karakter' },
            })}
          />
          {errors.password && (
            <div className='invalid-feedback d-block'>
              {errors.password.message}
            </div>
          )}
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
              required: 'Harus di isi!',
              validate: (value) =>
                value === password.current || 'Kata sandi tidak cocok',
            })}
          />
          {errors.password2 && (
            <div className='invalid-feedback d-block'>
              {errors.password2.message}
            </div>
          )}
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
