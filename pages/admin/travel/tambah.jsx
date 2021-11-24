import { useState, useRef, useEffect, useCallback } from 'react'
import Layout from '../../../components/Layouts/Admin'
import Content from '../../../components/Content'
import CardWisata from '../../../components/Cards/Wisata'
import StepWizard from 'react-step-wizard'
import HorizontalScroll from 'react-scroll-horizontal'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import _ from 'lodash'
import { clientAxios, YouTubeGetID } from '@helpers/functions'
import {
  Dialog,
  Pane,
  Text,
  Card,
  ManuallyEnteredDataIcon,
  MediaIcon,
  UserIcon,
  ArrowRightIcon,
  Heading,
  TextInputField,
  TextareaField,
  Button,
  Strong,
  Select,
  Small,
  ResetIcon,
  AddIcon,
  FormField,
  UploadIcon,
  SearchInput,
  Spinner,
  FilePicker,
  Avatar,
  SmallCrossIcon,
  IconButton,
} from 'evergreen-ui'
import { useDropzone } from 'react-dropzone'
import StepNav from '@components/StepNav'
import Sukses from '@components/Dialogs/Sukses'
import PengelolaTerdaftar from '@components/Forms/PengelolaTerdaftar'
import Stats from '@components/Stats'
import Kontak from '@components/Forms/Kontak'
import { signIn, signOut, useSession, getSession } from 'next-auth/react'
const Tambah = () => {
  const [activeStep, setActiveStep] = useState(1)
  const [checked, setChecked] = useState(false)
  const [success, setSuccess] = useState(false)
  const [successData, setSuccessData] = useState([])
  const [postData, setPostData] = useState([])
  const { data: session, status } = useSession()
  return (
    <Layout title='Tambah Travel'>
      <Sukses isShown={success} setIsShown={setSuccess} data={successData} />
      <Content>
        <Content.Header title='Tambah Travel' />
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
                overflow='hidden'
              >
                <StepNav
                  activeStep={activeStep}
                  checked={checked}
                  setChecked={setChecked}
                />
                <StepWizard onStepChange={(e) => setActiveStep(e.activeStep)}>
                  <Detail postData={postData} setPostData={setPostData} />
                  <Kontak postData={postData} setPostData={setPostData} />
                  <Media postData={postData} setPostData={setPostData} />

                  <PengelolaTerdaftar
                    postData={postData}
                    setPostData={setPostData}
                    setSuccess={setSuccess}
                  />
                </StepWizard>
              </Card>
            </Pane>
          </Pane>
        </Content.Body>
      </Content>
    </Layout>
  )
}

export default Tambah

const Detail = (props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  return (
    <form>
      <Pane className='d-flex flex-column'>
        <TextInputField
          isInvalid={errors.objectName ? true : false}
          validationMessage={errors.objectName && 'Harus di isi!'}
          label='Nama Travel *'
          placeholder='Nama Travel'
          id='objectName'
          {...register('objectName', { required: true })}
        />
        <input
          type='text'
          defaultValue='Travel'
          {...register('type', { required: true })}
          hidden
        />
        <TextInputField
          isInvalid={errors.objectAddress ? true : false}
          validationMessage={errors.objectAddress && 'Harus di isi!'}
          label='Alamat Travel *'
          placeholder='Alamat Travel'
          id='objectAddress'
          {...register('objectAddress', { required: true })}
        />
        <TextareaField
          label='Deskripsi'
          placeholder='Deskripsi Travel'
          id='description'
          {...register('description')}
        />

        <Stats
          step={1}
          {...props}
          postData={props.postData}
          setPostData={props.setPostData}
          errors={errors}
          handleSubmit={handleSubmit}
        />
      </Pane>
    </form>
  )
}

