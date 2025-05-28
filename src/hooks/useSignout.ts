import { useMutation } from '@tanstack/react-query'
import AuthAPIClient from '../services/api-auth'

interface AuthResponse {
  message: string;
}

const apiClient = new AuthAPIClient('/logout/')

const useSignout = () => {
  return useMutation<AuthResponse, Error>({
    mutationFn: () => 
      apiClient.post({}, { withCredentials: true })
  })
}

export default useSignout