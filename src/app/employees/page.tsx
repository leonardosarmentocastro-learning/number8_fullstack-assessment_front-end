'use client';

import {
  Employee,
  Employees,
  FETCH_EMPLOYEES_PAGINATION_LIMIT,
  Paginated,
  usePagination,
  useFetchEmployees,
} from '../../data';
import { EmployeeCard } from '../../components';

const EmployeesList = ({ pagination }: {
  pagination: Paginated<Employees>,
}) => (
  <div className='mt-8 flex flex-col gap-4 md:grid md:grid-cols-[1fr,1fr] lg:grid-cols-[repeat(auto-fill,minmax(42rem,1fr))]'>
    {pagination.data?.docs.map((employee: Employee) => (
      <EmployeeCard.Component employee={employee} />
    ))}
  </div>
);

const Loading = () => (
  <div className='mt-8 flex flex-col gap-4 md:grid md:grid-cols-[1fr,1fr] lg:grid-cols-[repeat(auto-fill,minmax(42rem,1fr))]'>
    {[...Array.from(Array(24).keys())].map((v, i) => (
      <EmployeeCard.Skeleton />
    ))}
  </div>
);

const Display = ({ pagination }: {
  pagination: Paginated<Employees>,
}) => {
  if (pagination.isLoading) return <Loading />;
  if (!!pagination.error) return 'error'; // TODO
  if (pagination.hasData) return <EmployeesList pagination={pagination} />
  if (!pagination.hasData && !pagination.searchTerm) return 'no data'; // TODO
  if (!pagination.hasData && !!pagination.searchTerm) return 'not found'; // TODO

  return <Loading />;
};

export default function EmployeesPage() {
  const pagination = usePagination(useFetchEmployees, {
    isSearchForButtonDisabled: false,
    searchKeys: [ 'firstName', 'lastName' ],
    placeholder: "Employee's first or last name",
    paginationLimit: FETCH_EMPLOYEES_PAGINATION_LIMIT,
  });

  return (
    <div className='p-8'>
      <div className='mt-12 lg:mt-8'>
        <h1 className='text-[2.4rem] md:text-[4rem] text-[#fff] font-semibold'>Employees</h1>
        <p className='text-[1.4rem] md:text-[2rem] text-[#98A1A8] font-regular'>Click on “view details” for further inspection and possibly change an employee's information.</p>
      </div>

      {pagination.Component}

      <Display pagination={pagination} />
    </div>
  );
}
