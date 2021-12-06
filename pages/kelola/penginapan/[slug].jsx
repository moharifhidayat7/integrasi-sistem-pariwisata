import { useRouter } from 'next/router'
import { useEffect, useState, useRef } from 'react'
import Layout from '@components/Layouts/Pengelola'
import Content from '@components/Content'
import Iframe from '@components/Iframe'
import DetailForm from '@components/Dialogs/DetailForm'
import PengelolaForm from '@components/Dialogs/PengelolaForm'
import { formatRp } from '@helpers/functions'
import {
  Pane,
  Heading,
  Card,
  Text,
  Paragraph,
  Button,
  IconButton,
  Strong,
  SmallCrossIcon,
  Avatar,
  EditIcon,
  Spinner,
  PlusIcon,
  UploadIcon,
  toaster,
} from 'evergreen-ui'
import KontakForm from '@components/Dialogs/KontakForm'
import VideoForm from '@components/Dialogs/VideoForm'
import FasilitasForm from '@components/Dialogs/FasilitasForm'
import GaleriForm from '@components/Dialogs/GaleriForm'
import ImagePickerForm from '@components/Dialogs/ImagePickerForm'
import ContentWrapper from '@components/Wrapper/ContentWrapper'
import DeleteDialog from '@components/Dialogs/Delete'
import { clientAxios } from '@helpers/functions'
import axios from 'axios'
import Image from 'next/image'
import _ from 'lodash'
import { signIn, signOut, useSession, getSession } from 'next-auth/react'
import KamarForm from '@components/Dialogs/KamarForm'
import EditKamarForm from '@components/Dialogs/EditKamarForm'
const PenginapanPage = () => {
  const router = useRouter()
  const { slug } = router.query
  const [data, setData] = useState([])
  const [detailForm, setDetailForm] = useState(false)
  const [pengelolaForm, setPengelolaForm] = useState(false)
  const [kontakForm, setKontakForm] = useState(false)
  const [videoForm, setVideoForm] = useState(false)
  const [fasilitasForm, setFasilitasForm] = useState(false)
  const [galeriForm, setGaleriForm] = useState(false)
  const [imagePickerForm, setImagePickerForm] = useState(false)
  const [deleteDialog, setDeleteDialog] = useState(false)
  const [kamarForm, setKamarForm] = useState(false)
  const [editKamarForm, setEditKamarForm] = useState(false)
  const [selectedKamar, setSelectedKamar] = useState([])
  const { data: session, status } = useSession()
  const [deleteDialogText, setDeleteDialogText] = useState(
    'Apakah anda yakin ingin menghapus item ini?'
  )
  const featuredRef = useRef(null)
  const [onDelete, setOnDelete] = useState(null)

  const toastMessage = () => {
    toaster.success('Data Berhasil di Edit', {
      duration: 4,
    })
  }

  const mutate = () => {
    const json = async () =>
      await axios
        .get(process.env.NEXT_PUBLIC_API_URI + '/objects/' + slug)
        .then((res) => {
          setData(res.data)
        })
    json()
  }

  const deleteFasilitas = (index) => {
    data.facility.splice(index, 1)
    axios
      .put(process.env.NEXT_PUBLIC_API_URI + '/objects/' + data.id, {
        facility: data.facility,
      })
      .then(function (response) {
        setDeleteDialog(false)
        toastMessage()
        mutate()
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  const deleteRoom = (id) => {
    axios
      .delete(process.env.NEXT_PUBLIC_API_URI + '/rooms/' + id)
      .then((res) => {
        setDeleteDialog(false)
        toastMessage()
        mutate()
      })
  }

  const deleteImage = (id) => {
    axios
      .delete(process.env.NEXT_PUBLIC_API_URI + '/upload/files/' + id)
      .then(function (response) {
        setDeleteDialog(false)
        toastMessage()
        mutate()
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  const updateSlide = (id) => {
    const newSlide = data.slideshow
      .filter((ss) => ss.id != id)
      .map((sn) => sn.id)
    axios
      .put(process.env.NEXT_PUBLIC_API_URI + '/objects/' + data.id, {
        slideshow: newSlide,
      })
      .then(function (response) {
        setDeleteDialog(false)
        toastMessage()
        mutate()
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  const uploadFeaturedImage = (e) => {
    const img = e.target.files

    const formData = new FormData()

    if (img.length > 0) {
      formData.append('files', img[0])
      formData.append('ref', 'object')
      formData.append('refId', data.id)
      formData.append('field', 'featured_image')
    }

    axios
      .post(process.env.NEXT_PUBLIC_API_URI + '/upload', formData)
      .then(function (response) {
        toastMessage()
        mutate()
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  useEffect(() => {
    if (!router.isReady) return
    const json = async () =>
      await axios
        .get(process.env.NEXT_PUBLIC_API_URI + '/objects/' + router.query.slug)
        .then((res) => {
          setData(res.data)
        })
    json()
  }, [router.isReady, router.query.slug])

  return (
    <Layout title={data && data.name}>
      <DeleteDialog
        isShown={deleteDialog}
        setIsShown={setDeleteDialog}
        text={deleteDialogText}
        onConfirm={onDelete}
      />
      <DetailForm
        data={data}
        mutate={mutate}
        toastMessage={toastMessage}
        isShown={detailForm}
        setIsShown={setDetailForm}
      />
      <PengelolaForm
        data={data}
        mutate={mutate}
        toastMessage={toastMessage}
        isShown={pengelolaForm}
        setIsShown={setPengelolaForm}
      />
      <KontakForm
        data={data}
        mutate={mutate}
        toastMessage={toastMessage}
        isShown={kontakForm}
        setIsShown={setKontakForm}
      />
      <VideoForm
        data={data}
        mutate={mutate}
        toastMessage={toastMessage}
        isShown={videoForm}
        setIsShown={setVideoForm}
      />
      <FasilitasForm
        data={data}
        mutate={mutate}
        toastMessage={toastMessage}
        isShown={fasilitasForm}
        setIsShown={setFasilitasForm}
      />
      <GaleriForm
        data={data}
        mutate={mutate}
        toastMessage={toastMessage}
        isShown={galeriForm}
        setIsShown={setGaleriForm}
      />
      <ImagePickerForm
        data={data}
        mutate={mutate}
        toastMessage={toastMessage}
        isShown={imagePickerForm}
        setIsShown={setImagePickerForm}
      />
      <KamarForm
        data={data}
        mutate={mutate}
        toastMessage={toastMessage}
        isShown={kamarForm}
        setIsShown={setKamarForm}
      />
      <EditKamarForm
        data={selectedKamar}
        mutate={mutate}
        toastMessage={toastMessage}
        isShown={editKamarForm}
        setIsShown={setEditKamarForm}
      />

      <Content>
        <ContentWrapper>
          <Pane className='row' marginY={24}>
            <Pane>
              <Card elevation={1} backgroundColor='white' padding={20}>
                <Pane position='relative' height={380} marginBottom={12}>
                  {data ? (
                    data.featured_image ? (
                      <Image
                        alt={data.featured_image.name}
                        src={
                          process.env.NEXT_PUBLIC_API_URI +
                          data.featured_image.url
                        }
                        layout='fill'
                        objectFit='cover'
                        objectPosition='center'
                        quality={100}
                      />
                    ) : (
                      <Image
                        alt='Tidak ada foto'
                        src='https://via.placeholder.com/1000x600?text=Tidak-ada-foto'
                        layout='fill'
                        objectFit='cover'
                        quality={100}
                      />
                    )
                  ) : (
                    <Spinner size={24} />
                  )}
                  <Pane position='absolute' top={12} right={12}>
                    <input
                      type='file'
                      onChange={uploadFeaturedImage}
                      ref={featuredRef}
                      accept='image/*'
                      hidden
                    />
                    <Button
                      appearance='primary'
                      iconBefore={UploadIcon}
                      onClick={() => featuredRef.current.click()}
                    >
                      Upload
                    </Button>
                  </Pane>
                </Pane>
                <Pane className='d-flex justify-content-between align-items-center'>
                  <Heading is='h1' size={900}>
                    {data && data.name}
                  </Heading>
                  <Button
                    appearance='primary'
                    iconBefore={EditIcon}
                    onClick={() => setDetailForm(true)}
                  >
                    Edit
                  </Button>
                </Pane>
                <Text color='muted'>{data && data.address}</Text>
                <Paragraph>{data && data.description}</Paragraph>
              </Card>
            </Pane>
          </Pane>
          <Pane className='row g-2'>
            <Pane className='col-sm-12 col-md-12 col-lg-4 col-xl-3'>
              <Card elevation={1} backgroundColor='white' padding={20}>
                <Pane className='d-flex justify-content-between align-items-center'>
                  <Heading is='h2' size={500}>
                    Kontak
                  </Heading>
                  <Button
                    appearance='primary'
                    iconBefore={EditIcon}
                    onClick={() => setKontakForm(true)}
                  >
                    Edit
                  </Button>
                </Pane>
                <Pane marginTop={12}>
                  {data.contact && (
                    <Paragraph marginBottom={5}>
                      <Strong>{data.contact.name}</Strong>
                      <br />
                      {data.contact.address && (
                        <>
                          Alamat : {data.contact.address} <br />
                        </>
                      )}
                      Telp. : {data.contact.phone}
                      <br />
                      Email : {data.contact.email}
                    </Paragraph>
                  )}
                </Pane>
              </Card>
            </Pane>
            <Pane
              className='col-sm-12 col-md-12 col-lg-8 col-xl-9'
              position='relative'
            >
              <Card
                elevation={1}
                backgroundColor='white'
                padding={20}
                marginBottom={12}
              >
                <Pane className='d-flex justify-content-between align-items-center'>
                  <Heading is='h2' size={500}>
                    Slideshow
                  </Heading>
                  <Button
                    appearance='primary'
                    iconBefore={EditIcon}
                    onClick={() => setImagePickerForm(true)}
                  >
                    Edit
                  </Button>
                </Pane>
                <Pane marginTop={12} overflowX='auto' whiteSpace='nowrap'>
                  <Pane>
                    {data.slideshow &&
                      data.slideshow.map((item, index) => {
                        return (
                          <Pane
                            key={item.id}
                            height={150}
                            borderRadius={4}
                            className='d-inline-block me-1 col-6 col-lg-3 col-sm-3 col-xg-2'
                            style={{
                              backgroundImage: `url(${process.env.NEXT_PUBLIC_API_URI}${item.url})`,
                              backgroundSize: 'cover',
                              backgroundPosition: 'center',
                              backgroundRepeat: 'no-repeat',
                            }}
                            position='relative'
                            background='white'
                          >
                            <IconButton
                              icon={SmallCrossIcon}
                              appearance='primary'
                              intent='danger'
                              size='small'
                              top={4}
                              right={4}
                              position='absolute'
                              onClick={() => {
                                setOnDelete(() => () => updateSlide(item.id))
                                setDeleteDialog(true)
                              }}
                            />
                          </Pane>
                        )
                      })}
                  </Pane>
                </Pane>
              </Card>
              <Pane className='row g-2'>
                <Pane className='col-sm-12 col-md-12 col-lg-12 col-xl-7'>
                  <Card elevation={1} backgroundColor='white' padding={20}>
                    <Pane className='d-flex justify-content-between align-items-center'>
                      <Heading is='h2' size={500}>
                        Video Profil
                      </Heading>
                      <Button
                        appearance='primary'
                        iconBefore={EditIcon}
                        onClick={() => setVideoForm(true)}
                      >
                        Edit
                      </Button>
                    </Pane>
                    <Pane marginTop={12}>
                      {data && <Iframe url={data.youtube}></Iframe>}
                    </Pane>
                  </Card>
                </Pane>
                <Pane className='col-sm-12 col-md-12 col-lg-12 col-xl-5'>
                  <Card elevation={1} backgroundColor='white' padding={20}>
                    <Pane className='d-flex justify-content-between align-items-center'>
                      <Heading is='h2' size={500}>
                        Fasilitas
                      </Heading>
                      <Button
                        appearance='primary'
                        iconBefore={PlusIcon}
                        onClick={() => setFasilitasForm(true)}
                      >
                        Tambah
                      </Button>
                    </Pane>
                    <Pane marginTop={12} overflowY='auto'>
                      <Pane maxHeight={300}>
                        {data &&
                          data.facility &&
                          data.facility.map((f, index) => {
                            return (
                              <Pane
                                key={'f' + index}
                                padding={8}
                                marginBottom={4}
                                backgroundColor='#EDEFF5'
                                borderRadius={4}
                              >
                                <Pane className='d-flex justify-content-between align-items-center'>
                                  <Pane marginLeft={10}>
                                    <Strong>{f}</Strong>
                                  </Pane>
                                  <IconButton
                                    icon={SmallCrossIcon}
                                    appearance='primary'
                                    intent='danger'
                                    size='small'
                                    onClick={() => {
                                      setOnDelete(
                                        () => () => deleteFasilitas(index)
                                      )
                                      setDeleteDialog(true)
                                    }}
                                  />
                                </Pane>
                              </Pane>
                            )
                          })}
                      </Pane>
                    </Pane>
                  </Card>
                </Pane>
                <Pane className='col-12'>
                  <Card
                    elevation={1}
                    backgroundColor='white'
                    padding={20}
                    marginBottom={12}
                  >
                    <Pane className='d-flex justify-content-between align-items-center'>
                      <Heading is='h2' size={500}>
                        Galeri
                      </Heading>
                      <Button
                        appearance='primary'
                        iconBefore={PlusIcon}
                        onClick={() => setGaleriForm(true)}
                      >
                        Tambah
                      </Button>
                    </Pane>
                    <Pane marginTop={12} overflowY='auto'>
                      <Pane
                        className='d-inline-flex flex-wrap gap-1'
                        maxHeight={500}
                      >
                        {data.images &&
                          data.images.map((item, index) => {
                            return (
                              <Pane
                                key={item.id}
                                width={170}
                                height={150}
                                borderRadius={4}
                                style={{
                                  backgroundImage: `url(${process.env.NEXT_PUBLIC_API_URI}${item.url})`,
                                  backgroundSize: 'cover',
                                  backgroundPosition: 'center',
                                  backgroundRepeat: 'no-repeat',
                                }}
                                position='relative'
                                background='white'
                              >
                                <IconButton
                                  icon={SmallCrossIcon}
                                  appearance='primary'
                                  intent='danger'
                                  size='small'
                                  top={4}
                                  right={4}
                                  position='absolute'
                                  onClick={() => {
                                    setOnDelete(
                                      () => () => deleteImage(item.id)
                                    )
                                    setDeleteDialog(true)
                                  }}
                                />
                              </Pane>
                            )
                          })}
                      </Pane>
                    </Pane>
                  </Card>
                  <Card
                    elevation={1}
                    backgroundColor='white'
                    padding={20}
                    marginBottom={12}
                  >
                    <Pane className='d-flex justify-content-between align-items-center'>
                      <Heading is='h2' size={500}>
                        Kamar
                      </Heading>
                      <Button
                        appearance='primary'
                        iconBefore={PlusIcon}
                        onClick={() => setKamarForm(true)}
                      >
                        Tambah
                      </Button>
                    </Pane>
                    <Pane marginTop={12}>
                      {data.rooms &&
                        data.rooms.map((room) => {
                          return (
                            <Pane
                              key={room.id}
                              className='row pb-3 pt-2'
                              borderBottom='1px solid #eeeeee'
                            >
                              <Pane className='col-md-5'>
                                <Pane
                                  height='15rem'
                                  position='relative'
                                  borderRadius={4}
                                  overflow='hidden'
                                >
                                  {room.gallery[0] ? (
                                    <Image
                                      alt={room.gallery[0].name}
                                      src={
                                        process.env.NEXT_PUBLIC_API_URI +
                                        room.gallery[0].url
                                      }
                                      layout='fill'
                                      objectFit='cover'
                                    />
                                  ) : (
                                    <Image
                                      alt='noImage'
                                      src='https://via.placeholder.com/1000x600?text=Tidak-ada-foto'
                                      layout='fill'
                                      objectFit='cover'
                                    />
                                  )}
                                </Pane>
                                <Pane className='mt-2 d-flex'>
                                  {room.gallery &&
                                    room.gallery
                                      .filter((g, i) => i != 0)
                                      .map((im) => {
                                        return (
                                          <Pane
                                            key={im.id}
                                            className='col-3'
                                            height='5rem'
                                            position='relative'
                                            borderRadius={4}
                                            overflow='hidden'
                                          >
                                            <Image
                                              alt={im.name}
                                              src={
                                                process.env
                                                  .NEXT_PUBLIC_API_URI + im.url
                                              }
                                              layout='fill'
                                              objectFit='cover'
                                              className='p-1'
                                            />{' '}
                                          </Pane>
                                        )
                                      })}
                                </Pane>
                              </Pane>
                              <Pane className='col-md-7'>
                                <Heading
                                  is='h3'
                                  size={800}
                                  className='pt-2 pb-2'
                                >
                                  {room.name}
                                </Heading>
                                <Strong color='muted'>Harga</Strong>
                                <Pane className='mb-2'>
                                  <Heading is='h4' color='#52BD95' size={700}>
                                    {formatRp(room.price)}
                                  </Heading>
                                </Pane>
                                <Button
                                  type='button'
                                  appearance='primary'
                                  onClick={() => {
                                    setSelectedKamar(room)
                                    setEditKamarForm(true)
                                  }}
                                  className='me-1'
                                >
                                  Edit
                                </Button>
                                <Button
                                  type='button'
                                  appearance='primary'
                                  intent='danger'
                                  onClick={() => {
                                    setOnDelete(() => () => deleteRoom(room.id))
                                    setDeleteDialog(true)
                                  }}
                                >
                                  Hapus
                                </Button>
                              </Pane>
                            </Pane>
                          )
                        })}
                    </Pane>
                  </Card>
                </Pane>
              </Pane>
            </Pane>
          </Pane>
        </ContentWrapper>
      </Content>
    </Layout>
  )
}

export default PenginapanPage
