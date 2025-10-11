import { useQuery } from '@tanstack/react-query';

import type { ApiResponse, Feedback } from '../lib/types';
import apiClient from '../lib/apiClient';

export const feedbacksQueryKey = 'feedbacksQueryKey';

export const useFeedbacks = () => {
  return useQuery({
    queryKey: [feedbacksQueryKey],
    queryFn: async () => {
      const axiosData = (await apiClient.get<ApiResponse<Feedback[]>>('/feedbacks')).data;
      const feedbacks = axiosData.payload;
      return feedbacks;
    },
    initialData: [],
  });
};
