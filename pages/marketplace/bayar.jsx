import Layout from '@components/Layout'
import LayoutContent from '@components/Layouts/ClientContent'
import { useState, useEffect, useContext } from 'react'
import { GlobalContext } from '@components/Contexts/KeranjangContext'
import { useSession, getSession } from 'next-auth/react'
import { formatRp } from '@helpers/functions'
import { Trash } from 'react-bootstrap-icons'
import _ from 'lodash'
const Bayar = () => {
  const { data: session, status } = useSession()
  const { keranjang, addItemToList, removeItemFromList } =
    useContext(GlobalContext)
  return (
    <Layout title='Bayar'>
      <LayoutContent>
        <div className='container'>
          <div className='contentPageTitle'>
            <h1>Pembayaran</h1>
          </div>
          <div className='row g-5'>
            <div className='col-md-5 col-lg-4 order-md-last'>
              <h4 className='d-flex justify-content-between align-items-center mb-3'>
                <span className='text-primary'>Keranjang</span>
                <span className='badge bg-primary rounded-pill'>
                  {keranjang.length}
                </span>
              </h4>
              <div className='list-group mb-3'>
                {keranjang.length > 0 &&
                  keranjang.map((item, index) => {
                    return (
                      <a
                        key={index}
                        className='list-group-item list-group-item-action'
                        aria-current='true'
                      >
                        <div className='d-flex w-100 justify-content-between'>
                          <h5 className='mb-1'>{item.product.name}</h5>
                          <button
                            type='button'
                            className='btn btn-danger btn-sm'
                            onClick={() => removeItemFromList(item)}
                          >
                            <Trash />
                          </button>
                        </div>
                        <p className='mb-1'>
                          {item.qty} x {item.variation.variation}
                          {` (${formatRp(item.variation.price)})`}
                        </p>
                        <small style={{ color: '#38b520' }}>
                          {formatRp(item.variation.price * item.qty)}
                        </small>
                      </a>
                    )
                  })}

                <li className='list-group-item d-flex justify-content-between'>
                  <span>Total :</span>
                  <strong style={{ color: '#38b520' }}>
                    {formatRp(
                      _.sumBy(keranjang, (k) => k.qty * k.variation.price)
                    )}
                  </strong>
                </li>
              </div>
            </div>
            <div className='col-md-7 col-lg-8'>
              <h4 className='mb-3'>Alamat Pengiriman</h4>
              <form className='needs-validation' noValidate>
                <div className='row g-3'>
                  <div className='col-sm-12'>
                    <label htmlFor='name' className='form-label'>
                      Nama Lengkap
                    </label>
                    <input
                      type='text'
                      className='form-control'
                      id='name'
                      placeholder=''
                      value=''
                      required
                    />
                    <div className='invalid-feedback'>
                      Valid first name is required.
                    </div>
                  </div>

                  <div className='col-12'>
                    <label htmlFor='address' className='form-label'>
                      Alamat
                    </label>
                    <input
                      type='text'
                      className='form-control'
                      id='address'
                      placeholder='1234 Main St'
                      required
                    />
                    <div className='invalid-feedback'>
                      Please enter your shipping address.
                    </div>
                  </div>
                  <div className='col-md-6'>
                    <label htmlFor='country' className='form-label'>
                      Kota
                    </label>
                    <select className='form-select' id='country' required>
                      <option value=''>Choose...</option>
                      <option>United States</option>
                    </select>
                    <div className='invalid-feedback'>
                      Please select a valid country.
                    </div>
                  </div>

                  <div className='col-md-6'>
                    <label htmlFor='zip' className='form-label'>
                      Kode Pos
                    </label>
                    <input
                      type='text'
                      className='form-control'
                      id='zip'
                      placeholder=''
                      required
                    />
                    <div className='invalid-feedback'>Zip code required.</div>
                  </div>
                </div>
                <hr className='my-4' />
                <div className='form-check'>
                  <input
                    type='checkbox'
                    className='form-check-input'
                    id='same-address'
                  />
                  <label className='form-check-label' htmlFor='same-address'>
                    Alamat pengiriman sama dengan alamat akun saya
                  </label>
                </div>

                <hr className='my-4' />
                <button className='w-100 btn btn-primary btn-lg' type='submit'>
                  Continue to checkout
                </button>
              </form>
            </div>
          </div>
        </div>
      </LayoutContent>
    </Layout>
  )
}

export default Bayar
export async function getServerSideProps(context) {
  const session = await getSession(context)
  return {
    props: { session },
  }
}
