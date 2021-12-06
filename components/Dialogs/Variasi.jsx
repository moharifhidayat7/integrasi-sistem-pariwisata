import { useState } from 'react'
import { Dialog, Pane, TextInputField } from 'evergreen-ui'
const Variasi = ({ isShown, setIsShown, variasi, setVariasi }) => {
  const [vari, setVari] = useState('')
  const [prs, setPrs] = useState(0)

  return (
    <Dialog
      isShown={isShown}
      title='Tambah Variasi'
      onCloseComplete={() => setIsShown(false)}
      confirmLabel='Tambah'
      overlayProps={{ zIndex: 2500 }}
      onConfirm={() => {
        setVariasi([...variasi, { variation: vari, price: prs }])
        setVari()
        setPrs()
        setIsShown(false)
      }}
    >
      <Pane>
        <TextInputField
          label='Variasi *'
          placeholder='Berat, Tipe, Model, dll'
          value={vari}
          onChange={(e) => setVari(e.target.value)}
        />
        <TextInputField
          label='Harga *'
          placeholder='harga'
          value={prs}
          onChange={(e) => setPrs(parseInt(e.target.value))}
        />
      </Pane>
    </Dialog>
  )
}

export default Variasi
