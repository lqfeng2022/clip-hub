import { useMutation } from '@tanstack/react-query'
import Clip from '../entities/Clip'
import APIClient from '../services/api-store'

const apiClient = new APIClient<Clip>('videos')

const useInteract = (videoId: number, action: string) => {
  return useMutation({
    mutationFn: (data: { visible: boolean }) => 
      apiClient.post(videoId, action, data, {
        withCredentials: true,
      }),
  })
}

export default useInteract