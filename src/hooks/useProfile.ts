import { useQuery } from '@tanstack/react-query'
import APIClient from '../services/api-profile'
import User from '../entities/User'

const apiClient = new APIClient('/me/')

const useProfile = () => {
  return useQuery<User, Error>({
    queryKey: ['me'],
    queryFn: () => apiClient.get(),
  })
}

export default useProfile