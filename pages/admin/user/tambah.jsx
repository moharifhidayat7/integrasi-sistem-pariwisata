import { useState, useRef, useEffect, useCallback } from 'react'
import Layout from '../../../components/Layouts/Admin'
import Content from '../../../components/Content'
import CardWisata from '../../../components/Cards/Wisata'
import StepWizard from 'react-step-wizard'
import HorizontalScroll from 'react-scroll-horizontal'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import { signIn, signOut, useSession, getSession } from 'next-auth/client'
import _ from 'lodash'
import { clientAxios, YouTubeGetID } from '@helpers/functions'
import axios from 'axios'
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
  SelectField,
} from 'evergreen-ui'
const Tambah = ({ roles, session }) => {
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
      .post('/profiles/create-user', data, {
        headers: {
          Authorization: `Bearer ${session.jwt}`,
        },
      })
      .then(function (response) {
        const path = router.pathname.split('/').slice(0, -1)
        router.push(path.join('/'))
      })
      .catch(function (error) {
        setError('email', { type: 'focus', message: 'Email Sudah Digunakan' })
        setIsLoading(false)
        console.log(error)
      })
  }

  return (
    <Layout title='Tambah User'>
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
                    validationMessage={errors.name && errors.name.message}
                    label='Nama *'
                    placeholder='Nama'
                    id='name'
                    {...register('name', { required: 'Harus di isi!' })}
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
                          required: 'Harus di isi!',
                        })}
                      />
                    </Pane>
                    <Pane className='col-6'>
                      <TextInputField
                        isInvalid={errors.phone ? true : false}
                        validationMessage={errors.phone && errors.phone.message}
                        label='Nomor Telepon *'
                        placeholder='Nomor Telepon'
                        id='phone'
                        {...register('phone', { required: 'Harus di isi!' })}
                      />
                    </Pane>
                  </Pane>
                  <FormField
                    label='Hak Akses'
                    labelFor='role'
                    validationMessage={errors.role && errors.role.message}
                  >
                    <Select
                      isInvalid={errors.role ? true : false}
                      {...register('role', { required: 'Harus di Isi!' })}
                      id='role'
                      width='100%'
                    >
                      {roles.map((role) => (
                        <option value={role.id} key={role.id}>
                          {role.name}
                        </option>
                      ))}
                    </Select>
                  </FormField>
                  <Checkbox
                    label='Acak Kata sandi'
                    checked={checked}
                    id='randompassword'
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
                      required: 'Harus di Isi!',
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
  const { data } = await axios.get(
    `${process.env.API_URI}/users-permissions/roles`,
    {
      headers: {
        Authorization: `Bearer ${session.jwt}`,
      },
    }
  )

  return {
    props: {
      session,
      roles: data.roles.filter((role) => role.id != 2),
    },
  }
}
