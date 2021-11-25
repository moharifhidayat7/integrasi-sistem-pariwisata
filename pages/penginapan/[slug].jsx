import Layout from '@components/Layout'
import LayoutContent from '@components/Layouts/ClientContent'
import '@splidejs/splide/dist/css/splide.min.css'
import Link from 'next/link'
import { Splide, SplideSlide } from '@splidejs/react-splide'
import Image from 'next/image'
import axios from 'axios'
import Iframe from '@components/Iframe'
import { Button, Overlay } from 'evergreen-ui'
import { Check, Check2, XSquare } from 'react-bootstrap-icons'
import { useState } from 'react'
import SingleMenu from '@components/SingleMenu'
import router, { useRouter } from 'next/router'
import { formatRp } from '@helpers/functions'
const DetailWisata = ({ data }) => {
  const [isShown, setIsShown] = useState(false)
  const [image, setImage] = useState([])
  const [imgLimit, setImgLimit] = useState(4)
  const router = useRouter()
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
        <XSquare
          color='white'
          size={30}
          style={{ position: 'absolute', top: '40px', right: '40px' }}
          onClick={() => setIsShown(false)}
        />
      </Overlay>
      <LayoutContent>
        <div className='container'>
          <div className='singlePageTitle'>
            <h1>{data.name}</h1>
          </div>
          <div>
            <SingleMenu
              router={router}
              menu={[
                { href: '#profil', text: 'Profil' },
                { href: '#kontak', text: 'Kontak' },
                { href: '#fasilitas', text: 'Fasilitas' },
                { href: '#kamar', text: 'Kamar' },
                { href: '#galeri', text: 'Galeri' },
              ]}
            />
            <div className='mb-4'>
              {data.slideshow.length > 0 ? (
                <Splide
                  options={{ type: 'loop', autoplay: true, interval: 5000 }}
                >
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
              ) : data.images.length > 0 ? (
                <Splide
                  options={{ type: 'loop', autoplay: true, interval: 5000 }}
                >
                  {data.images.map((slide) => {
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
              ) : (
                ''
              )}
            </div>
            <div className='row'>
              <h2 id='profil' className='mb-4 sectionTitle'>
                Profil
              </h2>

              <div className='col-sm-12 col-md-8 col-lg-8'>
                {data.youtube && <Iframe url={data.youtube} height={'28rem'} />}

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
                    {data.contact.email
                      ? 'Email : ' + data.contact.email + '<br />'
                      : ''}
                    {data.contact.phone
                      ? 'No. Telp : ' + data.contact.phone
                      : ''}
                  </div>
                </div>
              </div>
            </div>
            <div className='row'>
              <div className='col-8 mt-3'>
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
              <div className='col-12'>
                <h2 id='kamar' className='mb-4 mt-4 sectionTitle'>
                  Kamar
                </h2>
                <div className='kamar row g-2'>
                  {data.rooms.length > 0 &&
                    data.rooms.map((room) => (
                      <div className='col-lg-6 col-sm-12' key={room.id}>
                        <div className='card'>
                          <div
                            style={{ height: '20rem', position: 'relative' }}
                          >
                            <Image
                              src={
                                process.env.NEXT_PUBLIC_API_URI +
                                room.gallery[0].url
                              }
                              alt={room.gallery[0].name}
                              layout='fill'
                              objectFit='cover'
                              className='rounded'
                            />
                          </div>
                          <div className='card-body'>
                            <h5 className='card-title'>{room.name}</h5>
                            {/* <p className='card-text'>
                          Some quick example text to build on the card title and
                          make up the bulk of the cards content.
                        </p> */}
                            <div className='d-flex justify-content-between align-items-center'>
                              <span
                                style={{ color: '#38b520', fontSize: '1.3rem' }}
                              >
                                {formatRp(room.price)}/Malam
                              </span>
                              <Link href='#'>
                                <a className='btn ispBtn-primary'>
                                  Pesan Sekarang
                                </a>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>

            <div className='row'>
              <div className='mt-4 '>
                <h2 id='galeri' className='sectionTitle'>
                  Galeri
                </h2>
              </div>
              <div className='galeryList row g-2'>
                {data.images &&
                  data.images.slice(0, imgLimit).map((img) => {
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
              <div className='text-center mt-3'>
                {(data.images.length > 4) & (imgLimit < data.images.length) ? (
                  <button
                    type='button'
                    className='btn rounded-pill ms-auto px-3 mb-2 mb-lg-0 ispBtn-secondary'
                    onClick={() => setImgLimit(imgLimit + 4)}
                  >
                    Lainnya
                  </button>
                ) : (
                  ''
                )}
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
