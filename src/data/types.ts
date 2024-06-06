import { MutatorCallback } from 'swr';

type GenericObject = { [key:string]: any };

export type ResponseError = {
  code: string,
  message: string,
};
export type PaginationError = {
  code: string,
  message: string,
};

export type PaginationResponse<T> = {
  docs: Array<T>,
  hasNextPage: boolean,
  hasPreviousPage: boolean,
  nextPage: number | null,
  previousPage: number | null,
  totalCount: number,
  totalPages: number
};

export type PaginationParameters = {
  criteria: GenericObject,
  limit: number,
  page: number,
};

export type Paginated<T> = {
  data: T,
  error: string,
  hasData: boolean,
  isLoading: boolean,
  mutate: MutatorCallback,
  searchTerm: string,
};
