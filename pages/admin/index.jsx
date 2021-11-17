import Layout from '@components/Layouts/Admin'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
const index = () => {
  const router = useRouter()
  const { data: session, status } = useSession()

  if (status === 'unauthenticated') {
    router.push('/login')
  }

  return <Layout title='Dashboard'>Masuk sebagai {session}</Layout>
}

export default index
