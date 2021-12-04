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
  Badge,
  HomeIcon,
  ShopIcon,
  BookIcon,
  ProjectsIcon,
  DashboardIcon,
  BoxIcon,
  InfoSignIcon,
  Pagination,
  ShoppingCartIcon,
  CreditCardIcon,
  CalendarIcon,
  BankAccountIcon,
  AirplaneIcon,
  UserIcon,
  Link,
  ChartIcon,
  SettingsIcon,
  Button,
  Card,
  KnownVehicleIcon,
  GroupedBarChartIcon,
  DriveTimeIcon,
  LogOutIcon,
  KeyIcon,
} from 'evergreen-ui'
import CustomItem from './Customs/MenuItem'
import SignOutMenu from '@components/Customs/SignOutMenu'
import { useSession, getSession } from 'next-auth/react'

const NavMenu = () => {
  const { data: session, status } = useSession()

  return (
    <Menu>
      <Menu.Group title={<span style={{ color: '#E6E8F0' }}>Menu Utama</span>}>
        <CustomItem
          icon={<DashboardIcon color='#F9FAFC' />}
          text='Dashboard'
          href='/pengelola/dashboard'
        />
        <CustomItem
          icon={<MountainIcon color='#F9FAFC' />}
          text='Wisata'
          href='/admin/wisata'
        />
      </Menu.Group>
      <Menu.Group title={<span style={{ color: '#E6E8F0' }}>Travel</span>}>
        <CustomItem
          icon={<BookIcon color='#F9FAFC' />}
          text='Paket Wisata'
          href='/admin/paket-wisata'
        />
        <CustomItem
          icon={<CalendarIcon color='#F9FAFC' />}
          // badge={<Badge color='yellow'>5</Badge>}
          text='Bookingan'
          href='/admin/booking'
        />
      </Menu.Group>
      <Menu.Group title={<span style={{ color: '#E6E8F0' }}>Marketplace</span>}>
        <CustomItem
          icon={<BoxIcon color='#F9FAFC' />}
          text='Produk'
          href='/admin/produk'
        />
        <CustomItem
          icon={<ShoppingCartIcon color='#F9FAFC' />}
          // badge={<Badge color='yellow'>5</Badge>}
          text='Pesanan'
          href='/admin/pesanan'
        />
        <CustomItem
          icon={<CreditCardIcon color='#F9FAFC' />}
          text='Metode Pembayaran'
          href='/admin/pembayaran'
        />
        {/* <CustomItem
          icon={<BankAccountIcon color='#F9FAFC' />}
          text='Manajemen Keuangan'
          href='/admin/pembayaran'
        /> */}
      </Menu.Group>
      <Menu.Group title={<span style={{ color: '#E6E8F0' }}>Akun</span>}>
        <CustomItem
          icon={<InfoSignIcon color='#F9FAFC' />}
          text='Edit Profil'
          href='/admin/profil'
        />
        <CustomItem
          icon={<KeyIcon color='#F9FAFC' />}
          text='Ganti Password'
          href='/admin/ganti-password'
        />
        <SignOutMenu icon={<LogOutIcon color='#F9FAFC' />} text='Keluar' />
      </Menu.Group>
    </Menu>
  )
}

export default NavMenu
