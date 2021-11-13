import { useState } from 'react'
import { Switch } from 'evergreen-ui'
import axios from 'axios'
import { signIn, signOut, useSession, getSession } from 'next-auth/client'

const ControlledSwitch = ({ id, defaultCheck, mutate }) => {
  const [checked, setChecked] = useState(defaultCheck)
  const [session, loading] = useSession()

  const toggleVisible = (e) => {
    axios.put(
      process.env.NEXT_PUBLIC_API_URI + '/products/' + id,
      {
        visible: e.target.checked,
      },
      {
        headers: {
          Authorization: `Bearer ${session.jwt}`,
        },
      }
    )
    setChecked(e.target.checked)
  }

  return <Switch checked={checked} onChange={toggleVisible} />
}

export default ControlledSwitch
