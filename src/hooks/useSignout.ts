import { useMutation } from '@tanstack/react-query'
import APIClient from '../services/api-auth'

interface AuthResponse {
  message: string;
}

const apiClient = new APIClient('/logout/')

const useSignout = () => {
  return useMutation<AuthResponse, Error>({
    mutationFn: () => 
      apiClient.post({}, { withCredentials: true })
  })
}

export default useSignout