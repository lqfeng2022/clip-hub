import { useMutation } from '@tanstack/react-query'
import APIClient from '@/services/api-interact'
import { useAuth } from '@/AuthContext'
import { Search } from 'react-router-dom'

const apiClient = new APIClient<Search>('searches')

const useSearchPut = () => {
  const { user } = useAuth()

  return useMutation({
    mutationFn: async ({ id, visible } : { id: number, visible: boolean }) => {
      if (!user) return
      return apiClient.put(
        id, 
        { visible }, 
        { withCredentials: true }
      )
    }
  })
}

export default useSearchPut