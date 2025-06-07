import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import User from './entities/User'
import ProfileAPIClient from './services/api-profile'

interface AuthContextType {
  user: User | null,
  setUser: (user: User | null) => void,
  isAuthenticated: boolean,
  refetchUser: () => Promise<void> 
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: () => {},
  isAuthenticated: false,
  refetchUser: async () => {},  // fallback
})

const apiClient = new ProfileAPIClient('me')

// Wrap useProfile() in a context-based AuthProvider
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)

  const refetchUser = async () => {
    await apiClient
      .getProfile({ withCredentials: true })
      .then(setUser)
      .catch(() => setUser(null)) // not logged in
  }

  // Run refetchUser() once, after the component mounts.
  // That ensures:
	// •	When the app loads, we check if the user is already logged in (e.g., via cookie/session)
	// •	The user state is populated before other components try to use it
	// •	You don’t fetch the user again on every re-render
  useEffect(() => { refetchUser() }, [])

  return (
    <AuthContext.Provider value={{ user, setUser, isAuthenticated: !!user, refetchUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)