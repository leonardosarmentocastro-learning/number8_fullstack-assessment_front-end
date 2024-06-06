'use client';

import { CreateEmployeeForm } from '@/components/employees';

export default function ViewEmployeePage() {
  return (
    <div className='p-8 aria-busy:cursor-progress aria-busy:pointer-events-none'>
      <div className='mt-12 lg:mt-8'>
        <h1 className='text-[2.4rem] md:text-[4rem] text-[#fff] font-semibold'>View employee</h1>
        <p className='text-[1.4rem] md:text-[2rem] text-[#98A1A8] font-regular'>Press "save" to update employee's information.</p>
      </div>

      <CreateEmployeeForm />
    </div>
  );
}
