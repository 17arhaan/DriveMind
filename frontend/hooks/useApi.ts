import { useState, useCallback } from 'react';
import api, { endpoints } from '@/lib/api';
import { AxiosError } from 'axios';

interface ApiResponse<T> {
  data: T | null;
  error: string | null;
  loading: boolean;
}

interface UseApiOptions {
  onSuccess?: (data: any) => void;
  onError?: (error: string) => void;
}

export function useApi<T = any>(endpoint: string, options: UseApiOptions = {}) {
  const [state, setState] = useState<ApiResponse<T>>({
    data: null,
    error: null,
    loading: false,
  });

  const execute = useCallback(
    async (method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET', data?: any) => {
      setState((prev) => ({ ...prev, loading: true, error: null }));

      try {
        const response = await api.request({
          method,
          url: endpoint,
          data,
        });

        setState({
          data: response.data,
          error: null,
          loading: false,
        });

        options.onSuccess?.(response.data);
        return response.data;
      } catch (error) {
        const errorMessage =
          error instanceof AxiosError
            ? error.response?.data?.message || error.message
            : 'An unexpected error occurred';

        setState({
          data: null,
          error: errorMessage,
          loading: false,
        });

        options.onError?.(errorMessage);
        throw error;
      }
    },
    [endpoint, options]
  );

  return {
    ...state,
    execute,
  };
}

export { endpoints }; 