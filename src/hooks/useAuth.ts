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

    if (!user?.firstName || !user?.lastName) return 'Annonymous';

    return `${user?.firstName} ${user?.lastName}`;
  }, [user]);

  const firstLetterName = React.useMemo(() => {
    if (!user) return '';

    return user?.email?.charAt(0).toLocaleUpperCase();
  }, [user]);

  return {
    accessToken,
    isLoggedIn: !!accessToken,
    user,
    fullName,
    firstLetterName,
  };
};
