import { useForm } from 'react-hook-form'
import {
  Pane,
  Card,
  TextInputField,
  Button,
  FormField,
  Text,
  IconButton,
  Heading,
  TextInput,
  toaster,
  SmallCrossIcon,
} from 'evergreen-ui'
import Content from '@components/Content'
import Layout from '@components/Layouts/Admin'
import ContentWrapper from '@components/Wrapper/ContentWrapper'
import { signIn, signOut, useSession, getSession } from 'next-auth/react'
import { clientAxios } from '@helpers/functions'
import axios from 'axios'
import { useEffect, useState } from 'react'

const Profil = () => {
  const [data, setData] = useState([])
  const [featuredImage, setFeaturedImage] = useState()
  const [dImage, setDImage] = useState()
  const [isLoading, setIsLoading] = useState(false)
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors },
  } = useForm()

  const { data: session, status } = useSession()

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

  const imageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setFeaturedImage(URL.createObjectURL(e.target.files[0]))
      setDImage(e.target.files[0])
    }
  }
  const resetImage = (e) => {
    e.stopPropagation()
    setFeaturedImage()
    setDImage()
  }

  const onSubmit = (data) => {
    if (featuredImage == null) {
      alert('Upload QRIS!')
      return
    }

    const formData = new FormData()

    formData.append('data', JSON.stringify(data))
    formData.append('files.qr', dImage)

    clientAxios
      .put('/payment', formData)
      .then(function (response) {
        setIsLoading(false)
        toastMessage()
      })
      .catch(function (error) {
        setIsLoading(false)
      })
  }

  useEffect(() => {
    const json = async () => {
      await axios
        .get(process.env.NEXT_PUBLIC_API_URI + '/payment')
        .then((res) => {
          setData(res.data)
          setValue('fee', res.data.fee)
          if (res.data.BRI) {
            setValue('BRI.name', res.data.BRI.name)
            setValue('BRI.rek', res.data.BRI.rek)
          }
          if (res.data.BNI) {
            setValue('BNI.name', res.data.BNI.name)
            setValue('BNI.rek', res.data.BNI.rek)
          }
          if (res.data.MANDIRI) {
            setValue('MANDIRI.name', res.data.MANDIRI.name)
            setValue('MANDIRI.rek', res.data.MANDIRI.rek)
          }
          if (res.data.BCA) {
            setValue('BCA.name', res.data.BCA.name)
            setValue('BCA.rek', res.data.BCA.rek)
          }
          if (res.data.qr) {
            setFeaturedImage(process.env.NEXT_PUBLIC_API_URI + res.data.qr.url)
          }
        })
    }
    json()
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
                    <Heading is='h1'>Pengaturan Pembayaran</Heading>
                  </Pane>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <Pane>
                      <TextInputField
                        isInvalid={errors.name ? true : false}
                        validationMessage={errors.name && 'Harus di isi!'}
                        label='Biaya Admin *'
                        placeholder='Biaya Admin'
                        id='fee'
                        {...register('fee', { required: true })}
                      />

                      <FormField label='Kode QRIS *' marginBottom={24}>
                        <input
                          id='featured_image'
                          type='file'
                          accept='image/*'
                          onChange={imageChange}
                          hidden
                        />
                        <Pane position='relative'>
                          <label
                            htmlFor='featured_image'
                            style={{ width: '100%' }}
                          >
                            <Card
                              background={
                                featuredImage != null
                                  ? `url(${featuredImage}) no-repeat center / contain`
                                  : '#E6E8F0'
                              }
                              border='default'
                              padding={12}
                              height={featuredImage ? 200 : 'auto'}
                              className='d-flex justify-content-center align-items-center'
                            >
                              {featuredImage != null ? (
                                ''
                              ) : (
                                <Text>Pilih File</Text>
                              )}
                            </Card>
                          </label>
                          {featuredImage && (
                            <IconButton
                              icon={SmallCrossIcon}
                              appearance='primary'
                              intent='danger'
                              size='small'
                              right={4}
                              top={4}
                              position='absolute'
                              onClick={resetImage}
                            />
                          )}
                        </Pane>
                      </FormField>
                      <FormField label='BRI' marginBottom={24}>
                        <Pane className='d-flex gap-1'>
                          <TextInput
                            placeholder='Atas Nama...'
                            {...register('BRI.name')}
                          />
                          <TextInput
                            placeholder='Nomor Rekening...'
                            {...register('BRI.rek')}
                          />
                        </Pane>
                      </FormField>
                      <FormField label='BNI' marginBottom={24}>
                        <Pane className='d-flex gap-1'>
                          <TextInput
                            placeholder='Atas Nama...'
                            {...register('BNI.name')}
                          />
                          <TextInput
                            placeholder='Nomor Rekening...'
                            {...register('BNI.rek')}
                          />
                        </Pane>
                      </FormField>
                      <FormField label='BCA' marginBottom={24}>
                        <Pane className='d-flex gap-1'>
                          <TextInput
                            placeholder='Atas Nama...'
                            {...register('BCA.name')}
                          />
                          <TextInput
                            placeholder='Nomor Rekening...'
                            {...register('BCA.rek')}
                          />
                        </Pane>
                      </FormField>
                      <FormField label='MANDIRI' marginBottom={24}>
                        <Pane className='d-flex gap-1'>
                          <TextInput
                            placeholder='Atas Nama...'
                            {...register('MANDIRI.name')}
                          />
                          <TextInput
                            placeholder='Nomor Rekening...'
                            {...register('MANDIRI.rek')}
                          />
                        </Pane>
                      </FormField>
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
