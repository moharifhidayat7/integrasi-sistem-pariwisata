import Layout from '@components/Layouts/ClientLogin'
import ClientLoginForm from '@components/Forms/ClientLoginForm'

import { signIn, signOut, useSession, getSession } from 'next-auth/client'
import { useRouter } from 'next/router'
export default function Login() {
  const [session, loading] = useSession()
  const router = useRouter()

  if (session != null) {
    router.push('/')
  }
  return (
    <Layout title='Masuk'>
      <ClientLoginForm />
    </Layout>
  )
}
