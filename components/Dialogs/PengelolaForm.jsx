import { useState } from 'react'
import {
  Pane,
  Avatar,
  Text,
  FormField,
  Strong,
  SearchInput,
  Dialog,
} from 'evergreen-ui'

const PengelolaList = ({ pengelola, index, active, setActive }) => {
  const [bg, setBg] = useState('#EDEFF5')

  return (
    <Pane
      padding={12}
      onMouseEnter={() => setBg('#a3e6cd')}
      onMouseLeave={() => setBg('#EDEFF5')}
      onClick={() => setActive(index)}
      backgroundColor={active == index ? '#a3e6cd' : bg}
      borderRadius={4}
      cursor='pointer'
    >
      <Pane className='d-flex align-items-center'>
        <Avatar src={pengelola.picture} name={pengelola.name} size={40} />
        <Pane marginLeft={10}>
          <Pane marginBottom={-8}>
            <Strong>{pengelola.name}</Strong>
          </Pane>
          <Text size={300} color='#474D66'>
            {pengelola.email}
          </Text>
        </Pane>
      </Pane>
    </Pane>
  )
}

const PengelolaForm = ({ isShown, setIsShown }) => {
  const [active, setActive] = useState(null)

  const handleSubmit = (onSubmit) => () => {
    console.log('submitted')
    console.log(youtubeVideo)
    onSubmit()
  }

  const pengelolas = [
    {
      name: 'Pokdarwis Gombengsari',
      email: 'tes',
      picture:
        'https://upload.wikimedia.org/wikipedia/commons/a/a1/Alan_Turing_Aged_16.jpg',
    },
    {
      name: 'Pokdarwis Gombengsari',
      email: 'tes',
      picture:
        'https://upload.wikimedia.org/wikipedia/commons/a/a1/Alan_Turing_Aged_16.jpg',
    },
    {
      name: 'Pokdarwis Gombengsari',
      email: 'tes',
      picture:
        'https://upload.wikimedia.org/wikipedia/commons/a/a1/Alan_Turing_Aged_16.jpg',
    },
    {
      name: 'Pokdarwis Gombengsari',
      email: 'tes',
      picture:
        'https://upload.wikimedia.org/wikipedia/commons/a/a1/Alan_Turing_Aged_16.jpg',
    },
    {
      name: 'Pokdarwis Gombengsari',
      email: 'tes',
      picture:
        'https://upload.wikimedia.org/wikipedia/commons/a/a1/Alan_Turing_Aged_16.jpg',
    },
    {
      name: 'Pokdarwis Gombengsari',
      email: 'tes',
      picture:
        'https://upload.wikimedia.org/wikipedia/commons/a/a1/Alan_Turing_Aged_16.jpg',
    },
    {
      name: 'Pokdarwis Gombengsari',
      email: 'tes',
      picture:
        'https://upload.wikimedia.org/wikipedia/commons/a/a1/Alan_Turing_Aged_16.jpg',
    },
  ]

  return (
    <Pane>
      <Dialog
        isShown={isShown}
        title='Edit Pengelola'
        onCloseComplete={() => setIsShown(false)}
        confirmLabel='Update'
        overlayProps={{ zIndex: 2500 }}
      >
        <Pane>
          <FormField marginBottom={12} label=''>
            <SearchInput placeholder='Cari Pengelola...' width='100%' />
          </FormField>
          <Pane
            className='d-flex flex-column gap-1'
            maxHeight={280}
            overflowY='auto'
            marginBottom={20}
          >
            {pengelolas.map((pengelola, index) => {
              return (
                <PengelolaList
                  key={index}
                  pengelola={pengelola}
                  index={index}
                  active={active}
                  setActive={setActive}
                />
              )
            })}
          </Pane>
        </Pane>
      </Dialog>
    </Pane>
  )
}

export default PengelolaForm
