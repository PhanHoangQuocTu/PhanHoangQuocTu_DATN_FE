import { useRouter } from 'next/navigation';
import React from 'react';
import { toast } from 'sonner';

import { Icons } from '@/assets/icons';
import ChatComponent from '@/components/ChatComponent';
import NotLoginComponent from '@/components/ChatComponent/NotLoginComponent';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useAuth } from '@/hooks/useAuth';
import { useIsAdmin } from '@/hooks/useIsAdmin';
import { type FCC, ROUTE } from '@/types';

import { Sidebar } from './Sidebar';

const AdminLayout: FCC = ({ children }) => {
  const router = useRouter();
  const { user, isLoggedIn, accessToken } = useAuth();
  const { isAdmin, isSuccess } = useIsAdmin(accessToken);

  const canUseDOM: boolean = !!(
    typeof window !== 'undefined' &&
    typeof window.document !== 'undefined' &&
    typeof window.document.createElement !== 'undefined'
  );

  const useIsomorphicLayoutEffect = canUseDOM ? React.useLayoutEffect : React.useEffect;

  useIsomorphicLayoutEffect(() => {
    if (isSuccess && !isAdmin) {
      router.replace(ROUTE.HOME);
      toast.error('You do not have permission to access this page');
    }
  }, [isSuccess, isAdmin, router]);

  return (
    <div className="flex">
      <Sidebar />

      <article className="container w-full overflow-clip">
        {/* <Header /> */}

        <main className="min-h-screen pb-4 relative">
          {children}
          <Popover>
            <PopoverTrigger asChild>
              <button className="fixed bottom-5 right-5 bg-primary h-20 w-20 rounded-full flex items-center justify-center">
                <Icons.messageCirle color="white" size={40} />
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-fit">
              {isLoggedIn && <ChatComponent userId={user?.id || 0} userName={'Admin'} />}

              {!isLoggedIn && <NotLoginComponent />}
            </PopoverContent>
          </Popover>
        </main>
      </article>
    </div>
  );
};

export default AdminLayout;
