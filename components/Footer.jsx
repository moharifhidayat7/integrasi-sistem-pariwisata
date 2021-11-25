import Image from 'next/image'
const Footer = () => {
  return (
    <footer
      className='text-center py-4'
      style={{ background: '#313131', marginTop: '8rem' }}
    >
      <div className='container px-5'>
        <div className='d-flex gap-3 justify-content-center mb-4'>
          <div
            className='d-block'
            style={{
              position: 'relative',
              width: '120px',
              paddingTop: '20px',
              paddingBottom: '40px',
            }}
          >
            <Image
              alt='Logo STIKOM PGRI Banyuwangi'
              src='/Logo_Stikom%20fix.png'
              layout='fill'
              objectFit='contain'
              objectPosition='center bottom'
            />
          </div>
          <div
            className='d-block'
            style={{ position: 'relative', width: '120px' }}
          >
            <Image
              alt='Logo STIKOM PGRI Banyuwangi'
              src='/Logo_Pokdarwis%20fix.png'
              layout='fill'
              objectFit='contain'
              objectPosition='center bottom'
            />
          </div>
          <div
            className='d-block'
            style={{ position: 'relative', width: '120px' }}
          >
            <Image
              alt='Logo STIKOM PGRI Banyuwangi'
              src='/Logo_Kedaireka%20fix.png'
              layout='fill'
              objectFit='contain'
              objectPosition='center bottom'
            />
          </div>
        </div>
        <div className='row text-center'>
          <div className='text-white small'>
            <div className='mb-2'>
              &copy; Sekolah Tinggi Ilmu Komputer PGRI Banyuwangi 2021. All
              Rights Reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
