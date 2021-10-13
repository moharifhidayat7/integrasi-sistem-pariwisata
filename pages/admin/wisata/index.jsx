import { useState } from 'react'
import Layout from '../../../components/Layouts/Admin'
import Content from '../../../components/Content'
import CardWisata from '../../../components/Cards/Wisata'
import { Dialog, Button } from 'evergreen-ui'
const Wisata = () => {
  const [value, setValue] = useState(0)
  const [showDelete, setShowDelete] = useState(false)

  const datas = [
    {
      id: 1,
      name: 'Kean Yoakley',
      image: 'https://picsum.photos/300',
      user: {
        id: 5,
        name: 'Imam',
      },
    },
    {
      id: 2,
      name: 'Stearne Yelding',
      image: 'https://picsum.photos/200',
      user: {
        id: 5,
        name: 'Imam',
      },
    },
    {
      id: 3,
      name: 'Tripp Perrington',
      image: 'https://picsum.photos/200',
      user: {
        id: 5,
        name: 'Imam',
      },
    },
    {
      id: 4,
      name: 'Cristiano Brimley',
      image: 'https://picsum.photos/200',
      user: {
        id: 5,
        name: 'Imam',
      },
    },
    {
      id: 5,
      name: 'Sybil Bryenton',
      image: 'https://picsum.photos/200',
      user: {
        id: 5,
        name: 'Imam',
      },
    },
    {
      id: 6,
      name: 'Putnem Pleasance',
      image: 'https://picsum.photos/200',
      user: {
        id: 5,
        name: 'Imam',
      },
    },
    {
      id: 7,
      name: 'Carri McGrill',
      image: 'https://picsum.photos/200',
      user: {
        id: 5,
        name: 'Imam',
      },
    },
    {
      id: 8,
      name: 'Clarette Reynoldson',
      image: 'https://picsum.photos/200',
      user: {
        id: 5,
        name: 'Imam',
      },
    },
    {
      id: 9,
      name: 'Judi Ludewig',
      image: 'https://picsum.photos/200',
      user: {
        id: 5,
        name: 'Imam',
      },
    },
    {
      id: 10,
      name: 'Lanette Kewish',
      image: 'https://picsum.photos/200',
      user: {
        id: 5,
        name: 'Imam',
      },
    },
  ]

  return (
    <Layout>
      <Dialog
        isShown={showDelete}
        title='Hapus "Puncak Asmoro"'
        intent='danger'
        onCloseComplete={() => {
          setShowDelete(false)
          console.log('close')
        }}
        confirmLabel='Delete'
      >
        Apakah anda yakin ingin menghapus item ini?
      </Dialog>
      <Content>
        <Content.Header
          title='Wisata'
          button={
            <Button
              appearance='primary'
              height={38}
              onClick={() => router.push(`${router.asPath}/tambah`)}
            >
              Tambah Wisata
            </Button>
          }
        />
        <Content.Body>
          {datas.map((data) => {
            return (
              <CardWisata
                key={data.id}
                id={data.id}
                name={data.name}
                image={data.image}
                user={data.user}
                setShowDelete={setShowDelete}
              />
            )
          })}
        </Content.Body>
      </Content>
    </Layout>
  )
}

export default Wisata
