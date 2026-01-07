import { useInfiniteQuery } from '@tanstack/react-query'
import APIClient from '@/services/api-billing'
import FetchResponse from '@/entities/FetchResponse'
import { useAuth } from '@/AuthContext'
import Voucher from '@/entities/Voucher'

const apiClient = new APIClient<Voucher>('vouchers')

const useVouchers = () => {
  const { user } = useAuth()

  return useInfiniteQuery<FetchResponse<Voucher>, Error>({
    queryKey: ['vouchers'],
    queryFn: ({pageParam = 1}) => apiClient.getAll({
      withCredentials: true,
      params: {
        page: pageParam,
      },
    }),
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.next ? allPages.length + 1 : undefined
    },
    staleTime: 24 * 60 * 60 * 1000, // 24h
    enabled: !!user, // prevents fetch when user is null
    retry: 1,
  })
}

export default useVouchers