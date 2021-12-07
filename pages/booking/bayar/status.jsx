import Layout from '@components/Layout'
import LayoutContent from '@components/Layouts/ClientContent'
import { useState, useEffect, useContext } from 'react'
import Link from 'next/link'
const Bayar = () => {
  return (
    <Layout title='Terima Kasih' withFooter={false}>
      <LayoutContent>
        <div className='container'>
          <div className='contentPageTitle'>
            <h1>Terima Kasih</h1>
          </div>
          <div className='row g-5'>
            <div className='col-md-7 col-lg-8'>
              <h4 className='mb-3'>
                Silahkan menunggu 1x24 jam untuk admin mengkonfirmasi pembayaran
                anda!
              </h4>
              <h4>
                <Link href='/akun/booking'>
                  <a>Lihat Status</a>
                </Link>
              </h4>
            </div>
          </div>
        </div>
      </LayoutContent>
    </Layout>
  )
}

export default Bayar
