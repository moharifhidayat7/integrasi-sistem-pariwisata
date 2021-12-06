import { Pane, Dialog, Button, Text } from 'evergreen-ui'
const Sukses = ({ isShown, setIsShown, data }) => {
  return (
    <Pane>
      <Dialog
        isShown={isShown}
        title='Berhasil Ditambahkan'
        onCloseComplete={() => setIsShown(false)}
        hasFooter={false}
      >
        <Text>{JSON.stringify(data)}</Text>
      </Dialog>
    </Pane>
  )
}

export default Sukses
