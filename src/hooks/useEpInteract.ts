import { useMutation } from '@tanstack/react-query'
import Clip from '../entities/Clip'
import APIClient from '../services/api-store'

interface MarkState {
  visible: boolean
}
const apiClient = new APIClient<Clip>('expressions')

const useEpInteract = (expressionId: number, action: string) => {
  return useMutation({
    mutationFn: (data: MarkState) => 
      apiClient.post(expressionId, action, data, {
        withCredentials: true,
      }),
  })
}

export default useEpInteract