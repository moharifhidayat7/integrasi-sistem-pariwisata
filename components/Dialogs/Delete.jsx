import { Pane, Dialog } from 'evergreen-ui'
import { useState } from 'react'
const Delete = ({
  isShown,
  setIsShown,
  onConfirm,
  text = 'Apakah anda yakin ingin menghapus item ini?',
}) => {
  return (
    <Pane>
      <Dialog
        isShown={isShown}
        title='Delete'
        intent='danger'
        onCloseComplete={() => setIsShown(false)}
        confirmLabel='Delete'
        onConfirm={onConfirm}
      >
        {text}
      </Dialog>
    </Pane>
  )
}

export default Delete
