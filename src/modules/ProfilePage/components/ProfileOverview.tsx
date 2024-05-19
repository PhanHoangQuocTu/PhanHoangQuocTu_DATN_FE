import { format } from 'date-fns';
import React from 'react';

import TransitionLayout from '@/components/custom/TransitionLayout';
import { ShadowContainer } from '@/components/ShadowContainer';
import { HStack, VStack } from '@/components/ui/Utilities';
import { useAuth } from '@/hooks/useAuth';
import { cn } from '@/lib/utils';

const ProfileOverview = () => {
  const { user } = useAuth();

  return (
    <TransitionLayout>
      <ShadowContainer>
        <VStack>
          <HStack noWrap>
            <ProfileInfo title="First Name" value={user?.firstName} />
            <ProfileInfo title="Last Name" value={user?.lastName} />
          </HStack>

          <HStack noWrap>
            <ProfileInfo title="Email" value={user?.email} />
            <ProfileInfo title="Phone" value={user?.phoneNumber} />
          </HStack>
          <ProfileInfo title="Gender" value={user?.gender} />
          <ProfileInfo
            title="Date of Birth"
            value={user.dateOfBirth ? format(new Date(user?.dateOfBirth), 'dd/MM/yyyy') : ''}
          />
          <ProfileInfo title="Address" value={user?.address} />
        </VStack>
      </ShadowContainer>
    </TransitionLayout>
  );
};

export default ProfileOverview;

const ProfileInfo = ({
  title,
  value,
  className,
}: {
  title: string;
  value: string | number | undefined | null;
  className?: string;
}) => {
  return (
    <VStack className={cn('w-full', className)}>
      <span className="text-sm font-semibold">{title}</span>
      <span className="text-sm">{value || 'N/A'}</span>
    </VStack>
  );
};
