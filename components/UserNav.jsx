import Link from 'next/link'
import { useRouter } from 'next/router'
import _ from 'lodash'
const UserNav = ({ href, text }) => {
  const router = useRouter()
  return (
    <Link href={href}>
      <a
        className={`nav-link userNav ${
          _.includes(router.pathname, href) ? 'activeNav' : ''
        }`}
        id='v-pills-home-tab'
        data-bs-toggle='pill'
        data-bs-target='#v-pills-home'
        type='button'
        role='tab'
        aria-controls='v-pills-home'
        aria-selected='true'
      >
        {text}
      </a>
    </Link>
  )
}

export default UserNav
