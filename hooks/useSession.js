import { useContext } from 'react'

import { SessionContext } from '../pages/_app'

const useSession = () => {
  const { session, token, login, logout, setSession } = useContext(SessionContext)
  return { session, token, login, logout, setSession }
}

export default useSession
