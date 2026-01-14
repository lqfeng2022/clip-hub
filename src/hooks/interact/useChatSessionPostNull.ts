import { useMutation } from '@tanstack/react-query'
import APIClient from '@/services/api-interact'
import { useAuth } from '@/AuthContext'

interface Chat {
  id: string
  visible: boolean
  host_id: string
}

const apiClient = new APIClient('chatsessions')

const useChatSessionPostNull = () => {
  const { user } = useAuth()

  // <TData, TError, TVariables>
  return useMutation<Chat, unknown, string | undefined>({
    mutationFn: async (host_id?: string) => {
      if (!user) return
      return apiClient.post(
        { visible: true, host_id }, 
        { withCredentials: true }
      )
    }
  })
}

export default useChatSessionPostNull