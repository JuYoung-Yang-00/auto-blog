import { createClient } from '@/utils/supabase/server';

export async function GET(
  req: Request,
  { params }: { params: { postid: string } }
) 
{
    const { postid } = params;
    const supabase = createClient();
    console.log('API Request for postid:', postid); 

    try {
        const { data: post, error: postError } = await supabase
        .from('posts')
        .select(`
            created_at,
            title,
            content,
            featured,
            url,
            post_categories:post_categories (
            category_id,
            categories (name)
            )
        `).eq('id', postid)
        .single();

        if (postError) {
        console.error('Posts Error:', postError);
        return new Response(JSON.stringify({ error: 'Failed to fetch posts' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
        }
        console.log("Post:", post)

        return new Response(JSON.stringify(post), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
        });
    } catch (error: any) {
        console.error('Error in GET handler:', error);
        return new Response(JSON.stringify({ message: error.message }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
        });
    } 
}
