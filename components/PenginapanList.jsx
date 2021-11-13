import style from './WisataList.module.scss'
import Image from 'next/image'
import {
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  ArrowBarRight,
} from 'react-bootstrap-icons'
import { Splide, SplideSlide } from '@splidejs/react-splide'
import '@splidejs/splide/dist/css/splide.min.css'
import Link from 'next/link'
import CustomChevron from './CustomChevron'

const WisataItem = ({ detail, style: customStyle }) => {
  return (
    <div style={customStyle}>
      <div style={{ width: '100%' }}>
        <div className='card wisataCard shadow-sm'>
          <div className='wisataItem'>
            <Image
              alt={detail.featured_image.name}
              src={`${process.env.NEXT_PUBLIC_API_URI}${detail.featured_image.url}`}
              layout='fill'
              objectFit='cover'
            />
          </div>
          <div className='card-body'>
            <Link href={`/wisata/${detail.slug}`}>
              <a>
                <h5 className='umkm-card-title pb-2'>{detail.name}</h5>
              </a>
            </Link>
            <Link href={`/wisata/${detail.slug}`}>
              <a role='button' className='btn btn-md ispBtn'>
                Lihat Profil
              </a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

const PenginapanList = ({ penginapan }) => {
  return (
    <div className={`${style.wisataList}`}>
      <div className='container'>
        <div className='mb-3 dataRow'>
          <div className='d-flex justify-content-between align-items-center slideHead'>
            <h1>Penginapan</h1>
            <Link href='/penginapan'>
              <a role='button' className='btn btn-lg ispBtn-secondary'>
                Lihat Lainnya <ArrowRight />
              </a>
            </Link>
          </div>
          <Splide
            options={{
              perPage: 2,
              gap: '1rem',
              pagination: false,
              breakpoints: {
                576: {
                  perPage: 1,
                },
                768: {
                  perPage: 1,
                },
                992: {
                  perPage: 2,
                },
                1200: {
                  perPage: 2,
                },
                1400: {
                  perPage: 2,
                },
              },
            }}
            renderControls={() => (
              <div className={`splide__arrows`}>
                <CustomChevron
                  direction='left'
                  className='splide__arrow--prev'
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '-30px',
                    transform: 'translateY(-50%)',
                  }}
                />
                <CustomChevron
                  direction='right'
                  className='splide__arrow--next'
                  style={{
                    position: 'absolute',
                    top: '50%',
                    right: '-30px',
                    transform: 'translateY(-50%)',
                  }}
                />
              </div>
            )}
          >
            {penginapan.map((item, index) => (
              <SplideSlide key={item.id}>
                <WisataItem detail={item} />
              </SplideSlide>
            ))}
          </Splide>
        </div>
      </div>
    </div>
  )
}

export default PenginapanList
