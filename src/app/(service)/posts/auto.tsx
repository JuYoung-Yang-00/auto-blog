'use client';
import { useState, useEffect } from 'react';
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/components/ui/toast/use-toast"

interface Category {
  id: number;
  name: string;
  user_id: number;
}

const AutoPost = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [keyWords, setkeyWords] = useState<string>('');
  const [mainIdea, setmainIdea] = useState<string>('');
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

  const handleCategoryChange = (category: Category) => {
    setSelectedCategories((prevSelected) =>
      prevSelected.find((c) => c.id === category.id)
        ? prevSelected.filter((c) => c.id !== category.id)
        : [...prevSelected, category]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedCategories.length === 0) {
      setError('At least one category is required.');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch('/api/ai/auto', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          categories: selectedCategories.map((c) => c.name),
          keywords: keyWords,
          mainidea: mainIdea,
          featured: featured,
         }),
      });

      if (response.ok) {
        setSelectedCategories([]);
        setkeyWords('');
        setmainIdea('');
        toast({
          title: 'Success!',
          description: 'Post uploaded successfully.',
        })
      } else {
        const data = await response.json();
        setError(data.message || 'Failed to create post.');
      }
    } catch (error) {
      setError('An error occurred while creating the post.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full p-8 border rounded max-w-[1500px] mx-auto">
      <h1 className="text-lg font-bold mb-6 text-center">Generate Post</h1>
      <p className='text-md mb-4'> Select topic:</p>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {error && <p className="text-red-500">{error}</p>}
        <div className="flex flex-wrap gap-8">
          {categories.map((category) => (
            <div key={category.id} className="flex items-center space-x-2">
              <Checkbox
                id={`category-${category.id}`}
                checked={selectedCategories.some(c => c.id === category.id)}
                onCheckedChange={(checked) => handleCategoryChange(category)}
              />
              <label
                htmlFor={`category-${category.id}`}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {category.name}
              </label>
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-4 mt-2">
          <label className="text-md" htmlFor="keywords">Keywords:</label>
          <input
            type="text"
            id="keywords"
            value={keyWords}
            onChange={(e) => setkeyWords(e.target.value)}
            className="p-2 border  rounded "
          />
        </div>
        <div className="flex flex-col gap-4 mt-2">
          <label className="" htmlFor="mainidea">Main Idea:</label>
          <input
            type="text"
            id="mainidea"
            value={mainIdea}
            onChange={(e) => setmainIdea(e.target.value)}
            className="p-2 border rounded "
          />
        </div>
        <div className="flex items-center space-x-2">
            <Checkbox
                id={featured ? 'featured' : 'not-featured'}
                checked={featured}
                onCheckedChange={(checked) => {
                    if (checked !== 'indeterminate') {
                        setFeatured(checked);
                    }
                }}
            />
            <label
                htmlFor={featured ? 'featured' : 'not-featured'}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
                Featured
            </label>
        </div>
        <button
          type="submit"
          className="border p-1 w-1/4 self-center text-sm rounded"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Writing...' : 'Create Post'}
        </button>
      </form>
    </div>
  );
};

export default AutoPost;
