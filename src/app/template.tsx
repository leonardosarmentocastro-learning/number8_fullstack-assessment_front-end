'use client';

import { Transition } from '@headlessui/react'
import { useState } from 'react';
import Image from 'next/image';
import { /* useRouter ,*/ usePathname } from 'next/navigation';

export default function RootTemplate ({ children }: { children: React.ReactNode }) {
  // const router = useRouter();
  const pathname = usePathname();

  const [ showMenu, setShowMenu ] = useState(false);
  const toggleMenu = () => setShowMenu(prev => !prev);

  const isAtNewEmployee = pathname.includes('/employees/');
  const isAtViewAllEmployees = pathname === '/employees';
  const employeeStartsExpanded = (isAtNewEmployee || isAtViewAllEmployees);
  const [ isEmployeesExpanded, setIsEmployeeExpanded ] = useState(employeeStartsExpanded);
  const toggleEmployeesItems = () => setIsEmployeeExpanded(prev => !prev);

  return (
    <div>
      <Transition
        show={showMenu}
        enter="transition-opacity duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-150"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className={`z-50 top-0 left-0 h-screen w-full ${showMenu ? 'fixed' : 'hidden'}`}>
          <div className='relative h-full w-full'>
            <div className='absolute z-40 h-full w-[30rem] bg-[#2D3039]'>
              <div className='p-8 border-b border-[rgba(217,217,217,.2)]'>
                <span
                  className="material-symbols-outlined w-[2.4rem] h-[2.4rem]"
                  onClick={toggleMenu}
                >
                  arrow_back
                </span>
              </div>

              <div
                className='flex flex-col border-b border-[rgba(217,217,217,.2)]'
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
            </div>

            <div
              className='absolute z-30 top-0 left-0 h-full w-full bg-slate-900/80 backdrop-blur-sm'
              onClick={toggleMenu}
            />
          </div>
        </div>
      </Transition>

      <div className='flex flex-row justify-between'>
        <span
          className="material-symbols-outlined w-[2.4rem] h-[2.4rem]"
          onClick={toggleMenu}
        >
          menu
        </span>

        <Image
          src='/number8-logo.svg'
          alt='Number8 logo'
          className='w-[10rem] h-[3.3rem]'
          width='0'
          height='0'
        />
      </div>

      {children}
    </div>
  );
};