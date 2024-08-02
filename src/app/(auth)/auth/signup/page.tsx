'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signup } from '@/lib/auth/actions';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useToast } from "@/components/ui/toast/use-toast"

const validatePassword = (password: string): boolean => {
  const minLength = /.{8,}/;
  const uppercase = /[A-Z]/;
  const lowercase = /[a-z]/;
  const number = /[0-9]/;
  const specialChar = /[!@#$%^&*(),.?":{}|<>]/;
  return minLength.test(password) && uppercase.test(password) && lowercase.test(password) && number.test(password) && specialChar.test(password);
};

const Signup = () => {
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    first_name: '',
    last_name: '',
    password: ''
  });
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (name === 'password') {
      setIsPasswordValid(validatePassword(value));
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isPasswordValid) {
      toast({
        description: 'Please ensure the password meets all requirements.',
      });
      return;
    }
    setLoading(true);
    try {
      const newFormData = new FormData();
      Object.entries(formData).forEach(([key, value]) => newFormData.append(key, value));
      await signup(newFormData);
      toast({
        description: 'Welcome aboard! Please verify your email to log in.',
      });
    } catch (error: any) {
      toast({
        description: 'Signup failed - '+ error.message,
      });
      router.push('/auth/signup');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen mx-4">
        <div className='h-[700px] lg:h-[650px] w-full max-w-[1200px] mx-auto border dark:border-gray-900 rounded grid lg:grid-cols-12 grid-cols-1'>
            <div 
                className='flex-col w-full lg:col-span-6 col-span-12 lg:flex hidden justify-between border-r dark:border-gray-900'
                style={{ backgroundImage: `url('/44.png')`, backgroundSize: 'cover', backgroundPosition: 'center' }}
            >
            </div>
            <div className='w-full lg:col-span-6 col-span-12 items-center justify-center flex'>
                <form onSubmit={handleSubmit} className="w-full max-w-sm lg:w-2/3 p-8 space-y-6 lg:space-y-8">
                    <Image src="/logo.png" alt="logo" width={100} height={100}  className="mx-auto mb-4 lg:hidden flex" />
                    <h2 className="text-center font-extralight text-3xl">Signup</h2>
                    <div className="space-y-6">
                    {(['email', 'username', 'first_name', 'last_name', 'password'] as const).map(field => (
                        <div key={field}>
                        <input
                            id={field}
                            type={field === 'password' ? 'password' : 'text'}
                            autoComplete={field}
                            required
                            className="w-full py-1.5 px-2 border dark:border-gray-500 rounded font-extralight bg-transparent"
                            name={field}
                            value={formData[field]}
                            onChange={handleInputChange}
                            placeholder={field.split(/(?=[A-Z])/).map(part => part.charAt(0).toUpperCase() + part.slice(1)).join(' ')}
                        />
                        </div>
                    ))}
                    {!isPasswordValid && (
                        <p className="text-red-500 text-xs font-extralight">
                        Password must be at least 8 characters long and contain uppercase, lowercase, digit, and symbol.
                        </p>
                    )}
                    </div>
                    <button type="submit" disabled={loading} className="w-full p-2 rounded border dark:border-gray-900 font-extralight hover:font-light">
                    {loading ? 'Signing up...' : 'Sign up'}
                    </button>
                    <p className="text-center">
                    <Link href="/auth/login">
                        <span className="font-extralight hover:font-light">Login</span>
                    </Link>
                    </p>
                </form>
            </div>
        </div>
    </div>
  );
};

export default Signup;
