import Layout from '@components/Layouts/ClientLogin'
import ClientLoginForm from '@components/Forms/ClientLoginForm'
import { getSession } from 'next-auth/react'

export default function Login() {
  return (
    <Layout title='Masuk'>
      <ClientLoginForm />
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
