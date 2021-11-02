import { useState } from 'react'
import { SelectMenu, Button } from 'evergreen-ui'
const SingleSelectedItem = ({ name }) => {
  const [selected, setSelected] = useState(null)
  return (
    <SelectMenu
      title={name}
      options={['Apple', 'Apricot', 'Banana', 'Cherry', 'Cucumber'].map(
        (label) => ({ label, value: label })
      )}
      selected={selected}
      onSelect={(item) => setSelected(item.value)}
    >
      <Button>{selected || name}</Button>
    </SelectMenu>
  )
}

export default SingleSelectedItem
