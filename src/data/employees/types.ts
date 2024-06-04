import { PaginationResponse } from '../types';

export type Employee = {
  active: Boolean,
  address: {
    city: string,
    complement: string,
    locale: string,
    neighborhood: string,
    reference: string,
    state: string,
    streetAddress: string,
    streetNumber: Number,
    zipCode: string,
  },
  department: {
    name: string,
  },
  firstName: string,
  hireDate: Date,
  id: string,
  lastName: string,
  phone: string,
  pictureURL: string,
};

export type Employees = PaginationResponse<Employee>;
