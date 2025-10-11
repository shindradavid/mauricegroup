import { useQuery } from '@tanstack/react-query';

import type { ApiResponse, SchoolGalleryImage } from '../lib/types';
import apiClient from '../lib/apiClient';

export const schoolGalleryQueryKey = 'schoolGalleryQueryKey';

export const useSchoolGallery = () => {
  return useQuery({
    queryKey: [schoolGalleryQueryKey],
    queryFn: async () => {
      const axiosData = (await apiClient.get<ApiResponse<SchoolGalleryImage[]>>('/school/gallery/photos')).data;
      const gallery = axiosData.payload;
      return gallery;
    },
    initialData: [],
  });
};
