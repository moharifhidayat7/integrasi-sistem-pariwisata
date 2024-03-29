import { useState, useEffect } from 'react'
import Link from 'next/link'
import style from './Navbar.module.scss'
import { signIn, signOut, useSession, getSession } from 'next-auth/react'
import LoggedIn from './LoggedIn'
import Cart from './Cart'
import CartDropdown from './CartDropdown'
import { List } from 'react-bootstrap-icons'
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
          className={`d-flex justify-content-center justify-content-sm-between align-items-center ${style.menuRes}`}
        >
          <div className='text-wrap d-none d-sm-block'>
          <Link href='/'>
            <a className='navbar-brand fw-bold'>Rumah Digital Gombengsari</a>
          </Link>
          </div>
          <div className='d-flex align-items-center'>
            <CartDropdown className='d-lg-none'/>
            <button
              className='navbar-toggler d-lg-none ms-4 ms-sm-2'
              type='button'
              onClick={toggleShow}
            >
              <List size={24} />
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
              <Link href='/travel'>
                <a className='nav-link me-lg-2'>Travel</a>
              </Link>
            </li>
            <li className='nav-item'>
              <Link href='/marketplace'>
                <a className='nav-link me-lg-2'>Marketplace</a>
              </Link>
            </li>
          </ul>
          <CartDropdown className='d-none d-lg-block' />
          {session != null ? (
            session.role.name == 'Super Admin' ? (
              <div className='ms-3'>
                <Link href='/admin'>
                  <a
                    role='button'
                    className='btn rounded-pill ms-auto px-3 mb-2 mb-lg-0 ispBtn-secondary'
                  >
                    <span className='small'>Halaman Admin</span>
                  </a>
                </Link>

                <Link href='#'>
                  <a
                    className='ms-2'
                    onClick={() =>
                      signOut({ redirect: true, callbackUrl: '/' })
                    }
                  >
                    Logout
                  </a>
                </Link>
              </div>
            ) : (
              <div className='ms-3 px-3 mb-2 mb-lg-0'>
                <LoggedIn />
              </div>
            )
          ) : (
            <div className='ms-3'>
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
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
