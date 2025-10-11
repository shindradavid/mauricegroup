import { useQuery } from '@tanstack/react-query';

import type { ApiResponse, CakeCategory, Cake } from '../lib/types';
import apiClient from '../lib/apiClient';
import axios from 'axios';

export const cakeCategoriesQueryKey = 'cakeCategoriesQueryKey';

export const useCakeCategories = () => {
  return useQuery({
    queryKey: [cakeCategoriesQueryKey],
    queryFn: async () => {
      const axiosData = (await apiClient.get<ApiResponse<CakeCategory[]>>('/cakes/categories')).data;
      const cakeCategories = axiosData.payload;
      return cakeCategories;
    },
  });
};

export const cakesQueryKey = 'cakesQueryKey';

type CakeListParams = {
  categoryId?: string;
  limit?: number;
  price?: string;
  slug?: string;
};

export const useCakes = ({ categoryId, limit, price, slug }: CakeListParams = {}) => {
  return useQuery({
    queryKey: [cakesQueryKey, { categoryId, limit, price }],
    queryFn: async () => {
      const params: Record<string, any> = {};

      if (categoryId) params.categoryId = categoryId;
      if (limit) params.limit = limit;
      if (price) params.price = price;
      if (slug) params.slug = slug;

      const axiosData: ApiResponse<Cake[]> = (await apiClient.get('/cakes', { params })).data;
      const cakes = axiosData.payload;
      return cakes;
    },
  });
};

export const cakeDetailsQueryKey = 'cakeDetailsQueryKey';

export const useCakeDetails = ({ cakeId }: { cakeId: string }) => {
  return useQuery({
    queryKey: [cakeDetailsQueryKey, { cakeId }],
    queryFn: async () => {
      const axiosData: ApiResponse<Cake> = (await apiClient.get(`/cakes/${cakeId}`)).data;
      const cake = axiosData.payload;
      return cake;
    },
    retry: (failureCount, error) => {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status;
        // Don't retry for 400 or 404
        if (status === 400 || status === 404) {
          return false;
        }
      }

      // Retry up to 3 times for other errors
      return failureCount < 3;
    },
  });
};
