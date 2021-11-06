import useSWR from 'swr'
import { useState } from 'react'
import Layout from '../../../components/Layouts/Admin'
import Content from '../../../components/Content'
import CardWisata from '../../../components/Cards/Wisata'
import { Dialog, Button, PlusIcon } from 'evergreen-ui'
import { useRouter } from 'next/router'
import Link from 'next/link'

const Wisata = ({ wisatas }) => {
  const [showDelete, setShowDelete] = useState(false)
  const [wisata, setWisata] = useState([])
  const router = useRouter()

  const getWisata = async (url) => await fetch(url).then((res) => res.json())

  const { data, error } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URI}/objects`,
    getWisata
  )

  return (
    <Layout>
      <Dialog
        isShown={showDelete}
        title={`Hapus "${wisata.name}"`}
        intent='danger'
        onCloseComplete={() => {
          setShowDelete(false)
        }}
        confirmLabel='Delete'
      >
        Apakah anda yakin ingin menghapus &quot;{wisata.name}&quot;?
      </Dialog>
      <Content>
        <Content.Header
          title='Wisata'
          button={
            <Link href={`${router.asPath}/tambah`}>
              <a>
                <Button appearance='primary' size='large' iconBefore={PlusIcon}>
                  Tambah Wisata
                </Button>
              </a>
            </Link>
          }
        />
        <Content.Body>
          {data &&
            data.map((wisata) => {
              return (
                <CardWisata
                  key={wisata.id}
                  data={wisata}
                  setShowDelete={setShowDelete}
                  setWisata={setWisata}
                />
              )
            })}
        </Content.Body>
      </Content>
    </Layout>
  )
}

export default Wisata
