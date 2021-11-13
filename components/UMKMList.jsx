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
          <div className='umkmItem'>
            <Image
              alt={detail.featured_image.name}
              src={`${process.env.NEXT_PUBLIC_API_URI}${detail.featured_image.url}`}
              layout='fill'
              objectFit='cover'
              className='p-2'
            />
          </div>
          <div className='card-body'>
            <Link href={`/wisata/${detail.slug}`}>
              <a>
                <h4 className='umkm-card-title'>{detail.name}</h4>
              </a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

const UMKMList = ({ umkm }) => {
  return (
    <div className={`${style.wisataList}`}>
      <div className='container'>
        <div className='mb-3 dataRow'>
          <div className='d-flex justify-content-between align-items-center slideHead'>
            <h1>UMKM</h1>
            <Link href='/umkm'>
              <a role='button' className='btn btn-lg ispBtn-secondary'>
                Lihat Lainnya <ArrowRight />
              </a>
            </Link>
          </div>
          <Splide
            options={{
              perPage: 6,
              gap: '0.7rem',
              pagination: false,
              breakpoints: {
                576: {
                  perPage: 2,
                },
                768: {
                  perPage: 2,
                },
                992: {
                  perPage: 4,
                },
                1200: {
                  perPage: 5,
                },
                1400: {
                  perPage: 6,
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
            {umkm.map((item, index) => (
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

export default UMKMList
