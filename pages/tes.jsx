import { signIn, signOut, useSession, getSession } from 'next-auth/client'
import { useRouter } from 'next/router'
const Tes = () => {
  const [session, loading] = useSession()
  const router = useRouter()

  if (session === null) {
    router.push('/login')
  }

  return (
    <div>
      <button onClick={() => signOut()}>Signout</button>
      {JSON.stringify(session)}
    </div>
  )
}

export default Tes
