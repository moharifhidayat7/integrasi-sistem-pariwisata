import { useState, useRef, useEffect, useCallback } from 'react'
import Layout from '@components/Layouts/Admin'
import Content from '@components/Content'
import { useDropzone } from 'react-dropzone'
import _ from 'lodash'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import {
  Dialog,
  Pane,
  Text,
  Card,
  PlusIcon,
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
  EditIcon,
  Select,
  SmallCrossIcon,
  IconButton,
} from 'evergreen-ui'
import { formatRp, clientAxios } from '@helpers/functions'
import { useRouter } from 'next/router'
import Variasi from '@components/Dialogs/Variasi'
import EditVariasi from '@components/Dialogs/VariasiEdit'
const Edit = () => {
  const router = useRouter()
  const { id: productId } = router.query
  const [activeStep, setActiveStep] = useState(1)
  const [checked, setChecked] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [postData, setPostData] = useState([])
  const [umkm, setUmkm] = useState([])
  const [product, setProduct] = useState([])
  const [image, setImage] = useState(null)
  const [variasiForm, setVariasiForm] = useState(false)
  const [variasi, setVariasi] = useState([])
  const featuredImageRef = useRef(null)
  const [dataImage, setDataImage] = useState([])
  const [row, setRow] = useState([])
  const [vari, setVari] = useState('')
  const [prs, setPrs] = useState(0)
  const [fee, setFee] = useState(0)
  const [EditVariasiForm, setEditVariasiForm] = useState(false)
  const {
    register,
    handleSubmit,
    setValue,
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

    const json = {
      name: data.productName,
      description: data.description,
      prices: variasi,
      category: data.category,
      images: dataImage.map((d) => d.id),
    }

    if (data.object != 'pokdarwis') {
      json.object = data.object
    } else {
      json.object == {}
    }

    formData.append('data', JSON.stringify(json))

    for (let i = 0; i < files.length; i++) {
      const element = files[i]
      formData.append('files.images', element)
    }

    formData.append('files.featured_image', image)

    clientAxios
      .put('/products/' + productId, formData)
      .then(function (response) {
        const path = router.pathname.split('/').slice(0, -1)
        router.push(path.join('/'))
      })
      .catch(function (error) {
        setIsLoading(false)
        console.log(error)
      })
  }

  const removeImages = (id) => {
    setDataImage(dataImage.filter((d) => d.id != id))
  }

  useEffect(() => {
    if (!router.isReady) return
    const getProduct = async () => {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URI}/products/${router.query.id}`
      )
      setProduct(data)
      setValue('productName', data.name)
      setValue('description', data.description)
      setValue('category', data.category)
      if (data.object) {
        setValue('object', data.object ? data.object.id : '')
      }
      setVariasi(data.prices)
      setDataImage(data.images)
    }
    getProduct()

    const getUmkm = async () => {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URI}/objects?type=UMKM`
      )
      setUmkm(data)
    }
    getUmkm()
  }, [router.isReady, router.query.id])

  return (
    <Layout title='Edit Produk'>
      <Variasi
        isShown={variasiForm}
        setIsShown={setVariasiForm}
        variasi={variasi}
        setVariasi={setVariasi}
        vari={vari}
        setVari={setVari}
        prs={prs}
        setPrs={setPrs}
        fee={fee}
        setFee={setFee}
      />
      <EditVariasi
        isShown={EditVariasiForm}
        setIsShown={setEditVariasiForm}
        variasi={variasi}
        row={row}
        setVariasi={setVariasi}
        vari={vari}
        setVari={setVari}
        prs={prs}
        setPrs={setPrs}
        fee={fee}
        setFee={setFee}
      />
      <Content>
        <Content.Header title='Edit Produk' />
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
                    <Pane paddingBottom='5' className='d-flex gap-1 flex-wrap'>
                      <Pane marginRight={5} verticalAlign='top'>
                        <Pane
                          borderStyle='dashed'
                          bordersize={2}
                          borderColor='#E6E8F0'
                          padding={5}
                          width={120}
                          height={120}
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
                              backgroundSize='cover'
                              backgroundPosition='center'
                            ></Pane>
                          ) : product.featured_image ? (
                            <Pane
                              width='100%'
                              height='100%'
                              backgroundImage={`url(${process.env.NEXT_PUBLIC_API_URI}${product.featured_image.url})`}
                              backgroundRepeat='no-repeat'
                              backgroundSize='cover'
                              backgroundPosition='center'
                            ></Pane>
                          ) : (
                            <Text color='muted'>Foto Utama</Text>
                          )}
                        </Pane>
                      </Pane>
                      {dataImage &&
                        dataImage.map((file, index) => (
                          <Pane
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
                              width={120}
                              height={120}
                              className='d-flex justify-content-center align-items-center'
                              textAlign='center'
                            >
                              <Pane
                                width='100%'
                                height='100%'
                                style={{
                                  backgroundImage: `url('${
                                    process.env.NEXT_PUBLIC_API_URI + file.url
                                  }')`,
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
                                onClick={() => removeImages(file.id)}
                              />
                            </Pane>
                          </Pane>
                        ))}
                      {files.length > 0 &&
                        files.map((file, index) => (
                          <Pane
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
                              width={120}
                              height={120}
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
                      <Pane marginRight={5}>
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
                              width={120}
                              height={120}
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
                  <FormField label='Kategori' marginBottom={24}>
                    <Select
                      width='100%'
                      {...register('category')}
                      defaultValue='Peternakan'
                    >
                      <option value='Peternakan'>Peternakan</option>
                      <option value='Perkebunan'>Perkebunan</option>
                      <option value='Kerajinan'>Kerajinan</option>
                      <option value='Kuliner'>Kuliner</option>
                      <option value='Lainnya'>Lainnya</option>
                    </Select>
                  </FormField>
                  <FormField label='Penjual' marginBottom={24}>
                    <Select width='100%' {...register('object')}>
                      <option value='pokdarwis'>Pokdarwis Gombengsari</option>
                      {umkm.map((u) => (
                        <option value={u.id} key={u.id}>
                          {u.name}
                        </option>
                      ))}
                    </Select>
                  </FormField>
                  <FormField label='Harga' marginBottom={24}>
                    <Table.Body>
                      <Table.Head>
                        <Table.TextCell>Variasi</Table.TextCell>
                        <Table.TextCell>Biaya Admin</Table.TextCell>
                        <Table.TextCell>Harga Produk</Table.TextCell>
                        <Table.TextCell>Total</Table.TextCell>
                        <Table.TextCell></Table.TextCell>
                      </Table.Head>
                      <Table.Body>
                        {variasi != null &&
                          variasi.map((v, index) => (
                            <Table.Row key={v.variation + index} height={40}>
                              <Table.TextCell>{v.variation}</Table.TextCell>
                              <Table.TextCell>{formatRp(v.fee)}</Table.TextCell>
                              <Table.TextCell>
                                {formatRp(v.price)}
                              </Table.TextCell>
                              <Table.TextCell>
                                {formatRp(v.price + v.fee)}
                              </Table.TextCell>
                              <div className='float-right d-flex align-items-center'>
                                <IconButton
                                  type='button'
                                  icon={EditIcon}
                                  appearance='primary'
                                  intent='default'
                                  className='me-1'
                                  size='small'
                                  onClick={() => {
                                    setRow(index)
                                    setVari(v.variation)
                                    setPrs(v.price)
                                    setFee(v.fee)
                                    setEditVariasiForm(true)
                                  }}
                                />
                                <IconButton
                                  icon={SmallCrossIcon}
                                  appearance='primary'
                                  intent='danger'
                                  size='small'
                                  onClick={() =>
                                    setVariasi(
                                      variasi.filter((v, i) => i != index)
                                    )
                                  }
                                />
                              </div>
                            </Table.Row>
                          ))}

                        <Table.Row>
                          <Table.TextCell textAlign='center'>
                            <Button
                              iconBefore={PlusIcon}
                              onClick={() => {
                                setVari()
                                setPrs()
                                setFee()
                                setVariasiForm(true)
                              }}
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

export default Edit
