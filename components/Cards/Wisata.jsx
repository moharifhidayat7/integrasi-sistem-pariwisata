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
const Wisata = ({ name, id, userId, image, user, setShowDelete }) => {
  return (
    <Pane className='col-sm-6 col-md-6 col-lg-3' position='relative'>
      <Card elevation={1} backgroundColor='white' width='100%'>
        <Pane
          height={160}
          width='100%'
          borderTopLeftRadius={4}
          borderTopRightRadius={4}
          style={{
            backgroundImage: `url('${image}')`,
            backgroundSize: 'cover',
          }}
        ></Pane>
        <Pane
          padding={10}
          className='d-flex d-lg-block d-xl-flex align-items-start justify-content-between'
        >
          <Pane>
            <Heading is='h2' size={500}>
              {name}
            </Heading>
            <Text color='#429777'>{'Pengelola : '}</Text>
            <Link>
              <NextLink href={`#${user.id}`}>
                <a style={{ color: '#a3e6cd' }}>{user.name}</a>
              </NextLink>
            </Link>
          </Pane>
          <Pane className='d-flex justify-content-center' marginLeft={4}>
            <Button appearance='primary'>Kelola</Button>
            <IconButton
              icon={TrashIcon}
              onClick={() => setShowDelete(true)}
              intent='danger'
              appearance='primary'
              marginLeft={5}
            />
          </Pane>
        </Pane>
      </Card>
    </Pane>
  )
}

export default Wisata
