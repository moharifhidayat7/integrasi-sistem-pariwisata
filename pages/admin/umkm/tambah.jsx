import { useState, useRef, useEffect, useCallback } from 'react'
import Layout from '../../../components/Layouts/Admin'
import Content from '../../../components/Content'
import StepWizard from 'react-step-wizard'
import { useForm } from 'react-hook-form'

import _ from 'lodash'

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
  Small,
  AddIcon,
  FormField,
  UploadIcon,
  SearchInput,
  FilePicker,
  Avatar,
  SmallCrossIcon,
  IconButton,
} from 'evergreen-ui'
import { useDropzone } from 'react-dropzone'

import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu'
import StepNav from '@components/StepNav'

const Tambah = () => {
  const [activeStep, setActiveStep] = useState(1)
  const [checked, setChecked] = useState(false)

  const [postData, setPostData] = useState([])

  return (
    <Layout>
      <Content>
        <Content.Header title='Tambah UMKM' />
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
                  <Media postData={postData} setPostData={setPostData} />
                  {!checked ? (
                    <Pengelola postData={postData} setPostData={setPostData} />
                  ) : (
                    <PengelolaTerdaftar
                      postData={postData}
                      setPostData={setPostData}
                    />
                  )}
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

const Stats = ({
  currentStep,
  firstStep,
  goToStep,
  lastStep,
  nextStep,
  previousStep,
  totalSteps,
  errors,
  handleSubmit,
  postData,
  setPostData,
}) => {
  const onSubmit = (data) => {
    setPostData({ ...postData, [currentStep]: data })
    nextStep()
  }

  const finalSubmit = (data) => {
    console.log({ ...postData, 3: data })
  }
  return (
    <Pane className='d-flex justify-content-between'>
      <Pane>
        {currentStep > 1 && (
          <Button
            onClick={(e) => {
              e.preventDefault()
              previousStep()
            }}
          >
            Kembali
          </Button>
        )}
      </Pane>
      <Pane>
        {currentStep == 2 && (
          <Button appearance='minimal' onClick={nextStep}>
            Lewati
          </Button>
        )}

        {currentStep < totalSteps && (
          <Button
            appearance='primary'
            marginLeft={5}
            onClick={(e) => {
              e.preventDefault()
              handleSubmit(onSubmit)()
            }}
          >
            Selanjutnya
          </Button>
        )}
        {currentStep == totalSteps && (
          <Button
            appearance='primary'
            marginLeft={5}
            onClick={(e) => {
              e.preventDefault()
              handleSubmit(finalSubmit)()
            }}
          >
            Submit
          </Button>
        )}
      </Pane>
    </Pane>
  )
}

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
          label='Nama UMKM *'
          placeholder='Nama UMKM'
          id='objectName'
          {...register('objectName', { required: true })}
        />
        <TextInputField
          isInvalid={errors.objectAddress ? true : false}
          validationMessage={errors.objectAddress && 'Harus di isi!'}
          label='Alamat UMKM *'
          placeholder='Alamat UMKM'
          id='objectAddress'
          {...register('objectAddress', { required: true })}
        />
        <TextareaField
          label='Deskripsi'
          placeholder='Deskripsi singkat UMKM'
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
  const handleSubmit =
    (onSubmit) =>
    (data = { youtubeVideo }) => {
      onSubmit(data)
    }

  const [files, setFiles] = useState([])

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

  // useEffect(
  //   () => () => {
  //     files.forEach((file) => URL.revokeObjectURL(file.preview))
  //   },
  //   [files]
  // )

  return (
    <Pane>
      <TextInputField
        label='Link Youtube Video Profil'
        placeholder='Link Youtube Video Profil'
        id='youtubeVideo'
        onChange={(e) => setYoutubeVideo(e.target.value)}
      />
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

            <Button
              appearance='primary'
              marginRight={8}
              iconBefore={UploadIcon}
              onClick={() => console.log(files)}
            >
              Upload
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
        step={2}
        {...props}
        postData={props.postData}
        setPostData={props.setPostData}
        handleSubmit={handleSubmit}
      />
    </Pane>
  )
}

const Pengelola = (props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  return (
    <form>
      <Pane>
        <TextInputField
          isInvalid={errors.name ? true : false}
          validationMessage={errors.name && 'Harus di isi!'}
          label='Nama *'
          placeholder='Nama Pengelola'
          id='name'
          {...register('name', { required: true })}
        />
        <TextInputField
          label='Alamat'
          placeholder='Alamat Pengelola'
          id='address'
          {...register('address')}
        />
        <Pane className='row'>
          <Pane className='col-6'>
            <TextInputField
              isInvalid={errors.email ? true : false}
              validationMessage={errors.email && 'Harus di isi!'}
              label='Email *'
              placeholder='Email Pengelola'
              id='email'
              {...register('email', { required: true })}
            />
          </Pane>
          <Pane className='col-6'>
            <TextInputField
              isInvalid={errors.phone ? true : false}
              validationMessage={errors.phone && 'Harus di isi!'}
              label='Nomor Telepon *'
              placeholder='Nomor Telepon Pengelola'
              id='phone'
              {...register('phone', { required: true })}
            />
          </Pane>
        </Pane>
        <Stats
          step={3}
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

const PengelolaList = ({ pengelola, index, active, setActive }) => {
  const [bg, setBg] = useState('#EDEFF5')

  return (
    <Pane
      padding={12}
      onMouseEnter={() => setBg('#a3e6cd')}
      onMouseLeave={() => setBg('#EDEFF5')}
      onClick={() => setActive(index)}
      backgroundColor={active == index ? '#a3e6cd' : bg}
      borderRadius={4}
      cursor='pointer'
    >
      <Pane className='d-flex align-items-center'>
        <Avatar src={pengelola.picture} name={pengelola.name} size={40} />
        <Pane marginLeft={10}>
          <Pane marginBottom={-8}>
            <Strong>{pengelola.name}</Strong>
          </Pane>
          <Text size={300} color='#474D66'>
            {pengelola.email}
          </Text>
        </Pane>
      </Pane>
    </Pane>
  )
}

const PengelolaTerdaftar = (props) => {
  const [active, setActive] = useState(null)

  const handleSubmit = (onSubmit) => () => {
    console.log('submitted')
    console.log(youtubeVideo)
    onSubmit()
  }

  const pengelolas = [
    {
      name: 'Pokdarwis Gombengsari',
      email: 'tes',
      picture:
        'https://upload.wikimedia.org/wikipedia/commons/a/a1/Alan_Turing_Aged_16.jpg',
    },
    {
      name: 'Pokdarwis Gombengsari',
      email: 'tes',
      picture:
        'https://upload.wikimedia.org/wikipedia/commons/a/a1/Alan_Turing_Aged_16.jpg',
    },
    {
      name: 'Pokdarwis Gombengsari',
      email: 'tes',
      picture:
        'https://upload.wikimedia.org/wikipedia/commons/a/a1/Alan_Turing_Aged_16.jpg',
    },
    {
      name: 'Pokdarwis Gombengsari',
      email: 'tes',
      picture:
        'https://upload.wikimedia.org/wikipedia/commons/a/a1/Alan_Turing_Aged_16.jpg',
    },
    {
      name: 'Pokdarwis Gombengsari',
      email: 'tes',
      picture:
        'https://upload.wikimedia.org/wikipedia/commons/a/a1/Alan_Turing_Aged_16.jpg',
    },
    {
      name: 'Pokdarwis Gombengsari',
      email: 'tes',
      picture:
        'https://upload.wikimedia.org/wikipedia/commons/a/a1/Alan_Turing_Aged_16.jpg',
    },
    {
      name: 'Pokdarwis Gombengsari',
      email: 'tes',
      picture:
        'https://upload.wikimedia.org/wikipedia/commons/a/a1/Alan_Turing_Aged_16.jpg',
    },
  ]

  return (
    <Pane>
      <FormField marginBottom={12}>
        <SearchInput placeholder='Cari Pengelola...' width='100%' />
      </FormField>
      <Pane
        className='d-flex flex-column gap-1'
        maxHeight={300}
        overflowY='auto'
        marginBottom={20}
      >
        {pengelolas.map((pengelola, index) => {
          return (
            <PengelolaList
              key={index}
              pengelola={pengelola}
              index={index}
              active={active}
              setActive={setActive}
            />
          )
        })}
      </Pane>

      <Stats
        step={3}
        {...props}
        postData={props.postData}
        setPostData={props.setPostData}
        handleSubmit={handleSubmit}
      />
    </Pane>
  )
}

const Review = (props) => {
  return (
    <Pane>
      <Pane>
        <Strong>Detail UMKM</Strong>
        <Pane>
          <Text>Nama : tes</Text>
        </Pane>
        <Pane>
          <Text>Alamat : tes</Text>
        </Pane>
        <Pane>
          <Text>Deskripsi : tes</Text>
        </Pane>
      </Pane>
      <Pane>
        <Strong>Media</Strong>
        <Pane>
          <Text>Video : tes</Text>
        </Pane>
        <Pane>
          <Text>Foto : tes</Text>
        </Pane>
      </Pane>
      <Pane>
        <Strong>Pengelola</Strong>
        <Pane>
          <Text>Nama : tes</Text>
        </Pane>
        <Pane>
          <Text>Alamat : tes</Text>
        </Pane>
        <Pane>
          <Text>Email : tes</Text>
        </Pane>
        <Pane>
          <Text>No. Telepon : tes</Text>
        </Pane>
      </Pane>
    </Pane>
  )
}
