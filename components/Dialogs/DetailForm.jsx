import {
  Pane,
  Dialog,
  Button,
  TextInputField,
  TextareaField,
} from 'evergreen-ui'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'
function DetailForm({
  isShown,
  setIsShown,
  data = [],
  mutate,
  toastMessage = () => {},
}) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm()

  const onSubmit = (postData) =>
    axios
      .put(process.env.NEXT_PUBLIC_API_URI + '/objects/' + data.id, {
        name: postData.objectName,
        address: postData.objectAddress,
        description: postData.description,
      })
      .then(function (response) {
        setIsShown(false)
        toastMessage()
        mutate()
      })
      .catch(function (error) {
        console.log(error)
      })

  useEffect(() => {
    setValue('objectName', data.name)
    setValue('objectAddress', data.address)
    setValue('description', data.description)
  }, [isShown])

  return (
    <Pane>
      <Dialog
        isShown={isShown}
        title='Edit Detail'
        onCloseComplete={() => setIsShown(false)}
        confirmLabel='Update'
        overlayProps={{ zIndex: 2500 }}
        onConfirm={handleSubmit(onSubmit)}
      >
        <form>
          <Pane className='d-flex flex-column'>
            <TextInputField
              isInvalid={errors.objectName ? true : false}
              validationMessage={errors.objectName && 'Harus di isi!'}
              label='Nama Tempat Wisata *'
              placeholder='Nama Tempat Wisata'
              id='objectName'
              {...register('objectName', { required: true })}
            />
            <TextInputField
              isInvalid={errors.objectAddress ? true : false}
              validationMessage={errors.objectAddress && 'Harus di isi!'}
              label='Alamat Tempat Wisata *'
              placeholder='Alamat Tempat Wisata'
              id='objectAddress'
              {...register('objectAddress', { required: true })}
            />
            <TextareaField
              label='Deskripsi'
              placeholder='Deskripsi singkat Tempat Wisata'
              id='description'
              {...register('description')}
            />
          </Pane>
        </form>
      </Dialog>
    </Pane>
  )
}

export default DetailForm
