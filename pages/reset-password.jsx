import Layout from '@components/Layouts/ClientLogin'
import ClientReset from '@components/Forms/ClientReset'
import { getSession } from 'next-auth/react'

export default function Login() {
  return (
    <Layout title='Reset Password'>
      <ClientReset />
    </Layout>
  )
}

export async function getServerSideProps(context) {
  const session = await getSession(context)
  if (session) {
    if (session.role.id === 4) {
      return {
        redirect: {
          destination: '/admin',
          permanent: false,
        },
      }
    }
    if (session.role.id === 3) {
      return {
        redirect: {
          destination: '/pengelola',
          permanent: false,
        },
      }
    }
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  return {
    props: {},
  }
}
