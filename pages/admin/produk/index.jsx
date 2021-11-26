import useSWR from 'swr'
import { useEffect, useState } from 'react'
import { formatRp } from '../../../src/helpers/functions'
import Layout from '../../../components/Layouts/Admin'
import Content from '../../../components/Content'
import CardUMKM from '../../../components/Cards/Umkm'
import {
  Dialog,
  Button,
  Table,
  Card,
  Pane,
  Strong,
  EditIcon,
  IconButton,
  Badge,
  TrashIcon,
  PlusIcon,
  ResetIcon,
  SearchInput,
  Text,
  SelectMenu,
} from 'evergreen-ui'
import { useRouter } from 'next/router'
import Image from 'next/image'
import Link from 'next/link'
import ControlledSwitch from '@components/ControlledSwitch'
import axios from 'axios'
import { signIn, signOut, useSession, getSession } from 'next-auth/react'
const Produk = () => {
  const [data, setData] = useState([])
  const [value, setValue] = useState([])
  const [showDelete, setShowDelete] = useState(false)
  const router = useRouter()
  const [search, setSearch] = useState('')
  const [selectPenjual, setSelectPenjual] = useState(null)
  const [penjual, setPenjual] = useState([])
  const [squery, setSquery] = useState('')

  const toastMessage = () => {
    toaster.success('Data Berhasil di Edit', {
      duration: 4,
    })
  }

  const mutate = () => {
    const json = async () => {
      await axios
        .get(
          process.env.NEXT_PUBLIC_API_URI +
            `/products?name_contains=${search}&_sort=created_at:desc${squery}`
        )
        .then((res) => {
          setData(res.data)
        })
    }
    json()
  }

  const onDelete = (id) => {
    axios
      .delete(`${process.env.NEXT_PUBLIC_API_URI}/products/${id}`)
      .then((response) => {
        setShowDelete(false)
        mutate()
      })
      .catch((error) => console.log(error))
  }

  useEffect(() => {
    const getPenjual = async () => {
      const json = await fetch(
        `${process.env.NEXT_PUBLIC_API_URI}/objects?type=UMKM`
      ).then((res) => res.json())

      setPenjual(json.map((j) => ({ label: j.name, value: j.id })))
    }
    getPenjual()
  }, [])

  useEffect(() => {
    const json = async () => {
      await axios
        .get(
          process.env.NEXT_PUBLIC_API_URI +
            `/products?name_contains=${search}&_sort=created_at:desc${squery}`
        )
        .then((res) => {
          setData(res.data)
        })
    }
    json()
  }, [search, squery])

  return (
    <Layout title='Produk'>
      <Dialog
        isShown={showDelete}
        title={`Hapus "${value.name}"`}
        intent='danger'
        onCloseComplete={() => {
          setShowDelete(false)
        }}
        confirmLabel='Delete'
        onConfirm={() => onDelete(value.id)}
      >
        Apakah anda yakin ingin menghapus &quot;{value.name}&quot;?
      </Dialog>
      <Content>
        <Content.Header
          title='Produk'
          button={
            <Button
              appearance='primary'
              size='large'
              onClick={() => router.push(`${router.asPath}/tambah`)}
              iconBefore={PlusIcon}
            >
              Tambah Produk
            </Button>
          }
        />
        <Content.Body>
          <Pane>
            <Pane className='row' marginY={10}>
              <Pane
                className='col-md-9 col-sm-12 d-flex gap-2 justify-content-start align-items-center'
                paddingY={5}
              >
                <Text color='muted'>Filter</Text>
                {/* <SingleSelectedItem name='Kategori ...' /> */}
                <SelectMenu
                  title='Penjual ...'
                  options={[{ label: 'Semua', value: '' }, ...penjual]}
                  selected={selectPenjual}
                  onSelect={(item) => {
                    if (item.value == '') {
                      setSelectPenjual()
                      setSquery('')
                    } else {
                      setSelectPenjual(item.label)
                      setSquery('&object=' + item.value)
                    }
                  }}
                >
                  <Button>{selectPenjual || 'Penjual ...'}</Button>
                </SelectMenu>
                <Button
                  iconBefore={ResetIcon}
                  onClick={(e) => {
                    setSelectPenjual()
                    setSearch('')
                    setSquery('')
                  }}
                >
                  Reset
                </Button>
              </Pane>
              <Pane className='col-md-3 col-sm-12' paddingY={5}>
                <SearchInput
                  width='100%'
                  placeholder='Cari Produk ...'
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </Pane>
            </Pane>
            <Pane overflowX='auto'>
              <Pane>
                <Table overflowX='auto'>
                  <Table.Head borderRadius={4}>
                    <Table.TextHeaderCell>Foto</Table.TextHeaderCell>
                    <Table.TextHeaderCell>Nama Produk</Table.TextHeaderCell>
                    <Table.TextHeaderCell>Kategori</Table.TextHeaderCell>
                    <Table.TextHeaderCell>Penjual</Table.TextHeaderCell>
                    <Table.TextHeaderCell>Harga</Table.TextHeaderCell>
                    <Table.TextHeaderCell>Tampilkan</Table.TextHeaderCell>
                    <Table.TextHeaderCell textAlign='center'>
                      Aksi
                    </Table.TextHeaderCell>
                  </Table.Head>
                  <Table.Body>
                    {data &&
                      data.map((profile, index) => (
                        <Table.Row
                          key={index}
                          height='auto'
                          paddingY={10}
                          marginY={5}
                          borderRadius={4}
                          className='shadow-sm'
                        >
                          <Table.Cell>
                            <Pane
                              width={80}
                              height={80}
                              position='relative'
                              borderRadius={4}
                              overflow='hidden'
                            >
                              <Image
                                alt={profile.featured_image.name}
                                src={
                                  process.env.NEXT_PUBLIC_API_URI +
                                  profile.featured_image.url
                                }
                                layout='fill'
                                objectFit='cover'
                              />
                            </Pane>
                          </Table.Cell>
                          <Table.TextCell>
                            <Strong>{profile.name}</Strong>
                          </Table.TextCell>
                          <Table.TextCell>
                            {profile.category && (
                              <Badge color='blue'>{profile.category}</Badge>
                            )}
                          </Table.TextCell>
                          <Table.TextCell>
                            {profile.object && (
                              <Link href='#'>
                                <a>
                                  <Text color='blue500'>
                                    {profile.object.name}
                                  </Text>
                                </a>
                              </Link>
                            )}
                          </Table.TextCell>
                          <Table.TextCell isNumber>
                            {profile.prices != null &&
                              profile.prices.map((ps, index) => (
                                <Strong
                                  color='green500'
                                  key={index + ps.variation}
                                >
                                  {ps.variation} - {formatRp(ps.price)} <br />
                                </Strong>
                              ))}
                          </Table.TextCell>
                          <Table.TextCell>
                            <ControlledSwitch
                              id={profile.id}
                              defaultCheck={profile.visible}
                              mutate={mutate}
                            />
                          </Table.TextCell>
                          <Table.Cell className='d-flex justify-content-end align-items-center gap-1'>
                            <Link href={`${router.asPath}/${profile.id}`}>
                              <a>
                                <Button
                                  appearance='primary'
                                  iconBefore={EditIcon}
                                >
                                  Edit
                                </Button>
                              </a>
                            </Link>
                            <IconButton
                              icon={TrashIcon}
                              intent='danger'
                              appearance='primary'
                              onClick={(e) => {
                                setValue(profile)
                                setShowDelete(true)
                              }}
                            />
                          </Table.Cell>
                        </Table.Row>
                      ))}
                  </Table.Body>
                </Table>
              </Pane>
            </Pane>
          </Pane>
        </Content.Body>
        {/* <Content.Pagination /> */}
      </Content>
    </Layout>
  )
}

export default Produk
