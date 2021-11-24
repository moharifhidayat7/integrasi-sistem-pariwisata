import { useState, useEffect } from 'react'
import { Pane, Dialog, IconButton, TickIcon } from 'evergreen-ui'

import ImagePicker from 'react-image-picker'
import 'react-image-picker/dist/index.css'

import style from './ImagePickerForm.module.scss'

import _ from 'lodash'
import axios from 'axios'
import { signIn, signOut, useSession, getSession } from 'next-auth/react'

const ImageCheck = ({ checked = false, img, images, setImages }) => {
  const [check, setCheck] = useState(checked)

  const toggleCheck = () => {
    if (!check) {
      setImages([...images, img.id])
    } else {
      _.remove(images, function (n) {
        return n == img.id
      })
    }
    setCheck(!check)
  }

  return (
    <Pane
      width={150}
      height={130}
      borderRadius={4}
      backgroundImage={`url(${process.env.NEXT_PUBLIC_API_URI}${img.formats.thumbnail.url})`}
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

const ImagePickerForm = ({
  isShown,
  setIsShown,
  mutate,
  data = [],
  toastMessage = () => {},
}) => {
  const [images, setImages] = useState([])
  const { data: session, status } = useSession()

  const onSubmit = () => {
    axios
      .put(
        process.env.NEXT_PUBLIC_API_URI + '/objects/' + data.id,
        {
          slideshow: images,
        },
        {
          headers: {
            Authorization: `Bearer ${session.jwt}`,
          },
        }
      )
      .then(function (response) {
        setIsShown(false)
        toastMessage()
        mutate()
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  useEffect(() => {
    const temp = data.slideshow ? data.slideshow.map((s) => s.id) : []

    setImages(temp)
  }, [isShown])

  return (
    <Pane overflowY='auto'>
      <Dialog
        isShown={isShown}
        title='Pilih Foto'
        onCloseComplete={() => setIsShown(false)}
        confirmLabel='Update'
        width={800}
        overlayProps={{ zIndex: 2500 }}
        onConfirm={() => onSubmit()}
      >
        <Pane height={450}>
          <Pane className='d-inline-flex flex-wrap gap-1'>
            {data.images &&
              data.images.map((item, index) => {
                return (
                  <ImageCheck
                    key={item.name}
                    img={item}
                    checked={_.find(data.slideshow, function (o) {
                      return o.id == item.id
                    })}
                    images={images}
                    setImages={setImages}
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
