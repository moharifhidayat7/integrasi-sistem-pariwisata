import { useState, useRef, useEffect, useCallback } from 'react'
import Layout from '../../../components/Layouts/Admin'
import Content from '../../../components/Content'
import CardWisata from '../../../components/Cards/Wisata'
import StepWizard from 'react-step-wizard'
import HorizontalScroll from 'react-scroll-horizontal'

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
  AddIcon,
  FormField,
  UploadIcon,
  FilePicker,
  SmallCrossIcon,
  IconButton,
} from 'evergreen-ui'
import { useDropzone } from 'react-dropzone'

import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu'

const Tambah = () => {
  const [value, setValue] = useState(0)
  const [showDelete, setShowDelete] = useState(false)

  return (
    <Layout>
      <Content>
        <Content.Header title='Tambah Wisata' />
        <Content.Body>
          <Pane className='d-flex justify-content-center'>
            <Pane className='col-6' position='relative'>
              <Card
                elevation={1}
                backgroundColor='white'
                width='100%'
                padding={20}
              >
                <Pane
                  className='d-flex justify-content-center align-items-center'
                  marginBottom={25}
                >
                  <Pane
                    width={150}
                    paddingY={16}
                    backgroundColor='#52BD94'
                    borderRadius={5}
                    borderColor='#c1c4d6'
                    textAlign='center'
                  >
                    <ManuallyEnteredDataIcon color='#F9FAFC' size={30} />
                    <Heading color='#F9FAFC'>Detail</Heading>
                  </Pane>
                  <Pane paddingX={20} paddingY={16}>
                    <ArrowRightIcon color='#696f8c' size={40} />
                  </Pane>
                  <Pane
                    width={150}
                    paddingY={16}
                    backgroundColor='#EDEFF5'
                    borderRadius={5}
                    borderColor='#c1c4d6'
                    textAlign='center'
                  >
                    <MediaIcon color='#696f8c' size={30} />
                    <Heading color='#696f8c'>Media</Heading>
                  </Pane>
                  <Pane paddingX={20} paddingY={16}>
                    <ArrowRightIcon color='#696f8c' size={40} />
                  </Pane>
                  <Pane
                    width={150}
                    paddingY={16}
                    backgroundColor='#EDEFF5'
                    borderRadius={5}
                    borderColor='#c1c4d6'
                    textAlign='center'
                  >
                    <UserIcon color='#696f8c' size={30} />
                    <Heading color='#696f8c'>Pengelola</Heading>
                  </Pane>
                </Pane>
                <Media />
                {/* <StepWizard></StepWizard> */}
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
  step,
}) => (
  <Pane display='flex' justifyContent='between'>
    <Button appearance='primary'>Selanjutnya</Button>
  </Pane>
)

const Detail = (props) => {
  return (
    <Pane className='d-flex flex-column'>
      <TextInputField
        label='Nama Tempat Wisata'
        placeholder='Nama Tempat Wisata'
      />
      <TextInputField
        label='Alamat Tempat Wisata'
        placeholder='Alamat Tempat Wisata'
      />
      <TextareaField
        label='Deskripsi'
        placeholder='Deskripsi singkat Tempat Wisata'
      />
      <Pane display='flex' justifyContent='between'>
        <Button appearance='primary'>Selanjutnya</Button>
      </Pane>
      <Stats step={1} {...props} />
    </Pane>
  )
}

const Media = (props) => {
  const [files, setFiles] = useState([])

  const { getRootProps, getInputProps, open, isDragActive } = useDropzone({
    accept: 'image/*',
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      )
    },
  })

  const removeFile = (index) => {
    const newFiles = files.filter((e, i) => i != index)
    setFiles(newFiles)
  }

  useEffect(() => {
    files.forEach((file) => URL.revokeObjectURL(file.preview))
  }, [files])

  return (
    <Pane>
      <TextInputField
        label='Link Youtube Video Profil'
        placeholder='Link Youtube Video Profil'
        id='youtube'
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
            <FilePicker
              multiple
              width={250}
              placeholder='Select the file here!'
              hidden
              {...getInputProps()}
            />

            <Button
              marginRight={8}
              iconBefore={AddIcon}
              onClick={(e) => {
                e.stopPropagation()
                open()
              }}
            >
              Tambah
            </Button>

            <Button
              appearance='primary'
              marginRight={8}
              iconBefore={UploadIcon}
              onClick={(e) => e.stopPropagation()}
            >
              Upload
            </Button>
          </Pane>
          <Pane>
            {files.length > 0 ? (
              <Pane
                className='d-flex flex-wrap g-2'
                height={300}
                overflowY='auto'
                onClick={(e) => e.stopPropagation()}
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
            ) : // <Pane overflowX='auto'>
            //   <Pane className='g-2'>{Preview}</Pane>
            // </Pane>
            isDragActive ? (
              <Text>Drop the files here ...</Text>
            ) : (
              <Text>Drag n drop some files here, or click to select files</Text>
            )}
          </Pane>
        </Card>
      </FormField>
      <Stats step={2} {...props} />
    </Pane>
  )
}

const Pengelola = () => {
  return <Pane className='d-flex flex-column'></Pane>
}
