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
import { useState } from 'react'
import CustomItem from '../Customs/MenuItem'
import Image from 'next/image'
import NextLink from 'next/link'
import Sidebar from '../Sidebar'
import Head from 'next/head'

const Admin = ({ children, title = 'Admin' }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Pane
        fontFamily='sans-serif'
        backgroundColor='#f4f6fa'
        display='flex'
        minHeight='100vh'
      >
        <Sidebar></Sidebar>
        {children}
      </Pane>
    </>
  )
}

export default Admin
