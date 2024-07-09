'use client'
import { useState } from 'react';
import { login } from '@/lib/auth/actions';
import { useRouter } from 'next/navigation';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import 'react-toastify/dist/ReactToastify.css';
import { useToast } from "@/components/ui/toast/use-toast"

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);

    try {
      await login(formData);
      toast({
        description: 'Login successful.',
      });
    } catch (error:any) {
      console.log(error)
      toast({
        description: 'Login failed. Please check your email and password.',
      });
      router.push('/auth/login');
    } finally {
      setLoading(false);
    }

  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen mx-4">
        <div className='h-[600px] lg:w-full w-3/4 max-w-[1200px] mx-auto border rounded grid lg:grid-cols-12 grid-cols-1'>
            <div 
                className='flex-col w-full lg:col-span-6 col-span-12 lg:flex hidden justify-between py-32 border-r'
                style={{ backgroundImage: `url('/background.jpeg')`, backgroundSize: 'cover', backgroundPosition: 'center' }}
            >
            </div>
            <div className='w-full lg:col-span-6 col-span-12 items-center justify-center flex'>
                <form onSubmit={handleSubmit} className="w-full max-w-xs lg:w-1/2 p-8 space-y-6">
                    <div>
                    <Image src="/logo.png" alt="logo" width={100} height={100} className="mx-auto mb-4 lg:hidden flex" />
                    <h2 className="text-center text-3xl font-extrabold mb-6">Login</h2>
                    <label htmlFor="email" className="block text-sm font-medium ">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full mt-1 p-2 border rounded-md"
                        required
                    />
                    </div>
                    <div>
                    <label htmlFor="password" className="block text-sm font-medium">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full mt-1 p-2 border rounded-md"
                        required
                    />
                    </div>
                    <button type="submit" disabled={loading} className="w-full p-2 rounded-md border font-light hover:font-normal hover:border-2">
                    {loading ? 'Logging in...' : 'Log in'}
                    </button>
                    <p className="text-center">
                    <Link href="/auth/signup">
                        <span className="font-light hover:font-normal">Sign up</span>
                    </Link>
                    </p>
                </form>
            </div>
        </div>
    </div>
  );
};

export default Login;
