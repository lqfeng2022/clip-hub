import { useMutation } from '@tanstack/react-query'
import InteractAPIClient from '../services/api-interact'

const apiClient = new InteractAPIClient('likes')

const useClipLike = () => {
  return useMutation({
    mutationFn: (
      { id, visible } : { id: number, visible: boolean }
    ) => apiClient.put(
      id, { visible }, { withCredentials: true }
    )
  })
}

export default useClipLike