import { signIn, signOut, useSession, getSession } from 'next-auth/client'
import { useEffect } from 'react'
const Logout = () => {
  const [session, loading] = useSession()
  useEffect(() => {
    signOut({ redirect: true, callbackUrl: '/' })
  }, [])
  return <></>
}

export default Logout
