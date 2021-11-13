import style from './WisataList.module.scss'
import Image from 'next/image'
import {
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  ArrowBarRight,
  ArrowDownLeftSquareFill,
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
                <h5 className='card-title'>{detail.name}</h5>
              </a>
            </Link>
            <div className='card-label'>{detail.type}</div>
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

const WisataItemCard = ({ detail }) => {
  return (
    <div
      className='card card-cover h-100 overflow-hidden text-white rounded-5 wisataItemCard'
      style={{
        backgroundImage: `url(${
          process.env.NEXT_PUBLIC_API_URI + detail.featured_image.url
        })`,
      }}
    >
      <div
        className='d-flex flex-column h-100 px-5 pb-3 m-auto text-white text-shadow-1'
        style={{ paddingTop: '12rem' }}
      >
        <h2
          className='pt-5 mt-auto mb-4 display-6 lh-1 fw-bold align-self-end overflow-hidden'
          style={{ height: '8rem' }}
        >
          Short title
        </h2>
        <ul className='d-flex list-unstyled mx-auto'>
          <li className='d-flex align-items-center'>
            <small>Wisata Alam</small>
          </li>
        </ul>
      </div>
    </div>
  )
}

const WisataList = ({ wisata }) => {
  // const [next, setNext] = useState(true)
  return (
    <div className={`${style.wisataList}`}>
      <div className='container'>
        <div className='mb-3 dataRow'>
          <div className='d-flex justify-content-between align-items-center slideHead'>
            <h1>Wisata</h1>
            <Link href='/wisata'>
              <a role='button' className='btn btn-lg ispBtn-secondary'>
                Lihat Lainnya <ArrowRight />
              </a>
            </Link>
          </div>
          <Splide
            className='sliderSplide'
            options={{
              perPage: 3,
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
                  perPage: 3,
                },
                1400: {
                  perPage: 4,
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
            {wisata.map((item, index) => (
              <SplideSlide key={item.id}>
                <WisataItemCard detail={item} />
                {/* <WisataItem detail={item} /> */}
              </SplideSlide>
            ))}
          </Splide>
        </div>
      </div>
    </div>
  )
}

export default WisataList
