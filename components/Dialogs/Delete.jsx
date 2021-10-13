import { Pane, Dialog } from 'evergreen-ui'
import { useState } from 'react'
const Delete = () => {
  const [showDelete, setShowDelete] = useState(false)

  return (
    <Pane>
      <Dialog
        showDelete={showDelete}
        title='Dialog title'
        intent='danger'
        onCloseComplete={() => setShowDelete(false)}
        confirmLabel='Delete'
      >
        Apakah anda yakin ingin menghapus item ini?
      </Dialog>
    </Pane>
  )
}

export default Delete
