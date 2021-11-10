import {
  Pane,
  Dialog,
  Button,
  TextInputField,
  TextareaField,
} from 'evergreen-ui'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'
function FasilitasForm({
  isShown,
  setIsShown,
  mutate,
  data = [],
  toastMessage = () => {},
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm()

  const onSubmit = (postData) =>
    axios
      .put(process.env.NEXT_PUBLIC_API_URI + '/objects/' + data.id, {
        facility: [...data.facility, postData.fasilitas],
      })
      .then(function (response) {
        reset()
        setIsShown(false)
        toastMessage()
        mutate()
      })
      .catch(function (error) {
        console.log(error)
      })

  return (
    <Pane>
      <Dialog
        isShown={isShown}
        title='Tambah Fasilitas'
        onCloseComplete={() => setIsShown(false)}
        confirmLabel='Tambah'
        overlayProps={{ zIndex: 2500 }}
        onConfirm={handleSubmit(onSubmit)}
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
