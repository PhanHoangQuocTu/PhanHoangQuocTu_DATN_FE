import React from 'react';

import { VStack } from '@/components/ui/Utilities';
import { useGetAllPublisher } from '@/hooks/publisher/useGetAllPublisher';
import { type NextPageWithLayout } from '@/types';

import CreatePublisherDialog from './components/CreatePublisherDialog';
import PublisherManagementFilter from './components/PublisherManagementFilter';
import PublisherManagementTable from './components/PublisherManagementTable';

const PublisherManagementPage: NextPageWithLayout = () => {
  const { publisherList, paging, handleSearchChange, onPageChange, isLoading, refetch } = useGetAllPublisher();

  return (
    <VStack>
      <CreatePublisherDialog refetch={refetch} />

      <PublisherManagementFilter handleSearchChange={handleSearchChange} />

      <PublisherManagementTable
        data={publisherList}
        paging={paging}
        isLoading={isLoading}
        onPageChange={onPageChange}
        refetch={refetch}
      />
    </VStack>
  );
};

export default PublisherManagementPage;
