import Link from 'next/link'
import { useRouter } from 'next/router'
import _ from 'lodash'
const SingleMenu = ({ menu, router }) => {
  return (
    <div className='singleMenu'>
      {menu.map((m) => {
        return (
          <Link href={m.href} key={m.href}>
            <a
              className={
                _.includes(router.asPath, m.href)
                  ? 'active'
                  : ''
              }
            >
              {m.text}
            </a>
          </Link>
        )
      })}
    </div>
  )
}

export default SingleMenu
