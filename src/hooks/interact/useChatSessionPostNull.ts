import { useMutation } from '@tanstack/react-query'
import APIClient from '@/services/api-interact'
import { useAuth } from '@/AuthContext'

const apiClient = new APIClient('chatsessions')

const useChatSessionPostNull = () => {
  const { user } = useAuth()

  return useMutation({
    mutationFn: async () => {
      if (!user) return
      return apiClient.post({visible: true}, {
        withCredentials: true
      })
    }
  })
}

export default useChatSessionPostNull