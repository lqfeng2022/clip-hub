import { useMutation } from '@tanstack/react-query'
import APIClient from '@/services/api-store'
import Host from '@/entities/Host'
import { useAuth } from '@/AuthContext'

const apiClient = new APIClient<Host>('hosts')

const useHostsFollowPost = (hostId: number, action: string) => {
  const { user } = useAuth()
  
  return useMutation({
    mutationFn: async (data: { visible: boolean }) => {
      if (!user) return
      return apiClient.post(
        hostId, 
        action, 
        data, 
        { withCredentials: true }
      )
    }
  })
}

export default useHostsFollowPost