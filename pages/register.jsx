import Layout from '@components/Layouts/ClientLogin'
import ClientRegisterForm from '@components/Forms/ClientRegisterForm'

import { getSession } from 'next-auth/react'

export default function Login() {
  return (
    <Layout title='Daftar'>
      <ClientRegisterForm />
    </Layout>
  )
}

export async function getServerSideProps(context) {
  const session = await getSession(context)
  if (session.jwt) {
    if (session.role.id === 4) {
      return {
        redirect: {
          destination: '/admin',
          permanent: false,
        },
      }
    }
    return {
      redirect: {
        destination: '/account',
        permanent: false,
      },
    }
  }

  return {
    props: {},
  }
}
