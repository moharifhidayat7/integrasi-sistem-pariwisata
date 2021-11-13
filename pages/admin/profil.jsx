import { useForm } from 'react-hook-form'
import {
  Pane,
  Card,
  TextInputField,
  Button,
  Heading,
  toaster,
} from 'evergreen-ui'
import Content from '@components/Content'
import Layout from '@components/Layouts/Admin'
import ContentWrapper from '@components/Wrapper/ContentWrapper'
import { signIn, signOut, useSession, getSession } from 'next-auth/client'
import { clientAxios } from '@helpers/functions'
import axios from 'axios'
import { useEffect, useState } from 'react'

const Profil = ({ profil, session }) => {
  const [isLoading, setIsLoading] = useState(false)
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors },
  } = useForm()

  const toastMessage = () => {
    toaster.success('Data Berhasil di Edit', {
      duration: 4,
    })
  }

  clientAxios.interceptors.request.use(
    function (config) {
      setIsLoading(true)
      return config
    },
    function (error) {
      // Do something with request error
      return Promise.reject(error)
    }
  )

  const onSubmit = (data) => {
    // if (profil.email == data.email) {
    //   delete data.email
    // }

    clientAxios
      .put('/users/' + session.id, data, {
        headers: {
          Authorization: `Bearer ${session.jwt}`,
        },
      })
      .then(function (response) {
        setIsLoading(false)
        toastMessage()
      })
      .catch(function (error) {
        setIsLoading(false)
        setError('email', { type: 'focus', message: 'Email sudah digunakan' })
      })
  }

  useEffect(() => {
    setValue('name', profil.name)
    setValue('address', profil.address)
    setValue('email', profil.email)
    setValue('phone', profil.phone)
  }, [])

  return (
    <Layout title='Profil'>
      <ContentWrapper>
        <Content>
          <Content.Body>
            <Pane className='d-flex justify-content-center'>
              <Pane
                className='col-12 col-md-9 col-lg-8 col-xl-7 col-xxl-6'
                position='relative'
              >
                <Card
                  elevation={1}
                  backgroundColor='white'
                  padding={20}
                  marginTop={60}
                >
                  <Pane paddingY={12} textAlign='center'>
                    <Heading is='h1'>Edit Profil</Heading>
                  </Pane>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <Pane>
                      <TextInputField
                        isInvalid={errors.name ? true : false}
                        validationMessage={errors.name && 'Harus di isi!'}
                        label='Nama *'
                        placeholder='Nama'
                        id='name'
                        {...register('name', { required: true })}
                      />
                      <TextInputField
                        label='Alamat'
                        placeholder='Alamat'
                        id='address'
                        {...register('address')}
                      />
                      <Pane className='row'>
                        <Pane className='col-6'>
                          <TextInputField
                            isInvalid={errors.email ? true : false}
                            validationMessage={
                              errors.email && errors.email.message
                            }
                            label='Email *'
                            placeholder='Email'
                            id='email'
                            {...register('email', {
                              required: 'Harus di Isi!',
                              validate: (value) =>
                                value.includes('@') ||
                                'Masukkan email yang valid!',
                            })}
                          />
                        </Pane>
                        <Pane className='col-6'>
                          <TextInputField
                            isInvalid={errors.phone ? true : false}
                            validationMessage={errors.phone && 'Harus di isi!'}
                            label='Nomor Telepon *'
                            placeholder='Nomor Telepon'
                            id='phone'
                            {...register('phone', { required: true })}
                          />
                        </Pane>
                      </Pane>
                      <Pane className='d-flex justify-content-end'>
                        <Button appearance='primary'>Submit</Button>
                      </Pane>
                    </Pane>
                  </form>
                </Card>
              </Pane>
            </Pane>
          </Content.Body>
        </Content>
      </ContentWrapper>
    </Layout>
  )
}

export default Profil

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

  const { data } = await axios.get(`${process.env.API_URI}/users/me`, {
    headers: {
      Authorization: `Bearer ${session.jwt}`,
    },
  })

  return {
    props: {
      profil: data,
      session,
    },
  }
}
