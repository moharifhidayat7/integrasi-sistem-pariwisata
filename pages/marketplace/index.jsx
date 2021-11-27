import { useState, useEffect, useContext } from 'react'
import Layout from '@components/Layout'
import LayoutContent from '@components/Layouts/ClientContent'
import Link from 'next/link'
import Image from 'next/image'
import axios from 'axios'
import { formatRp } from '@helpers/functions'
import _ from 'lodash'
import { useSession, getSession } from 'next-auth/react'
import { GlobalContext } from '@components/Contexts/KeranjangContext'
const Cat = ({ onClick, text, active, setActive }) => {
  return (
    <button
      type='button'
      className={`list-group-item list-group-item-action ${
        active == text ? 'active' : ''
      }`}
      onClick={() => {
        onClick()
        setActive(text)
      }}
    >
      {text}
    </button>
  )
}

const Index = () => {
  const [data, setData] = useState([])
  const [active, setActive] = useState('Semua')
  const [search, setSearch] = useState('')
  const { data: session, status } = useSession()
  const { keranjang, addItemToList } = useContext(GlobalContext)

  const byCategory = async (kat) => {
    await axios
      .get(process.env.NEXT_PUBLIC_API_URI + '/products?category=' + kat)
      .then((res) => {
        setData(res.data)
      })
  }

  const getProduct = async () => {
    await axios
      .get(process.env.NEXT_PUBLIC_API_URI + '/products')
      .then((res) => {
        setData(res.data)
      })
  }

  const handleAdd = (item) => {
    if (session != null) {
      item.users_permissions_user = session.id
    }
    addItemToList(item)
  }

  useEffect(() => {
    const json = async () => {
      await axios
        .get(
          process.env.NEXT_PUBLIC_API_URI + '/products?name_contains=' + search
        )
        .then((res) => {
          setData(res.data)
        })
    }
    json()
  }, [search])

  useEffect(() => {
    const json = async () => {
      await axios
        .get(process.env.NEXT_PUBLIC_API_URI + '/products')
        .then((res) => {
          setData(res.data)
        })
    }
    json()
  }, [])
  return (
    <Layout title='Marketplace'>
      <LayoutContent>
        <div className='container'>
          <div className='contentPageTitle'>
            <h1>Marketplace</h1>
          </div>
          <div className='row'>
            <div className='col-md-4 col-sm-5 col-lg-3 col-12'>
              <div className='card p-4 mb-3'>
                <div className='form-group'>
                  <label
                    htmlFor='searchProduk'
                    className='mb-2 d-flex justify-content-between'
                  >
                    Pencarian
                    <a href='#' onClick={() => setSearch('')}>
                      Reset
                    </a>
                  </label>
                  <input
                    type='text'
                    className='form-control'
                    name='searchProduk'
                    placeholder='Cari Produk'
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
              </div>
              <div className='card p-4 mb-3'>
                <label className='mb-2'>Kategori</label>
                <div className='list-group'>
                  <Cat
                    text='Semua'
                    active={active}
                    setActive={setActive}
                    onClick={() => {
                      getProduct()
                    }}
                  />
                  <Cat
                    text='Peternakan'
                    active={active}
                    setActive={setActive}
                    onClick={() => {
                      byCategory('Peternakan')
                    }}
                  />
                  <Cat
                    text='Perkebunan'
                    active={active}
                    setActive={setActive}
                    onClick={() => {
                      byCategory('Perkebunan')
                    }}
                  />
                  <Cat
                    text='Kerajinan'
                    active={active}
                    setActive={setActive}
                    onClick={() => {
                      byCategory('Kerajinan')
                    }}
                  />
                  <Cat
                    text='Kuliner'
                    active={active}
                    setActive={setActive}
                    onClick={() => {
                      byCategory('Kuliner')
                    }}
                  />
                  <Cat
                    text='Lainnya'
                    active={active}
                    setActive={setActive}
                    onClick={() => {
                      byCategory('Lainnya')
                    }}
                  />
                </div>
              </div>
            </div>
            <div className='col-sm-7 col-md-8 col-lg-9 row g-2'>
              {data.length > 0 &&
                data
                  .filter((d) => d.visible == true)
                  .map((room) => (
                    <div
                      className='col-lg-4 col-xl-4 col-md-6 col-sm-12 col-6'
                      key={room.id}
                    >
                      <div className='card'>
                        <div style={{ height: '15rem', position: 'relative' }}>
                          <Link href={'/produk/' + room.id}>
                            <a>
                              <Image
                                src={
                                  process.env.NEXT_PUBLIC_API_URI +
                                  room.featured_image.url
                                }
                                alt={room.featured_image.name}
                                layout='fill'
                                objectFit='cover'
                                className='rounded p-2'
                              />
                            </a>
                          </Link>
                        </div>
                        <div className='card-body'>
                          <Link href={'/produk/' + room.id}>
                            <a className='productLink'>
                              <h5
                                className='card-title'
                                style={{ height: '2.2rem', overflow: 'hidden' }}
                              >
                                {room.name}
                              </h5>
                            </a>
                          </Link>
                          <p
                            style={{
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                            }}
                          >
                            <Link href='#'>
                              <a>
                                {room.object ? room.object.name : 'Pokdarwis'}
                              </a>
                            </Link>
                          </p>
                          <div className='d-flex flex-column gap-2'>
                            <span
                              style={{ color: '#38b520', fontSize: '1.2rem' }}
                            >
                              {formatRp(_.min(room.prices.map((p) => p.price)))}
                            </span>

                            <button
                              type='button'
                              className='btn ispBtn-primary px-3'
                              onClick={() =>
                                handleAdd({
                                  qty: 1,
                                  variation: room.prices[0],
                                  product: room,
                                })
                              }
                            >
                              Masukkan Keranjang
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
            </div>
          </div>
        </div>
      </LayoutContent>
    </Layout>
  )
}

export default Index
export async function getServerSideProps(context) {
  const session = await getSession(context)
  return {
    props: { session },
  }
}
