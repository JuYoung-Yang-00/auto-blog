'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUsername } from '@/app/(public)/components/UsernameContext';
import Link from 'next/link'
import {
  Pagination,
  PaginationContent,
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
import Autoplay from "embla-carousel-autoplay"
import * as React from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"


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

  const { username } = params;
  const { setUsername } = useUsername();

  const featuredPosts = posts.filter((post) => post.featured);
  const regularPosts = posts.filter((post) =>!post.featured);

  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = currentPage === 1 ? 5 : 10;

  const totalRegularPosts = regularPosts.length;
  const totalPostsForPagination = 5 + 10 * (Math.ceil((totalRegularPosts - 5) / 10));
  const totalPages = currentPage === 1 ? Math.ceil(totalRegularPosts / 5) : Math.ceil((totalRegularPosts - 5) / 10) + 1;

  const indexOfFirstPost = currentPage === 1 ? 0 : 5 + (currentPage - 2) * 10;
  const indexOfLastPost = currentPage === 1 ? 5 : indexOfFirstPost + 10;
  const currentPosts = regularPosts.slice(indexOfFirstPost, indexOfLastPost);



  const handlePreviousPage = () => {
    setCurrentPage(prev => (prev === 1 ? prev : prev - 1));
  };
  
  const handleNextPage = () => {
    setCurrentPage(prev => (prev === totalPages ? prev : prev + 1));
  };

  useEffect(() => {
    if (username && typeof username === 'string') {
      setUsername(username);
    }

  }, [username, setUsername]);

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

  currentPosts.sort((a, b) => {
    const dateA = new Date(a.created_at);
    const dateB = new Date(b.created_at);
    return dateB.getTime() - dateA.getTime();
  });

  function FeaturedPosts() {
    const plugin = React.useRef(
      Autoplay({
        delay: 3000,
        stopOnInteraction: false,
        stopOnMouseEnter: true,
      })
    )
    return (
      <Carousel 
        className="w-full"
        plugins={[plugin.current]}
        opts={{ loop: true, align: "start" }}
      >
        <CarouselContent className="-ml-1">
          {featuredPosts.map((post, index) => (
            <CarouselItem key={index} className="pl-1">
              <div className="p-1">
                <Link href={`/post/${post.id}`}>
                  <Card className='w-full grid lg:grid-cols-12 grid-cols-1'>
                    <div className='w-full lg:col-span-6'>
                      {post.url && (
                        <div className='w-full lg:h-full h-[350px] overflow-hidden relative'>
                          <Image src={post.url} alt={post.title} layout='fill' objectFit='cover' />
                        </div>
                      )}
                    </div>
                    <div className='w-full lg:col-span-6'>
                      <CardHeader>
                        <CardTitle className='font-extralight lg:text-4xl text-3xl pt-2 lg:px-10 px-0'>{post.title}</CardTitle>
                      </CardHeader>
                      <CardContent className="flex flex-col aspect-auto items-start">
                        <div className='flex flex-wrap gap-4 lg:pl-10 lg:py-8'>
                          {post.post_categories.map((category) => (
                            <div key={category.category_id} className='flex flex-wrap justify-start items-start'>
                              <CardDescription className='rounded lg:text-md text-sm font-extralight'>
                                {category.categories.name.toUpperCase()}
                              </CardDescription>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                      <CardFooter className='justify-end hidden lg:flex'>
                        <p className='font-extralight text-xs'>{post?.created_at ? new Date(post.created_at).toLocaleDateString('en-CA') : ''}</p>
                      </CardFooter>
                    </div>
                  </Card>
                </Link>

              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    )
  }

  if (isLoading) return <div className='min-h-screen'>  </div>;
  if (error) return <p>{error}</p>;

  return (
    <div className="min-h-screen w-full max-w-[1480px] mx-auto p-2 lg:px-8 mt-14">
      {/* This div below */}
      {currentPage === 1 && ( // This checks if the current page is the first page
      <div>
        <div className='flex flex-col gap-5 max-w-[1100px] mx-auto mb-8 lg:mb-16'>
          <h1 className="text-2xl font-extralight border-b pb-2"> Featured </h1>
          <FeaturedPosts />
        </div>

        <div className='text-2xl font-extralight max-w-[1100px] mx-auto border-b pb-2 mb-10'>
          <h1>Recent</h1>
        </div>
      </div>
      )}

      {/* Pagination */}
      <div className="flex flex-col gap-5 max-w-[1100px] mx-auto">
        {currentPage !== 1 && (
          <div className='mt-10 border-t pt-3'>
          </div>
        )}
        {currentPosts.map((post) => (
          <div key={post.id} className="border-b border-dotted pb-5 my-0 last:border-b-0 flex-col lg:flex-row flex justify-between">
            <div className="flex flex-col items-start">
              <Link href={`/${params.username}/${post.id}`}>
                <span className="text-lg font-light hover:underline">{post.title}</span>
              </Link>
              <div className="mt-2 mb-5 flex gap-4">
                {post.post_categories.map((category) => (
                  <span key={category.category_id} className="border px-2 py-1 rounded text-sm font-extralight">
                    {category.categories.name.toLowerCase()}
                  </span>
                ))}
              </div>
            </div>
            <div className='lg:flex hidden'>
                {post?.url && (
                  <Image
                    src={post.url}
                    alt="Image"
                    width={250}
                    height={250}
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
          <PaginationItem>
            <PaginationNext onClick={handleNextPage}  />
          </PaginationItem>
        </PaginationContent>
      </Pagination>

    </div>
  );
}


