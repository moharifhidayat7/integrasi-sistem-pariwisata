import { useState } from 'react'
import { Pane, Dialog, IconButton, TickIcon } from 'evergreen-ui'

import ImagePicker from 'react-image-picker'
import 'react-image-picker/dist/index.css'

import style from './ImagePickerForm.module.scss'

const ImageCheck = ({ checked = false, img }) => {
  const [check, setCheck] = useState(checked)

  const toggleCheck = () => {
    setCheck(!check)
  }

  return (
    <Pane
      width={170}
      height={150}
      borderRadius={4}
      backgroundImage={`url(${img})`}
      backgroundSize='cover'
      backgroundPosition='center'
      backgroundRepeat='no-repeat'
      position='relative'
      background='white'
      onClick={toggleCheck}
    >
      <IconButton
        icon={TickIcon}
        appearance='primary'
        intent='success'
        size='small'
        top={4}
        left={4}
        position='absolute'
        hidden={!check}
      />
    </Pane>
  )
}

const ImagePickerForm = ({ isShown, setIsShown }) => {
  const [images, setImages] = useState([])

  const imageList = [
    {
      img: 'https://picsum.photos/400',
      checked: true,
    },
    {
      img: 'https://picsum.photos/400',
      checked: false,
    },
    {
      img: 'https://picsum.photos/400',
      checked: false,
    },
    {
      img: 'https://picsum.photos/500',
      checked: true,
    },
    {
      img: 'https://picsum.photos/300',
      checked: true,
    },
  ]

  const onPickImages = (pickedImages) => {
    setImages(pickedImages)
    console.log(JSON.stringify(pickedImages))
  }

  return (
    <Pane overflowY='auto'>
      <Dialog
        isShown={isShown}
        title='Pilih Foto'
        onCloseComplete={() => setIsShown(false)}
        confirmLabel='Update'
        width={800}
        overlayProps={{ zIndex: 2500 }}
      >
        <Pane height={450}>
          <Pane className='d-inline-flex flex-wrap gap-1'>
            {imageList.map((item, index) => {
              return (
                <ImageCheck
                  key={`${item.img}-${index}`}
                  img={item.img}
                  checked={item.checked}
                />
              )
            })}
          </Pane>
        </Pane>
      </Dialog>
    </Pane>
  )
}

export default ImagePickerForm
