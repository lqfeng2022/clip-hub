import { useMutation } from '@tanstack/react-query'
import InteractAPIClient from '../services/api-interact'
import useLists from './useLists'

const apiClient = new InteractAPIClient('lists')

const useListPost = () => {
  return useMutation({
    mutationFn: (data: { title: string }) => 
      apiClient.postList(data, {
        withCredentials: true,
      }),
  })
}

export default useListPost