import React, { useState, useEffect } from 'react';

import { useQuery } from '@tanstack/react-query';

import apiClient from '../lib/apiClient';

import AuthContext from '../context/AuthContext';
import type { ApiResponse, User } from '~/lib/types';

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const { data, isLoading, error } = useQuery({
    queryKey: ['auth'],
    queryFn: async () => {
      const axiosResponse: ApiResponse<User> = (await apiClient.get('/auth/customers')).data;
      return axiosResponse.payload;
    },
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    retry: false,
  });

  useEffect(() => {
    if (!isLoading) {
      if (data) {
        setUser(data);
      }

      setLoading(false);
    }
  }, [data, isLoading, error]);

  return <AuthContext.Provider value={{ user, setUser, loading }}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
