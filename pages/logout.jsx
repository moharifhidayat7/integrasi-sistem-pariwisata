import { signIn, signOut, useSession, getSession } from 'next-auth/react'
import { useEffect } from 'react'
const Logout = () => {
  useEffect(() => {
    signOut({ redirect: true, callbackUrl: '/' })
  }, [])
  return <></>
}

export default Logout
