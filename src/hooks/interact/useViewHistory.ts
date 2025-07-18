import { useMutation } from '@tanstack/react-query'
import InteractAPIClient from '@/services/api-interact'

const apiClient = new InteractAPIClient('views')

const useViewHistory = () => {
  return useMutation({
    mutationFn: (
      { id, visible } : { id: number, visible: boolean }
    ) => apiClient.put(
      id, { visible }, { withCredentials: true }
    )
  })
}

export default useViewHistory