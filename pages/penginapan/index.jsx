import Layout from '@components/Layout'
import LayoutContent from '@components/Layouts/ClientContent'
import Image from 'next/image'
import Link from 'next/link'
import { Splide, SplideSlide } from '@splidejs/react-splide'
import '@splidejs/splide/dist/css/splide.min.css'
import axios from 'axios'

const Item = ({ detail }) => {
  return (
    <div className='col-sm-12 col-md-6 mb-5 mb-sm-4 itemRow'>
      <div className='border shadow rounded overflow-hidden'>
        <div>
          <Splide options={{}}>
            <SplideSlide>
              <div className='penginapanFeaturedImage'>
                <Image
                  alt={detail.featured_image.name}
                  src={`${process.env.NEXT_PUBLIC_API_URI}${detail.featured_image.url}`}
                  layout='fill'
                  objectFit='cover'
                />
              </div>
            </SplideSlide>
            {detail.images.map((img) => (
              <SplideSlide key={img.id}>
                <div className='wisataFeaturedImage'>
                  <Image
                    alt={img.name}
                    src={`${process.env.NEXT_PUBLIC_API_URI}${img.url}`}
                    layout='fill'
                    objectFit='cover'
                  />
                </div>
              </SplideSlide>
            ))}
          </Splide>
        </div>
        <div className='p-3'>
          <div className='penginapanContentDetail'>
            <Link href={`/penginapan/${detail.slug}`}>
              <a>
                <h2 className='contentTitle'>{detail.name}</h2>
              </a>
            </Link>
            <div className='contentPrice'>Mulai dari Rp. 250.000</div>
            <div className='d-flex align-items-center'>
              <Link href={`/penginapan/${detail.slug}`}>
                <a role='button' className='ispBtn contentBtn'>
                  Lihat Profil
                </a>
              </Link>
              <Link href={`/penginapan/${detail.slug}`}>
                <a role='button' className='btn ispBtn-primary contentBtn ms-2'>
                  Pesan Sekarang
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const index = ({ data }) => {
  return (
    <Layout title='Penginapan'>
      <LayoutContent>
        <div className='container'>
          <div className='contentPageTitle'>
            <h1>Penginapan</h1>
          </div>
          <div className='row g-3'>
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
  const { data } = await axios.get(
    `${process.env.API_URI}/objects?type=Penginapan`
  )

  const dataHasImage = data.filter((d) => d.featured_image != null)

  return {
    props: {
      data: dataHasImage,
    },
  }
}
