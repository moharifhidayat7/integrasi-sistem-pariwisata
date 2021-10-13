import { Strong, Menu } from 'evergreen-ui'
import { useState, useRef } from 'react'
import './MenuItem.module.scss'
const CustomItem = (props) => {
  const [bg, setBg] = useState('#474D66')

  const itemStyle = {
    background: `${bg}`,
  }

  return (
    <Menu.Item
      onMouseEnter={() => setBg('#696f8c')}
      onMouseLeave={() => setBg('#474D66')}
      style={itemStyle}
      {...props}
    >
      <Strong color='#F9FAFC'>{props.text}</Strong>
    </Menu.Item>
  )
}

export default CustomItem
