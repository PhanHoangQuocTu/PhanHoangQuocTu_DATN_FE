import { useDisclosure } from '@mantine/hooks';
import { AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { Icons } from '@/assets/icons';
import Logo from '@/components/Logo';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { HStack, VStack } from '@/components/ui/Utilities';
import { cn } from '@/lib/utils';
import { useUserStore } from '@/stores';
import { ROUTE } from '@/types';

import { AdminSidebar } from './AdminSidebar';
import { SidebarLayout } from './SidebarLayout';
import { SupperAdminSidebar } from './SupperAdminSidebar';

const Sidebar = () => {
  const [opened, { toggle }] = useDisclosure(true);
  const logout = useUserStore.use.logout();
  const router = useRouter();
  const handleLogout = () => {
    logout();
    toast.success('Logout successfully!');
    router.replace(ROUTE.ADMIN_LOGIN);
  };

  return (
    <SidebarLayout opened={opened}>
      <div
        className={cn('fixed left-0 top-0 flex h-full w-full max-w-sidebar flex-col gap-8 overflow-y-auto p-4', {
          'max-w-sidebar-expand': opened,
        })}
      >
        <HStack spacing={24} pos={opened ? 'apart' : 'center'} className="h-14 w-full">
          {opened && (
            <Link href={ROUTE.HOME}>
              <Logo />
            </Link>
          )}
          <Button variant="ghost" className="hover:bg-transparent" size="mixin" onClick={toggle}>
            <Icons.alignJustify className="text-white hover:text-accent" />
          </Button>
        </HStack>

        <Separator />

        <AnimatePresence>
          <>
            <div className="flex flex-1 flex-col gap-4">
              <SupperAdminSidebar opened={opened} />

              <Separator />

              <AdminSidebar opened={opened} />
            </div>

            <>
              <Separator />
            </>
          </>
        </AnimatePresence>

        <VStack spacing={4}>
          <Button onClick={handleLogout}>{opened ? 'Logout' : <Icons.logout width="1.5rem" height="1.5rem" />}</Button>
        </VStack>
      </div>
    </SidebarLayout>
  );
};

export { Sidebar };
