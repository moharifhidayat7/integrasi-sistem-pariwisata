import Layout from '@components/Layout'
import LayoutContent from '@components/Layouts/ClientContent'
import Image from 'next/image'
import Link from 'next/link'
import { Splide, SplideSlide } from '@splidejs/react-splide'
import '@splidejs/splide/dist/css/splide.min.css'
import axios from 'axios'
const Item = ({ detail }) => {
  return (
    <div className='row mb-5 mb-sm-4 itemRow'>
      <div className='col-sm-12 col-md-6'>
        <Splide>
          <SplideSlide>
            <div className='wisataFeaturedImage'>
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
      <div className='col-sm-12 col-md-6'>
        <div className='contentDetail'>
          <Link href={`/wisata/${detail.slug}`}>
            <a>
              <h2 className='contentTitle'>{detail.name}</h2>
            </a>
          </Link>

          <p>{detail.description}</p>
          <Link href={`/wisata/${detail.slug}`}>
            <a role='button' className='ispBtn contentBtn'>
              Lihat Profil
            </a>
          </Link>
        </div>
      </div>
    </div>
  )
}

const index = ({ data }) => {
  return (
    <Layout title='Wisata'>
      <LayoutContent>
        <div className='container'>
          <div className='contentPageTitle'>
            <h1>Wisata</h1>
          </div>
          {data.map((item) => (
            <Item detail={item} key={item.id} />
          ))}
        </div>
      </LayoutContent>
    </Layout>
  )
}

export default index

export async function getServerSideProps(context) {
  const { data } = await axios.get(`${process.env.API_URI}/objects`)

  const dataHasImage = data.filter((d) => d.featured_image != null)

  const wisata = dataHasImage.filter(
    (w) =>
      w.type == 'Wisata Alam' ||
      w.type == 'Wisata Edukasi' ||
      w.type == 'Wisata Lainnya'
  )
  return {
    props: {
      data: wisata,
    },
  }
}
