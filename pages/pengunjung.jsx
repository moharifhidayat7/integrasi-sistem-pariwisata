import { useState } from 'react'
import Image from 'next/image'
import { clientAxios } from '@helpers/functions'
import {
  getCookies,
  setCookies,
  removeCookies,
  checkCookies,
} from 'cookies-next'

const Pengunjung = ({ visited }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const styleH = {
    fontFamily: `'Poppins', sans-serif !important`,
  }
  const mTop = {
    marginTop: '7rem',
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

  const checkIn = () => {
    clientAxios
      .post('/visitors', {
        people: 1,
      })
      .then((response) => {
        setIsSuccess(true)
        setCookies('visited', true, { maxAge: 60 * 60 * 24 })
      })
      .catch((error) => {
        setIsLoading(false)
        console.log(error)
      })
  }
  return (
    <div className='container' style={{ height: '100%' }}>
      <div
        className={`d-flex flex-column justify-content-center align-items-center`}
        style={mTop}
      >
        <div
          className='my-5 rounded overflow-hidden'
          style={{
            height: '15rem',
            width: '100%',
            padding: '5rem',
            position: 'relative',
          }}
        >
          <Image
            alt='Rumah Digital Gombengsari'
            src='/puncak-asmoro-banyuwangi.jpg'
            layout='fill'
            objectFit='cover'
          />
        </div>
        <h1 className={`mb-4 text-center`} style={styleH}>
          Selamat Datang di{' '}
          <span style={{ color: '#38b520' }}>Rumah Digital Gombengsari</span>
        </h1>
        <div>
          <div className='d-grid'>
            {visited == true ? (
              <button
                type='submit'
                className='btn btn-lg mb-3 ispBtn-primary p-3'
                disabled={true}
              >
                Sudah Check IN
              </button>
            ) : (
              <button
                type='submit'
                className='btn btn-lg mb-3 ispBtn-primary p-3'
                disabled={isSuccess}
                onClick={() => checkIn()}
              >
                {isSuccess ? (
                  'Sudah Check IN'
                ) : isLoading ? (
                  <span
                    className='spinner-border spinner-border-sm me-2'
                    role='status'
                    aria-hidden='true'
                  />
                ) : (
                  'Check IN'
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Pengunjung
export async function getServerSideProps({ req, res }) {
  if (checkCookies('visited', { req, res })) {
    return {
      props: {
        visited: true,
      },
    }
  }
  return {
    props: {},
  }
}
