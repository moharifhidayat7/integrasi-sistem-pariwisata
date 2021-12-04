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
import { signIn, signOut, useSession, getSession } from 'next-auth/react'

function Konfirmasi({
  isShown,
  setIsShown,
  mutate,
  data = [],
  toastMessage = () => {},
}) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm()
  const { data: session, status } = useSession()

  const onSubmit = (postData) =>
    axios
      .put(process.env.NEXT_PUBLIC_API_URI + '/orders/' + data.id, {
        resi: postData.resi,
        status: 'sent',
      })
      .then(function (response) {
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
        title='Konfirmasi Pesanan'
        overlayProps={{ zIndex: 2500 }}
        onCloseComplete={() => setIsShown(false)}
        confirmLabel='Update'
        onConfirm={handleSubmit(onSubmit)}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Pane>
            <TextInputField
              isInvalid={errors.resi ? true : false}
              validationMessage={errors.resi && 'Harus di isi!'}
              label='Nomor Resi *'
              id='resi'
              {...register('resi', { required: true })}
            />
          </Pane>
        </form>
      </Dialog>
    </Pane>
  )
}

export default Konfirmasi
