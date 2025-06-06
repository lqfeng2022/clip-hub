import { useMutation } from '@tanstack/react-query'
import AuthAPIClient from '../services/api-auth'
import AuthResponse from '../entities/AuthResponse'

interface Signup {
  username: string,
  password: string,
  email: string,
  first_name: string | null,
  last_name: string | null,
}

const apiClient = new AuthAPIClient('users')

const useSignup = () => {
  return useMutation<AuthResponse, Error, Signup>({
    mutationFn: (data: Signup) => 
      apiClient.post(data)
  })
}

export default useSignup