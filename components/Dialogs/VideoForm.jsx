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
import { signIn, signOut, useSession, getSession } from 'next-auth/client'

function VideoForm({
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
  const [session, loading] = useSession()

  const onSubmit = (postData) =>
    axios
      .put(
        process.env.NEXT_PUBLIC_API_URI + '/objects/' + data.id,
        {
          youtube: postData.link,
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
    setValue('link', data.youtube)
  }, [isShown])

  return (
    <Pane>
      <Dialog
        isShown={isShown}
        title='Edit Video Profil'
        overlayProps={{ zIndex: 2500 }}
        onCloseComplete={() => setIsShown(false)}
        confirmLabel='Update'
        onConfirm={handleSubmit(onSubmit)}
      >
        <form>
          <Pane>
            <TextInputField
              isInvalid={errors.link ? true : false}
              validationMessage={errors.link && 'Harus di isi!'}
              label='Link Video Youtube *'
              placeholder='https://www.youtube.com/watch?v=xxxxxxxxxx'
              id='link'
              {...register('link', { required: true })}
            />
          </Pane>
        </form>
      </Dialog>
    </Pane>
  )
}

export default VideoForm
