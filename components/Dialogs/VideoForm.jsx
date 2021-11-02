import {
  Pane,
  Dialog,
  Button,
  TextInputField,
  TextareaField,
} from 'evergreen-ui'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
function VideoForm({ isShown, setIsShown }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  return (
    <Pane>
      <Dialog
        isShown={isShown}
        title='Edit Video Profil'
        overlayProps={{ zIndex: 2500 }}
        onCloseComplete={() => setIsShown(false)}
        confirmLabel='Update'
        onClick={handleSubmit((data) => console.log(data))}
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
