import {
  Pane,
  Dialog,
  Button,
  TextInputField,
  TextareaField,
} from 'evergreen-ui'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { clientAxios } from '@helpers/functions'
import { signIn, signOut, useSession, getSession } from 'next-auth/client'

function UserForm({
  isShown,
  setIsShown,
  data = [],
  mutate,
  toastMessage = () => {},
}) {
  const {
    register,
    handleSubmit,
    setError,
    setValue,
    formState: { errors },
  } = useForm()
  const [session, loading] = useSession()

  const onSubmit = (postData) => {
    clientAxios
      .put('/users/' + data.id, postData, {
        headers: {
          Authorization: `Bearer ${session.jwt}`,
        },
      })
      .then(function (response) {
        setIsShown(false)
        toastMessage()
        mutate()
      })
      .catch(function (error) {
        setError('email', { type: 'focus', message: 'Email sudah digunakan' })
      })
  }
  useEffect(() => {
    const setForm = () => {
      if (data) {
        setValue('name', data.name)
        setValue('address', data.address)
        setValue('email', data.email)
        setValue('phone', data.phone)
      }
    }
    setForm()
  }, [isShown])

  return (
    <Pane>
      <Dialog
        isShown={isShown}
        title='Edit Kontak'
        overlayProps={{ zIndex: 2500 }}
        onCloseComplete={() => setIsShown(false)}
        confirmLabel='Update'
        onConfirm={handleSubmit(onSubmit)}
      >
        <form>
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
                  validationMessage={errors.email && errors.email.message}
                  label='Email'
                  type='email'
                  placeholder='Email'
                  id='email'
                  {...register('email', {
                    required: 'Harus di Isi!',
                    validate: (value) =>
                      value.includes('@') || 'Masukkan email yang valid!',
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
                  {...register('phone')}
                />
              </Pane>
            </Pane>
          </Pane>
        </form>
      </Dialog>
    </Pane>
  )
}

export default UserForm