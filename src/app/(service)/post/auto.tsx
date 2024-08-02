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
    <div className="w-full p-2 max-w-[1480px] mx-auto flex flex-col gap-4">
      <p className='font-extralight mt-6'> Select categories:</p>
      <form onSubmit={handleSubmit} className="flex flex-col gap-8">
        <div className="flex flex-wrap lg:gap-6 gap-4">
          {categories.map((category) => (
            <div key={category.id} className="flex items-center space-x-2">
              <Checkbox
                id={`category-${category.id}`}
                checked={selectedCategories.some(c => c.id === category.id)}
                onCheckedChange={(checked) => handleCategoryChange(category)}
              />
              <label
                htmlFor={`category-${category.id}`}
                className="text-sm font-extralight leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {category.name.toLowerCase()}
              </label>
            </div>
          ))}
        </div>
        <div className='"w-full grid lg:grid-cols-12 gap-4 grid-cols-1 my-6'>
          <div className="lg:w-full lg:col-span-4 w-2/3">
            <input
              type="text"
              id="keywords"
              value={keyWords}
              onChange={(e) => setkeyWords(e.target.value)}
              className="w-full py-1.5 px-2 border dark:border-gray-500 rounded font-extralight text-sm bg-transparent"
              placeholder="Keywords"
            />
          </div>
          <div className="'w-full lg:col-span-8 col-span-8">
            <input
              type="text"
              id="mainidea"
              value={mainIdea}
              onChange={(e) => setmainIdea(e.target.value)}
              className="w-full py-1.5 px-2 border dark:border-gray-500 rounded font-extralight text-sm bg-transparent"
              placeholder="Main Idea"
            />
          </div>
        </div>
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
          className=" py-1.5 px-2 self-center text-sm rounded mt-4 font-extralight hover:font-light transition duration-150 ease-in-out"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Writing...' : 'Generate Post'}
        </button>
        {error && <p className="text-red-500 font-extralight text-xs">{error}</p>}
      </form>
    </div>
  );
};

export default AutoPost;


// use progress https://ui.shadcn.com/docs/components/progress
