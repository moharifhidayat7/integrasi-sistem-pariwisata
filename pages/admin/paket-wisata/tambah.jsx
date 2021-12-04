import { useState } from 'react'
import Layout from '@components/Layouts/Admin'
import Content from '@components/Content'
import {
  Pane,
  TextInputField,
  TextInput,
  Card,
  FormField,
  Button,
} from 'evergreen-ui'
import Sukses from '@components/Dialogs/Sukses'
import { useForm } from 'react-hook-form'
import Draft from '@components/Draftjs'
import Head from 'next/head'
import Quill from '@components/Quill'
const Tambah = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const [richText, setRichText] = useState('')
  const [activeStep, setActiveStep] = useState(1)
  const [checked, setChecked] = useState(false)
  const [success, setSuccess] = useState(false)
  const [successData, setSuccessData] = useState([])
  const [postData, setPostData] = useState([])

  return (
    <Layout title='Tambah Paket Wisata'>
      <Head>
        <meta charSet='utf-8' />
      </Head>
      <Sukses isShown={success} setIsShown={setSuccess} data={successData} />
      <Content>
        <Content.Header title='Tambah Paket Wisata' />
        <Content.Body>
          <Pane className='d-flex justify-content-center'>
            <Pane className='col-12' position='relative'>
              <Card
                elevation={1}
                backgroundColor='white'
                padding={20}
                overflow='hidden'
              >
                <form>
                  <TextInputField
                    isInvalid={errors.name ? true : false}
                    validationMessage={errors.name && 'Harus di isi!'}
                    label='Nama Paket Wisata *'
                    placeholder='Nama Paket Wisata'
                    id='name'
                    {...register('name', { required: true })}
                  />
                  <Pane className='d-flex justify-content-start align-items-top gap-2'>
                    <TextInputField
                      isInvalid={errors.price ? true : false}
                      validationMessage={errors.price && 'Harus di isi!'}
                      label='Harga *'
                      width={150}
                      placeholder='Harga'
                      id='price'
                      {...register('price', { required: true })}
                    />
                    <FormField label='Durasi *'>
                      <Pane className='d-flex justify-content-start align-items-top gap-2'>
                        <TextInput
                          isInvalid={errors.day ? true : false}
                          width={80}
                          placeholder='Hari'
                          id='day'
                          {...register('day', { required: true })}
                        />
                        <TextInput
                          isInvalid={errors.night ? true : false}
                          width={80}
                          placeholder='Malam'
                          id='night'
                          {...register('night', { required: false })}
                        />
                      </Pane>
                    </FormField>
                  </Pane>

                  <FormField label='Detail' paddingBottom={'4rem'}>
                    <Quill valye={richText} setValue={setRichText} />
                  </FormField>

                  <Pane textAlign='right'>
                    <Button
                      appearance='primary'
                      type='submit'
                      marginLeft={5}
                      //   isLoading={isLoading}
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
