import {
  Pane,
  Menu,
  MountainIcon,
  Text,
  Strong,
  Small,
  IconButton,
  TrashIcon,
  Heading,
  HomeIcon,
  ShopIcon,
  ProjectsIcon,
  DashboardIcon,
  BoxIcon,
  Pagination,
  ShoppingCartIcon,
  CreditCardIcon,
  UserIcon,
  Link,
  SettingsIcon,
  Button,
  Card,
} from 'evergreen-ui'
import './Admin.module.scss'
import { useState } from 'react'
import CustomItem from '../Customs/MenuItem'
import Image from 'next/image'
import NextLink from 'next/link'
import Sidebar from '../Sidebar'
const Admin = ({ children }) => {
  return (
    <Pane fontFamily='sans-serif' backgroundColor='#f4f6fa' display='flex'>
      <Sidebar></Sidebar>
      {children}
    </Pane>
  )
}

export default Admin
