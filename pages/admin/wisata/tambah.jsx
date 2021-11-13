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
import Media from '@components/Forms/Media'
import Kontak from '@components/Forms/Kontak'
import { signIn, signOut, useSession, getSession } from 'next-auth/client'

const Tambah = ({ session }) => {
  const [activeStep, setActiveStep] = useState(1)
  const [checked, setChecked] = useState(false)
  const [success, setSuccess] = useState(false)
  const [successData, setSuccessData] = useState([])
  const [postData, setPostData] = useState([])

  return (
    <Layout title='Tambah Wisata'>
      <Sukses isShown={success} setIsShown={setSuccess} data={successData} />
      <Content>
        <Content.Header title='Tambah Wisata' />
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
          label='Nama Tempat Wisata *'
          placeholder='Nama Tempat Wisata'
          id='objectName'
          {...register('objectName', { required: true })}
        />
        <FormField label='Kategori' marginBottom={24}>
          <Select
            width='100%'
            defaultValue='Wisata Alam'
            {...register('type', { required: true })}
          >
            <option value='Wisata Alam'>Wisata Alam</option>
            <option value='Wisata Edukasi'>Wisata Edukasi</option>
            <option value='Wisata Lainnya'>Lainnya</option>
          </Select>
        </FormField>
        <TextInputField
          isInvalid={errors.objectAddress ? true : false}
          validationMessage={errors.objectAddress && 'Harus di isi!'}
          label='Alamat Tempat Wisata *'
          placeholder='Alamat Tempat Wisata'
          id='objectAddress'
          {...register('objectAddress', { required: true })}
        />
        <TextareaField
          label='Deskripsi'
          placeholder='Deskripsi Tempat Wisata'
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
  return {
    props: { session },
  }
}
