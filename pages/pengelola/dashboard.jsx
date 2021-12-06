import Layout from '@components/Layouts/Pengelola'
import Content from '@components/Content'
import {
  Heading,
  Pane,
  Card,
  Text,
  Button,
  IconButton,
  EditIcon,
} from 'evergreen-ui'
import { useSession, getSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import NextLink from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
const Index = () => {
  const { data: session, status } = useSession()
  const [datas, setData] = useState([])
  const router = useRouter()
  useEffect(() => {
    const json = async () => {
      await axios
        .get(
          process.env.NEXT_PUBLIC_API_URI +
            '/objects?users_permissions_user=' +
            session.id
        )
        .then((res) => {
          setData(res.data)
        })
    }
    json()
  }, [])
  return (
    <Layout title='Dashboard'>
      <Content>
        <Content.Body>
          <Pane className='mt-5'>
            <Heading is='h1' size={900} className='pb-4'>
              Kelola
            </Heading>
            <Pane className='row'>
              {datas.map((data) => {
                if (data.type == 'Penginapan') {
                  return (
                    <Pane
                      className='col-sm-6 col-md-6 col-lg-4'
                      position='relative'
                    >
                      <Card elevation={1} backgroundColor='white' width='100%'>
                        <Pane
                          height={'9rem'}
                          width='100%'
                          borderTopLeftRadius={4}
                          borderTopRightRadius={4}
                          position='relative'
                        >
                          <Image
                            alt={`${
                              data.featured_image
                                ? data.featured_image.name
                                : 'Tidak ada Foto'
                            }`}
                            src={`${
                              data.featured_image
                                ? process.env.NEXT_PUBLIC_API_URI +
                                  data.featured_image.url
                                : 'https://via.placeholder.com/300x180?text=Tidak+ada+foto'
                            }`}
                            layout='fill'
                            objectFit='cover'
                            quality={100}
                          />
                        </Pane>
                        <Pane
                          padding={10}
                          className='d-flex d-lg-block d-xl-flex align-items-start justify-content-between'
                        >
                          <Pane>
                            <Heading is='h2' size={500}>
                              {data.name}
                            </Heading>
                          </Pane>
                          <Pane
                            className='d-flex justify-content-center'
                            marginLeft={4}
                          >
                            <NextLink href={`/kelola/penginapan/${data.slug}`}>
                              <a>
                                <Button
                                  appearance='primary'
                                  iconBefore={EditIcon}
                                >
                                  Kelola
                                </Button>
                              </a>
                            </NextLink>
                          </Pane>
                        </Pane>
                      </Card>
                    </Pane>
                  )
                }
                if (
                  data.type == 'Wisata' ||
                  data.type == 'Wisata Lainnya' ||
                  data.type == 'Wisata Alam' ||
                  data.type == 'Wisata Edukasi'
                ) {
                  return (
                    <Pane
                      className='col-sm-6 col-md-6 col-lg-4'
                      position='relative'
                    >
                      <Card elevation={1} backgroundColor='white' width='100%'>
                        <Pane
                          height={'9rem'}
                          width='100%'
                          borderTopLeftRadius={4}
                          borderTopRightRadius={4}
                          position='relative'
                        >
                          <Image
                            alt={`${
                              data.featured_image
                                ? data.featured_image.name
                                : 'Tidak ada Foto'
                            }`}
                            src={`${
                              data.featured_image
                                ? process.env.NEXT_PUBLIC_API_URI +
                                  data.featured_image.url
                                : 'https://via.placeholder.com/300x180?text=Tidak+ada+foto'
                            }`}
                            layout='fill'
                            objectFit='cover'
                            quality={100}
                          />
                        </Pane>
                        <Pane
                          padding={10}
                          className='d-flex d-lg-block d-xl-flex align-items-start justify-content-between'
                        >
                          <Pane>
                            <Heading is='h2' size={500}>
                              {data.name}
                            </Heading>
                          </Pane>
                          <Pane
                            className='d-flex justify-content-center'
                            marginLeft={4}
                          >
                            <NextLink href={`/kelola/wisata/${data.slug}`}>
                              <a>
                                <Button
                                  appearance='primary'
                                  iconBefore={EditIcon}
                                >
                                  Kelola
                                </Button>
                              </a>
                            </NextLink>
                          </Pane>
                        </Pane>
                      </Card>
                    </Pane>
                  )
                }
                if (data.type == 'UMKM' || data.type == 'Travel') {
                  return (
                    <Pane
                      className='col-sm-6 col-md-6 col-lg-3 col-xl-3 col-xxl-2'
                      position='relative'
                    >
                      <Card elevation={1} backgroundColor='white' width='100%'>
                        <Pane
                          height={'9rem'}
                          width='100%'
                          borderTopLeftRadius={4}
                          borderTopRightRadius={4}
                          position='relative'
                        >
                          <Image
                            alt={`${
                              data.logo ? data.logo.name : 'Tidak ada Foto'
                            }`}
                            src={`${
                              data.logo
                                ? process.env.NEXT_PUBLIC_API_URI +
                                  data.logo.url
                                : 'https://via.placeholder.com/300x180?text=Tidak+ada+foto'
                            }`}
                            layout='fill'
                            objectFit='contain'
                            quality={100}
                          />
                        </Pane>
                        <Pane
                          padding={10}
                          className='d-flex flex-column align-items-center justify-content-between'
                        >
                          <Pane>
                            <Heading is='h2' size={500}>
                              {data.name}
                            </Heading>
                          </Pane>
                          <Pane
                            className='d-flex justify-content-center'
                            marginTop={12}
                          >
                            <NextLink href={`/kelola/umkm/${data.slug}`}>
                              <a>
                                <Button
                                  appearance='primary'
                                  iconBefore={EditIcon}
                                >
                                  Kelola
                                </Button>
                              </a>
                            </NextLink>
                          </Pane>
                        </Pane>
                      </Card>
                    </Pane>
                  )
                }
              })}
            </Pane>
          </Pane>
        </Content.Body>
      </Content>
    </Layout>
  )
}

export default Index

export async function getServerSideProps(context) {
  const session = await getSession(context)

  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    }
  }

  return {
    props: {
      session,
    },
  }
}
