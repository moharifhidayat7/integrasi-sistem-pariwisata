import style from './Header.module.scss'
const Header = () => {
  return (
    <header
      className={`masthead ${style.mHead}`}
      style={{
        backgroundImage:
          'url(https://phinemo.com/wp-content/uploads/2018/10/puncak-asmoro-banyuwangi.jpg)',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className='container px-5'>
        <div className={`row gx-5 align-items-center ${style.headerH}`}>
          <div className='mb-5 mb-lg-0 text-center text-lg-start'>
            <h1 className='display-2 mb-3 text-center'>
              Rumah Digital
              <br />
              Gombengsari, Banyuwangi
            </h1>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
