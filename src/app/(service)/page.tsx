import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';
import Category from './posts/category';
import PostList from './posts/posts';
import NewPost from './posts/post';
import AutoPost from './posts/auto';

export default async function Posts() {
  const supabase = createClient()

  const { data: userData, error: userError } = await supabase.auth.getUser()
  if (userError || !userData?.user) {
    redirect('/auth/login')
  }


  return (
    <main className='min-h-screen w-full max-w-[1500px] mx-auto px-2 mt-28'>
      <div className="w-full grid lg:grid-cols-12 gap-4 grid-cols-1 mb-10">
        <div className='w-full lg:col-span-4'>
          <AutoPost />
        </div>
        <div className='w-full lg:col-span-8'>
          <NewPost />
        </div>
      </div>
      <div className="w-full grid lg:grid-cols-12 gap-4 grid-cols-1 ">
        <div className='w-full lg:col-span-4'>
          <Category />
        </div>
        <div className='w-full lg:col-span-8'>
          <PostList />
        </div>
      </div>


    </main>
  );
}
