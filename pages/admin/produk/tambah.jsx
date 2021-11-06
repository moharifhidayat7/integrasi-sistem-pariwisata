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
  PlusIcon,
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
  Table,
  SearchInput,
  FilePicker,
  Avatar,
  SmallCrossIcon,
  IconButton,
} from 'evergreen-ui'
import { useDropzone } from 'react-dropzone'
import StepNav from '@components/StepNav'
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu'
import Image from 'next/image'

const Tambah = () => {
  const [activeStep, setActiveStep] = useState(1)
  const [checked, setChecked] = useState(false)

  const [postData, setPostData] = useState([])

  const featuredImageRef = useRef(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  return (
    <Layout>
      <Content>
        <Content.Header title='Tambah Produk' />
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
                <FormField label='Foto' marginBottom={24}>
                  <Pane overflowX='auto' whiteSpace='nowrap' paddingBottom='5'>
                    <Pane
                      className='d-inline-block'
                      marginRight={5}
                      verticalAlign='top'
                    >
                      <Pane
                        borderStyle='dashed'
                        border={2}
                        borderColor='#E6E8F0'
                        padding={5}
                        width={150}
                        height={180}
                        className='d-flex justify-content-center align-items-center'
                        textAlign='center'
                        cursor='pointer'
                        onClick={() => featuredImageRef.current.click()}
                      >
                        <input
                          type='file'
                          accept='image/*'
                          ref={featuredImageRef}
                          hidden
                        />
                        <Text color='muted'>Foto Utama</Text>
                      </Pane>
                    </Pane>
                    <Pane className='d-inline-block' marginRight={5}>
                      <Pane
                        borderStyle='dashed'
                        border={2}
                        borderColor='#E6E8F0'
                        padding={5}
                        width={150}
                        height={180}
                        className='d-flex justify-content-center align-items-center'
                        textAlign='center'
                      >
                        <PlusIcon color='muted' size={40} />
                      </Pane>
                    </Pane>
                    <Pane className='d-inline-block' marginRight={5}>
                      <Pane
                        borderStyle='dashed'
                        border={2}
                        borderColor='#E6E8F0'
                        padding={5}
                        width={150}
                        height={180}
                        className='d-flex justify-content-center align-items-center'
                        textAlign='center'
                      >
                        <PlusIcon color='muted' size={40} />
                      </Pane>
                    </Pane>
                    <Pane className='d-inline-block' marginRight={5}>
                      <Pane
                        borderStyle='dashed'
                        border={2}
                        borderColor='#E6E8F0'
                        padding={5}
                        width={150}
                        height={180}
                        className='d-flex justify-content-center align-items-center'
                        textAlign='center'
                      >
                        <PlusIcon color='muted' size={40} />
                      </Pane>
                    </Pane>
                    <Pane className='d-inline-block' marginRight={5}>
                      <Pane
                        borderStyle='dashed'
                        border={2}
                        borderColor='#E6E8F0'
                        padding={5}
                        width={150}
                        height={180}
                        className='d-flex justify-content-center align-items-center'
                        textAlign='center'
                      >
                        <PlusIcon color='muted' size={40} />
                      </Pane>
                    </Pane>
                    <Pane className='d-inline-block' marginRight={5}>
                      <Pane
                        borderStyle='dashed'
                        border={2}
                        borderColor='#E6E8F0'
                        padding={5}
                        width={150}
                        height={180}
                        className='d-flex justify-content-center align-items-center'
                        textAlign='center'
                      >
                        <PlusIcon color='muted' size={40} />
                      </Pane>
                    </Pane>
                  </Pane>
                </FormField>
                <TextInputField
                  isInvalid={errors.productName ? true : false}
                  validationMessage={errors.productName && 'Harus di isi!'}
                  label='Nama Produk *'
                  placeholder='Nama Produk'
                  id='productName'
                  {...register('productName', { required: true })}
                />
                <TextareaField
                  label='Deskripsi'
                  placeholder='Deskripsi Produk'
                  id='description'
                  {...register('description')}
                />
                <FormField label='Harga' marginBottom={24}>
                  <Table.Body>
                    <Table.Head>
                      <Table.TextCell>Variasi</Table.TextCell>
                      <Table.TextCell>Harga</Table.TextCell>
                    </Table.Head>
                    <Table.Body>
                      <Table.Row>
                        <Table.TextCell>1 KG</Table.TextCell>
                        <Table.TextCell>2000000</Table.TextCell>
                      </Table.Row>

                      <Table.Row>
                        <Table.TextCell textAlign='center'>
                          <Button iconBefore={PlusIcon}>Tambah Variasi</Button>
                        </Table.TextCell>
                      </Table.Row>
                    </Table.Body>
                  </Table.Body>
                </FormField>
                <Pane textAlign='right'>
                  <Button appearance='primary' marginLeft={5}>
                    Submit
                  </Button>
                </Pane>
              </Card>
            </Pane>
          </Pane>
        </Content.Body>
      </Content>
    </Layout>
  )
}

export default Tambah
