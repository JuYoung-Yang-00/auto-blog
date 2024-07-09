import { createClient } from '@/utils/supabase/server';

export async function GET() {
    const supabase = createClient();
    const { data, error } = await supabase.auth.getUser();
    if (error || !data?.user) {
        return new Response(JSON.stringify({ message: "Unauthorized" }), {
            status: 401,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    const user_id = data.user.id;
    try {
      const { data: posts, error: postsError } = await supabase
        .from('posts')
        .select(`
          id,
          created_at,
          title,
          content,
          post_categories:post_categories (
            category_id,
            categories (name)
          )
        `)
        .eq('user_id', user_id);
  
      if (postsError) {
        console.error('Posts Error:', postsError);
        return new Response(JSON.stringify({ error: 'Failed to fetch posts' }), { status: 500 });
      }
  
      return new Response(JSON.stringify(posts), { status: 200 });
    } catch (error: any) {
      console.error('Error in GET handler:', error);
      return new Response(JSON.stringify({ message: error.message }), { status: 500 });
    }
  }

export async function DELETE(req: Request) {
    const supabase = createClient();
    const { data, error } = await supabase.auth.getUser();
    if (error || !data?.user) {
        return new Response(JSON.stringify({ message: "Unauthorized" }), {
            status: 401,
            headers: { 'Content-Type': 'application/json' },
        });    
    }

    const user_id = data.user.id;
    const { id }: { id: number } = await req.json();

    try {
        const { error: deleteError } = await supabase
            .from('posts')
            .delete()
            .eq('id', id)
            .eq('user_id', user_id);
        if (deleteError) {
            console.log(deleteError);
            return new Response(JSON.stringify({ error: "Failed to delete post" }), {
                status: 500,
                headers: { 'Content-Type': 'application/json' },
            });              
        }
        return new Response(JSON.stringify({ message: "Post deleted successfully" }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error: any) {
        console.error("Error in DELETE handler:", error);
        return new Response(JSON.stringify({ message: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}


export async function POST(req: Request) {
    const supabase = createClient();
    const { data: userData, error: userError } = await supabase.auth.getUser();

    if (userError || !userData?.user) {
        return new Response(JSON.stringify({ message: 'Unauthorized' }), {
            status: 401,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    const user_id = userData.user.id;
    const { title, content, categories }: { title: string; content: string; categories: number[] } = await req.json();

    try {
        const { data: newPost, error: postError } = await supabase
            .from('posts')
            .insert([{ title, content, user_id }])
            .select()
            .single();

        if (postError || !newPost) {
            console.error('Post Error:', postError);
            return new Response(JSON.stringify({ error: 'Failed to create post' }), {
                status: 500,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        const postCategories = categories.map((category_id) => ({
            post_id: newPost.id,
            category_id,
        }));

        const { error: postCategoriesError } = await supabase
            .from('post_categories')
            .insert(postCategories);

        if (postCategoriesError) {
            console.error('Post Categories Error:', postCategoriesError);
            return new Response(JSON.stringify({ error: 'Failed to create post categories' }), {
                status: 500,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        return new Response(JSON.stringify(newPost), {
            status: 201,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error: any) {
        console.error('Error in POST handler:', error);
        return new Response(JSON.stringify({ message: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}