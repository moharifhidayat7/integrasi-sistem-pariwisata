import { useEffect, useState } from 'react'
import { Pane, SearchInput, Dialog, Spinner } from 'evergreen-ui'
import PengelolaList from '@components/PengelolaList'
import { clientAxios } from '@helpers/functions'
import axios from 'axios'
const PengelolaForm = ({
  isShown,
  setIsShown,
  mutate,
  data = [],
  toastMessage = () => {},
}) => {
  const [users, setUsers] = useState([])
  const [active, setActive] = useState([])
  const [keyName, setKeyName] = useState('')

  const handleSubmit = () => {
    if (!active.id) {
      setIsShown(false)
    } else {
      clientAxios
        .put('/objects/' + data.id, {
          users_permissions_user: active.id,
        })
        .then(function (response) {
          setIsShown(false)
          toastMessage()
          mutate()
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  }

  useEffect(() => {
    const json = async () =>
      await axios
        .get(
          process.env.NEXT_PUBLIC_API_URI + '/users?name_contains=' + keyName
        )
        .then((res) => {
          setUsers(res.data)
        })
    json()
  }, [keyName])

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
            // maxHeight={300}
            // overflowY='auto'
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
