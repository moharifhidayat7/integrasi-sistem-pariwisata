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
import CustomItem from './Customs/MenuItem'

const NavMenu = () => {
  return (
    <Menu>
      <Menu.Group title={<span style={{ color: '#E6E8F0' }}>Menu Utama</span>}>
        <CustomItem icon={<DashboardIcon color='#F9FAFC' />} text='Dashboard' />
        <CustomItem
          icon={<SettingsIcon color='#F9FAFC' />}
          text='Profil Gombengsari'
        />
        <CustomItem
          icon={<ProjectsIcon color='#F9FAFC' />}
          text='Paket Wisata Edukasi'
        />
        <CustomItem icon={<MountainIcon color='#F9FAFC' />} text='Wisata' />
        <CustomItem icon={<HomeIcon color='#F9FAFC' />} text='Penginapan' />
        <CustomItem icon={<ShopIcon color='#F9FAFC' />} text='UMKM' />
      </Menu.Group>
      <Menu.Group title={<span style={{ color: '#E6E8F0' }}>Marketplace</span>}>
        <CustomItem icon={<BoxIcon color='#F9FAFC' />} text='Produk' />
        <CustomItem
          icon={<ShoppingCartIcon color='#F9FAFC' />}
          text='Pesanan'
        />
        <CustomItem
          icon={<CreditCardIcon color='#F9FAFC' />}
          text='Metode Pembayaran'
        />
      </Menu.Group>
      <Menu.Group title={<span style={{ color: '#E6E8F0' }}>User</span>}>
        <CustomItem icon={<UserIcon color='#F9FAFC' />} text='Pengelola' />
      </Menu.Group>
    </Menu>
  )
}

export default NavMenu
