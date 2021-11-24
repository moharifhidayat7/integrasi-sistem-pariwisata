import { useState, useEffect } from 'react'
import {
  Pane,
  Dialog,
  Button,
  TextInputField,
  TextareaField,
  FormField,
  Card,
  Text,
  AddIcon,
  UploadIcon,
  SmallCrossIcon,
  IconButton,
} from 'evergreen-ui'
import { useDropzone } from 'react-dropzone'
import _ from 'lodash'
import axios from 'axios'
import { signIn, signOut, useSession, getSession } from 'next-auth/react'

const GaleriForm = ({
  isShown,
  setIsShown,
  mutate,
  data = [],
  toastMessage = () => {},
}) => {
  const [files, setFiles] = useState([])
  const { data: session, status } = useSession()

  const { getRootProps, getInputProps, open, isDragActive } = useDropzone({
    accept: 'image/*',
    noClick: true,
    onDrop: (acceptedFiles) => {
      const allFiles = [
        ...acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        ),
        ...files,
      ]
      setFiles(_.uniqBy(allFiles, 'path'))
    },
  })

  const removeFile = (index) => {
    const newFiles = files.filter((e, i) => i != index)
    setFiles(newFiles)
  }

  const uploadImage = () => {
    const formData = new FormData()

    formData.append('ref', 'object')
    formData.append('refId', data.id)
    formData.append('field', 'images')

    for (let i = 0; i < files.length; i++) {
      const element = files[i]
      formData.append('files', element)
    }

    axios
      .post(process.env.NEXT_PUBLIC_API_URI + '/upload', formData, {
        headers: {
          Authorization: `Bearer ${session.jwt}`,
        },
      })
      .then(function (response) {
        setFiles([])
        setIsShown(false)
        toastMessage()
        mutate()
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  return (
    <Pane>
      <Dialog
        isShown={isShown}
        title='Upload Foto'
        onCloseComplete={() => setIsShown(false)}
        confirmLabel='Upload'
        onConfirm={() => uploadImage()}
        overlayProps={{ zIndex: 2500 }}
      >
        <Pane>
          <Card
            background='#E6E8F0'
            borderColor={isDragActive ? '#3366FF' : '#d8dae5'}
            border='default'
            padding={12}
            {...getRootProps({ className: 'dropzone' })}
          >
            <Pane marginBottom={12}>
              <input multiple {...getInputProps()} hidden />

              <Button marginRight={8} iconBefore={AddIcon} onClick={open}>
                Tambah
              </Button>
            </Pane>
            <Pane>
              {files.length > 0 ? (
                <Pane
                  className='d-flex flex-wrap g-2'
                  maxHeight={300}
                  overflowY='auto'
                >
                  {files.map((file, index) => (
                    <Pane key={file.name} padding={3} borderRadius={4}>
                      <Pane
                        width={120}
                        height={100}
                        borderRadius={4}
                        style={{
                          backgroundImage: `url('${file.preview}')`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                          backgroundRepeat: 'no-repeat',
                        }}
                        position='relative'
                        background='white'
                      >
                        <IconButton
                          icon={SmallCrossIcon}
                          appearance='primary'
                          intent='danger'
                          size='small'
                          top={4}
                          right={4}
                          position='absolute'
                          onClick={() => removeFile(index)}
                        />
                      </Pane>
                    </Pane>
                  ))}
                </Pane>
              ) : isDragActive ? (
                <Text>Drop the files here ...</Text>
              ) : (
                <Text>Drag n drop some files here, or click add files</Text>
              )}
            </Pane>
          </Card>
        </Pane>
      </Dialog>
    </Pane>
  )
}
export default GaleriForm
