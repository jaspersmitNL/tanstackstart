// hooks/useVolatileQuery.ts
import { queryClient } from "#/integrations/tanstack-query/root-provider";
import {
  useSuspenseQuery,
  type UseSuspenseQueryOptions,
} from "@tanstack/react-query";
import { useEffect } from "react";

export function useVolatileQuery<T>(options: UseSuspenseQueryOptions<T>) {
  useEffect(() => {
    return () => {
      queryClient.resetQueries({ queryKey: options.queryKey });
    };
  }, []);

  return useSuspenseQuery({
    ...options,
    gcTime: 0,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
}
