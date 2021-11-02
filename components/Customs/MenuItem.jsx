import { Strong, Menu, Pane, Badge } from 'evergreen-ui'
import { useState, useRef } from 'react'
import Link from 'next/link'
import './MenuItem.module.scss'

const CustomLink = (props) => {
  return (
    <Link href={props.href}>
      <a {...props}>{props.children}</a>
    </Link>
  )
}

const CustomItem = (props) => {
  const [bg, setBg] = useState('#474D66')

  const itemStyle = {
    background: `${bg}`,
  }

  return (
    <Menu.Item
      is={CustomLink}
      onMouseEnter={() => setBg('#696f8c')}
      onMouseLeave={() => setBg('#474D66')}
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
