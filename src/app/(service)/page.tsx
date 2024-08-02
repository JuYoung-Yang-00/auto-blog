import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';
import { Dashboard } from '@/app/(service)/dashboard';
import PageHead from '@/app/(service)/PageHead'; 

export default async function Posts() {
  const supabase = createClient()

  const { data: userData, error: userError } = await supabase.auth.getUser()
  if (userError || !userData?.user) {
    redirect('/auth/login')
  }

  return (
    <main className='min-h-screen w-full max-w-7xl mx-auto px-2 mt-20'>
      <PageHead/>
      <Dashboard />
    </main>
  );
}
