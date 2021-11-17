import { useState } from 'react'
import Link from 'next/link'
import style from './Navbar.module.scss'
import { signIn, signOut, useSession, getSession } from 'next-auth/react'
import LoggedIn from './LoggedIn'

const Navbar = () => {
  const { data: session, status } = useSession()

  const [show, setShow] = useState(false)
  const toggleShow = (e) => {
    e.preventDefault()
    setShow(!show)
  }

  return (
    <nav
      className='navbar navbar-expand-lg navbar-light fixed-top shadow-sm'
      id='mainNav'
    >
      <div className='container-fluid px-sm-5'>
        <div
          className={`d-flex justify-content-between align-items-center ${style.menuRes}`}
        >
          <Link href='/'>
            <a className='navbar-brand fw-bold'>Rumah Digital Gombengsari</a>
          </Link>
          <div>
            <button
              className='navbar-toggler d-lg-none'
              type='button'
              onClick={toggleShow}
            >
              Menu
            </button>
          </div>
        </div>
        <div
          className={`collapse navbar-collapse ${show ? 'show' : ''}`}
          id='navbarResponsive'
        >
          <ul className='navbar-nav ms-3 me-4 my-3 my-lg-0'>
            <li className='nav-item'>
              <Link href='/'>
                <a className='nav-link me-lg-2'>Beranda</a>
              </Link>
            </li>
            <li className='nav-item'>
              <Link href='/paket-wisata'>
                <a className='nav-link me-lg-2'>Paket Wisata</a>
              </Link>
            </li>
            <li className='nav-item'>
              <Link href='/wisata'>
                <a className='nav-link me-lg-2'>Wisata</a>
              </Link>
            </li>
            <li className='nav-item'>
              <Link href='/penginapan'>
                <a className='nav-link me-lg-2'>Penginapan</a>
              </Link>
            </li>
            <li className='nav-item'>
              <Link href='/umkm'>
                <a className='nav-link me-lg-2'>UMKM</a>
              </Link>
            </li>
            <li className='nav-item'>
              <Link href='/umkm'>
                <a className='nav-link me-lg-2'>Marketplace</a>
              </Link>
            </li>
          </ul>
          {session != null ? (
            <div className='ms-auto px-3 mb-2 mb-lg-0'>
              <LoggedIn />
            </div>
          ) : (
            <>
              <Link href='/login'>
                <a
                  role='button'
                  className='btn rounded-pill ms-auto px-3 mb-2 mb-lg-0 ispBtn-secondary'
                >
                  <span className='small'>Masuk</span>
                </a>
              </Link>
              <Link href='/register'>
                <a
                  role='button'
                  className='btn rounded-pill ms-2 px-3 mb-2 mb-lg-0 ispBtn-primary'
                >
                  <span className='small'>Daftar</span>
                </a>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
