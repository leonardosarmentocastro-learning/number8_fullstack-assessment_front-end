'use client';

import Image from 'next/image';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

import { Employee } from '.././../../data';

type Props = { employee: Employee };
const Component = ({
  employee,
}: Props) => {
  // NOTE: check hiring dates at `backend/src/modules/employees/__tests__/__fixtures__/employees.fixtures.js`.
  /////
  const formatDate = (hireDate: Date) => {
    const date = dayjs(hireDate);
    const now = dayjs();

    const years = now.diff(date, 'year');
    const months = now
      .subtract(years, 'years')
      .diff(date, 'month');
    const days = now
      .subtract(years, 'years')
      .subtract(months, 'months')
      .diff(date, 'day');

    return `${date.format('MMM DD, YYYY')} (${years}y - ${months}m - ${days}d)`; // "May 02, 2024 (2y - 1m - 4d)"
  };

  return (
    <div
      className={`flex flex-col lg:flex-row lg:justify-between gap-4 p-4 bg-[#2D3039] rounded-[1rem] shadow-md border-2 ${employee.active ? 'border-[#2D3039]' : 'border-[#FF7D7B]'}`}
      key={employee.id}
    >
      <div className='grid grid-cols-[10rem,1fr] lg:grid-cols-[10rem,fit-content] gap-4'>
        <div className='relative w-[10rem] h-[10rem]'>
          <Image
            src={employee.pictureURL}
            alt='Employee avatar'
            className={`z-0 w-full h-full object-cover rounded-[.5rem] ${employee.active ? '' : 'grayscale'}`}
            fill
            sizes='10rem'
          />

          <p className={`absolute z-10 inset-x-4 bottom-2 w-[8rem] py-1 text-center bg-[#D24124] rounded-[1rem] shadow-md ${employee.active ? 'hidden' : 'inline-block'}`}>Inactive</p>
        </div>

        <div className='truncate'>
          <p className={`truncate text-[1.4rem] font-semibold ${employee.active ? 'text-[#fff]' : 'text-[#FF7D7B]'}`}>{employee.firstName} <span className='text-[#98A1A8]'>{employee.lastName}</span></p>

          <p className='mt-2 text-[1rem] text-[#98A1A8] font-regular'>Department</p>
          <p className='text-[1.2rem] text-[#fff] font-semibold'>{employee.department.name}</p>

          <p className='mt-2 text-[1rem] text-[#98A1A8] font-regular'>Hired at</p>
          <p className='truncate text-[1.2rem] text-[#fff] font-semibold'>{formatDate(employee.hireDate)}</p>
        </div>
      </div>

      <div className='flex flex-row lg:flex-col gap-4'>
        <button className='mt-4 lg:mt-0 py-[1rem] px-[1rem] bg-[#fff] text-[#2D3039] w-full rounded-[1rem] text-[1.6rem] lg:text-nowrap'>
          View details
        </button>

        <button className='mt-4 lg:mt-0 py-[1rem] px-[1rem] bg-[#D24124] text-[#fff] w-full rounded-[1rem] text-[1.6rem] lg:text-nowrap'>
          Remove
        </button>
      </div>
    </div>
  );
};

const Skeleton = () => (
  <div className="w-full p-4 border-2 border-gray-600 rounded-[1rem] shadow-md">
    <div className="flex flex-row h-full space-x-5 animate-pulse">
      <div className="w-[10rem] h-[10rem] rounded-[.5rem] bg-gray-400" />

      <div className="flex flex-col grow gap-4">
        <div className="w-12/12 bg-gray-400 h-6 rounded-md " />
        <div className="w-3/12 bg-gray-600 h-4 rounded-md " />
        <div className="w-6/12 bg-gray-600 h-4 rounded-md " />
        <div className="w-3/12 bg-gray-600 h-4 rounded-md " />
        <div className="w-6/12 bg-gray-600 h-4 rounded-md " />
      </div>
    </div>
  </div>
);

export const EmployeeCard = {
  Component,
  Skeleton,
};
