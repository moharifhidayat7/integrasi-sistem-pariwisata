import { useState, useRef, useEffect, useCallback } from 'react'
import Layout from '../../../components/Layouts/Admin'
import Content from '../../../components/Content'
import StepWizard from 'react-step-wizard'
import { useForm } from 'react-hook-form'
import { useDropzone } from 'react-dropzone'
import _ from 'lodash'

import {
  Dialog,
  Pane,
  Text,
  Card,
  PlusIcon,
  ManuallyEnteredDataIcon,
  MediaIcon,
  UserIcon,
  ArrowRightIcon,
  Heading,
  TextInputField,
  TextareaField,
  Button,
  Strong,
  Small,
  AddIcon,
  FormField,
  UploadIcon,
  Table,
  SearchInput,
  FilePicker,
  Avatar,
  SmallCrossIcon,
  IconButton,
} from 'evergreen-ui'
import StepNav from '@components/StepNav'
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu'
import Image from 'next/image'
import { formatRp, clientAxios } from '@helpers/functions'
import { useRouter } from 'next/router'
import Variasi from '@components/Dialogs/Variasi'
const Tambah = () => {
  const router = useRouter()
  const [activeStep, setActiveStep] = useState(1)
  const [checked, setChecked] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [postData, setPostData] = useState([])

  const [image, setImage] = useState(null)
  const [variasiForm, setVariasiForm] = useState(false)
  const [variasi, setVariasi] = useState([])
  const featuredImageRef = useRef(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const [files, setFiles] = useState([])

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

  const { getRootProps, getInputProps, open, isDragActive } = useDropzone({
    accept: 'image/*',
    noClick: true,
    onDrop: (acceptedFiles) => {
      const allFiles = [
        ...files,
        ...acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        ),
      ]
      setFiles(_.uniqBy(allFiles, 'path'))
    },
  })

  const removeFile = (index) => {
    const newFiles = files.filter((e, i) => i != index)
    setFiles(newFiles)
  }

  const onSubmit = (data) => {
    const formData = new FormData()

    formData.append(
      'data',
      JSON.stringify({
        name: data.productName,
        description: data.description,
        prices: variasi,
      })
    )

    for (let i = 0; i < files.length; i++) {
      const element = files[i]
      formData.append('files.images', element)
    }

    formData.append('files.featured_image', image)

    clientAxios
      .post('/products', formData)
      .then(function (response) {
        const path = router.pathname.split('/').slice(0, -1)
        router.push(path.join('/'))
      })
      .catch(function (error) {
        setIsLoading(false)
        console.log(error)
      })
  }

  return (
    <Layout title='Tambah Produk'>
      <Variasi
        isShown={variasiForm}
        setIsShown={setVariasiForm}
        variasi={variasi}
        setVariasi={setVariasi}
      />
      <Content>
        <Content.Header title='Tambah Produk' />
        <Content.Body>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Pane className='d-flex justify-content-center'>
              <Pane
                className='col-12 col-md-9 col-lg-8 col-xl-7 col-xxl-6'
                position='relative'
              >
                <Card
                  elevation={1}
                  backgroundColor='white'
                  padding={20}
                  overflow='hidden'
                >
                  <FormField label='Foto' marginBottom={24}>
                    <Pane
                      overflowX='auto'
                      whiteSpace='nowrap'
                      paddingBottom='5'
                    >
                      <Pane
                        className='d-inline-block'
                        marginRight={5}
                        verticalAlign='top'
                      >
                        <Pane
                          borderStyle='dashed'
                          bordersize={2}
                          borderColor='#E6E8F0'
                          padding={5}
                          width={150}
                          height={180}
                          className='d-flex justify-content-center align-items-center'
                          textAlign='center'
                          cursor='pointer'
                          position='relative'
                          onClick={() => featuredImageRef.current.click()}
                        >
                          <input
                            type='file'
                            accept='image/*'
                            ref={featuredImageRef}
                            onChange={(e) => setImage(e.target.files[0])}
                            required
                            hidden
                          />
                          {image ? (
                            <Pane
                              width='100%'
                              height='100%'
                              backgroundImage={`url(${URL.createObjectURL(
                                image
                              )})`}
                              backgroundRepeat='no-repeat'
                              backgroundSize='contain'
                              backgroundPosition='center'
                            ></Pane>
                          ) : (
                            <Text color='muted'>Foto Utama</Text>
                          )}
                        </Pane>
                      </Pane>
                      {files.length > 0 &&
                        files.map((file, index) => (
                          <Pane
                            className='d-inline-block'
                            verticalAlign='top'
                            marginRight={5}
                            key={file.name}
                          >
                            <Pane
                              borderStyle='dashed'
                              bordersize={2}
                              borderColor='#E6E8F0'
                              position='relative'
                              padding={5}
                              width={150}
                              height={180}
                              className='d-flex justify-content-center align-items-center'
                              textAlign='center'
                            >
                              <Pane
                                width='100%'
                                height='100%'
                                style={{
                                  backgroundImage: `url('${file.preview}')`,
                                  backgroundSize: 'cover',
                                  backgroundPosition: 'center',
                                  backgroundRepeat: 'no-repeat',
                                }}
                              ></Pane>
                              <IconButton
                                icon={SmallCrossIcon}
                                appearance='primary'
                                intent='danger'
                                size='small'
                                top={4}
                                right={4}
                                position='absolute'
                                onClick={() => removeFile(index)}
                              />
                            </Pane>
                          </Pane>
                        ))}
                      <Pane className='d-inline-block' marginRight={5}>
                        <Pane {...getRootProps({ className: 'dropzone' })}>
                          <input
                            type='file'
                            accept='image/*'
                            multiple
                            id='muli'
                            {...getInputProps()}
                            hidden
                          />
                          <label htmlFor='muli'>
                            <Pane
                              borderStyle='dashed'
                              bordersize={2}
                              borderColor='#E6E8F0'
                              padding={5}
                              width={150}
                              height={180}
                              className='d-flex justify-content-center align-items-center'
                              textAlign='center'
                            >
                              <PlusIcon color='muted' size={40} />
                            </Pane>
                          </label>
                        </Pane>
                      </Pane>
                    </Pane>
                  </FormField>
                  <TextInputField
                    isInvalid={errors.productName ? true : false}
                    validationMessage={errors.productName && 'Harus di isi!'}
                    label='Nama Produk *'
                    placeholder='Nama Produk'
                    id='productName'
                    {...register('productName', { required: true })}
                  />
                  <TextareaField
                    label='Deskripsi'
                    placeholder='Deskripsi Produk'
                    id='description'
                    {...register('description')}
                  />
                  <FormField label='Harga' marginBottom={24}>
                    <Table.Body>
                      <Table.Head>
                        <Table.TextCell>Variasi</Table.TextCell>
                        <Table.TextCell>Harga</Table.TextCell>
                      </Table.Head>
                      <Table.Body>
                        {variasi.map((v, index) => (
                          <Table.Row key={v.variation + index} height={40}>
                            <Table.TextCell>{v.variation}</Table.TextCell>
                            <Table.TextCell>{formatRp(v.price)}</Table.TextCell>
                          </Table.Row>
                        ))}

                        <Table.Row>
                          <Table.TextCell textAlign='center'>
                            <Button
                              iconBefore={PlusIcon}
                              onClick={() => setVariasiForm(true)}
                              type='button'
                            >
                              Tambah Variasi
                            </Button>
                          </Table.TextCell>
                        </Table.Row>
                      </Table.Body>
                    </Table.Body>
                  </FormField>
                  <Pane textAlign='right'>
                    <Button
                      appearance='primary'
                      type='submit'
                      marginLeft={5}
                      isLoading={isLoading}
                    >
                      Submit
                    </Button>
                  </Pane>
                </Card>
              </Pane>
            </Pane>
          </form>
        </Content.Body>
      </Content>
    </Layout>
  )
}

export default Tambah
