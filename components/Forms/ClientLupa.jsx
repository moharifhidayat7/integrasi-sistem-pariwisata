import { useState } from 'react'
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
    formState: { errors },
  } = useForm()

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

    await instance.post('/auth/forgot-password', {
        email: formData.email
    }).then(res=> {
        setError(false)
        setSuccess(true)
        setIsLoading(false)
    }).catch(e=>{
        setError(true)
        setSuccess(false)
        setIsLoading(false)
    })
  }

  return (
    <div className={`col-12 col-sm-12 col-md-8 col-xl-4 mx-auto ${style.mtop}`}>
      <h1 className={`mb-4 text-center ${style.htitle}`}>Lupa Password</h1>
      <div
        className={`alert alert-warning ${error ? 'd-block' : 'd-none'}`}
        role='alert'
      >
        Terjadi kesalahan pada server.
      </div>
      <div
        className={`alert alert-success ${success ? 'd-block' : 'd-none'}`}
        role='alert'
      >
        Jika Email anda terdaftar, anda akan menerima link untuk melakukan reset password. Silakan cek email anda!
      </div>
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
                'Submit'
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default ClientLupa
