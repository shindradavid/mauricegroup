import { useQuery } from '@tanstack/react-query';

import type { ApiResponse, EventCategory, EventPhoto } from '../lib/types';
import apiClient from '../lib/apiClient';

export const eventCategoriesQueryKey = 'eventCategoriesQueryKey';

export const useEventCategories = () => {
  return useQuery({
    queryKey: [eventCategoriesQueryKey],
    queryFn: async () => {
      const axiosData = (await apiClient.get<ApiResponse<EventCategory[]>>('/events/categories')).data;
      const cakeCategories = axiosData.payload;
      return cakeCategories;
    },
    initialData: [],
  });
};

export const eventPhotosQueryKey = 'eventPhotosQueryKey';

type EventPhotosParams = {
  categorySlug?: string | null;
};

export const useEventPhotos = ({ categorySlug }: EventPhotosParams = {}) => {
  return useQuery({
    queryKey: [eventPhotosQueryKey],
    queryFn: async () => {
      const params: Record<string, any> = {};

      if (categorySlug) params.categorySlug = categorySlug;

      const axiosData = (await apiClient.get<ApiResponse<EventPhoto[]>>('/events/photos', { params })).data;
      const eventPhotos = axiosData.payload;
      return eventPhotos;
    },
    initialData: [],
  });
};

export const eventPhotoDetailsQueryKey = 'eventPhotoDetailsQueryKey';

type EventPhotoDetailsParams = {
  photoSlug?: string | null;
};

export const useEventPhotoDetails = ({ photoSlug }: EventPhotoDetailsParams = {}) => {
  return useQuery({
    queryKey: [eventPhotoDetailsQueryKey],
    queryFn: async () => {
      const axiosData = (await apiClient.get<ApiResponse<EventPhoto>>(`/events/photos/${photoSlug}`)).data;
      const eventPhoto = axiosData.payload;
      return eventPhoto;
    },
  });
};
