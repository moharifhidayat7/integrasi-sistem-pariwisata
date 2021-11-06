import { useForm } from 'react-hook-form'
import { Pane, Card, TextInputField, Button, Heading } from 'evergreen-ui'
import Content from '@components/Content'
import Layout from '@components/Layouts/Admin'
import ContentWrapper from '@components/Wrapper/ContentWrapper'
const GantiPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = (data) => {
    alert(data)
  }

  return (
    <Layout>
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
                        isInvalid={errors.oldPassword ? true : false}
                        validationMessage={
                          errors.oldPassword && 'Harus di isi!'
                        }
                        type='password'
                        label='Password Lama *'
                        placeholder='Password Lama'
                        id='oldPassword'
                        {...register('oldPassword', { required: true })}
                      />
                      <TextInputField
                        isInvalid={errors.newPassword ? true : false}
                        validationMessage={
                          errors.newPassword && 'Harus di isi!'
                        }
                        type='password'
                        label='Password Baru *'
                        placeholder='Password Baru'
                        id='newPassword'
                        {...register('newPassword', { required: true })}
                      />
                      <TextInputField
                        isInvalid={errors.newPassword2 ? true : false}
                        validationMessage={
                          errors.newPassword2 && 'Harus di isi!'
                        }
                        type='password'
                        label='Konfirmasi Password Baru *'
                        placeholder='Konfirmasi Password Baru'
                        id='newPassword2'
                        {...register('newPassword2', { required: true })}
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
