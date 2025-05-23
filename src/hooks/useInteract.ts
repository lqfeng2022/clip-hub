import { useMutation } from '@tanstack/react-query'
import Clip from '../entities/Clip'
import APIClient from '../services/api-client'

interface HistoryData {
  visible: boolean
}
const apiClient = new APIClient<Clip>('videos')

const useInteract = (videoId: number, action: string) => {
  return useMutation({
    mutationFn: (data: HistoryData) => 
      apiClient.post(videoId, action, data, {
        withCredentials: true,
      }),
  })
}

export default useInteract