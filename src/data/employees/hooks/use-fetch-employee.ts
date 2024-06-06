import { useMemo } from 'react';
import useSWR, { SWRResponse } from 'swr';

import { fetchWithoutAuthentication } from '../../fetchers';
import { API_BASE_URL } from '../../constants';
import { ResponseError } from '../../types';
import { Employee } from '../types';

export const useFetchEmployee = (id: string = ''): SWRResponse<Employee, ResponseError> => {
  const url = useMemo(() => !!id ? `${API_BASE_URL}/employees/${id}` : null, [ id ]);
  const cacheIds = useMemo(
    () => url ? [ url ] : null,
    [ url ]
  );

  return useSWR<Employee, ResponseError>(cacheIds, fetchWithoutAuthentication);
};
