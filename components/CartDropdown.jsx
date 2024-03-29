import { Dropdown, FormControl } from 'react-bootstrap'
import React, { useState, Children, forwardRef, useContext } from 'react'
import { signOut } from 'next-auth/react'
import { GlobalContext } from './Contexts/KeranjangContext'
import Cart from './Cart'
import { formatRp } from '@helpers/functions'
import _ from 'lodash'
import Link from 'next/link'
import { Trash } from 'react-bootstrap-icons'
// The forwardRef is important!!
// Dropdown needs access to the DOM node in order to position the Menu
const CustomToggle = forwardRef(({ children, onClick }, ref) => (
  <a
    href=''
    ref={ref}
    onClick={(e) => {
      e.preventDefault()
      onClick(e)
    }}
  >
    {children}
  </a>
))

CustomToggle.displayName = 'CustomToggle'

// forwardRef again here!
// Dropdown needs access to the DOM of the Menu to measure it
const CustomMenu = forwardRef(
  ({ children, style, className, 'aria-labelledby': labeledBy }, ref) => {
    const [value, setValue] = useState('')

    return (
      <div
        ref={ref}
        style={style}
        className={className}
        aria-labelledby={labeledBy}
      >
        <ul className='list-group px-2' style={{ width: '400px' }}>
          {Children.toArray(children).filter(
            (child) =>
              !value || child.props.children.toLowerCase().startsWith(value)
          )}
        </ul>
      </div>
    )
  }
)

CustomMenu.displayName = 'CustomMenu'
const CartDropdown = ({ className }) => {
  const { keranjang, removeItemFromList } = useContext(GlobalContext)
  return (
    <Dropdown align='end' className='ms-auto'>
      <Dropdown.Toggle as={CustomToggle} id='dropdown-custom-components'>
        <Cart className={className} />
      </Dropdown.Toggle>

      <Dropdown.Menu as={CustomMenu} className='mt-4'>
        <div style={{ overflowY: 'auto', maxHeight: '20rem' }}>
          {keranjang != null &&
            keranjang.length > 0 &&
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
                    {` (${formatRp(
                      item.variation.price + item.variation.fee
                    )})`}
                  </p>
                  <small style={{ color: '#38b520' }}>
                    {formatRp(
                      (item.variation.price + item.variation.fee) * item.qty
                    )}
                  </small>
                </a>
              )
            })}
        </div>
        <div className='px-2 py-3 d-flex justify-content-between align-items-center'>
          <div>
            <strong>Total : </strong>{' '}
            <strong style={{ color: '#38b520' }}>
              {formatRp(
                _.sumBy(
                  keranjang,
                  (k) => k.qty * (k.variation.price + k.variation.fee)
                )
              )}
            </strong>
          </div>
          <div>
            {keranjang != null && keranjang.length > 0 && (
              <Link href='/marketplace/bayar'>
                <a role='button' className='btn ispBtn-primary px-5'>
                  Bayar
                </a>
              </Link>
            )}
          </div>
        </div>
      </Dropdown.Menu>
    </Dropdown>
  )
}

export default CartDropdown
