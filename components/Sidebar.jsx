import { Pane, Button, MenuIcon, Heading } from 'evergreen-ui'
import { useState } from 'react'
import NavMenu from './NavMenu'
import style from './Sidebar.module.scss'
import Link from 'next/link'

const Sidebar = () => {
  const [shown, setShown] = useState(false)

  const toggleSidebar = () => {
    setShown(!shown)
  }

  return (
    <Pane
      width={250}
      height='100%'
      backgroundColor='#474D66'
      overflowY='auto'
      paddingBottom={30}
      className={`fixed-top shadow-md ${
        shown ? style.sidebarShow : style.sidebarRes
      }`}
    >
      <Pane
        paddingX={10}
        paddingY={15}
        backgroundColor='#474d66'
        className={`shadow-sm d-flex justify-content-start align-items-center ${style.sidebarButton}`}
        width='100%'
      >
        <Button onClick={toggleSidebar} className='d-sm-none'>
          <MenuIcon />
        </Button>
        <Link href='/admin'>
          <a>
            <Heading is='h1' size={700} marginLeft={20} color='#52BD95'>
              Rumah Digital Gombengsari
            </Heading>
          </a>
        </Link>
      </Pane>
      <NavMenu />
    </Pane>
  )
}

export default Sidebar
