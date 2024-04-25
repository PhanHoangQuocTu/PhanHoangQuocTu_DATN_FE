import { useIsAdminQuery } from '@/api/user/queries';

export const useIsAdmin = (token?: string) => {
  const { data, ...rest } = useIsAdminQuery({
    variables: {
      token: token || '',
    },
    enabled: !!token,
  });

  return {
    isAdmin: data?.data,
    ...rest,
  };
};
