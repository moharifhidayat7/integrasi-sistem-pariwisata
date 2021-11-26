import { Dropdown, FormControl } from 'react-bootstrap'
import React, { useState, Children, forwardRef, useContext } from 'react'
import { signOut } from 'next-auth/react'
import { GlobalContext } from './Contexts/KeranjangContext'
import Cart from './Cart'
import { formatRp } from '@helpers/functions'
import _ from 'lodash'
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
const CartDropdown = () => {
  const { keranjang, removeItemFromList } = useContext(GlobalContext)
  return (
    <Dropdown align='end' className='ms-auto'>
      <Dropdown.Toggle as={CustomToggle} id='dropdown-custom-components'>
        <Cart />
      </Dropdown.Toggle>

      <Dropdown.Menu as={CustomMenu}>
        <div style={{ overflowY: 'auto', maxHeight: '20rem' }}>
          {keranjang &&
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
        </div>
        <div className='px-2 py-3 d-flex justify-content-between align-items-center'>
          <div>
            <strong>Total : </strong>{' '}
            <strong style={{ color: '#38b520' }}>
              {formatRp(_.sumBy(keranjang, (k) => k.qty * k.variation.price))}
            </strong>
          </div>
          <div>
            <a role='button' href='#' className='btn ispBtn-primary px-5'>
              Bayar
            </a>
          </div>
        </div>
      </Dropdown.Menu>
    </Dropdown>
  )
}

export default CartDropdown
