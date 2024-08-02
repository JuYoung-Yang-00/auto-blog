'use client';
import { useState, useEffect } from 'react';
import { useToast } from "@/components/ui/toast/use-toast"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"

interface Category {
  id: number;
  name: string;
  user_id: number;
}

const Category = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [newCategory, setNewCategory] = useState<string>('');
  const [isLoading, setLoading] = useState<boolean>(true);
  
  const { toast } = useToast();
  useEffect(() => {
    const fetchCategories = async () => {
      const response = await fetch('/api/categories');
      const data = await response.json();
      setCategories(data);
      setLoading(false);
    };

    fetchCategories();
  }, []);

  const handleAddCategory = async () => {
    if (!newCategory.trim()) return;

    try {
      const response = await fetch('/api/categories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: newCategory }),
      });
      const data = await response.json();
      if (response.ok) {
        setCategories((prevCategories) => [...prevCategories, data]);
        setNewCategory('');
        toast({
          description: 'Category added successfully.',
        })
      } else {
        console.error('Error adding category:', data.message);
        toast({
          description: data.message || 'Failed to add category.',
        })
      }
    } catch (error) {
      console.error('Error adding category:', error);
      toast({
        description: 'An error occurred while adding the category.',
      })
    }
  };

  const handleDeleteCategory = async (id: number) => {
    try {
      const response = await fetch('/api/categories', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });
      const data = await response.json();
      if (response.ok) {
        setCategories((prevCategories) => prevCategories.filter((category) => category.id !== id));
        toast({
          description: 'Category deleted successfully.',
        })
      } else {
        console.error('Error deleting category:', data.message);
        toast({
          description: data.message || 'Failed to delete category.',
        })
      }
    } catch (error) {
      console.error('Error deleting category:', error);
      toast({
        description: 'An error occurred while deleting the category.',
      })
    }
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className='border max-w-100 mx-auto flex flex-col my-10'>
      <ScrollArea className="w-100 h-[600px] mb-6">
        <div className="p-4">
          <h1 className="text-lg font-extralight  mb-6 text-center">Categories</h1>
          <div className="flex flex-col gap-2 font-extralight">
            {categories.map((category) => (
              <div key={category.id} className="flex justify-between items-center border-b pb-2">
                <span className=" ">{category.name}</span>
                <button onClick={() => handleDeleteCategory(category.id)} className="text-sm font-extralight hover:underline transition">
                  Delete
                </button>
              </div>
            ))}
          </div>


        </div>
        <ScrollBar orientation="vertical" />
      </ScrollArea>
      <div className='max-w-96 mx-auto h-[100px]'>
        <div className="flex mt-6 gap-1">
          <input
            type="text"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            placeholder="Add New Category"
            className="border rounded px-1.5 py-1 text-sm font-extralight flex-grow"
          />
          <button onClick={handleAddCategory} className=" border px-1.5 py-1 rounded text-sm font-extralight hover:font-light">
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default Category;


// use scrollarea  https://ui.shadcn.com/docs/components/scroll-area