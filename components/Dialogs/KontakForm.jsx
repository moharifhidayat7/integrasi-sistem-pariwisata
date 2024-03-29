import {
  Pane,
  Dialog,
  Button,
  TextInputField,
  TextareaField,
} from 'evergreen-ui'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { clientAxios, isValidEmail } from '@helpers/functions'
import { useSession } from 'next-auth/react'

function KontakForm({
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
  const { data: session, status } = useSession()
  const onSubmit = (postData) =>
    clientAxios
      .put(
        '/objects/' + data.id,
        {
          contact: postData,
        },
        {
          headers: {
            Authorization: `Bearer ${session.jwt}`,
          },
        }
      )
      .then(function (response) {
        setIsShown(false)
        toastMessage()
        mutate()
      })
      .catch(function (error) {
        console.log(error)
      })

  useEffect(() => {
    const setForm = () => {
      if (data.contact) {
        if (data.contact.name) {
          setValue('name', data.contact.name)
          setValue('address', data.contact.address)
          setValue('email', data.contact.email)
          setValue('phone', data.contact.phone)
        }
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
                  validationMessage={errors.email && errors.email.message}
                  label='Email *'
                  placeholder='Email'
                  id='email'
                  type='email'
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
                  {...register('phone', { required: true })}
                />
              </Pane>
            </Pane>
          </Pane>
        </form>
      </Dialog>
    </Pane>
  )
}

export default KontakForm
