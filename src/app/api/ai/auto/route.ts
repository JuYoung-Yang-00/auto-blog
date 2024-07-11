import { createClient } from '@/utils/supabase/server';
import { createBlogPost } from '@/lib/ai/createPost';
import { NextRequest, NextResponse } from 'next/server';
import { createImage } from '@/lib/ai/createImage';

export const maxDuration = 60;
export async function POST(req: NextRequest) {
    const supabase = createClient();
    const { data: userData, error: userError } = await supabase.auth.getUser();

    if (userError || !userData?.user) {
        return new NextResponse(JSON.stringify({ message: 'Unauthorized' }), {
            status: 401,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    const user_id = userData.user.id;
    const { categories, keywords, mainidea, featured }: { categories: string[], keywords: string, mainidea: string, featured: boolean } = await req.json();

    try {
        const categoryString = categories.join(', ');
        console.log('Generating blog post for categories:', categoryString);
        console.log('Generating blog post for key words:', keywords);
        console.log('Generating blog post for main idea:', mainidea);
        console.log('This blog post is featured:', featured);
        const blogPost = await createBlogPost(categoryString, keywords, mainidea);
        const title = blogPost.title;
        const content = blogPost.content;
        const imagePrompt = blogPost.image;

        if (!title || !content) {
            throw new Error('Failed to generate blog post');
        }

        const { data: newPost, error: postError } = await supabase
            .from('posts')
            .insert([{ title, content, user_id, featured }])
            .select()
            .single();

        if (postError || !newPost) {
            console.error('Post Error:', postError);
            return new NextResponse(JSON.stringify({ error: 'Failed to create post' }), {
                status: 500,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        // Generate the image after the post is successfully created
        const image = await createImage(imagePrompt);
        if (!image) {
            throw new Error("Error generating image");
        }

        const { data: imageData, error: imageError } = await supabase
            .storage
            .from('images')
            .upload(`public/${newPost.id}`, image, {
                cacheControl: '3600',
                upsert: false
            });

        if (imageError) {
            console.error('Image Error:', imageError);
            return new NextResponse(JSON.stringify({ error: 'Failed to upload image' }), {
                status: 500,
                headers: { 'Content-Type': 'application/json' },
            });
        } 

        const { data: url } = await supabase.storage
            .from('images')
            .getPublicUrl(`public/${newPost.id}`);

        if (!url) {
            console.error('Image URL not found');
            return new NextResponse(JSON.stringify({ error: 'Image URL not found' }), {
                status: 500,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        const { error: updateError } = await supabase
            .from('posts')
            .update({ url: url.publicUrl })
            .match({ id: newPost.id });

        if (updateError) {
            console.error('Update Post Error:', updateError);
            return new NextResponse(JSON.stringify({ error: 'Failed to update post with image URL' }), {
                status: 500,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        const postCategories = await Promise.all(
            categories.map(async (category_name) => {
                const { data } = await supabase
                    .from('categories')
                    .select('id')
                    .eq('name', category_name)
                    .single();
                return {
                    post_id: newPost.id,
                    category_id: data?.id,
                };
            })
        );

        const { error: postCategoriesError } = await supabase
            .from('post_categories')
            .insert(postCategories);

        if (postCategoriesError) {
            console.error('Post Categories Error:', postCategoriesError);
            return new NextResponse(JSON.stringify({ error: 'Failed to create post categories' }), {
                status: 500,
                headers: { 'Content-Type': 'application/json' },
            });
        }

            
        return new NextResponse(JSON.stringify(newPost), {
            status: 201,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error: any) {
        console.error('Error in POST handler:', error);
        return new NextResponse(JSON.stringify({ message: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
