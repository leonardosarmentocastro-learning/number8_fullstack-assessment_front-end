'use client';

import React, {
  useCallback,
  useMemo,
  useState,
} from 'react';
import { SWRResponse } from 'swr';

import { useTextInput } from '../../ui';
import { isEmpty } from '../../utils';
import { PaginationParameters } from '../types';

const LoadingSpinnerIcon = () => (
  <svg aria-hidden="true" className="w-8 h-8 text-[#2D3039] animate-spin fill-current-color" viewBox="0 0 100 101" fill="#EC9836" xmlns="http://www.w3.org/2000/svg">
    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
  </svg>
);

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
            {isLoading ? <LoadingSpinnerIcon /> : 'Search'}
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
