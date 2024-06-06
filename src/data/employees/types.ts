import { PaginationResponse } from '../types';
import { Department } from '../departments';

export type DepartmentHistory = { date: Date, department: Department };
export type EmployeeDepartmentHistory = Array<DepartmentHistory>;
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
  department: Department,
  departmentHistory: EmployeeDepartmentHistory,
  firstName: string,
  hireDate: Date,
  id: string,
  lastName: string,
  phone: string,
  pictureURL: string,
};

export type Employees = PaginationResponse<Employee>;
