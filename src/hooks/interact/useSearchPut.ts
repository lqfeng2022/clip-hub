import { useMutation } from '@tanstack/react-query'
import InteractAPIClient from '../../services/api-interact'

const apiClient = new InteractAPIClient('searches')

const useSearchPut = () => {
  return useMutation({
    mutationFn: (
      { id, visible } : { id: number, visible: boolean }
    ) => apiClient.putSearch(
      id, { visible }, { withCredentials: true }
    )
  })
}

export default useSearchPut