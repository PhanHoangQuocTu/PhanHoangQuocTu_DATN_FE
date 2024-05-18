import { useDebouncedValue } from '@mantine/hooks';
import React from 'react';

import { useGetAddressQuery } from '@/api/metadata/queries';

export const useGetAddress = (address = '') => {
  const [debounced] = useDebouncedValue(address, 300);

  const { data, ...rest } = useGetAddressQuery({
    variables: {
      address: debounced,
    },
    enabled: !!address && !!debounced,
  });

  const predictionsOptions = React.useMemo(() => {
    if (!data) return [];

    return data?.predictions?.map((prediction) => ({
      label: prediction.description,
      value: prediction.description,
    }));
  }, [data]);

  return {
    data,
    predictions: data?.predictions || [],
    predictionsOptions,
    ...rest,
  };
};
