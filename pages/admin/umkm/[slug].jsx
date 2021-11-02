import { useRouter } from 'next/router'
import { useState } from 'react'
import Image from 'next/image'
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
} from 'evergreen-ui'
import KontakForm from '@components/Dialogs/KontakForm'
import VideoForm from '@components/Dialogs/VideoForm'
import FasilitasForm from '@components/Dialogs/FasilitasForm'
import GaleriForm from '@components/Dialogs/GaleriForm'
import ImagePickerForm from '@components/Dialogs/ImagePickerForm'
import ContentWrapper from '@components/Wrapper/ContentWrapper'
import DeleteDialog from '@components/Dialogs/Delete'
import LogoForm from '@components/Dialogs/LogoForm'

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
  const [logoForm, setLogoForm] = useState(false)
  const [deleteDialog, setDeleteDialog] = useState(false)

  const [deleteDialogText, setDeleteDialogText] = useState(
    'Apakah anda yakin ingin menghapus item ini?'
  )

  const [onDelete, setOnDelete] = useState(null)

  const a = [1, 2, 3, 4, 5, 6, 7, 8, 9]
  return (
    <Layout>
      <DeleteDialog
        isShown={deleteDialog}
        setIsShown={setDeleteDialog}
        text={deleteDialogText}
        onConfirm={onDelete}
      />
      <DetailForm isShown={detailForm} setIsShown={setDetailForm} />
      <PengelolaForm isShown={pengelolaForm} setIsShown={setPengelolaForm} />
      <KontakForm isShown={kontakForm} setIsShown={setKontakForm} />
      <VideoForm isShown={videoForm} setIsShown={setVideoForm} />
      <FasilitasForm isShown={fasilitasForm} setIsShown={setFasilitasForm} />
      <GaleriForm isShown={galeriForm} setIsShown={setGaleriForm} />
      <ImagePickerForm
        isShown={imagePickerForm}
        setIsShown={setImagePickerForm}
      />
      <LogoForm isShown={logoForm} setIsShown={setLogoForm} />

      <Content>
        <ContentWrapper>
          <Pane className='row' marginY={24}>
            <Pane>
              <Card elevation={1} backgroundColor='white' padding={20}>
                <Pane className='d-flex justify-content-between align-items-center'>
                  <Heading is='h1' size={900}>
                    Puncak Asmoro
                  </Heading>
                  <Button
                    appearance='primary'
                    iconBefore={EditIcon}
                    onClick={() => setDetailForm(true)}
                  >
                    Edit
                  </Button>
                </Pane>
                <Text color='muted'>Banyuwangi, Jawa Timur, Indonesia</Text>
                <Paragraph>
                  Veniam non in nisi occaecat sint ea laborum qui in velit duis
                  aliquip. Dolore fugiat et occaecat ex irure cupidatat aute
                  nisi dolore laboris est ut eu do. Occaecat proident eu in amet
                  duis. Sit exercitation dolore cillum aliqua labore veniam
                  labore duis labore reprehenderit ex ut. Commodo in officia
                  amet aliqua. Id eiusmod nostrud ipsum anim esse sunt
                  exercitation. Non ea pariatur quis nulla officia duis proident
                  commodo sit ex aute anim. Eu excepteur exercitation cupidatat
                  minim qui est et proident ut cillum non.
                </Paragraph>
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
                    Logo
                  </Heading>
                  <Button
                    appearance='primary'
                    iconBefore={EditIcon}
                    onClick={() => setLogoForm(true)}
                  >
                    Edit
                  </Button>
                </Pane>
                <Pane padding={12} marginTop={12} borderRadius={4}>
                  <Pane className='d-flex justify-content-center align-items-center'>
                    <Image
                      alt='logo'
                      src='https://picsum.photos/200'
                      layout='intrinsic'
                      width={700}
                      height={475}
                    />
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
                <Paragraph marginTop={12}>
                  Imam
                  <br />
                  Telp. : 082335967247
                  <br />
                  Email : moharifhidayat7@gmail.com
                </Paragraph>
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
                    {a.map((item, index) => {
                      return (
                        <Pane
                          key={index}
                          height={150}
                          borderRadius={4}
                          className='d-inline-block me-1 col-6 col-lg-3 col-sm-3 col-xg-2'
                          style={{
                            backgroundImage: `url('https://picsum.photos/200')`,
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
                <Pane className='col-sm-12 col-md-12'>
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
                      <Iframe height={350}></Iframe>
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
                        {a.map((item, index) => {
                          return (
                            <Pane
                              key={index}
                              width={170}
                              height={150}
                              borderRadius={4}
                              style={{
                                backgroundImage: `url('https://picsum.photos/200')`,
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
