import { useState } from 'react'
import Layout from '../../../components/Layouts/Admin'
import Content from '../../../components/Content'
import CardWisata from '../../../components/Cards/Wisata'
import { Dialog, Pane } from 'evergreen-ui'
const Tambah = () => {
  const [value, setValue] = useState(0)
  const [showDelete, setShowDelete] = useState(false)

  return (
    <Layout>
      <Dialog
        isShown={showDelete}
        title='Hapus "Puncak Asmoro"'
        intent='danger'
        onCloseComplete={() => {
          setShowDelete(false)
          console.log('close')
        }}
        confirmLabel='Delete'
      >
        Apakah anda yakin ingin menghapus item ini?
      </Dialog>
      <Content>
        <Content.Header title='Tambah Wisata' />
        <Content.Body>
          <Pane className='d-flex justify-content-center'>
            <Pane className='col-6'>sd</Pane>
          </Pane>
        </Content.Body>
      </Content>
    </Layout>
  )
}

export default Tambah
