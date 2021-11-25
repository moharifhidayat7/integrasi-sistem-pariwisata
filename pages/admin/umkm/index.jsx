import { useState, useEffect } from 'react'
import Layout from '@components/Layouts/Admin'
import Content from '@components/Content'
import CardUMKM from '@components/Cards/Umkm'
import { Dialog, Button, PlusIcon, Pane, Spinner } from 'evergreen-ui'
import { useRouter } from 'next/router'
import Link from 'next/link'
import axios from 'axios'
import { useSession, getSession } from 'next-auth/react'
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
      <CardUMKM
        key={wisata.id}
        data={wisata}
        setShowDelete={setShowDelete}
        setWisata={setWisata}
      />
    )
  })
}

const UMKM = () => {
  const [data, setData] = useState([])
  const [showDelete, setShowDelete] = useState(false)
  const [wisata, setWisata] = useState([])
  const router = useRouter()
  const { data: session, status } = useSession()

  const mutate = async () => {
    await axios
      .get(
        process.env.NEXT_PUBLIC_API_URI +
          '/objects?type=UMKM&_sort=created_at:desc'
      )
      .then((res) => {
        setData(res.data)
      })
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
    const json = async () => {
      await axios
        .get(
          process.env.NEXT_PUBLIC_API_URI +
            '/objects?type=UMKM&_sort=created_at:desc'
        )
        .then((res) => {
          setData(res.data)
        })
    }
    json()
  }, [])

  return (
    <Layout title='UMKM'>
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
          title='UMKM'
          button={
            <Link href={`${router.asPath}/tambah`}>
              <a>
                <Button appearance='primary' size='large' iconBefore={PlusIcon}>
                  Tambah UMKM
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

export default UMKM
