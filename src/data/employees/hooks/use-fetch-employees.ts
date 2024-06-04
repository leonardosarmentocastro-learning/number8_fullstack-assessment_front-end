import { useMemo } from 'react';
import useSWR, { Fetcher, SWRResponse } from 'swr';

import { fetchWithoutAuthentication } from '../../fetchers';
import { API_BASE_URL } from '../../constants';
import { FETCH_EMPLOYEES_PAGINATION_LIMIT } from '../constants';
import { isEmpty } from '../../../utils';
import { PaginationError, PaginationParameters } from '../../types';
import { Employees } from '../types';

export const useFetchEmployees = ({
  limit = FETCH_EMPLOYEES_PAGINATION_LIMIT,
  page = 1,
  criteria = {},
}: PaginationParameters): SWRResponse<Employees, PaginationError> => {
  const searchParams = new URLSearchParams();
  searchParams.set('p', page.toString());
  searchParams.set('l', (limit || FETCH_EMPLOYEES_PAGINATION_LIMIT).toString());
  if (!isEmpty(criteria)) searchParams.set('c', JSON.stringify(criteria));

  const url = `${API_BASE_URL}/employees?${searchParams.toString()}`;
  const cacheIds = useMemo(
    () => [ url ],
    [ url ]
  );

  return useSWR<Employees, PaginationError>(cacheIds, fetchWithoutAuthentication);
};
