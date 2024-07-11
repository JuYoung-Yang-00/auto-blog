'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useUsername } from '@/app/(public)/components/UsernameContext';
import ReactMarkdown from 'react-markdown';

interface Category {
  category_id: number;
  categories: {
    name: string;
  };
}

interface Post {
  id: number;
  created_at: string;
  title: string;
  content: string;
  url: string;
  featured: boolean;
  post_categories: Category[];
}

interface AuthorPostsProps {
  params: { postid: string, username: string };
}

export default function AuthorPosts({ params }: AuthorPostsProps) {
  const [post, setPost] = useState<Post>();
  const [isLoading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const { username } = params;
  const { setUsername } = useUsername();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        console.log('Fetching posts for postid:', params.postid); 
        const response = await fetch(`/api/public/post/${params.postid}`);
        if (!response.ok) {
          throw new Error('Post not found');
        }
        const data = await response.json();
        setPost(data);
      } catch (error) {
        console.error('Error fetching post:', error); 
        setError((error as Error).message);
        router.push('/404');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [params.postid, router]);

  useEffect(() => {
    if (username && typeof username === 'string') {
      setUsername(username);
    }

  }, [username, setUsername]);


  if (isLoading) return <div className='min-h-screen'>  </div>;
  if (error) return <p>{error}</p>;

  return (
    <div className="min-h-screen w-full max-w-[1450px] mx-auto px-4 lg:px-8 mt-16">
      <div className="flex flex-col gap-6">
          <div className="max-w-[1000px] mx-auto py-6 my-6">
            <div className="flex justify-between items-center border-b">
                <span className="text-3xl font-light mx-auto mb-5">{post?.title}</span>
            </div>
              <div className='w-full lg:w-3/4 mx-auto mt-10 mb-5'>
                {post?.url && (
                  <Image
                    src={post.url}
                    alt="Image"
                    width={100}
                    height={100}
                    layout="responsive"
                    className='rounded'
                  />
                )}
              </div>
            <div className="flex justify-between mb-6 mt-20">
              <div className='flex flex-wrap gap-3'>
                {post?.post_categories.map((category) => (
                  <span key={category.category_id} className="border px-2 py-1 rounded text-sm font-extralight">
                    {category.categories.name.toLowerCase()}
                  </span>
                  ))}
              </div>
              <p className='hidden sm:flex font-extralight italic'>{post?.created_at ? new Date(post.created_at).toLocaleDateString('en-CA') : ''}</p>
            </div>
            {/* <div className="mt-10 space-y-10 font-light">
                {post?.content.split('\n').map((paragraph, index) => (
                  <p key={index}>
                    {paragraph}
                  </p>
                ))}
            </div> */}
            <div className="mt-10 space-y-8 font-light">
              <ReactMarkdown>
                {post?.content || ''}
              </ReactMarkdown>
            </div>
            
            <p className='mt-20 flex sm:hidden font-extralight italic'>{post?.created_at ? new Date(post.created_at).toLocaleDateString('en-CA') : ''}</p>
          </div>
      </div>
    </div>
  );
}
