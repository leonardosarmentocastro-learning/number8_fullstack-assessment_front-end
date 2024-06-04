import { PaginationResponse } from '../types';

export type Department = {
  id: string,
  name: string,
};

export type Departments = PaginationResponse<Department>;
