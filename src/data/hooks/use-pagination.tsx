'use client';

import React, {
  useCallback,
  useMemo,
  useState,
} from 'react';
import { SWRResponse } from 'swr';

import { LoadingSpinner, useTextInput } from '@/ui';
import { isEmpty } from '@/utils';
import { PaginationParameters } from '../types';

type Config = {
  criteria?: object,
  isSearchForButtonDisabled: boolean,
  paginationLimit: number,
  placeholder?: string,
  searchKeys: Array<string>,
};

export const usePagination = (
  swrFetcher: (args: PaginationParameters) => SWRResponse,
  {
    criteria = {},
    isSearchForButtonDisabled = false,
    paginationLimit = 3,
    placeholder = '',
    searchKeys = [ 'name' ],
  }: Config
) => {
  // searching
  /////
  const [ searchCriteria, setSearchCriteria ] = useState(criteria);
  const [ currentPage, setCurrentPage ] = useState(1);

  const {
    Component: SearchInput,
    value: searchTerm,
  } = useTextInput({
    placeholder,
    adornment: 'search',
    id: 'searchInput',
    name: 'searchInput',
    options: { strictSize: false },
    label: 'Search for',
  });

  const search = useCallback(() => {
    setCurrentPage(1);
    if (!searchTerm) return setSearchCriteria({});

    const newCriteria = {
      $or: searchKeys.map(key => ({
        [key as string]: {
          '$regex': searchTerm,
          '$options': 'i',
        },
      })),
    };
    setSearchCriteria(newCriteria);
  }, [
    searchKeys,
    searchTerm,
    setSearchCriteria,
  ]);

  // fetching data
  /////
  const { data, error, isLoading, mutate } = swrFetcher({
    criteria: { ...criteria, ...searchCriteria },
    limit: paginationLimit,
    page: currentPage,
  });

  // callbacks
  /////
  const goFirstPage = useCallback(
    () => setCurrentPage(1),
    [ setCurrentPage ]
  );

  const goNextPage = useCallback(
    () => setCurrentPage(prev => prev + 1),
    [ setCurrentPage ]
  );

  const goPreviousPage = useCallback(
    () => setCurrentPage(prev => prev - 1),
    [ setCurrentPage ]
  );
  const goLastPage = useCallback(
    () => setCurrentPage(data?.totalPages),
    [ data, setCurrentPage ]
  );

  // memos
  /////
  const noData = useMemo(
    () => isEmpty(data) || isEmpty(data.docs),
    [ data ]
  );

  const isAtFirstPage = useMemo(
    () => currentPage === 1,
    [ currentPage ]
  );

  const isAtLastPage = useMemo(
    () => noData ? false : currentPage === data?.totalPages,
    [
      currentPage,
      data,
    ]
  );

  const totalRegistries = useMemo(
    () => noData ? 0 : data.totalCount,
    [ data ]
  );

  const rangeStart = useMemo(
    () => noData ? 0 : data.previousPage * paginationLimit + 1,
    [ data ]
  );

  const rangeEnd = useMemo(
    () => {
      if (noData) return 0;

      const result = currentPage * paginationLimit;
      const exceedTotal = (result > data.totalCount);

      return exceedTotal ? data.totalCount : result;
    },
    [
      currentPage,
      data,
    ]
  );

  const info = useMemo(
    () => `Seeing ${rangeStart} - ${rangeEnd} of ${totalRegistries}`,
    [
      rangeEnd,
      rangeStart,
      totalRegistries,
    ]
  );

  const hasData = useMemo(
    () => !isEmpty(data?.docs),
    [ data ]
  );

  const Component = useMemo(() => {
    return (
      <div className='mt-8 flex flex-col md:flex-row justify-between items-center md:items-end'>
        <div className='flex flex-col w-full md:max-w-[28rem] lg:flex-row lg:gap-4 lg:max-w-[60rem]'>
          {SearchInput}

          <button
            className='mt-4 py-[1rem] bg-[#EC9836] text-[#2D3039] w-full rounded-[1rem] text-[1.6rem] flex items-center justify-center'
            disabled={isSearchForButtonDisabled || isLoading}
            onClick={search}
          >
            {isLoading ? <LoadingSpinner /> : 'Search'}
          </button>
        </div>

        <div className='mt-8 text-center'>
          <p className='text-[1.6rem] text-[#fff] font-semibold'>{info}</p>

          <div className='mt-4 flex flex-row gap-4 justify-center'>
            <span
              className={`material-symbols-outlined cursor-pointer text-[2.4rem] text-[#fff] ${isAtFirstPage ? 'pointer-events-none opacity-50' : 'opacity-100'}`}
              onClick={goFirstPage}
            >
              first_page
            </span>

            <span
              className={`material-symbols-outlined cursor-pointer text-[2.4rem] text-[#fff] ${!data?.hasPreviousPage ? 'pointer-events-none opacity-50' : 'opacity-100'}`}
              onClick={goPreviousPage}
            >
              chevron_left
            </span>

            <span
              className={`material-symbols-outlined cursor-pointer text-[2.4rem] text-[#fff] ${!data?.hasNextPage ? 'pointer-events-none opacity-50' : 'opacity-100'}`}
              onClick={goNextPage}
            >
              chevron_right
            </span>

            <span
              className={`material-symbols-outlined cursor-pointer text-[2.4rem] text-[#fff] ${isAtLastPage ? 'pointer-events-none opacity-50' : 'opacity-100'}`}
              onClick={goLastPage}
            >
              last_page
            </span>
          </div>
        </div>
      </div>
    );
  }, [
    data,
    goFirstPage,
    goLastPage,
    goNextPage,
    goPreviousPage,
    info,
    isAtLastPage,
    isAtFirstPage,
    SearchInput,
  ]);

  return {
    Component,
    currentPage,
    data,
    error,
    goFirstPage,
    goNextPage,
    goPreviousPage,
    goLastPage,
    hasData,
    info,
    isAtFirstPage,
    isAtLastPage,
    isLoading,
    mutate,
    rangeEnd,
    rangeStart,
    searchTerm,
    setCurrentPage,
    totalRegistries,
  };
};
