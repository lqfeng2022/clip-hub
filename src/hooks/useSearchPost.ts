import { useMutation } from '@tanstack/react-query'
import InteractAPIClient from '../services/api-interact'

const apiClient = new InteractAPIClient('searches')

const useSearchPost = () => {
  return useMutation({
    mutationFn: (
      { content, type, visible } : { content: string, type: string, visible: boolean }
    ) => apiClient.postSearch(
      { content, type, visible }, { withCredentials: true }
    )
  })
}

export default useSearchPost