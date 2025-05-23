import { useMutation } from '@tanstack/react-query';
import Clip from '../entities/Clip';
import APIClient from '../services/api-client';

interface HistoryData {
  visible: boolean;
}
const apiClient = new APIClient<Clip>('videos');

const useHistory = (videoId: number) => {
  return useMutation({
    mutationFn: (data: HistoryData) => 
      apiClient.post(videoId, 'history', data, {
        withCredentials: true,
      }),
  });
}

export default useHistory