import { useState, useEffect } from 'react'
import {
  Pane,
  Card,
  TextInputField,
  FormField,
  IconButton,
  Text,
  AddIcon,
  ResetIcon,
  Button,
  SmallCrossIcon,
} from 'evergreen-ui'
import Stats from '@components/Stats'
import { useDropzone } from 'react-dropzone'
import { YouTubeGetID } from '@helpers/functions'

const Media = (props) => {
  const [youtubeVideo, setYoutubeVideo] = useState('')
  const [notYoutube, setNotYoutube] = useState(false)
  const [featuredImage, setFeaturedImage] = useState()

  const [files, setFiles] = useState([])

  const handleLink = (e) => {
    if (e.target.value != '' && YouTubeGetID(e.target.value) == '') {
      setNotYoutube(true)
    } else {
      setNotYoutube(false)
    }
    setYoutubeVideo(e.target.value)
  }

  const imageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setFeaturedImage(e.target.files[0])
    }
  }
  const resetImage = (e) => {
    e.stopPropagation()
    setFeaturedImage()
  }

  const handleSubmit =
    (onSubmit) =>
    (data = { youtubeVideo }) => {
      if (data.youtubeVideo != '' && YouTubeGetID(data.youtubeVideo) == '') {
        setNotYoutube(true)
      } else {
        setNotYoutube(false)
        onSubmit({ ...data, files, featuredImage })
      }
    }

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

  useEffect(
    () => () => {
      files.forEach((file) => URL.revokeObjectURL(file.preview))
    },
    [files]
  )

  return (
    <Pane>
      <TextInputField
        isInvalid={notYoutube}
        validationMessage={notYoutube && 'Bukan link youtube!'}
        label='Link Youtube Video Profil'
        placeholder='https://www.youtube.com/watch?v=xxxxxxxxx'
        id='youtubeVideo'
        onChange={handleLink}
      />
      <FormField label='Foto Utama' marginBottom={24}>
        <input
          id='featured_image'
          type='file'
          accept='image/*'
          onChange={imageChange}
          hidden
        />
        <Pane position='relative'>
          <label htmlFor='featured_image' style={{ width: '100%' }}>
            <Card
              background={
                featuredImage
                  ? `url(${URL.createObjectURL(
                      featuredImage
                    )}) no-repeat center / cover`
                  : '#E6E8F0'
              }
              borderColor={isDragActive ? '#3366FF' : '#d8dae5'}
              border='default'
              padding={12}
              height={featuredImage ? 200 : 'auto'}
              className='d-flex justify-content-center align-items-center'
            >
              {featuredImage ? '' : <Text>Pilih Foto Utama</Text>}
            </Card>
          </label>
          {featuredImage && (
            <IconButton
              icon={SmallCrossIcon}
              appearance='primary'
              intent='danger'
              size='small'
              right={4}
              top={4}
              position='absolute'
              onClick={resetImage}
            />
          )}
        </Pane>
      </FormField>
      <FormField label='Foto' marginBottom={24}>
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

            <Button iconBefore={ResetIcon} onClick={() => setFiles([])}>
              Reset
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
      </FormField>
      <Stats
        step={3}
        {...props}
        postData={props.postData}
        setPostData={props.setPostData}
        withSkip={true}
        handleSubmit={handleSubmit}
      />
    </Pane>
  )
}

export default Media
