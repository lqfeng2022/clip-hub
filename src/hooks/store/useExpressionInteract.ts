import { useMutation } from '@tanstack/react-query'
import APIClient from '@/services/api-store'
import Expression from '@/entities/Expression'

const apiClient = new APIClient<Expression>('expressions')

const useExpressionInteract = (expressionId: number, action: string) => {
  return useMutation({
    mutationFn: (data: { visible: boolean }) => 
      apiClient.post(expressionId, action, data, {
        withCredentials: true,
      }),
  })
}

export default useExpressionInteract