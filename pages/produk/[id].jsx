import { useState, useEffect, useContext } from 'react'
import Layout from '@components/Layout'
import LayoutContent from '@components/Layouts/ClientContent'
import Link from 'next/link'
import Image from 'next/image'
import axios from 'axios'
import { formatRp } from '@helpers/functions'
import _ from 'lodash'
import { Splide, SplideSlide } from '@splidejs/react-splide'
import ProdukSlider from '@components/ProdukSlider'
import { useRouter } from 'next/router'
import { GlobalContext } from '@components/Contexts/KeranjangContext'
import { useSession, getSession } from 'next-auth/react'
const Variasi = ({ data, vari, set }) => {
  return (
    <button
      type='button'
      className={`btn btnVar border-2 d-inline-block me-2 ${
        vari.variation == data.variation ? 'btnVarActive' : ''
      }`}
      onClick={() => set(data)}
    >
      {data.variation}
    </button>
  )
}

const Index = ({ data }) => {
  const router = useRouter()
  const { data: session, status } = useSession()
  const { addItemToList } = useContext(GlobalContext)
  const { id } = router.query
  const [related, setRelated] = useState([])
  const [curVar, setCurVar] = useState()
  const [qty, setQty] = useState(1)

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
          process.env.NEXT_PUBLIC_API_URI +
            '/products?category=' +
            data.category
        )
        .then((res) => {
          setRelated(res.data)
        })
    }
    json()
  }, [])

  useEffect(() => {
    setCurVar()
  }, [id])

  return (
    <Layout title='Produk'>
      <LayoutContent>
        <div className='container'>
          <div className='contentPageTitle'>{/* <h2>produk</h2> */}</div>
          <div className='row py-3 border-bottom'>
            <div className='col-sm-12 col-md-6'>
              <ProdukSlider
                images={[
                  {
                    src:
                      process.env.NEXT_PUBLIC_API_URI + data.featured_image.url,
                    alt: data.featured_image.name,
                  },
                  ...data.images.map((im) => {
                    return {
                      src: process.env.NEXT_PUBLIC_API_URI + im.url,
                      alt: im.name,
                    }
                  }),
                ]}
              />
            </div>
            <div className='col-sm-12 col-md-6 mt-sm-3'>
              <div className='p-3 border-bottom'>
                <h2>{data.name}</h2>
                {curVar != null ? (
                  <h1 style={{ color: '#38b520' }}>
                    {formatRp(curVar.price + curVar.fee)}
                  </h1>
                ) : (
                  <h1 style={{ color: '#38b520' }}>
                    {formatRp(_.min(data.prices.map((p) => p.price + p.fee)))}{' '}
                    {_.max(data.prices.map((p) => p.price + p.fee)) !=
                    _.min(data.prices.map((p) => p.price + p.fee))
                      ? ' - ' +
                        formatRp(_.max(data.prices.map((p) => p.price + p.fee)))
                      : ''}
                  </h1>
                )}
              </div>
              <div
                className='p-3 border-bottom'
                style={{ backgroundColor: '#eeeeee' }}
              >
                <strong>Kategori: </strong>
                <span className='badge bg-primary ms-3'>{data.category}</span>
              </div>
              <div className='p-3 border-bottom'>
                <strong>Deskripsi:</strong>
                <br />
                <p>{data.description ? data.description : '-'}</p>
              </div>
              <div className='p-3 border-bottom'>
                <strong className='me-3'>Variasi:</strong>
                {data.prices.map((v) => {
                  return (
                    <Variasi
                      key={v.variation}
                      data={v}
                      vari={curVar != null && curVar}
                      set={setCurVar}
                    />
                  )
                })}
              </div>
              <div className='p-3 d-flex justify-content-start'>
                <div
                  className='input-group input-group-lg mb-3 me-3'
                  style={{ width: 200 }}
                >
                  <span className='input-group-text' id='basic-addon1'>
                    Qty
                  </span>
                  <input
                    type='number'
                    className='form-control text-center'
                    placeholder='Qty'
                    value={qty}
                    onChange={(e) => setQty(e.target.value)}
                  />
                </div>
                <div className='d-inline-block'>
                  <a
                    role='button'
                    className='btn btn-lg ispBtn-primary'
                    onClick={() =>
                      handleAdd({
                        qty: parseInt(qty),
                        variation: curVar != null ? curVar : data.prices[0],
                        product: data,
                      })
                    }
                  >
                    Masukkan Keranjang
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className='row mt-5'>
            {related.length > 1 && (
              <>
                <h4 className='mb-4'>
                  Produk &quot;{data.category}&quot; lainnya
                </h4>

                {related
                  .filter((d) => (d.visible == true) & (d.id != data.id))
                  .map((room) => (
                    <div
                      className='col-lg-3 col-xl-3 col-md-4 col-sm-12 col-12'
                      key={room.id}
                    >
                      <div className='card'>
                        <Link href={'/produk/' + room.id}>
                          <a>
                            <div
                              style={{ height: '15rem', position: 'relative' }}
                            >
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
                            </div>
                          </a>
                        </Link>
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
                            className='border-bottom pb-2'
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
                              {formatRp(
                                _.min(room.prices.map((p) => p.price + p.fee))
                              )}
                            </span>
                            <Link href={'/produk/' + room.id}>
                              <a
                                role='button'
                                className='btn ispBtn-primary px-3'
                              >
                                Beli
                              </a>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </>
            )}
          </div>
        </div>
      </LayoutContent>
    </Layout>
  )
}

export default Index

export async function getServerSideProps(context) {
  const id = context.params.id
  const session = await getSession(context)

  const data = await axios
    .get(process.env.API_URI + '/products/' + id)
    .then((res) => res.data)

  return {
    props: {
      data,
      session,
    },
  }
}
