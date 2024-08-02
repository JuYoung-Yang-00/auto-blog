'use client'

import Link from 'next/link'
import { signout } from '@/lib/auth/actions'
import { ModeToggle } from '@/components/ui/modetoggle'
import { Hamburger } from '@/app/(service)/components/hamburger';
import React from 'react';

const Header: React.FC = () => {

    return (
      <div className='fixed top-0 left-0 right-0 z-50 transition-transform duration-300 backdrop-blur-sm max-w-7xl mx-auto'
      style={{ backdropFilter: 'blur(5px)', WebkitBackdropFilter: 'blur(5px)'}}
      >
        <div className="flex flex-row w-full gap-10 h-[35px] lg:h-[45px] items-center justify-between px-2 lg:px-8 max-w-7xl mx-auto">
          <div className='flex flex-row gap-8 items-center'>
            <div className='lg:hidden -ml-2'>
              <Hamburger />
            </div>
            <Link href='/'>
                <span className='font-light hover:underline underline-offset-2 lg:text-md text-sm hidden lg:flex ml-0'>Dashboard</span>
            </Link>
            <Link href='/profile'>
                <span className='font-light hover:underline underline-offset-2 lg:text-md text-sm hidden lg:flex'>Profile</span>
            </Link>
          </div>
          <div className='flex flex-row items-center'>
            <form>
              <button type="submit" formAction={signout} className='font-extralight hover:font-light hover:underline px-2 py-1 rounded lg:text-md text-sm hidden lg:flex'>Sign out</button>
            </form>
            <div className='-mr-2'>
              <ModeToggle/>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default Header;