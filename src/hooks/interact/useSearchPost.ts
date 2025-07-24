import { useMutation } from '@tanstack/react-query'
import InteractAPIClient from '@/services/api-interact'

const apiClient = new InteractAPIClient('searches')

const useSearchPost = () => {
  return useMutation({
    mutationFn: ({ content, kind, visible } : { 
      content: string, kind: string, visible: boolean }) => 
        apiClient.postSearch(
          { content, kind, visible }, 
          { withCredentials: true }
    )
  })
}

export default useSearchPost