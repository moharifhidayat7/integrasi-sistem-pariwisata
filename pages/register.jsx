import Layout from '@components/Layouts/ClientLogin'
import ClientRegisterForm from '@components/Forms/ClientRegisterForm'

import { signIn, signOut, useSession, getSession } from 'next-auth/client'
import { useRouter } from 'next/router'

export default function Login() {
  const [session, loading] = useSession()
  const router = useRouter()

  if (session != null) {
    router.push('/')
  }

  return (
    <Layout title='Daftar'>
      <ClientRegisterForm />
    </Layout>
  )
}
