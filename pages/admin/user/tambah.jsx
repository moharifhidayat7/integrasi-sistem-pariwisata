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
  Checkbox,
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
const Tambah = () => {
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors },
  } = useForm()

  const router = useRouter()
  const [checked, setChecked] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

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

  const onSubmit = (data) => {
    clientAxios
      .post('/profiles', data)
      .then(function (response) {
        const path = router.pathname.split('/').slice(0, -1)
        router.push(path.join('/'))
      })
      .catch(function (error) {
        setError('email', { type: 'focus', message: 'Email Sudah Digunakan' })
        setIsLoading(false)
      })
  }

  return (
    <Layout>
      <Content>
        <Content.Header title='Tambah User' />
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
                <form onSubmit={handleSubmit(onSubmit)}>
                  <TextInputField
                    isInvalid={errors.name ? true : false}
                    validationMessage={errors.name && 'Harus di isi!'}
                    label='Nama *'
                    placeholder='Nama'
                    id='name'
                    {...register('name', { required: true })}
                  />
                  <TextInputField
                    label='Alamat'
                    placeholder='Alamat'
                    id='address'
                    {...register('address')}
                  />
                  <Pane className='row'>
                    <Pane className='col-6'>
                      <TextInputField
                        isInvalid={errors.email ? true : false}
                        validationMessage={errors.email && errors.email.message}
                        label='Email *'
                        placeholder='Email'
                        type='email'
                        id='email'
                        {...register('email', {
                          required: true,
                          message: 'Harus di isi!',
                        })}
                      />
                    </Pane>
                    <Pane className='col-6'>
                      <TextInputField
                        isInvalid={errors.phone ? true : false}
                        validationMessage={errors.phone && 'Harus di isi!'}
                        label='Nomor Telepon *'
                        placeholder='Nomor Telepon'
                        id='phone'
                        {...register('phone', { required: true })}
                      />
                    </Pane>
                  </Pane>
                  <Checkbox
                    label='Acak Kata sandi'
                    checked={checked}
                    onChange={(e) => {
                      setChecked(e.target.checked)
                      if (e.target.checked) {
                        setValue(
                          'password',
                          Math.random()
                            .toString(36)
                            .substring(2, 10)
                            .toUpperCase()
                        )
                      } else {
                        setValue('password')
                      }
                    }}
                  />
                  <TextInputField
                    label='Kata sandi *'
                    placeholder='Kata sandi'
                    id='password'
                    {...register('password', {
                      required: true,
                      message: 'Harus di Isi!',
                    })}
                  />

                  <Pane className='d-flex justify-content-end'>
                    <Button
                      appearance='primary'
                      marginLeft={5}
                      type='submit'
                      isLoading={isLoading}
                    >
                      Submit
                    </Button>
                  </Pane>
                </form>
              </Card>
            </Pane>
          </Pane>
        </Content.Body>
      </Content>
    </Layout>
  )
}

export default Tambah
