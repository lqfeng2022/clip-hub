import { useMutation } from '@tanstack/react-query'
import ProfileAPIClient from '../services/api-profile'

const apiClient = new ProfileAPIClient('me') // main endpoint

const useProfileUpdate = () => {
  return useMutation({
    mutationFn: (data: Record<string, any>) => 
      apiClient.put(data, { withCredentials: true })
  })
}

export default useProfileUpdate