const Media = (props) => {
  const [youtubeVideo, setYoutubeVideo] = useState('')
  const [notYoutube, setNotYoutube] = useState(false)
  const [featuredImage, setFeaturedImage] = useState()

  const [files, setFiles] = useState([])

  const handleLink = (e) => {
    if (e.target.value != '' && YouTubeGetID(e.target.value) == '') {
      setNotYoutube(true)
    } else {
      setNotYoutube(false)
    }
    setYoutubeVideo(e.target.value)
  }

  const imageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setFeaturedImage(e.target.files[0])
    }
  }
  const resetImage = (e) => {
    e.stopPropagation()
    setFeaturedImage()
  }

  const handleSubmit =
    (onSubmit) =>
    (data = { youtubeVideo }) => {
      if (data.youtubeVideo != '' && YouTubeGetID(data.youtubeVideo) == '') {
        setNotYoutube(true)
      } else {
        setNotYoutube(false)
        onSubmit({ ...data, files, featuredImage })
      }
    }

  const { getRootProps, getInputProps, open, isDragActive } = useDropzone({
    accept: 'image/*',
    noClick: true,
    onDrop: (acceptedFiles) => {
      const allFiles = [
        ...acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        ),
        ...files,
      ]
      setFiles(_.uniqBy(allFiles, 'path'))
    },
  })

  const removeFile = (index) => {
    const newFiles = files.filter((e, i) => i != index)
    setFiles(newFiles)
  }

  useEffect(
    () => () => {
      files.forEach((file) => URL.revokeObjectURL(file.preview))
    },
    [files]
  )

  return (
    <Pane>
      <TextInputField
        isInvalid={notYoutube}
        validationMessage={notYoutube && 'Bukan link youtube!'}
        label='Link Youtube Video Profil'
        placeholder='https://www.youtube.com/watch?v=xxxxxxxxx'
        id='youtubeVideo'
        onChange={handleLink}
      />
      <FormField label='Logo' marginBottom={24}>
        <input
          id='logo'
          type='file'
          accept='image/*'
          onChange={imageChange}
          hidden
        />
        <Pane position='relative'>
          <label htmlFor='logo' style={{ width: '100%' }}>
            <Card
              background={
                featuredImage
                  ? `url(${URL.createObjectURL(
                      featuredImage
                    )}) no-repeat center / contain`
                  : '#E6E8F0'
              }
              borderColor={isDragActive ? '#3366FF' : '#d8dae5'}
              border='default'
              padding={12}
              height={featuredImage ? 200 : 'auto'}
              className='d-flex justify-content-center align-items-center'
            >
              {featuredImage ? '' : <Text>Pilih Logo</Text>}
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
      <FormField label='Foto' marginBottom={24}>
        <Card
          background='#E6E8F0'
          borderColor={isDragActive ? '#3366FF' : '#d8dae5'}
          border='default'
          padding={12}
          {...getRootProps({ className: 'dropzone' })}
        >
          <Pane marginBottom={12}>
            <input multiple {...getInputProps()} hidden />

            <Button marginRight={8} iconBefore={AddIcon} onClick={open}>
              Tambah
            </Button>

            <Button iconBefore={ResetIcon} onClick={() => setFiles([])}>
              Reset
            </Button>
          </Pane>
          <Pane>
            {files.length > 0 ? (
              <Pane
                className='d-flex flex-wrap g-2'
                maxHeight={300}
                overflowY='auto'
              >
                {files.map((file, index) => (
                  <Pane key={file.name} padding={3} borderRadius={4}>
                    <Pane
                      width={120}
                      height={100}
                      borderRadius={4}
                      style={{
                        backgroundImage: `url('${file.preview}')`,
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
                        onClick={() => removeFile(index)}
                      />
                    </Pane>
                  </Pane>
                ))}
              </Pane>
            ) : isDragActive ? (
              <Text>Drop the files here ...</Text>
            ) : (
              <Text>Drag n drop some files here, or click add files</Text>
            )}
          </Pane>
        </Card>
      </FormField>
      <Stats
        step={3}
        {...props}
        postData={props.postData}
        setPostData={props.setPostData}
        withSkip={true}
        handleSubmit={handleSubmit}
      />
    </Pane>
  )
}
