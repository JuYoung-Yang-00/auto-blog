"use client"
import { signout } from '@/lib/auth/actions'
import * as React from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useRouter } from 'next/navigation';

export function Hamburger() {
  const router = useRouter();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="icon">
            <div className='transform rotate-90'>
              |||
            </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => router.push('/')}>
          Dashboard
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => router.push('/profile')}>
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => signout()}>
          <form>
            <button type="submit" formAction={signout} className='font-light hover:font-normal underline px-2 py-1 rounded lg:text-md text-sm hidden lg:flex'>Sign out</button>
          </form>
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

