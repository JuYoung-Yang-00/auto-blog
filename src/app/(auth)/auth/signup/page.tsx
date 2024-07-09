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
    firstName: '',
    lastName: '',
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
        <div className='h-[800px] lg:w-full w-3/4 max-w-[1200px] mx-auto border rounded grid lg:grid-cols-12 grid-cols-1'>
            <div 
                className='flex-col w-full lg:col-span-6 col-span-12 lg:flex hidden justify-between border-r'
                style={{ backgroundImage: `url('/background.jpeg')`, backgroundSize: 'cover', backgroundPosition: 'center' }}
            >
            </div>
            <div className='w-full lg:col-span-6 col-span-12 items-center justify-center flex'>
                <form onSubmit={handleSubmit} className="w-full max-w-xs lg:w-1/2 p-8 space-y-6">
                    <Image src="/logo.png" alt="logo" width={100} height={100}  className="mx-auto mb-4 lg:hidden flex" />
                    <h2 className="text-center text-3xl font-extrabold ">Signup</h2>
                    <div className="space-y-4">
                    {(['email', 'username', 'firstName', 'lastName', 'password'] as const).map(field => (
                        <div key={field}>
                        <label htmlFor={field} className="block text-sm font-medium ">
                            {field.split(/(?=[A-Z])/).map(part => part.charAt(0).toUpperCase() + part.slice(1)).join(' ')}
                        </label>
                        <input
                            id={field}
                            type={field === 'password' ? 'password' : 'text'}
                            autoComplete={field}
                            required
                            className="w-full mt-1 p-2 border rounded-md "
                            name={field}
                            value={formData[field]}
                            onChange={handleInputChange}
                        />
                        </div>
                    ))}
                    {!isPasswordValid && (
                        <p className="text-red-500 text-sm mt-1">
                        Password must be at least 8 characters long and contain uppercase, lowercase, digit, and symbol.
                        </p>
                    )}
                    </div>
                    <button type="submit" disabled={loading} className="w-full p-2 rounded-md border font-light hover:font-normal hover:border-2">
                    {loading ? 'Sign up' : 'Sign up'}
                    </button>
                    <p className="text-center">
                    <Link href="/auth/login">
                        <span className="font-light hover:font-normal">Login</span>
                    </Link>
                    </p>
                </form>
            </div>
        </div>
    </div>
  );
};

export default Signup;
