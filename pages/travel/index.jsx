import Layout from '@components/Layout'
import LayoutContent from '@components/Layouts/ClientContent'
import Image from 'next/image'
import Link from 'next/link'
import { Splide, SplideSlide } from '@splidejs/react-splide'
import '@splidejs/splide/dist/css/splide.min.css'
import axios from 'axios'

const Item = ({ detail }) => {
  return (
    <div className='col-sm-12 col-md-6 col-lg-4 col-xl-4 mb-5 mb-sm-4 itemRow'>
      <div className='border shadow rounded overflow-hidden'>
        <div>
          <Link href={`/travel/${detail.slug}`}>
            <a>
              {detail.logo ? (
                <div className='penginapanFeaturedImage'>
                  <Image
                    alt={detail.logo.name}
                    src={`${process.env.NEXT_PUBLIC_API_URI}${detail.logo.url}`}
                    layout='fill'
                    objectFit='cover'
                  />
                </div>
              ) : (
                ''
              )}
            </a>
          </Link>
        </div>
        <div className='p-3'>
          <div className='penginapanContentDetail'>
            <Link href={`/travel/${detail.slug}`}>
              <a>
                <h2 className='contentTitle'>{detail.name}</h2>
              </a>
            </Link>
            {/* <div className='d-flex align-items-center'>
              <Link href={`/travel/${detail.slug}`}>
                <a role='button' className='ispBtn contentBtn'>
                  Lihat Profil
                </a>
              </Link>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  )
}

const index = ({ data }) => {
  return (
    <Layout title='Travel'>
      <LayoutContent>
        <div className='container'>
          <div className='contentPageTitle'>
            <h1>Travel</h1>
          </div>
          <div className='row g-3' style={{ minHeight: '50vh' }}>
            {data.map((item) => (
              <Item key={item.id} detail={item} />
            ))}
          </div>
        </div>
      </LayoutContent>
    </Layout>
  )
}

export default index

export async function getServerSideProps(context) {
  const { data } = await axios.get(`${process.env.API_URI}/objects?type=Travel`)

  const dataHasImage = data.filter((d) => d.images != null && d.logo != null)

  return {
    props: {
      data: dataHasImage,
    },
  }
}
