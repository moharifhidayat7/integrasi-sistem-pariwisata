import { Dropdown, FormControl } from 'react-bootstrap'
import React, { useState, Children, forwardRef } from 'react'
import { signOut } from 'next-auth/react'
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
    &#x25bc;
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
        <ul className='list-unstyled'>
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
const LoggedIn = () => {
  return (
    <Dropdown align='end'>
      <Dropdown.Toggle as={CustomToggle} id='dropdown-custom-components'>
        Akun Saya
      </Dropdown.Toggle>

      <Dropdown.Menu as={CustomMenu}>
        <Dropdown.Item eventKey='1' href='/akun/profil'>
          Profil
        </Dropdown.Item>
        <Dropdown.Item eventKey='2' href='/user/booking'>
          Booking
        </Dropdown.Item>
        <Dropdown.Item eventKey='3' href='/user/pesanan'>
          Pesanan
        </Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item
          eventKey='4'
          href='#'
          onClick={() => signOut({ redirect: false, callbackUrl: '/' })}
        >
          Logout
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  )
}

export default LoggedIn
