import useSWR from 'swr'
import { useState } from 'react'
import Layout from '../../../components/Layouts/Admin'
import Content from '../../../components/Content'
import CardWisata from '../../../components/Cards/Wisata'
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
import { signIn, signOut, useSession, getSession } from 'next-auth/react'
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
  const [showDelete, setShowDelete] = useState(false)
  const [wisata, setWisata] = useState([])
  const router = useRouter()
  const { data: session, status } = useSession()

  const getPenginapan = async (url) =>
    await fetch(url, {
      headers: {
        Authorization: `Bearer ${session.jwt}`,
      },
    }).then((res) => res.json())

  const { data, mutate, error } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URI}/objects?type=Penginapan&_sort=created_at:desc`,
    getPenginapan
  )

  const onDelete = (id) => {
    axios
      .delete(`${process.env.NEXT_PUBLIC_API_URI}/objects/${id}`, {
        headers: {
          Authorization: `Bearer ${session.jwt}`,
        },
      })
      .then((response) => {
        setShowDelete(false)
        mutate()
      })
      .catch((error) => console.log(error))
  }

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
