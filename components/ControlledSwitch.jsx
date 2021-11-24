import { useState } from 'react'
import { Switch } from 'evergreen-ui'
import axios from 'axios'
import { signIn, signOut, useSession, getSession } from 'next-auth/react'

const ControlledSwitch = ({ id, defaultCheck, mutate }) => {
  const [checked, setChecked] = useState(defaultCheck)
  const { data: session, status } = useSession()

  const toggleVisible = (e) => {
    axios.put(process.env.NEXT_PUBLIC_API_URI + '/products/' + id, {
      visible: e.target.checked,
    })
    setChecked(e.target.checked)
  }

  return <Switch checked={checked} onChange={toggleVisible} />
}

export default ControlledSwitch
