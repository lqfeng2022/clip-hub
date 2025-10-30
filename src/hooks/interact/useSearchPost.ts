import { useMutation } from '@tanstack/react-query'
import InteractAPIClient from '@/services/api-interact'

const apiClient = new InteractAPIClient('searches')

const useSearchPost = () => {
  return useMutation({
    mutationFn: ({ content, visible } : { 
      content: string, visible: boolean }) => 
        apiClient.postSearch(
          { content, visible }, 
          { withCredentials: true }
    )
  })
}

export default useSearchPost