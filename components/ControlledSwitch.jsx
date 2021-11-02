import { useState } from 'react'
import { Switch } from 'evergreen-ui'
const ControlledSwitch = () => {
  const [checked, setChecked] = useState(true)
  return (
    <Switch checked={checked} onChange={(e) => setChecked(e.target.checked)} />
  )
}

export default ControlledSwitch
