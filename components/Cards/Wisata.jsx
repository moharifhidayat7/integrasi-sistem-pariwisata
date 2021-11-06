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
  EditIcon,
  UserIcon,
  Link,
  SettingsIcon,
  Button,
  Card,
} from 'evergreen-ui'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
const Wisata = ({ data, setShowDelete, setWisata }) => {
  const router = useRouter()
  return (
    <Pane className='col-sm-6 col-md-6 col-lg-3' position='relative'>
      <Card elevation={1} backgroundColor='white' width='100%'>
        <Pane
          height={160}
          width='100%'
          borderTopLeftRadius={4}
          borderTopRightRadius={4}
          style={{
            backgroundImage: `url(${process.env.NEXT_PUBLIC_API_URI}${data.featured_image.formats.thumbnail.url})`,
            backgroundSize: 'cover',
          }}
        ></Pane>
        <Pane
          padding={10}
          className='d-flex d-lg-block d-xl-flex align-items-start justify-content-between'
        >
          <Pane>
            <Heading is='h2' size={500}>
              {data.name}
            </Heading>
            <Text>{'Pengelola : '}</Text>
            <Link href='#'>{data.users_permissions_user.name}</Link>
          </Pane>
          <Pane className='d-flex justify-content-center' marginLeft={4}>
            <NextLink href={`${router.asPath}/${data.slug}`}>
              <a>
                <Button appearance='primary' iconBefore={EditIcon}>
                  Kelola
                </Button>
              </a>
            </NextLink>
            <IconButton
              icon={TrashIcon}
              onClick={() => {
                setWisata(data)
                setShowDelete(true)
              }}
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
