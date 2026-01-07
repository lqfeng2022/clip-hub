import { useMutation } from '@tanstack/react-query'
import APIClient from '@/services/api-billing'
import { useAuth } from '@/AuthContext'

const apiClient = new APIClient('vouchers/redeem')

const useVoucherPost = () => {
  const { user } = useAuth()

  return useMutation({
    mutationFn: async (data: { code: string }) => {
      if (!user) return
      return apiClient.post(data, {
        withCredentials: true,
      })
    }
  })
}

export default useVoucherPost