const Header = () => {
  return (
    <header
      className='masthead'
      style={{
        backgroundImage:
          'url(https://phinemo.com/wp-content/uploads/2018/10/puncak-asmoro-banyuwangi.jpg)',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className='container px-5'>
        <div
          className='row gx-5 align-items-center'
          style={{ padding: '10rem 0' }}
        >
          <div className='mb-5 mb-lg-0 text-center text-lg-start'>
            <h1 className='display-1 lh-1 mb-3 text-center'>
              Rumah Digital Gombengsari
              <br />
              Banyuwangi
            </h1>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
