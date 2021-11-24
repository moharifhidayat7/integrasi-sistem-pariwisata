import Layout from '@components/Layout'
import LayoutContent from '@components/Layouts/ClientContent'
import '@splidejs/splide/dist/css/splide.min.css'
import Link from 'next/link'
import { Splide, SplideSlide } from '@splidejs/react-splide'
import Image from 'next/image'
import axios from 'axios'
import Iframe from '@components/Iframe'
import { Overlay } from 'evergreen-ui'
import { Check, Check2 } from 'react-bootstrap-icons'
import { useState } from 'react'

const DetailWisata = ({ data }) => {
  const [isShown, setIsShown] = useState(false)
  const [image, setImage] = useState([])
  return (
    <Layout title={data.name}>
      <Overlay
        isShown={isShown}
        onExited={() => setIsShown(false)}
        containerProps={{
          zIndex: 1100,
          className: 'd-flex justify-content-center align-items-center',
          cursor: 'pointer',
        }}
        shouldCloseOnClick={true}
      >
        <div style={{ position: 'relative', height: '95%', width: '80%' }}>
          <Image
            alt={image.name}
            src={process.env.NEXT_PUBLIC_API_URI + image.url}
            layout='fill'
            objectFit='contain'
          />
        </div>
      </Overlay>
      <LayoutContent>
        <div className='container'>
          <div className='singlePageTitle'>
            <h1>{data.name}</h1>
          </div>
          <div>
            <div className='singleMenu'>
              <Link href='#profil'>
                <a>Profil</a>
              </Link>
              <Link href='#fasilitas'>
                <a>Fasilitas</a>
              </Link>
              <Link href='#kontak'>
                <a className='active'>Kontak</a>
              </Link>
              <Link href='#galeri'>
                <a>Galeri</a>
              </Link>
            </div>
            <div className='mb-4'>
              <Splide>
                {data.slideshow.map((slide) => {
                  return (
                    <SplideSlide key={slide.id}>
                      <div className='slideshowSingle rounded overflow-hidden'>
                        <Image
                          alt={slide.name}
                          src={process.env.NEXT_PUBLIC_API_URI + slide.url}
                          layout='fill'
                          objectFit='cover'
                        />
                      </div>
                    </SplideSlide>
                  )
                })}
              </Splide>
            </div>
            <div className='row'>
              <h2 id='profil' className='mb-4 sectionTitle'>
                Profil
              </h2>
              <div className='col-sm-12 col-md-8 col-lg-8'>
                <Iframe url={data.youtube} height={'28rem'} />
                <p className='mt-3'>{data.description}</p>
              </div>
              <div className='col-sm-12 col-md-4 col-lg-4'>
                <div className='mb-4 p-4 kontakSingle rounded'>
                  <h3 className='mb-3 sectionTitle'>Alamat</h3>
                  <div>{data.address}</div>
                </div>
                <div className='p-4 kontakSingle rounded'>
                  <h3 id='kontak' className='mb-3 sectionTitle'>
                    Kontak
                  </h3>
                  <div>
                    <strong>{data.contact.name}</strong> <br />
                    Email : {data.contact.email}
                    <br />
                    No. Telp : {data.contact.phone}
                  </div>
                </div>
              </div>
            </div>
            <div className='row'>
              <div className='col-8'>
                <h2 id='fasilitas' className='mb-4 sectionTitle'>
                  Fasilitas
                </h2>
                <div className='fasilitas row gap-2'>
                  {data.facility
                    ? data.facility.map((fac) => {
                        return (
                          <div className='fasilitasItem col-md-5' key={fac}>
                            <Check2
                              color='#38b520'
                              size={40}
                              className='fasilitasIcon'
                            />
                            <span className='ms-3'>{fac}</span>
                          </div>
                        )
                      })
                    : '-'}
                </div>
              </div>
            </div>
            <div className='row'>
              <div className='mb-2 mt-3 '>
                <h2 id='galeri' className='sectionTitle'>
                  Galeri{' '}
                  <Link href='#'>
                    <a className='ms-3' style={{ fontSize: '1.3rem' }}>
                      Lihat Semua
                    </a>
                  </Link>
                </h2>
              </div>
              <div className='galeryList row g-2'>
                {data.images &&
                  data.images.map((img) => {
                    return (
                      <div
                        className='galeryItem col-sm-6 col-md-4 col-lg-3'
                        key={img.id}
                      >
                        <div
                          style={{
                            position: 'relative',
                            height: '12rem',
                            cursor: 'pointer',
                          }}
                          onClick={() => {
                            setImage(img)
                            setIsShown(true)
                          }}
                        >
                          <Image
                            className='rounded'
                            alt={img.name}
                            src={process.env.NEXT_PUBLIC_API_URI + img.url}
                            layout='fill'
                            objectFit='cover'
                          />
                        </div>
                      </div>
                    )
                  })}
              </div>
            </div>
          </div>
        </div>
      </LayoutContent>
    </Layout>
  )
}

export default DetailWisata

export async function getServerSideProps(context) {
  const { slug } = context.params
  const { data } = await axios.get(`${process.env.API_URI}/objects/${slug}`)
  return {
    props: {
      data,
    },
  }
}
