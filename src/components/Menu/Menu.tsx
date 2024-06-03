'use client';

import Image from 'next/image';
import { useState } from 'react';
import { usePathname } from 'next/navigation';

type Props = { toggleMenu: React.MouseEventHandler<HTMLSpanElement> };
export const Menu = ({ toggleMenu }: Props) => {
  const pathname = usePathname();

  const isAtNewEmployee = pathname.includes('/employees/');
  const isAtViewAllEmployees = pathname === '/employees';
  const employeeStartsExpanded = (isAtNewEmployee || isAtViewAllEmployees);
  const [ isEmployeesExpanded, setIsEmployeeExpanded ] = useState(employeeStartsExpanded);
  const toggleEmployeesItems = () => setIsEmployeeExpanded(prev => !prev);

  return (
    <nav className='absolute lg:static z-40 lg:z-0 h-full w-[30rem] bg-[#2D3039] lg:bg-[#1D2025] lg:border-r lg:border-[rgba(217,217,217,.2)]'>
      <div className='lg:hidden p-8 border-b border-[rgba(217,217,217,.2)]'>
        <span
          className="material-symbols-outlined w-[2.4rem] h-[2.4rem] cursor-pointer"
          onClick={toggleMenu}
        >
          arrow_back
        </span>
      </div>

      <div className='hidden lg:flex lg:justify-center p-8 border-b border-[rgba(217,217,217,.2)]'>
        <Image
          src='/number8-logo.svg'
          alt='Number8 logo'
          className='w-[12.5rem] h-[4.2rem]'
          width='0'
          height='0'
        />
      </div>

      <div
        className='flex flex-col border-b border-[rgba(217,217,217,.2)] cursor-pointer'
        onClick={toggleEmployeesItems}
      >
        <div className='p-8 flex flex-row gap-8'>
          <span
            className="material-symbols-outlined w-[2.4rem] h-[2.4rem]"
          >
            person
          </span>

          <div className='flex flex-row justify-between w-full'>
            <div className='flex flex-col'>
              <p className='text-[1.4rem] text-[#fff] font-semibold'>Employees</p>
              <p className='text-[1.2rem] text-[#98A1A8] font-semibold'>Manage your collaborators </p>
            </div>

            <span
              className="material-symbols-outlined w-[2.4rem] h-[2.4rem]"
            >
              {isEmployeesExpanded ? 'keyboard_arrow_up' : 'keyboard_arrow_down'}
            </span>
          </div>
        </div>

        {isEmployeesExpanded && (
          <div>
            <p className={`pl-36 py-2 text-[1.4rem] text-[#fff] font-semibold ${isAtNewEmployee ? 'bg-[rgba(217,217,217,.2)]' : ''}`}>Create new</p>
            <p className={`pl-36 py-2 text-[1.4rem] text-[#fff] font-semibold ${isAtViewAllEmployees ? 'bg-[rgba(217,217,217,.2)]' : ''}`}>View all</p>
          </div>
        )}
      </div>
    </nav>
  );
};
