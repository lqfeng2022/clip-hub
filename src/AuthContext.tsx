import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import InteractAPIClient from './services/api-interact'
import User from './entities/User'

interface AuthContextType {
  user: User | null,
  setUser: (user: User | null) => void,
  isAuthenticated: boolean,
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: () => {},
  isAuthenticated: false,
})

const apiClient = new InteractAPIClient('/profiles/me/')

// Wrap useProfile() in a context-based AuthProvider
interface Props {
  children: ReactNode
}
export const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    apiClient
      .getProfile({ withCredentials: true })
      .then(setUser)
      .catch(() => setUser(null)) // not logged in
  }, [])

  return (
    <AuthContext.Provider
      value={{ user, setUser, isAuthenticated: !!user }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)