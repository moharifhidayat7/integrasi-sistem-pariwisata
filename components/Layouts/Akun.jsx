import Layout from '@components/Layout'
import LayoutContent from '@components/Layouts/ClientContent'
import UserNav from '@components/UserNav'
import { useRouter } from 'next/router'
const Akun = ({ children }) => {
  const router = useRouter()
  return (
    <Layout title='Akun Saya'>
      <LayoutContent>
        <div className='container'>
          <div className='contentPageTitle'>
            <h1>Akun</h1>
          </div>

          <div className='d-flex align-items-start'>
            <div
              className='nav flex-column nav-pills me-3 col-3'
              id='v-pills-tab'
              role='tablist'
              aria-orientation='vertical'
            >
              <UserNav href={'/akun/profil'} text='Profil' />
              <UserNav href={'/akun/booking'} text='Bookingan' />
              <UserNav href={'/akun/pesanan'} text='Pesanan' />
              <UserNav href={'/akun/ganti-password'} text='Ganti Password' />
            </div>
            <div className='tab-content col-9' id='v-pills-tabContent'>
              <div
                className='tab-pane fade show active'
                id='v-pills-home'
                role='tabpanel'
                aria-labelledby='v-pills-home-tab'
              >
                {children}
              </div>
            </div>
          </div>
        </div>
      </LayoutContent>
    </Layout>
  )
}

export default Akun
