import { useQuery } from '@tanstack/react-query'
import APIClient from '../services/api-profile'
import User from '../entities/User'

const apiClient = new APIClient('/me/')

const useProfile = () => {
  return useQuery<User, Error>({
    queryKey: ['me'],
    queryFn: () => apiClient.get(
      { withCredentials: true } // sends cookie
    ),
    retry: 1,
    staleTime: 1000 * 60 * 5,
  })
}

export default useProfile