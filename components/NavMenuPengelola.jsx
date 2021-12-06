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
import { useRouter } from 'next/router'
import _ from 'lodash'
const NavMenu = () => {
  const { data: session, status } = useSession()
  const router = useRouter()

  return (
    <Menu>
      <CustomItem
        className='menuLogin'
        text={
          <div style={{ paddingTop: 20 }}>
            <small>Login Sebagai {session.role.name}</small>
            <br />
            <span>{session.user.name}</span>
          </div>
        }
        href='/pengelola/profil'
      />
      <Menu.Group title={<span style={{ color: '#E6E8F0' }}>Menu Utama</span>}>
        <CustomItem
          icon={<DashboardIcon color='#F9FAFC' />}
          text='Dashboard'
          href='/pengelola/dashboard'
        />
        {/* <CustomItem
          icon={<MountainIcon color='#F9FAFC' />}
          text='Wisata'
          href='/admin/wisata'
        /> */}
      </Menu.Group>
      {/* <Menu.Group title={<span style={{ color: '#E6E8F0' }}>Travel</span>}>
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
      </Menu.Group> */}
      {_.includes(router.asPath, '/kelola/umkm/') ? (
        <Menu.Group
          title={<span style={{ color: '#E6E8F0' }}>Marketplace</span>}
        >
          <CustomItem
            icon={<BoxIcon color='#F9FAFC' />}
            text='Produk'
            href={'/kelola/umkm/' + router.query.slug + '/produk'}
          />
        </Menu.Group>
      ) : (
        ''
      )}

      {/* <CustomItem
          icon={<ShoppingCartIcon color='#F9FAFC' />}
          // badge={<Badge color='yellow'>5</Badge>}
          text='Pesanan'
          href='/admin/pesanan'
        />
        <CustomItem
          icon={<CreditCardIcon color='#F9FAFC' />}
          text='Metode Pembayaran'
          href='/admin/pembayaran'
        /> */}
      {/* <CustomItem
          icon={<BankAccountIcon color='#F9FAFC' />}
          text='Manajemen Keuangan'
          href='/admin/pembayaran'
        /> */}
      <Menu.Group title={<span style={{ color: '#E6E8F0' }}>Akun</span>}>
        <CustomItem
          icon={<InfoSignIcon color='#F9FAFC' />}
          text='Edit Profil'
          href='/pengelola/profil'
        />
        <CustomItem
          icon={<KeyIcon color='#F9FAFC' />}
          text='Ganti Password'
          href='/pengelola/ganti-password'
        />
        <SignOutMenu icon={<LogOutIcon color='#F9FAFC' />} text='Keluar' />
      </Menu.Group>
    </Menu>
  )
}

export default NavMenu
