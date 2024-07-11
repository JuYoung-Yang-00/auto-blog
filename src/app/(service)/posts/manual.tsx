'use client';
import { useState, useEffect } from 'react';
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/components/ui/toast/use-toast"
import { Switch } from "@/components/ui/switch"

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
  const [featured, setFeatured] = useState<boolean>(false);

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
    <div className="w-full p-2 max-w-[1480px] mx-auto border-b pb-16 flex flex-col gap-4">
      <p className='font-extralight mt-6'> Select categories:</p>
      <form onSubmit={handleSubmit} className="flex flex-col gap-8">
        {error && <p className="text-red-500 font-extralight text-xs">{error}</p>}
        <div className="flex flex-wrap lg:gap-6 gap-4">
          {categories.map((category) => (
            <div key={category.id} className="items-center flex space-x-2">
            <Checkbox id={category.id.toString()} />
              <label
                htmlFor={category.id.toString()}
                className="text-sm font-extralight leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {category.name}
              </label>
          </div>
          ))}
        </div>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Post Title"
          className="w-full lg:w-1/2 py-1.5 px-2 border rounded font-extralight text-sm"
          required
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Post Content in Markdown"
          className="py-1.5 px-2 border rounded font-extralight text-sm min-h-[200px]"
          rows={5}
          required
        />
        <div className="flex items-center space-x-2">
            <label
                htmlFor="featured-switch"
                className="text-sm font-extralight "
            >
                Featured:
            </label>
            <Switch
                checked={featured}
                onCheckedChange={setFeatured}
            />
        </div>

        <button
          type="submit"
          className="py-1.5 px-2 self-center text-sm rounded mt-4 font-extralight hover:font-light transition duration-150 ease-in-out"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Uploading...' : 'Upload'}
        </button>
      </form>
    </div>
  );
};

export default Post;
