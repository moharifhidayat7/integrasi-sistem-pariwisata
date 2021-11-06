import useSWR, { useSWRConfig } from 'swr'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Layout from '@components/Layouts/Admin'
import Content from '@components/Content'
import Iframe from '@components/Iframe'
import DetailForm from '@components/Dialogs/DetailForm'
import PengelolaForm from '@components/Dialogs/PengelolaForm'
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
  PlusIcon,
  toaster,
} from 'evergreen-ui'
import KontakForm from '@components/Dialogs/KontakForm'
import VideoForm from '@components/Dialogs/VideoForm'
import FasilitasForm from '@components/Dialogs/FasilitasForm'
import GaleriForm from '@components/Dialogs/GaleriForm'
import ImagePickerForm from '@components/Dialogs/ImagePickerForm'
import ContentWrapper from '@components/Wrapper/ContentWrapper'
import DeleteDialog from '@components/Dialogs/Delete'

const WisataPage = () => {
  const router = useRouter()
  const { slug } = router.query

  const [detailForm, setDetailForm] = useState(false)
  const [pengelolaForm, setPengelolaForm] = useState(false)
  const [kontakForm, setKontakForm] = useState(false)
  const [videoForm, setVideoForm] = useState(false)
  const [fasilitasForm, setFasilitasForm] = useState(false)
  const [galeriForm, setGaleriForm] = useState(false)
  const [imagePickerForm, setImagePickerForm] = useState(false)
  const [deleteDialog, setDeleteDialog] = useState(false)

  const [deleteDialogText, setDeleteDialogText] = useState(
    'Apakah anda yakin ingin menghapus item ini?'
  )

  const [onDelete, setOnDelete] = useState(null)

  const toastMessage = () => {
    toaster.success('Data Berhasil di Edit', {
      duration: 4,
    })
  }

  const getWisata = async (url) => await fetch(url).then((res) => res.json())

  const { data, mutate, error } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URI}/objects/${slug}`,
    getWisata,
    { fallbackData: getWisata }
  )

  const a = [1, 2, 3, 4, 5, 6, 7, 8, 9]
  return (
    <Layout>
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
      <PengelolaForm isShown={pengelolaForm} setIsShown={setPengelolaForm} />
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
      <FasilitasForm isShown={fasilitasForm} setIsShown={setFasilitasForm} />
      <GaleriForm isShown={galeriForm} setIsShown={setGaleriForm} />
      <ImagePickerForm
        isShown={imagePickerForm}
        setIsShown={setImagePickerForm}
      />

      <Content>
        <ContentWrapper>
          <Pane className='row' marginY={24}>
            <Pane>
              <Card elevation={1} backgroundColor='white' padding={20}>
                <Pane className='d-flex justify-content-between align-items-center'>
                  <Heading is='h1' size={900}>
                    {data.name}
                  </Heading>
                  <Button
                    appearance='primary'
                    iconBefore={EditIcon}
                    onClick={() => setDetailForm(true)}
                  >
                    Edit
                  </Button>
                </Pane>
                <Text color='muted'>{data.address}</Text>
                <Paragraph>{data.description}</Paragraph>
              </Card>
            </Pane>
          </Pane>
          <Pane className='row g-2'>
            <Pane className='col-sm-12 col-md-3'>
              <Card
                elevation={1}
                backgroundColor='white'
                padding={20}
                marginBottom={12}
              >
                <Pane className='d-flex justify-content-between align-items-center'>
                  <Heading is='h2' size={500}>
                    Pengelola
                  </Heading>
                  <Button
                    appearance='primary'
                    iconBefore={EditIcon}
                    onClick={() => setPengelolaForm(true)}
                  >
                    Edit
                  </Button>
                </Pane>
                <Pane
                  padding={12}
                  marginTop={12}
                  backgroundColor='#EDEFF5'
                  borderRadius={4}
                  cursor='pointer'
                >
                  <Pane className='d-flex align-items-center'>
                    <Avatar
                      src='https://picsum.photos/200'
                      name='asdsd'
                      size={40}
                    />
                    <Pane marginLeft={10}>
                      <Pane marginBottom={-8}>
                        <Strong>asdsd</Strong>
                      </Pane>
                      <Text size={300} color='#474D66'>
                        asdsd
                      </Text>
                    </Pane>
                  </Pane>
                </Pane>
              </Card>
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
                  {data.contact &&
                    data.contact.map((c) => (
                      <Paragraph key={c.id} marginBottom={5}>
                        {c.name}
                        <br />
                        {c.address && (
                          <>
                            Alamat : {c.address} <br />
                          </>
                        )}
                        Telp. : {c.phone}
                        <br />
                        Email : {c.email}
                      </Paragraph>
                    ))}
                </Pane>
              </Card>
            </Pane>
            <Pane className='col-sm-12 col-md-9' position='relative'>
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
                              backgroundImage: `url(${process.env.NEXT_PUBLIC_API_URI}${item.formats.thumbnail.url})`,
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
                                setOnDelete(() => () => alert(index))
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
                <Pane className='col-sm-12 col-md-7'>
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
                      {data.youtube && <Iframe url={data.youtube}></Iframe>}
                    </Pane>
                  </Card>
                </Pane>
                <Pane className='col-sm-12 col-md-5'>
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
                      <Pane height={300}>
                        {data.facility &&
                          data.facility.map((f, index) => {
                            return (
                              <Pane
                                key={f.id}
                                padding={8}
                                marginBottom={4}
                                backgroundColor='#EDEFF5'
                                borderRadius={4}
                              >
                                <Pane className='d-flex justify-content-between align-items-center'>
                                  <Pane marginLeft={10}>
                                    <Strong>{f.name}</Strong>
                                  </Pane>
                                  <IconButton
                                    icon={SmallCrossIcon}
                                    appearance='primary'
                                    intent='danger'
                                    size='small'
                                    onClick={() => {
                                      setOnDelete(() => () => alert(index))
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
                                  backgroundImage: `url(${process.env.NEXT_PUBLIC_API_URI}${item.formats.thumbnail.url})`,
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
                                    setOnDelete(() => () => alert(index))
                                    setDeleteDialog(true)
                                  }}
                                />
                              </Pane>
                            )
                          })}
                      </Pane>
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

export default WisataPage
