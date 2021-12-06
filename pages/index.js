import Layout from '@components/Layout'
import Header from '@components/Header'
import WisataList from '@components/WisataList'
import PenginapanList from '@components/PenginapanList'
import UMKMList from '@components/UMKMList'
import axios from 'axios'
import TravelList from '@components/TravelList'
import { getSession } from 'next-auth/react'
export default function Home({ wisata, penginapan, umkm, travel }) {
  return (
    <Layout>
      <Header />
      <WisataList wisata={wisata} />
      <PenginapanList penginapan={penginapan} />
      <UMKMList umkm={umkm} />
      <TravelList travel={travel} />
    </Layout>
  )
}

export async function getServerSideProps(context) {
  const session = await getSession(context)

  const { data } = await axios.get(`${process.env.API_URI}/objects`)

  const dataHasImage = data.filter((d) => d.featured_image != null)

  const wisata = dataHasImage.filter(
    (w) =>
      w.type == 'Wisata Alam' ||
      w.type == 'Wisata Edukasi' ||
      w.type == 'Wisata Lainnya'
  )

  const penginapan = dataHasImage.filter((p) => p.type == 'Penginapan')

  const umkm = data.filter((u) => u.type == 'UMKM')

  const travel = data.filter((u) => u.type == 'Travel')

  return {
    props: {
      wisata,
      penginapan,
      umkm: umkm.filter((u) => u.logo != null || u.images.length > 0),
      travel: travel.filter((u) => u.logo != null || u.images.length > 0),
      session,
    },
  }
}
