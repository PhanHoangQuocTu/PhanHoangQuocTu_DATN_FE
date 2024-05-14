import React from 'react';

import { useUserStore } from '@/stores';

/**
 * * Override useSession to have more clean code
 * @returns session with isLoggedIn to check auth
 */
export const useAuth = () => {
  const user = useUserStore.use.user();
  const accessToken = useUserStore.use.accessToken();

  const fullName = React.useMemo(() => {
    if (!user) return '';

    return `${user?.firstName} ${user?.lastName}`;
  }, [user]);

  return {
    isLoggedIn: !!accessToken,
    user,
    fullName,
  };
};
