'use client';

import { useParams } from 'next/navigation';

import { CreateEmployeeForm } from '@/components/employees';
import { useFetchEmployee } from '@/data';
import { isEmpty } from '@/utils';

export default function ViewEmployeePage() {
  const params = useParams<{ id: string }>();

  const {
    data: employee,
    error: employeeError,
    isLoading: isFetchingEmployee,
  } = useFetchEmployee(params.id);

  return (
    <div className='p-8 aria-busy:cursor-progress aria-busy:pointer-events-none'>
      <div className='mt-12 lg:mt-8'>
        <h1 className='text-[2.4rem] md:text-[4rem] text-[#fff] font-semibold'>View employee</h1>
        <p className='text-[1.4rem] md:text-[2rem] text-[#98A1A8] font-regular'>Press "save" to update employee's information.</p>
      </div>

      {isEmpty(employee) && (
        <CreateEmployeeForm showSkeleton />
      )}

      {!isEmpty(employee) && (
        <CreateEmployeeForm employee={employee} />
      )}
    </div>
  );
}
