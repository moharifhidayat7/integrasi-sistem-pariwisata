import { useState, useEffect } from 'react'
import Layout from '@components/Layouts/Admin'
import Content from '@components/Content'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import { clientAxios } from '@helpers/functions'
import axios from 'axios'
import {
  Pane,
  Card,
  TextInputField,
  Button,
  Select,
  Checkbox,
  FormField,
} from 'evergreen-ui'
const Tambah = () => {
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors },
  } = useForm({ defaultValues: { role: 2 } })
  const [roles, setRoles] = useState([])
  const router = useRouter()
  const [checked, setChecked] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  clientAxios.interceptors.request.use(
    function (config) {
      setIsLoading(true)
      return config
    },
    function (error) {
      return Promise.reject(error)
    }
  )

  const onSubmit = (data) => {
    clientAxios
      .post('/users', {
        ...data,
        username: data.email,
      })
      .then(function (response) {
        const path = router.pathname.split('/').slice(0, -1)
        router.push(path.join('/'))
      })
      .catch(function (error) {
        setError('email', { type: 'focus', message: 'Email Sudah Digunakan' })
        setIsLoading(false)
      })
  }
  useEffect(() => {
    const getRoles = async () => {
      await axios
        .get(process.env.NEXT_PUBLIC_API_URI + '/users-permissions/roles')
        .then((res) => {
          setRoles(res.data.roles.filter((role) => role.id != 2))
        })
    }
    getRoles()
  }, [])

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
                    isInvalid={errors.password ? true : false}
                    validationMessage={
                      errors.password && errors.password.message
                    }
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
