import { useQuery } from '@tanstack/react-query'
import APIClient from '@/services/api-billing'
import { useAuth } from '@/AuthContext'
import Credit from '@/entities/Credit'

const apiClient = new APIClient<Credit>('credit/me')

const useCredit = () => {
  const { user } = useAuth()

  return useQuery({
    queryKey: ['credit-me'],
    queryFn: () => apiClient.get(
      { withCredentials: true }
    ),
    staleTime: 24 * 60 * 60 * 1000, // 24h
    enabled: Boolean(user),
  })
}


export default useCredit