import Layout from '@components/Layouts/Akun'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { clientAxios, formatRp } from '@helpers/functions'
import { useSession, getSession } from 'next-auth/react'
const Pesanan = () => {
  const { data: session, status } = useSession()
  const [pesanan, setPesanan] = useState([])

  useEffect(() => {
    const json = async () => {
      await axios
        .get(
          process.env.NEXT_PUBLIC_API_URI +
            '/orders?users_permissions_user=' +
            session.id
        )
        .then((res) => {
          setPesanan(res.data)
        })
    }
    json()
  }, [])
  return (
    <Layout title='Pesanan'>
      <div className='list-group'>
        {pesanan.map((order) => {
          return (
            <Link href={'/marketplace/bayar/' + order.id} key={order.id}>
              <a
                className='list-group-item list-group-item-action'
                aria-current='true'
              >
                <div className='d-flex w-100 justify-content-between'>
                  <h5 className='mb-1'>Order #{order.id}</h5>
                  <small>
                    {new Date(order.created_at).toLocaleString('id-ID', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour12: false,
                      hour: '2-digit',
                      minute: '2-digit',
                      second: '2-digit',
                    })}
                  </small>
                </div>
                <div className='d-flex justify-content-between'>
                  <span>{order.items.length} Produk</span>
                  <span>
                    Total :{' '}
                    <span style={{ color: '#38b520' }}>
                      {formatRp(
                        _.sumBy(order.items, (k) => k.qty * k.variation.price) +
                          order.ongkir +
                          order.fee
                      )}
                    </span>
                  </span>
                </div>
                <span>Resi : {order.resi}</span>
                <br />
                <span>Status : {order.status}</span>
              </a>
            </Link>
          )
        })}
      </div>
    </Layout>
  )
}

export default Pesanan
export async function getServerSideProps(context) {
  const session = await getSession(context)

  return {
    props: { session },
  }
}
