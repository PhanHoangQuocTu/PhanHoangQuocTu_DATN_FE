import { useRouter } from 'next/navigation';
import React from 'react';

import TabsCustom from '@/components/custom/Tabs-custom';
import { VStack } from '@/components/ui/Utilities';
import { useAuth } from '@/hooks/useAuth';
import { ROUTE } from '@/types';

import ChangePassword from './components/ChangePassword';
import EditProfile from './components/EditProfile';
import ProfileOverview from './components/ProfileOverview';
import { TAB_MY_PROFILE } from './types/const';

const ProfilePage = () => {
  const [tab, setTab] = React.useState(TAB_MY_PROFILE[0].value);
  const { isLoggedIn } = useAuth();
  const router = useRouter();

  React.useEffect(() => {
    if (!isLoggedIn) {
      router?.replace(ROUTE.HOME);
    }
  }, [isLoggedIn, router]);

  return (
    <div className="container py-8 space-y-5">
      <VStack>
        <span className="text-3xl font-semibold">My Profile</span>
        <TabsCustom data={TAB_MY_PROFILE} value={tab} onChange={setTab} layoutId="profile" />
      </VStack>

      {tab === TAB_MY_PROFILE[0].value && <ProfileOverview />}
      {tab === TAB_MY_PROFILE[1].value && <EditProfile />}
      {tab === TAB_MY_PROFILE[2].value && <ChangePassword />}
    </div>
  );
};

export default ProfilePage;
