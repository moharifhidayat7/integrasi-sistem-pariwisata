import _ from 'lodash'
import { useEffect, useState } from 'react'
import { Splide, SplideSlide } from '@splidejs/react-splide'
import Image from 'next/image'
import style from './Header.module.scss'
const Header = () => {
  const [background, setBackground] = useState('/Puncak%20Asmoro.png')
  const [index, setIndex] = useState(0)

  const list = [
    '/Puncak%20Asmoro.png',
    '/Air%20Terjun%20Goa%20Pengantin.png',
    '/Sumber%20Manis.png',
  ]

  useEffect(() => {
    setTimeout(() => {
      setBackground(list[index])
      if (index >= list.length - 1) {
        setIndex(0)
      } else {
        setIndex(index + 1)
      }
    }, 4000)
  }, [index])

  return (
    <header
      className={`masthead ${style.mHead}`}
      style={{
        position: 'relative',
        backgroundImage: `url(${background})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className='container px-5'>
        <div className={`row gx-5 align-items-center ${style.headerH}`}>
          <div className='mb-5 mb-lg-0 text-center text-lg-start'>
            <h1 className='display-2 mb-3 text-center'>
              Rumah Digital
              <br />
              Gombengsari, Banyuwangi
            </h1>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
