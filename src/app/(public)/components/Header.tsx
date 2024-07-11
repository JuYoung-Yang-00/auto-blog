'use client'

import Link from 'next/link'
import { ModeToggle } from '@/components/ui/modetoggle'
import React from 'react';
import { useUsername } from '@/app/(public)/components/UsernameContext';
import { UsernameProvider } from '@/app/(public)/components/UsernameContext'; 

const Header: React.FC = () => {
  const { username } = useUsername();

  return (
    <UsernameProvider>
    <div className='fixed top-0 left-0 right-0 z-50'
    style={{ backdropFilter: 'blur(5px)', WebkitBackdropFilter: 'blur(5px)'}}
    >
      <div className="flex flex-row w-full gap-10 h-[35px] lg:h-[45px] items-center justify-between px-2 lg:px-8 max-w-[1480px] mx-auto">
        <div className='flex flex-row items-center'>
          <Link href={`/${username}`}>
            <div className="flex flex-row gap-2 font-light">
              <p> || </p>
              <h1 className=''> {username.toUpperCase()} </h1>
            </div>
          </Link>
        </div>
        <div className='flex flex-row lg:gap-6 gap-1 items-center -mr-2 lg:mr-0'>
          <Link href='/auth/login'>
              <span className='font-extralight hover:font-normal lg:text-md text-sm'>Login</span>
          </Link>
          <ModeToggle/>
        </div>
      </div>
    </div>
    </UsernameProvider>
  );
};
  
export default Header;

