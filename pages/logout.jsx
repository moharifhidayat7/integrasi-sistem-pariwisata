import { signIn, signOut, useSession, getSession } from 'next-auth/react'
import { useEffect } from 'react'
const Logout = () => {
  const { data: session, status } = useSession()
  useEffect(() => {
    signOut({ redirect: true, callbackUrl: '/' })
  }, [])
  return <></>
}

export default Logout
