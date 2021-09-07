import style from './Navbar.module.scss'

const Navbar = () => {
  return (
    <nav className={`navbar fixed-top ${style.tes}`}>
      <div className='container-fluid'>
        <h1 className={style.title}>Sistem Pariwisata Terintegrasi</h1>
        <ul>
          <li>Error</li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
