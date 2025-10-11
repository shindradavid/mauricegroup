import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import apiClient from '../lib/apiClient';
import type { ApiResponse, CakeOrder, GetCompanyByDomainResponse, MutationArgs } from '~/lib/types';

const cakeOrdersQueryKey = 'cakeOrdersQueryKey';

export const useCakeOrders = () => {
  return useQuery({
    queryKey: [cakeOrdersQueryKey],
    queryFn: async () => {
      const axiosData: ApiResponse<CakeOrder[]> = (await apiClient.get('/customers/cake-orders')).data;
      const cakeOrders = axiosData.payload;
      return cakeOrders;
    },
    initialData: [],
    refetchInterval: 20000,
  });
};

const cakeOrderDetailsQueryKey = 'cakeOrderDetailsQueryKey';

export const useCakeOrderDetails = (id: string) => {
  return useQuery({
    queryKey: [cakeOrderDetailsQueryKey],
    queryFn: async () => {
      const axiosData: ApiResponse<CakeOrder> = (await apiClient.get(`/customers/cake-orders/${id}`)).data;
      const cakeOrder = axiosData.payload;
      return cakeOrder;
    },
    initialData: null,
    refetchInterval: 20000,
  });
};

interface CreateCakeOrderMutationData {
  cakeId: string;
  marketeerId: string;
  cakeWritings: string;
  cakeColor: string;
  receiverName: string;
  receiverPhoneNumber: string;
  deliveryLocation: string;
  deliveryDateTime: string;
  description: string;
}

export const useCreateCakeOrderMutation = ({ onError, onSuccess }: MutationArgs) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: CreateCakeOrderMutationData) => {
      const axiosResponse: ApiResponse<CakeOrder> = (
        await apiClient.post('/cake-orders/customers', {
          cakeId: payload.cakeId,
          marketeerId: payload.marketeerId,
          cakeWritings: payload.cakeWritings,
          cakeColor: payload.cakeColor,
          receiverName: payload.receiverName,
          receiverPhoneNumber: payload.receiverPhoneNumber,
          deliveryLocation: payload.deliveryLocation,
          deliveryDateTime: payload.deliveryDateTime,
          description: payload.description,
        })
      ).data;

      return axiosResponse;
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [cakeOrdersQueryKey] });
    },
    onError: (error) => {
      console.error('Create cake order error:', error);
      onError(error.message);
    },
    onSuccess: (data) => {
      onSuccess(data.message);
    },
  });
};

interface CreateCustomCakeOrderMutationData {
  price: string;
  marketeerId: string;
  cakeWritings: string;
  cakeColor: string;
  receiverName: string;
  receiverPhoneNumber: string;
  deliveryLocation: string;
  deliveryDateTime: string;
  description: string;
  photos: File[];
}

export const useCreateCustomCakeOrderMutation = ({ onError, onSuccess }: MutationArgs) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: CreateCustomCakeOrderMutationData) => {
      const formData = new FormData();

      formData.append('price', payload.price);
      formData.append('marketeerId', payload.marketeerId);
      formData.append('cakeWritings', payload.cakeWritings);
      formData.append('cakeColor', payload.cakeColor);
      formData.append('receiverName', payload.receiverName);
      formData.append('receiverPhoneNumber', payload.receiverPhoneNumber);
      formData.append('deliveryLocation', payload.deliveryLocation);
      formData.append('deliveryDateTime', payload.deliveryDateTime);
      formData.append('description', payload.description);

      payload.photos.forEach((file, index) => {
        formData.append('photos', file); // backend should accept `photos` as an array
      });

      const axiosResponse: ApiResponse<CakeOrder> = (
        await apiClient.post('/cake-orders/customers/custom', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
      ).data;

      return axiosResponse;
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [cakeOrdersQueryKey] });
    },
    onError: (error) => {
      console.error('Create cake order error:', error);
      onError(error.message);
    },
    onSuccess: (data) => {
      onSuccess(data.message);
    },
  });
};

export const useGetCakeOrderHandlers = (domain: string | null) => {
  return useQuery({
    queryKey: ['companyByDomain', domain],
    enabled: !!domain,
    queryFn: async (): Promise<GetCompanyByDomainResponse> => {
      const response = await apiClient.get(`/companies/domain`, {
        params: { domain },
      });
      return response.data.payload;
    },
    staleTime: 1000 * 60 * 5,
  });
};

export const useRequestCakeOrderCommissionMutation = ({ onError, onSuccess }: MutationArgs) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: { cakeOrderId: string }) => {
      const axiosResponse = (await apiClient.patch(`/customers/cake-orders/${payload.cakeOrderId}/request-commission`)).data;

      return axiosResponse;
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [cakeOrdersQueryKey] });
    },
    onError: (error) => {
      onError(error.message);
    },
    onSuccess: (data) => {
      onSuccess(data.message);
    },
  });
};

export const useCommissionStats = () => {
  return useQuery({
    queryKey: ['commissionStats'],
    queryFn: async () => {
      const res = (await apiClient.get('/customers/commission/stats')).data;
      return res.payload;
    },
    refetchInterval: 20000,
    retryDelay: (attemptIndex) => {
      // Exponential backoff: 1s, 2s, 4s, capped at 30s
      return Math.min(1000 * 2 ** attemptIndex, 30000);
    },
    initialData: {
      totalCommissionEarned: 0,
      totalPendingCommission: 0,
    },
  });
};
