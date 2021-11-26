import { useState } from 'react'
import Link from 'next/link'
import style from './Login.module.scss'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import axios from 'axios'

import { signIn } from 'next-auth/react'

const { NEXT_PUBLIC_API_URI } = process.env

const ClientLoginForm = () => {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const [error, setError] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const instance = axios.create({
    baseURL: NEXT_PUBLIC_API_URI,
    timeout: 1000,
    headers: { 'Content-Type': 'application/json' },
  })

  instance.interceptors.request.use(
    function (config) {
      setIsLoading(true)
      return config
    },
    function (error) {
      return Promise.reject(error)
    }
  )

  const onSubmit = async (formData) => {
    setError(false)
    setIsLoading(true)

    const login = await signIn('credentials', {
      redirect: false,
      email: formData.email,
      password: formData.password,
    })
    // callbackUrl: '/',

    if (!login.error && login.ok) {
      router.reload()
    }

    if (login.error) {
      setError(true)
      setIsLoading(false)
    }
  }

  return (
    <div className={`col-12 col-sm-12 col-md-8 col-xl-4 mx-auto ${style.mtop}`}>
      <h1 className={`mb-4 text-center ${style.htitle}`}>Masuk</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <div className='form-floating mb-3'>
            <input
              type='text'
              className='form-control'
              id='Email'
              placeholder='name@example.com'
              {...register('email', { required: true })}
            />
            <label htmlFor='Email'>Alamat Email</label>
          </div>
          <div className='form-floating mb-3'>
            <input
              type='password'
              className='form-control'
              id='password'
              placeholder='Kata Sandi'
              {...register('password', { required: true })}
            />
            <label htmlFor='password'>Kata Sandi</label>
          </div>

          {error && (
            <div className='mb-3'>
              <span className='text-danger'>Email/Katasandi Salah!</span>
            </div>
          )}

          <div className='d-grid'>
            <button
              type='submit'
              className='btn btn-lg mb-3 ispBtn-primary p-3'
              disabled={isLoading}
            >
              {isLoading ? (
                <span
                  className='spinner-border spinner-border-sm me-2'
                  role='status'
                  aria-hidden='true'
                />
              ) : (
                'Masuk'
              )}
            </button>
          </div>
        </div>
      </form>
      <div className='text-center'>
        <div className='mb-4'>
          <Link href='#ss'>
            <a>Lupa kata sandi?</a>
          </Link>
        </div>
        <div className='mb-4'>
          <span className='text-muted'>atau</span>
        </div>
        <div className='mb-4'>
          <Link href='/register'>
            <a>Daftar Akun Baru</a>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ClientLoginForm
