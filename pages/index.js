import Layout from '@components/Layout'
import Header from '@components/Header'
import WisataList from '@components/WisataList'
import PenginapanList from '@components/PenginapanList'
import UMKMList from '@components/UMKMList'
import axios from 'axios'

export default function Home({ wisata, penginapan, umkm }) {
  return (
    <Layout>
      <Header />
      <WisataList wisata={wisata} />
      <PenginapanList penginapan={penginapan} />
      <UMKMList umkm={umkm} />
    </Layout>
  )
}

export async function getServerSideProps(context) {
  const { data } = await axios.get(`${process.env.API_URI}/objects`)

  const dataHasImage = data.filter((d) => d.featured_image != null)

  const wisata = dataHasImage.filter(
    (w) =>
      w.type == 'Wisata Alam' ||
      w.type == 'Wisata Edukasi' ||
      w.type == 'Wisata Lainnya'
  )

  const penginapan = dataHasImage.filter((p) => p.type == 'Penginapan')

  const umkm = dataHasImage.filter((u) => u.type == 'UMKM')

  return {
    props: {
      wisata,
      penginapan,
      umkm,
    },
  }
}
