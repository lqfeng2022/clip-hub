import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import User from './entities/User'
import ProfileAPIClient from './services/api-profile'
import { useToast } from '@chakra-ui/react'

interface AuthContextType {
  user: User | null,
  setUser: (user: User | null) => void,
  isAuthenticated: boolean,
  fetchUser: () => Promise<void> 
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: () => {},
  isAuthenticated: false,
  fetchUser: async () => {},  // fallback
})

const apiClient = new ProfileAPIClient('me')

// Wrap useProfile() in a context-based AuthProvider
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const toast = useToast()

  const fetchUser = async () => {
    await apiClient
      .getProfile({ withCredentials: true })
      .then(setUser)
      .catch((error: any) => {
        if (error?.response?.status === 401) {
          setUser(null) // only unauthenticated
          toast({ title: 'Unauthenticated', status: 'error', duration: 2000 })
        }
        toast({ title: 'Fetch failed', status: 'error', duration: 2000 })
      })
  }

  // Run fetchUser() once, after the component mounts.
  // That ensures:
	// •	When the app loads, we check if the user is already logged in (e.g., via cookie/session)
	// •	The user state is populated before other components try to use it
	// •	You don’t fetch the user again on every re-render
  useEffect(() => { fetchUser() }, [])

  return (
    <AuthContext.Provider value={{ user, setUser, isAuthenticated: !!user, fetchUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)