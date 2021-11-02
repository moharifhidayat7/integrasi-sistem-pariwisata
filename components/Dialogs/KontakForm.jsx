import {
  Pane,
  Dialog,
  Button,
  TextInputField,
  TextareaField,
} from 'evergreen-ui'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
function KontakForm({ isShown, setIsShown }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  return (
    <Pane>
      <Dialog
        isShown={isShown}
        title='Edit Kontak'
        overlayProps={{ zIndex: 2500 }}
        onCloseComplete={() => setIsShown(false)}
        confirmLabel='Update'
        onConfirm={handleSubmit((data) => console.log(data))}
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
          </Pane>
        </form>
      </Dialog>
    </Pane>
  )
}

export default KontakForm
