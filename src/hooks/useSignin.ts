import { useMutation } from '@tanstack/react-query'
import CoreAPIClient from '../services/api-core'
import AuthResponse from '../entities/AuthResponse'

interface Signin {
  username: string,
  password: string,
}

const apiClient = new CoreAPIClient('login')

const useSignin = () => {
  return useMutation<AuthResponse, Error, Signin>({
    mutationFn: (data: Signin) => 
      apiClient.post(data, { withCredentials: true })
  })
}

export default useSignin