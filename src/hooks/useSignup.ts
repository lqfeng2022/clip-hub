import { useMutation } from '@tanstack/react-query'
import APIClient from '../services/api-auth'
import AuthResponse from '../entities/AuthResponse'

const apiClient = new APIClient('users')

interface Signup {
  username: string,
  password: string,
  email: string,
  first_name: string | null,
  last_name: string | null,
}
const useSignup = () => {
  return useMutation<AuthResponse, Error, Signup>({
    mutationFn: (data: Signup) => 
      apiClient.post(data)
  })
}

export default useSignup