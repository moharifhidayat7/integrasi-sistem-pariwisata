import { useState } from 'react'
import Link from 'next/link'
import style from './Login.module.scss'
import { signIn, signOut, useSession, getSession } from 'next-auth/react'
import { useForm } from 'react-hook-form'
import { clientAxios } from '@helpers/functions'
import { useRouter } from 'next/router'

const ClientLoginForm = () => {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const [error, setError] = useState(false)

  const {
    register,
    handleSubmit,
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

  const onSubmit = async (data) => {
    setError(false)
    setIsLoading(true)

    const signin = await signIn('credentials', { redirect: false, ...data })

    if (signin.ok) {
      router.push('/')
    }
    if (signin.error != null) {
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
              id='email'
              placeholder='name@example.com'
              {...register('email', { required: true })}
            />
            <label htmlFor='email'>Alamat Email</label>
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
          <Link href='#'>
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
