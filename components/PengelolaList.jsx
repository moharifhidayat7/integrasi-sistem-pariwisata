import { Pane, Text, Avatar, Strong } from 'evergreen-ui'
import { useState } from 'react'
const PengelolaList = ({ user, active, setActive }) => {
  const [bg, setBg] = useState('#EDEFF5')

  const toggleActive = (user) => {
    if (active.id == user.id) {
      setActive()
    } else {
      setActive(user)
    }
  }

  return (
    <Pane
      padding={12}
      onMouseEnter={() => setBg('#a3e6cd')}
      onMouseLeave={() => setBg('#EDEFF5')}
      onClick={() => toggleActive(user)}
      backgroundColor={active.id == user.id ? '#a3e6cd' : bg}
      borderRadius={4}
      cursor='pointer'
    >
      <Pane className='d-flex align-items-center'>
        <Avatar name={user.name} size={40} />
        <Pane marginLeft={10}>
          <Pane marginBottom={-8}>
            <Strong>{user.name}</Strong>
          </Pane>
          <Text size={300} color='#474D66'>
            {user.email}
          </Text>
        </Pane>
      </Pane>
    </Pane>
  )
}
export default PengelolaList
