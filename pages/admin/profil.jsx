import { useForm } from 'react-hook-form'
import { Pane, Card, TextInputField, Button, Heading } from 'evergreen-ui'
import Content from '@components/Content'
import Layout from '@components/Layouts/Admin'
import ContentWrapper from '@components/Wrapper/ContentWrapper'
const Profil = () => {
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
                    <Heading is='h1'>Edit Profil</Heading>
                  </Pane>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <Pane>
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
                            validationMessage={errors.email && 'Harus di isi!'}
                            label='Email *'
                            placeholder='Email'
                            id='email'
                            {...register('email', { required: true })}
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

export default Profil
