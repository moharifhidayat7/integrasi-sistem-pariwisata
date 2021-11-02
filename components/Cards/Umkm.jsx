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
const UMKM = ({ name, id, userId, image, user, setShowDelete }) => {
  return (
    <Pane className='col-sm-6 col-md-4 col-lg-3 col-xl-2' position='relative'>
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
        <Pane padding={10}>
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
          <Pane
            className='d-flex justify-content-center align-items-center'
            marginTop={5}
          >
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

export default UMKM
