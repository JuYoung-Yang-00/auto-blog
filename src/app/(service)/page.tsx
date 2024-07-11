import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';
import { Dashboard } from '@/app/(service)/posts/dashboard';
import { Post } from '@/app/(service)/posts/post';
import { Manage } from '@/app/(service)/posts/manage';

export default async function Posts() {
  const supabase = createClient()

  const { data: userData, error: userError } = await supabase.auth.getUser()
  if (userError || !userData?.user) {
    redirect('/auth/login')
  }

  return (
    <main className='min-h-screen w-full max-w-[1440px] mx-auto px-2 mt-16'>
      <Dashboard />
      <Post/>
      <Manage/>

      
      {/* <div className="w-full grid lg:grid-cols-12 gap-4 grid-cols-1 ">
        <div className='w-full lg:col-span-4'>
          <Category />
        </div>
        <div className='w-full lg:col-span-8'>
          <PostList />
        </div>
      </div> */}

      {/* <div className="w-full grid lg:grid-cols-12 gap-4 grid-cols-1 mb-10">
        <div className='w-full lg:col-span-4'>

        </div>
        <div className='w-full lg:col-span-8'>

        </div>
      </div> */}


    </main>
  );
}
