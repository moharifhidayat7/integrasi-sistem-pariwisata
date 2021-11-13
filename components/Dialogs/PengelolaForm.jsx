import useSWR from 'swr'
import { useState } from 'react'
import {
  Pane,
  Avatar,
  Text,
  FormField,
  Strong,
  SearchInput,
  Dialog,
  Spinner,
} from 'evergreen-ui'
import PengelolaList from '@components/PengelolaList'
import { clientAxios } from '@helpers/functions'
import { signIn, signOut, useSession, getSession } from 'next-auth/client'

const PengelolaForm = ({
  isShown,
  setIsShown,
  data = [],
  toastMessage = () => {},
}) => {
  const [active, setActive] = useState([])
  const [keyName, setKeyName] = useState('')
  const [session, loading] = useSession()

  const getUser = async (url) =>
    await fetch(url, {
      headers: {
        Authorization: `Bearer ${session.jwt}`,
      },
    }).then((res) => res.json())

  const { data: users, error } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URI}/users?name_contains=${keyName}`,
    getUser
  )

  const handleSubmit = () => {
    if (!active.id) {
      setIsShown(false)
    } else {
      clientAxios
        .put(
          '/objects/' + data.id,
          {
            users_permissions_user: active.id,
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
          mutate({ ...data, users_permissions_user: active })
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  }

  return (
    <Pane>
      <Dialog
        isShown={isShown}
        title='Edit Pengelola'
        onCloseComplete={() => setIsShown(false)}
        confirmLabel='Update'
        overlayProps={{ zIndex: 2500 }}
        onConfirm={handleSubmit}
      >
        <Pane>
          <SearchInput
            placeholder='Cari User...'
            width='100%'
            onChange={(e) => setKeyName(e.target.value)}
          />
          <Pane
            className='d-flex flex-column gap-1'
            maxHeight={300}
            overflowY='auto'
            marginBottom={20}
            marginTop={12}
          >
            {!users ? (
              <Spinner size={24} />
            ) : (
              users.map((user, index) => {
                return (
                  <PengelolaList
                    key={user.id}
                    user={user}
                    active={active}
                    setActive={setActive}
                  />
                )
              })
            )}
          </Pane>
        </Pane>
      </Dialog>
    </Pane>
  )
}

export default PengelolaForm
