import React from 'react';

import { useGetProvinceQuery } from '@/api/metadata/queries';

export const useGetProvince = () => {
  const { data, ...rest } = useGetProvinceQuery();

  const proviceOptions = React.useMemo(() => {
    if (!data) return [];
    return data?.data?.map((province) => ({
      label: province.name,
      value: province.name,
    }));
  }, [data]);

  return {
    data,
    proviceOptions,
    ...rest,
  };
};
