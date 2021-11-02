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
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import style from './Content.module.scss'

const Content = ({ children }) => {
  return (
    <Pane
      flex={1}
      backgroundColor='#f4f6fa'
      height='100%'
      paddingBottom={100}
      className={style.layoutMargin}
    >
      {children}
    </Pane>
  )
}
const Header = ({ title, button }) => {
  const router = useRouter()
  return (
    <Pane backgroundColor='#e6e8f0' className={style.contentMargin}>
      <Pane
        className='container d-flex align-items-center justify-content-between'
        height={180}
      >
        <Heading is='h1' size={900}>
          {title}
        </Heading>
        {button}
      </Pane>
    </Pane>
  )
}
Content.Header = Header

const Body = ({ children }) => {
  return (
    <Pane className='container mt-3 mb-5'>
      <div className='row gy-3 gx-3'>{children}</div>
    </Pane>
  )
}
Content.Body = Body

const Pages = ({ page = 1, totalPages = 5 }) => {
  return (
    <div className='d-flex justify-content-center mt-3'>
      <Pagination page={page} totalPages={totalPages}></Pagination>
    </div>
  )
}

Content.Pagination = Pages

export default Content
