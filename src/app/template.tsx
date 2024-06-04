'use client';

import { Transition } from '@headlessui/react'
import { useState } from 'react';
import Image from 'next/image';

import { Menu } from '../components';

export default function RootTemplate ({ children }: { children: React.ReactNode }) {
  const [ showMenu, setShowMenu ] = useState(false);
  const toggleMenu = () => setShowMenu(prev => !prev);

  return (
    <div className='h-full w-full'>
      <div className='lg:hidden'>
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
              <Menu toggleMenu={toggleMenu} />

              <div
                className='absolute z-30 top-0 left-0 h-full w-full bg-slate-900/80 backdrop-blur-sm'
                onClick={toggleMenu}
              />
            </div>
          </div>
        </Transition>

        <div className='p-8 pb-0 flex flex-row justify-between'>
          <span
            className="material-symbols-outlined text-[2.4rem] md:text-[4.8rem] cursor-pointer text-[#fff]"
            onClick={toggleMenu}
          >
            menu
          </span>

          <Image
            src='/number8-logo.svg'
            alt='Number8 logo'
            className='w-[10rem] h-[3.3rem] md:w-[20rem] md:h-[6.6rem]'
            width='0'
            height='0'
          />
        </div>

        {children}
      </div>

      <div className='hidden h-full lg:grid lg:grid-cols-[auto,1fr]'>
        <Menu toggleMenu={toggleMenu} />

        {children}
      </div>
    </div>
  );
};