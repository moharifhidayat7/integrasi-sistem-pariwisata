import {
  Pane,
  Dialog,
  Button,
  TextInputField,
  TextareaField,
} from 'evergreen-ui'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
function FasilitasForm({ isShown, setIsShown }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  return (
    <Pane>
      <Dialog
        isShown={isShown}
        title='Tambah Fasilitas'
        onCloseComplete={() => setIsShown(false)}
        confirmLabel='Tambah'
        overlayProps={{ zIndex: 2500 }}
        onClick={handleSubmit((data) => console.log(data))}
      >
        <form>
          <Pane>
            <TextInputField
              isInvalid={errors.fasilitas ? true : false}
              validationMessage={errors.fasilitas && 'Harus di isi!'}
              label='Nama Fasilitas *'
              placeholder='Tempat Parkir, Toilet Umum, dll.'
              id='fasilitas'
              {...register('fasilitas', { required: true })}
            />
          </Pane>
        </form>
      </Dialog>
    </Pane>
  )
}

export default FasilitasForm
