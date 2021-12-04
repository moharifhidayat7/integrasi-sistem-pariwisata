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

function Bukti({ isShown, setIsShown, data = [] }) {
  return (
    <Pane>
      <Dialog
        isShown={isShown}
        title='Edit Video Profil'
        overlayProps={{ zIndex: 2500 }}
        onCloseComplete={() => setIsShown(false)}
        confirmLabel='Update'
        onConfirm={handleSubmit(onSubmit)}
      ></Dialog>
    </Pane>
  )
}

export default Bukti
