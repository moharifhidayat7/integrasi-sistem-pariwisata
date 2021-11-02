import {
  Pane,
  Dialog,
  Button,
  TextInputField,
  TextareaField,
} from 'evergreen-ui'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
function DetailForm({ isShown, setIsShown, data = [] }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  return (
    <Pane>
      <Dialog
        isShown={isShown}
        title='Edit Detail'
        onCloseComplete={() => setIsShown(false)}
        confirmLabel='Update'
        overlayProps={{ zIndex: 2500 }}
        onConfirm={handleSubmit((data) => console.log(data))}
      >
        <form>
          <Pane className='d-flex flex-column'>
            <TextInputField
              isInvalid={errors.objectName ? true : false}
              validationMessage={errors.objectName && 'Harus di isi!'}
              label='Nama Tempat Wisata *'
              placeholder='Nama Tempat Wisata'
              value={data.objectName}
              id='objectName'
              {...register('objectName', { required: true })}
            />
            <TextInputField
              isInvalid={errors.objectAddress ? true : false}
              validationMessage={errors.objectAddress && 'Harus di isi!'}
              label='Alamat Tempat Wisata *'
              placeholder='Alamat Tempat Wisata'
              id='objectAddress'
              value={data.objectAddress}
              {...register('objectAddress', { required: true })}
            />
            <TextareaField
              label='Deskripsi'
              placeholder='Deskripsi singkat Tempat Wisata'
              id='description'
              value={data.description}
              {...register('description')}
            />
          </Pane>
        </form>
      </Dialog>
    </Pane>
  )
}

export default DetailForm
