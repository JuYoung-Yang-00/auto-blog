'use client';
import { useState, useEffect } from 'react';
import { useToast } from "@/components/ui/toast/use-toast"

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
  post_categories: Category[];
}

const Posts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setLoading] = useState<boolean>(true);
 
  const {toast} = useToast();
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('/api/posts');
      const data = await response.json();
      setPosts(data);
      setLoading(false);
    };

    fetchPosts();
  }, []);

  const handleDeletePost = async (id: number) => {
    try {
      const response = await fetch('/api/posts', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });
      const data = await response.json();
      if (response.ok) {
        setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
        toast({
          description: 'Post deleted successfully.',
        })
      } else {
        console.error('Error deleting post:', data.message);
        toast({
          description: data.message || 'Failed to delete post.',
        })
      }
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="w-full p-8  border rounded">
      <h1 className="text-lg font-bold  mb-6 text-center">Posts</h1>
      <div className="flex flex-col gap-4 mb-6">
        {posts.map((post) => (
          <div key={post.id} className="border-b pb-4 mb-4">
            <div className="flex justify-between items-center">
              <span className=" ">{post.title}</span>
              <button onClick={() => handleDeletePost(post.id)} className="text-sm font-light hover:underline transition">
                Delete
              </button>
            </div>
            <div className="mt-2">
              <div className="flex flex-wrap gap-2 mt-2">
                {post.post_categories.map((category) => (
                  <span key={category.category_id} className="border px-1 py-0.5 rounded text-sm">
                    {category.categories.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Posts;
