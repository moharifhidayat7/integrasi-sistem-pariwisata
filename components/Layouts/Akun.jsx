import Layout from '@components/Layout'
import LayoutContent from '@components/Layouts/ClientContent'
import UserNav from '@components/UserNav'
import { useRouter } from 'next/router'
const Akun = ({ children, title }) => {
  const router = useRouter()
  return (
    <Layout title={title} withFooter={false}>
      <LayoutContent>
        <div className='container'>
          <div className='contentPageTitle'>
            <h1>{title}</h1>
          </div>

          <div className='row'>
            <div className='col-12 col-md-3'>
              <div
                className='nav nav-pills card p-3'
                id='v-pills-tab'
                role='tablist'
                aria-orientation='vertical'
              >
                <UserNav href={'/akun/profil'} text='Profil' />
                <UserNav href={'/akun/booking'} text='Bookingan' />
                <UserNav href={'/akun/pesanan'} text='Pesanan' />
                <UserNav href={'/akun/ganti-password'} text='Ganti Password' />
                <UserNav href={'/logout'} text='Keluar' />
              </div>
            </div>
            <div
              className='tab-content col-12 col-md-9 px-0 px-md-5 pt-2 pt-md-0'
              id='v-pills-tabContent'
            >
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
