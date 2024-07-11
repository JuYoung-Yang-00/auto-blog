'use client';
import { useState, useEffect } from 'react';
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/components/ui/toast/use-toast"

interface Category {
  id: number;
  name: string;
  user_id: number;
}

const Post = () => {
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const {toast} = useToast();

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await fetch('/api/categories');
      const data = await response.json();
      setCategories(data);
    };

    fetchCategories();
  }, []);

  const handleCategoryChange = (categoryId: number) => {
    setSelectedCategories((prevSelected) =>
      prevSelected.includes(categoryId)
        ? prevSelected.filter((id) => id !== categoryId)
        : [...prevSelected, categoryId]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim() || selectedCategories.length === 0) {
      setError('Title, content, and at least one category are required.');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, content, categories: selectedCategories }),
      });

      if (response.ok) {
        setTitle('');
        setContent('');
        setSelectedCategories([]);
        toast({
          description: 'Post created successfully.',
        })
      } else {
        const data = await response.json();
        setError(data.message || 'Failed to create post.');
        toast({
          description: data.message || 'Failed to create post.',
        })
      }
    } catch (error) {
      setError('An error occurred while creating the post.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full p-8 border rounded max-w-[1480px] mx-auto">
      <h1 className="text-lg font-bold  mb-6 text-center">New Post</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {error && <p className="text-red-500">{error}</p>}
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Post Title"
          className="border  rounded p-2 "
          required
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Post Content"
          className="border  rounded p-2 min-h-[350px] resize-none"
          rows={5}
          required
        />
        <div className="flex flex-wrap gap-8">
          {categories.map((category) => (
            <div key={category.id} className="items-top flex space-x-2">
            <Checkbox id={category.id.toString()} />
            <div className="grid gap-1.5 leading-none">
              <label
                htmlFor={category.id.toString()}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {category.name}
              </label>
            </div>
          </div>
          ))}
        </div>
        <button
          type="submit"
          className="self-center border text-sm  p-1 w-1/8 rounded transition"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </div>
  );
};

export default Post;
