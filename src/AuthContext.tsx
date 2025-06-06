import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import User from './entities/User'
import ProfileAPIClient from './services/api-profile'

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

const apiClient = new ProfileAPIClient('me')

// Wrap useProfile() in a context-based AuthProvider
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    apiClient
      .getProfile({ withCredentials: true })
      .then(setUser)
      .catch(() => setUser(null)) // not logged in
  }, [])

  return (
    <AuthContext.Provider value={{ user, setUser, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)