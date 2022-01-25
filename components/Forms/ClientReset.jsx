import { useState, useRef } from 'react'
import Link from 'next/link'
import style from './Login.module.scss'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import axios from 'axios'

import { signIn } from 'next-auth/react'

const { NEXT_PUBLIC_API_URI } = process.env

const ClientLupa = () => {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const [error, setError] = useState(false)
  const [success, setSuccess] = useState(false)
  
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()

  const password = useRef({})
  password.current = watch('password', '')

  const instance = axios.create({
    baseURL: NEXT_PUBLIC_API_URI,
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
    await instance.post('/auth/reset-password', {
        code: formData.code,
        password: formData.password,
        passwordConfirmation: formData.password2
    }).then(res=> {
        setError(false)
        setSuccess(true)
        setIsLoading(false)
        setTimeout(()=>router.push('/login'), 2000);
    }).catch(e=>{
        setError(true)
        setSuccess(false)
        setIsLoading(false)
        setTimeout(()=>router.push('/lupa-password'), 3000);
    })
  }

  return (
    <div className={`col-12 col-sm-12 col-md-8 col-xl-4 mx-auto ${style.mtop}`}>
      <h1 className={`mb-4 text-center ${style.htitle}`}>Reset Password</h1>
      <div
        className={`alert alert-warning ${error ? 'd-block' : 'd-none'}`}
        role='alert'
      >
        Kode Reset Password Tidak Valid
      </div>
      <div
        className={`alert alert-success ${success ? 'd-block' : 'd-none'}`}
        role='alert'
      >
        Ganti Password Berhasil!
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input type="text" defaultValue={router.query.code} hidden {...register('code',{required: true})}/>
        <div className='form-floating mb-3'>
          <input
            type='password'
            className='form-control'
            id='password'
            {...register('password', {
              required: 'Harus di isi!',
              minLength: { value: 8, message: 'Kata sandi minimal 8 karakter' },
            })}
          />
          <label htmlFor='password'>
            Kata Sandi Baru
          </label>
          {errors.password && (
            <div className='invalid-feedback d-block'>
              {errors.password.message}
            </div>
          )}
        </div>
        <div className='form-floating mb-3'>
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
          <label htmlFor='password2'>
            Konfirmasi Kata Sandi
          </label>
          {errors.password2 && (
            <div className='invalid-feedback d-block'>
              {errors.password2.message}
            </div>
          )}
        </div>

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
                'Reset Password'
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default ClientLupa
