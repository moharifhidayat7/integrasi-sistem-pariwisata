import { FilePicker, Dialog, Pane } from 'evergreen-ui'

const LogoForm = ({ isShown, setIsShown }) => {
  return (
    <Pane>
      <Dialog
        isShown={isShown}
        title='Upload Logo'
        onCloseComplete={() => setIsShown(false)}
        confirmLabel='Upload'
        onConfirm={() => console.log('ok')}
        overlayProps={{ zIndex: 2500 }}
      >
        <FilePicker
          width='100%'
          accept='image/*'
          onChange={(files) => console.log(files)}
          placeholder='Pilih File'
        />
      </Dialog>
    </Pane>
  )
}

export default LogoForm
