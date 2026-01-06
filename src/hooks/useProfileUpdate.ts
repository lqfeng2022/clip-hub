import { useMutation } from '@tanstack/react-query'
import APIClient from '../services/api-profile'

const apiClient = new APIClient('me') // main endpoint

const useProfileUpdate = () => {
  return useMutation({
    mutationFn: (data: Record<string, any>) => 
      apiClient.put(data, { withCredentials: true })
  })
}

export default useProfileUpdate