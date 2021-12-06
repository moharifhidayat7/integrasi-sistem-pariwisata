import { useForm } from 'react-hook-form'
import {
  Pane,
  Card,
  TextInputField,
  Button,
  Heading,
  toaster,
} from 'evergreen-ui'
import Content from '@components/Content'
import Layout from '@components/Layouts/Pengelola'
import ContentWrapper from '@components/Wrapper/ContentWrapper'
import { signIn, signOut, useSession, getSession } from 'next-auth/react'
import { useRef, useState } from 'react'
import { clientAxios } from '@helpers/functions'
const GantiPassword = () => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    setError,
    formState: { errors },
  } = useForm()
  const [isLoading, setIsLoading] = useState(false)
  const currentPassword = useRef({})
  currentPassword.current = watch('newPassword', '')
  const { data: session, status } = useSession()

  const toastMessage = () => {
    toaster.success('Data Berhasil di Edit', {
      duration: 4,
    })
  }
  const errorMessage = () => {
    toaster.danger('Password Lama Salah', {
      duration: 4,
    })
  }

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
      .post('/profiles/change-password', data, {
        headers: {
          Authorization: `Bearer ${session.jwt}`,
        },
      })
      .then(function (response) {
        setIsLoading(false)
        toastMessage()
        reset()
        signOut({ callbackUrl: '/' })
      })
      .catch(function (error) {
        setIsLoading(false)
        errorMessage()
        setError('currentPassword', 'Password Salah')
      })
  }

  return (
    <Layout title='Ganti Password'>
      <ContentWrapper>
        <Content>
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
                  marginTop={60}
                >
                  <Pane paddingY={12} textAlign='center'>
                    <Heading is='h1'>Ganti Password</Heading>
                  </Pane>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <Pane>
                      <TextInputField
                        isInvalid={errors.currentPassword ? true : false}
                        validationMessage={
                          errors.currentPassword &&
                          errors.currentPassword.message
                        }
                        type='password'
                        label='Password Lama *'
                        placeholder='Password Lama'
                        id='currentPassword'
                        {...register('currentPassword', {
                          required: 'Harus di isi!',
                        })}
                      />
                      <TextInputField
                        isInvalid={errors.newPassword ? true : false}
                        validationMessage={
                          errors.newPassword && errors.newPassword.message
                        }
                        type='password'
                        label='Password Baru *'
                        placeholder='Password Baru'
                        id='newPassword'
                        {...register('newPassword', {
                          required: 'Harus di isi!',
                          minLength: {
                            value: 8,
                            message: 'Password minimal 8 karakter',
                          },
                        })}
                      />
                      <TextInputField
                        isInvalid={errors.confirmNewPassword ? true : false}
                        validationMessage={
                          errors.confirmNewPassword &&
                          errors.confirmNewPassword.message
                        }
                        type='password'
                        label='Konfirmasi Password Baru *'
                        placeholder='Konfirmasi Password Baru'
                        id='confirmNewPassword'
                        {...register('confirmNewPassword', {
                          required: 'Harus di isi!',
                          validate: (value) =>
                            value === currentPassword.current ||
                            'Password tidak sesuai',
                        })}
                      />
                      <Pane className='d-flex justify-content-end'>
                        <Button appearance='primary'>Submit</Button>
                      </Pane>
                    </Pane>
                  </form>
                </Card>
              </Pane>
            </Pane>
          </Content.Body>
        </Content>
      </ContentWrapper>
    </Layout>
  )
}

export default GantiPassword
