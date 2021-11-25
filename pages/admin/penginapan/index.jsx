import { useState, useEffect } from 'react'
import Layout from '@components/Layouts/Admin'
import Content from '@components/Content'
import CardWisata from '@components/Cards/Wisata'
import {
  Dialog,
  Button,
  PlusIcon,
  Pane,
  Text,
  Heading,
  Paragraph,
  Spinner,
} from 'evergreen-ui'
import { useRouter } from 'next/router'
import Link from 'next/link'
import axios from 'axios'
import { useSession } from 'next-auth/react'
const Data = ({ setShowDelete, setWisata, data }) => {
  const router = useRouter()

  if (!data)
    return (
      <Pane>
        <Spinner marginX='auto' marginY={120} />
      </Pane>
    )
  return data.map((wisata) => {
    return (
      <CardWisata
        key={wisata.id}
        data={wisata}
        setShowDelete={setShowDelete}
        setWisata={setWisata}
      />
    )
  })
}

const Penginapan = () => {
  const [data, setData] = useState([])
  const [showDelete, setShowDelete] = useState(false)
  const [wisata, setWisata] = useState([])
  const router = useRouter()
  const { data: session, status } = useSession()

  const mutate = () => {
    const json = async () =>
      await axios
        .get(
          process.env.NEXT_PUBLIC_API_URI +
            '/objects?type=Penginapan&_sort=created_at:desc'
        )
        .then((res) => {
          setData(res.data)
        })
    json()
  }

  const onDelete = (id) => {
    axios
      .delete(`${process.env.NEXT_PUBLIC_API_URI}/objects/${id}`)
      .then((response) => {
        setShowDelete(false)
        mutate()
      })
      .catch((error) => console.log(error))
  }

  useEffect(() => {
    if (!router.isReady) return
    const json = async () =>
      await axios
        .get(
          process.env.NEXT_PUBLIC_API_URI +
            '/objects?type=Penginapan&_sort=created_at:desc'
        )
        .then((res) => {
          setData(res.data)
        })
    json()
  }, [router.isReady])

  return (
    <Layout title='Penginapan'>
      <Dialog
        isShown={showDelete}
        title={`Hapus "${wisata.name}"`}
        intent='danger'
        onCloseComplete={() => {
          setShowDelete(false)
        }}
        confirmLabel='Delete'
        onConfirm={() => onDelete(wisata.id)}
      >
        Apakah anda yakin ingin menghapus &quot;{wisata.name}&quot;?
      </Dialog>
      <Content>
        <Content.Header
          title='Penginapan'
          button={
            <Link href={`${router.asPath}/tambah`}>
              <a>
                <Button appearance='primary' size='large' iconBefore={PlusIcon}>
                  Tambah Penginapan
                </Button>
              </a>
            </Link>
          }
        />
        <Content.Body>
          <Data
            setShowDelete={setShowDelete}
            setWisata={setWisata}
            data={data}
          />
        </Content.Body>
      </Content>
    </Layout>
  )
}

export default Penginapan
