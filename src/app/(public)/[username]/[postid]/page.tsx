'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

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

  if (isLoading) return <div className='min-h-screen'>  </div>;
  if (error) return <p>{error}</p>;

  return (
    <div className="min-h-screen w-full max-w-[1500px] mx-auto px-8 mt-28">
      <div className="flex flex-col gap-6">
        <div className="flex flex-row  gap-4 text-lg font-bold">
          <p> || </p>
          <h1> {params.username} </h1>
        </div>
          <div className="border-b py-6 my-6 last:border-b-0">
            <div className="flex justify-between items-center">
                <span className="text-xl font-medium mx-auto mb-10">{post?.title}</span>
            </div>
              <div className='w-full lg:w-1/2 mx-auto mt-10 mb-20'>
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
            <div className="mt-6 mb-10">
              <div className="flex flex-wrap gap-4 mb-6">
                {post?.post_categories.map((category) => (
                  <span key={category.category_id} className="border px-2 py-1 rounded text-sm font-medium">
                    {category.categories.name}
                  </span>
                ))}
              </div>
              <div className=" space-y-6">
                {post?.content.split('\n').map((paragraph, index) => (
                  <p key={index}>
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </div>
      </div>
    </div>
  );
}
