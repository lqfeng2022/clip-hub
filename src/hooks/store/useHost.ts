import { useQuery } from '@tanstack/react-query'
import APIClient from '@/services/api-store'
import Host from '@/entities/Host'

const apiClient = new APIClient<Host>('hosts/slug')

const useHost = (id: string) => 
  useQuery({
    queryKey: ['hosts', id],
    queryFn: () => apiClient.get(id),
  })

export default useHost