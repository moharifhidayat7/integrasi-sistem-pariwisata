import useSWR from 'swr'
import { useState, useEffect } from 'react'
import {
  Pane,
  Avatar,
  Strong,
  Text,
  FormField,
  Spinner,
  SearchInput,
} from 'evergreen-ui'
import Stats from '@components/Stats'
import { clientAxios } from '@helpers/functions'
import { useRouter } from 'next/router'
import PengelolaList from '@components/PengelolaList'

const PengelolaTerdaftar = (props) => {
  const router = useRouter()
  const [active, setActive] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [keyName, setKeyName] = useState('')

  clientAxios.interceptors.request.use(
    function (config) {
      setIsLoading(true)
      return config
    },
    function (error) {
      // Do something with request error
      return Promise.reject(error)
    }
  )

  const getUser = async (url) => await fetch(url).then((res) => res.json())

  const { data, error } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URI}/users?name_contains=${keyName}`,
    getUser
  )

  const finalSubmit = () => {
    const formData = new FormData()

    const json = {
      name: props.postData[1].objectName,
      address: props.postData[1].objectAddress,
      type: props.postData[1].type,
      description: props.postData[1].description,
      youtube: '',
      contact: [],
      users_permissions_user: '',
    }
    if (props.postData[3]) {
      for (let i = 0; i < props.postData[3].files.length; i++) {
        const element = props.postData[3].files[i]
        formData.append('files.images', element)
      }
      if (props.postData[3].featuredImage) {
        if (props.postData[1].type == 'UMKM') {
          formData.append('files.logo', props.postData[3].featuredImage)
        } else {
          formData.append(
            'files.featured_image',
            props.postData[3].featuredImage
          )
        }
      }
      json.youtube = props.postData[3].youtubeVideo
    }

    if (props.postData[2]) {
      json.contact = [
        {
          name: props.postData[2].name,
          address: props.postData[2].address,
          phone: props.postData[2].phone,
          email: props.postData[2].email,
        },
      ]
    }
    if (active.id) {
      json.users_permissions_user = active.id
    } else {
      delete json.users_permissions_user
    }

    formData.append('data', JSON.stringify(json))
    clientAxios
      .post('/objects', formData)
      .then(function (response) {
        const path = router.pathname.split('/').slice(0, -1)
        router.push(path.join('/'))
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  return (
    <Pane>
      <SearchInput
        placeholder='Cari User...'
        width='100%'
        onChange={(e) => setKeyName(e.target.value)}
      />
      <Pane
        className='d-flex flex-column gap-1'
        maxHeight={300}
        overflowY='auto'
        marginBottom={20}
        marginTop={12}
      >
        {!data ? (
          <Spinner size={24} />
        ) : (
          data.map((user, index) => {
            return (
              <PengelolaList
                key={user.id}
                user={user}
                active={active}
                setActive={setActive}
              />
            )
          })
        )}
      </Pane>

      <Stats
        step={3}
        {...props}
        postData={props.postData}
        setPostData={props.setPostData}
        handleSubmit={finalSubmit}
        isLoading={isLoading}
      />
    </Pane>
  )
}

export default PengelolaTerdaftar
