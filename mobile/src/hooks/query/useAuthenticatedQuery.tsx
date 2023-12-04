import { UseQueryOptions, useQuery } from "@tanstack/react-query";

export const useAuthenticatedQuery = <
  TQueryKey extends [string, Record<string, unknown>?],
  TQueryFnData,
  TError,
  TData = TQueryFnData,
>(
  queryKey: TQueryKey,
  fetcher: (params: TQueryKey[1]) => Promise<TQueryFnData>,
  options?: Omit<
    UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>,
    "queryKey" | "queryFn"
  >,
) => {
  return useQuery({
    queryKey,
    queryFn: fetcher,
    ...options,
  });
};
