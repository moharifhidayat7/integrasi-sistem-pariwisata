import { useState, useEffect } from 'react'
import Layout from '@components/Layout'
import LayoutContent from '@components/Layouts/ClientContent'
import Link from 'next/link'
import Image from 'next/image'
import axios from 'axios'
import { formatRp } from '@helpers/functions'
import _ from 'lodash'

const Index = () => {
  const [data, setData] = useState([])

  return (
    <Layout title='Produk'>
      <LayoutContent>
        <div className='container'>
          <div className='contentPageTitle'>
            <h2>produk</h2>
          </div>
          <div className='row'>
            <div
              className='col-sm-12 col-md-6 d-flex flex-column justify-content-center align-items-center'
              style={{ backgroundColor: '#eeeeee', borderRadius: '5px' }}
            >
              <div
                style={{
                  position: 'relative',
                  height: '25rem',
                  width: '90%',
                }}
              >
                <Image
                  alt='ss'
                  src='/Puncak Asmoro.png'
                  layout='fill'
                  objectFit='contain'
                  objectPosition='center center'
                  className='p-2'
                />
              </div>
            </div>
            <div className='col-sm-12 col-md-6'>detail</div>
          </div>
        </div>
      </LayoutContent>
    </Layout>
  )
}

export default Index
