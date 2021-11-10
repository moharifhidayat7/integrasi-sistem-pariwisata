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
const Wisata = ({ data, setShowDelete, setWisata }) => {
  const router = useRouter()
  return (
    <Pane className='col-sm-6 col-md-6 col-lg-4' position='relative'>
      <Card elevation={1} backgroundColor='white' width='100%'>
        <Pane
          height={'9rem'}
          width='100%'
          borderTopLeftRadius={4}
          borderTopRightRadius={4}
          position='relative'
        >
          <Image
            alt={`${
              data.featured_image ? data.featured_image.name : 'Tidak ada Foto'
            }`}
            src={`${
              data.featured_image
                ? process.env.NEXT_PUBLIC_API_URI +
                  data.featured_image.formats.thumbnail.url
                : 'https://via.placeholder.com/300x180?text=Tidak+ada+foto'
            }`}
            layout='fill'
            objectFit='cover'
            quality={100}
          />
        </Pane>
        <Pane
          padding={10}
          className='d-flex d-lg-block d-xl-flex align-items-start justify-content-between'
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
