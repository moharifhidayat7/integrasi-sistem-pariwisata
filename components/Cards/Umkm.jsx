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
import Image from 'next/image'
import { useRouter } from 'next/router'
const UMKM = ({ data, setShowDelete, setWisata }) => {
  const router = useRouter()
  return (
    <Pane
      className='col-sm-6 col-md-6 col-lg-3 col-xl-3 col-xxl-2'
      position='relative'
    >
      <Card elevation={1} backgroundColor='white' width='100%'>
        <Pane
          height={'9rem'}
          width='100%'
          borderTopLeftRadius={4}
          borderTopRightRadius={4}
          position='relative'
        >
          <Image
            alt={`${data.logo ? data.logo.name : 'Tidak ada Foto'}`}
            src={`${
              data.logo
                ? process.env.NEXT_PUBLIC_API_URI + data.logo.url
                : 'https://via.placeholder.com/300x180?text=Tidak+ada+foto'
            }`}
            layout='fill'
            objectFit='contain'
            quality={100}
          />
        </Pane>
        <Pane
          padding={10}
          className='d-flex flex-column align-items-center justify-content-between'
        >
          <Pane>
            <Heading is='h2' size={500}>
              {data.name}
            </Heading>
            {/* {data.users_permissions_user ? (
              <>
                <Text>{'Pengelola : '}</Text>
                <Link href='#'>{data.users_permissions_user.name}</Link>
              </>
            ) : (
              ''
            )} */}
          </Pane>
          <Pane className='d-flex justify-content-center' marginTop={12}>
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

export default UMKM
