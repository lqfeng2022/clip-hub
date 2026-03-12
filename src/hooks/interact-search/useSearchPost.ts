import { useMutation } from '@tanstack/react-query'
import APIClient from '@/services/api-interact'
import { useAuth } from '@/AuthContext'
import { Search } from 'react-router-dom'

const apiClient = new APIClient<Search>('searches')

const useSearchPost = () => {
  const { user } = useAuth()

  return useMutation({
    mutationFn: async ({ content, visible } : { 
      content: string, visible: boolean 
    }) => {
      if (!user) return
      return apiClient.post(
        { content, visible }, 
        { withCredentials: true }
      )
    }
  })
}

export default useSearchPost