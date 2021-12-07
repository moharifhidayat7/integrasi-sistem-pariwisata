import { useState } from 'react'
import { Dialog, Pane, TextInputField } from 'evergreen-ui'
const Variasi = ({
  isShown,
  setIsShown,
  variasi,
  setVariasi,
  row,
  vari,
  setVari,
  prs,
  setPrs,
  fee,
  setFee,
}) => {
  return (
    <Dialog
      isShown={isShown}
      title='Edit Variasi'
      onCloseComplete={() => setIsShown(false)}
      confirmLabel='Edit'
      overlayProps={{ zIndex: 2500 }}
      onConfirm={() => {
        const va = variasi.filter((v, i) => i != row)
        const vs = variasi.map((v, i) => {
          if (i == row) {
            return { variation: vari, price: prs, fee: fee }
          } else {
            return v
          }
        })
        setVariasi([...vs])
        setVari()
        setPrs()
        setFee()
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
        {/* <TextInputField
          label='Biaya Admin *'
          placeholder='fee'
          value={fee}
          onChange={(e) => setFee(parseInt(e.target.value))}
          hidden
        /> */}
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
