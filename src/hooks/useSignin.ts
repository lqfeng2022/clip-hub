import { useMutation } from '@tanstack/react-query'
import APIClient from '../services/api-auth'

interface Signin {
  username: string,
  password: string,
}

interface AuthResponse {
  message: string;
}

const apiClient = new APIClient('/login/')

const useSignin = () => {
  return useMutation<AuthResponse, Error, Signin>({
    mutationFn: (data: Signin) => 
      apiClient.post(data, { withCredentials: true })
  })
}

export default useSignin