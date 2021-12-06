import { useState } from 'react'
import { Menu, Strong } from 'evergreen-ui'
import { signOut } from 'next-auth/react'

const CustomItem = (props) => {
  const [bg, setBg] = useState('#474D66')

  const itemStyle = {
    background: `${bg}`,
  }

  return (
    <Menu.Item
      onMouseEnter={() => setBg('#696f8c')}
      onMouseLeave={() => setBg('#474D66')}
      onClick={() => signOut({ callbackUrl: '/' })}
      style={itemStyle}
      {...props}
    >
      <Strong color='#F9FAFC' className='d-flex align-items-center gap-2'>
        {props.text} {props.badge}
      </Strong>
    </Menu.Item>
  )
}

export default CustomItem
