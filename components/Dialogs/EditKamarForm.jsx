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
import { useSession } from 'next-auth/react'
import { useForm } from 'react-hook-form'
const EditKamarForm = ({
  isShown,
  setIsShown,
  mutate,
  data = [],
  toastMessage = () => {},
}) => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm()
  const [files, setFiles] = useState([])
  const { data: session, status } = useSession()
  const [dataImages, setDataImages] = useState([])
  const { getRootProps, getInputProps, open, isDragActive } = useDropzone({
    accept: 'image/*',
    maxFiles: 5,
    noClick: true,
    onDrop: (acceptedFiles) => {
      if (files.length + dataImages.length >= 5) {
        return
      }
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

  const onSubmit = (postData) => {
    if (files.length + dataImages.length < 1) {
      return
    }
    const formData = new FormData()

    formData.append(
      'data',
      JSON.stringify({
        ...postData,
        gallery: dataImages.map((d) => d.id),
      })
    )

    for (let i = 0; i < files.length; i++) {
      const element = files[i]
      formData.append('files.gallery', element)
    }

    axios
      .put(process.env.NEXT_PUBLIC_API_URI + '/rooms/' + data.id, formData)
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

  const removeImages = (id) => {
    setDataImages(dataImages.filter((d) => d.id != id))
  }

  useEffect(() => {
    setValue('name', data.name)
    setValue('price', data.price)
    setDataImages(data.gallery)
  }, [data])

  return (
    <Pane>
      <Dialog
        isShown={isShown}
        title='Tambah Kamar'
        onCloseComplete={() => setIsShown(false)}
        confirmLabel='Submit'
        overlayProps={{ zIndex: 2500 }}
        onConfirm={handleSubmit(onSubmit)}
      >
        <Pane>
          <TextInputField
            isInvalid={errors.name ? true : false}
            validationMessage={errors.name && 'Harus di isi!'}
            label='Nama Kamar *'
            placeholder='Nama Kamar'
            id='name'
            {...register('name', { required: true })}
          />
          <TextInputField
            isInvalid={errors.price ? true : false}
            validationMessage={errors.price && 'Harus di isi!'}
            label='Harga Kamar (per Malam) *'
            placeholder='Harga Kamar'
            id='name'
            {...register('price', { required: true })}
          />
        </Pane>
        <FormField label='Foto Kamar *' description='maksimal 5' />
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
              {files.length > 0 || dataImages ? (
                <Pane
                  className='d-flex flex-wrap g-2'
                  maxHeight={300}
                  overflowY='auto'
                >
                  {dataImages &&
                    dataImages.map((dimg) => {
                      return (
                        <Pane key={dimg.name} padding={3} borderRadius={4}>
                          <Pane
                            width={120}
                            height={100}
                            borderRadius={4}
                            style={{
                              backgroundImage: `url('${
                                process.env.NEXT_PUBLIC_API_URI + dimg.url
                              }')`,
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
                              onClick={() => removeImages(dimg.id)}
                            />
                          </Pane>
                        </Pane>
                      )
                    })}
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
export default EditKamarForm
