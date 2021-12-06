import { Strong, Menu, Pane, Badge } from 'evergreen-ui'
import { useState, useRef } from 'react'
import Link from 'next/link'
import './MenuItem.module.scss'
import { useRouter } from 'next/router'
import _ from 'lodash'
const CustomLink = (props) => {
  return (
    <Link href={props.href}>
      <a {...props}>{props.children}</a>
    </Link>
  )
}

const CustomItem = (props) => {
  const router = useRouter()

  return (
    <Menu.Item
      is={CustomLink}
      className={`menuItem ${
        _.includes(props.href, router.asPath) ? 'menuItemActive' : ''
      } `}
      {...props}
    >
      <Strong color='#F9FAFC' className='d-flex align-items-center gap-2'>
        {props.text} {props.badge}
      </Strong>
    </Menu.Item>
  )
}

export default CustomItem
