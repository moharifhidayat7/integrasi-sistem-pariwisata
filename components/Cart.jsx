import { useEffect, useState, useContext } from 'react'
import { Cart4 } from 'react-bootstrap-icons'
import { useSession } from 'next-auth/react'
import axios from 'axios'
import { GlobalContext } from './Contexts/KeranjangContext'

const Cart = () => {
  const [show, setShow] = useState(false)
  const { data: session, status } = useSession()
  const { keranjang, addItemToList } = useContext(GlobalContext)

  useEffect(() => {
    localStorage.setItem('keranjang', JSON.stringify(keranjang))
  }, [keranjang])

  // useEffect(() => {
  //   // if (session == null) {
  //   const ker = localStorage.getItem('keranjang')
  //   // addItemToList(JSON.parse(ker))
  //   // } else {
  //   //   const json = async () => {
  //   //     await axios
  //   //       .get(
  //   //         process.env.NEXT_PUBLIC_API_URI +
  //   //           '/carts?users_permissions_user=' +
  //   //           session.id
  //   //       )
  //   //       .then((res) => {
  //   //         addItemToList(...res.data)
  //   //       })
  //   //   }
  //   //   json()
  //   // }
  // }, [])

  return (
    <div className='ms-auto position-relative'>
      <Cart4
        size={'2rem'}
        className='position-relative keranjang'
        onClick={() => setShow(!show)}
      />
      {keranjang.length > 0 && (
        <span className='position-absolute translate-middle badge rounded-pill bg-danger'>
          {keranjang.length}
          <span className='visually-hidden'>Keranjang</span>
        </span>
      )}
    </div>
  )
}

export default Cart
