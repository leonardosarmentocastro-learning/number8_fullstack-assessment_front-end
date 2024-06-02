'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function RootTemplate ({ children }: { children: React.ReactNode }) {
  const [ showMenu, setShowMenu ] = useState(false);
  const toggleMenu = () => setShowMenu(prev => !prev);

  return (
    <div>
      <div className={`z-50 top-0 left-0 h-screen w-full ${showMenu ? 'fixed' : 'hidden'}`}>
        <div className='relative h-full w-full'>
          <div className='absolute z-40 h-full w-[30rem] bg-[#2D3039]'>
            <div className='py-8 px-8 border-b border-[rgba(217,217,217,.2)]'>
              <span
                className="material-symbols-outlined w-[2.4rem] h-[2.4rem]"
                onClick={toggleMenu}
              >
                arrow_back
              </span>
            </div>
          </div>

          <div className='absolute z-30 top-0 left-0 h-full w-full bg-slate-900/80 backdrop-blur-sm' />
        </div>
      </div>

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