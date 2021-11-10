import Link from 'next/link'
const Navbar = () => {
  return (
    <nav
      className='navbar navbar-expand-lg navbar-light fixed-top shadow-sm'
      id='mainNav'
    >
      <div className='container px-5'>
        <Link href='/'>
          <a className='navbar-brand fw-bold'>Rumah Digital Gombengsari</a>
        </Link>
        <button
          className='navbar-toggler'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target='#navbarResponsive'
          aria-controls='navbarResponsive'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          Menu
          <i className='bi-list'></i>
        </button>
        <div className='collapse navbar-collapse' id='navbarResponsive'>
          <ul className='navbar-nav ms-3 me-4 my-3 my-lg-0'>
            <li className='nav-item'>
              <a className='nav-link me-lg-3' href='#features'>
                Beranda
              </a>
            </li>
            <li className='nav-item'>
              <a className='nav-link me-lg-3' href='#download'>
                Wisata
              </a>
            </li>
            <li className='nav-item'>
              <a className='nav-link me-lg-3' href='#download'>
                Penginapan
              </a>
            </li>
            <li className='nav-item'>
              <a className='nav-link me-lg-3' href='#download'>
                UMKM
              </a>
            </li>
            <li className='nav-item'>
              <a className='nav-link me-lg-3' href='#download'>
                Marketplace
              </a>
            </li>
          </ul>
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
      </div>
    </nav>
  )
}

export default Navbar
