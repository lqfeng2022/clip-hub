import { useMutation } from '@tanstack/react-query'
import CoreAPIClient from '../services/api-core'
import AuthResponse from '../entities/AuthResponse'

const apiClient = new CoreAPIClient('logout')

const useSignout = () => {
  return useMutation<AuthResponse, Error>({
    mutationFn: () => 
      apiClient.post({}, { withCredentials: true })
  })
}

export default useSignout