'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
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
  featured: boolean;
  url: string;
  post_categories: Category[];
}

interface AuthorPostsProps {
  params: { username: string };
}

export default function AuthorPosts({ params }: AuthorPostsProps) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(posts.length / postsPerPage);
  const handlePreviousPage = () => {
    setCurrentPage((prev) => (prev === 1 ? prev : prev - 1));
  };
  
  const handleNextPage = () => {
    setCurrentPage((prev) => (prev === totalPages ? prev : prev + 1));
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        console.log('Fetching posts for username:', params.username); 
        const response = await fetch(`/api/public/${params.username}`);
        if (!response.ok) {
          throw new Error('User not found');
        }
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error('Error fetching posts:', error); 
        setError((error as Error).message);
        router.push('/404');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [params.username, router]);

  const featuredPosts = posts.filter((post) => post.featured);
  const regularPosts = posts.filter((post) =>!post.featured);

  if (isLoading) return <div className='min-h-screen'>  </div>;
  if (error) return <p>{error}</p>;

  return (
    <div className="min-h-screen w-full max-w-[1450px] mx-auto px-8 mt-28">
      <div className="flex flex-row gap-4 text-xl font-bold mb-10">
        <p> || </p>
        <h1 className='hover:underline'> {params.username.toUpperCase()} </h1>
      </div>

      {/* Featured Posts Carousel */}

      <div className="flex flex-col gap-5">
        {currentPosts.reverse().map((post) => (
          <div key={post.id} className="border-b py-0 my-0 last:border-b-0 flex-col lg:flex-row flex justify-between">
            <div className="flex flex-col items-start">
              <Link href={`/${params.username}/${post.id}`}>
                <span className="text-lg font-medium hover:underline">{post.title}</span>
              </Link>
              <div className="mt-2 mb-5 flex gap-4">
                {post.post_categories.map((category) => (
                  <span key={category.category_id} className="border px-2 py-1 rounded text-sm font-light">
                    {category.categories.name}
                  </span>
                ))}
              </div>
            </div>
            <div className='lg:flex hidden'>
                {post?.url && (
                  <Image
                    src={post.url}
                    alt="Image"
                    width={200}
                    height={200}
                    // layout="responsive"
                    className='rounded'
                  />
                )}
              </div>
          </div>
        ))}
      </div>


      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious onClick={handlePreviousPage} />
          </PaginationItem>
          {Array.from({ length: totalPages }, (_, i) => (
            <PaginationItem key={i}>
              <PaginationLink
                isActive={currentPage === i + 1}
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
          {/* <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem> */}
          <PaginationItem>
            <PaginationNext onClick={handleNextPage}  />
          </PaginationItem>
        </PaginationContent>
      </Pagination>

    </div>

  );
  
}


