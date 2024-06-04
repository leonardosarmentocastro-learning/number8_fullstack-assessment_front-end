import { useMemo } from 'react';
import useSWR, { SWRResponse } from 'swr';

import { fetchWithoutAuthentication } from '../../fetchers';
import { API_BASE_URL } from '../../constants';
import { FETCH_DEPARTMENTS_PAGINATION_LIMIT } from '../constants';
import { isEmpty } from '../../../utils';
import { PaginationError, PaginationParameters } from '../../types';
import { Departments } from '../types';

export const useFetchDepartments = ({
  limit = FETCH_DEPARTMENTS_PAGINATION_LIMIT,
  page = 1,
  criteria = {},
}: PaginationParameters): SWRResponse<Departments, PaginationError> => {
  const searchParams = new URLSearchParams();
  searchParams.set('p', page.toString());
  searchParams.set('l', (limit || FETCH_DEPARTMENTS_PAGINATION_LIMIT).toString());
  if (!isEmpty(criteria)) searchParams.set('c', JSON.stringify(criteria));

  const url = `${API_BASE_URL}/departments?${searchParams.toString()}`;
  const cacheIds = useMemo(
    () => [ url ],
    [ url ]
  );

  return useSWR<Departments, PaginationError>(cacheIds, fetchWithoutAuthentication);
};
