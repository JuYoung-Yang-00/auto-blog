import { createClient } from '@/utils/supabase/server';

export async function GET(
  req: Request,
  { params }: { params: { username: string } }
) {

  const { username } = params;
  const supabase = createClient();
  console.log('API Request for username:', username); 

  try {
    const { data: userData, error: userError } = await supabase
      .from('user')
      .select('id')
      .eq('username', username)
      .single();
    
    if (userError || !userData) {
      return new Response(JSON.stringify({ error: 'User not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    const userId = userData.id;
    console.log('User ID:', userId);

    try {
      const { data: posts, error: postsError } = await supabase
        .from('posts')
        .select(`
          id,
          created_at,
          title,
          content,
          featured,
          url,
          post_categories:post_categories (
            category_id,
            categories (name)
          )
        `).eq('user_id', userId);

      if (postsError) {
        console.error('Posts Error:', postsError);
        return new Response(JSON.stringify({ error: 'Failed to fetch posts' }), {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        });
      }

      return new Response(JSON.stringify(posts), {
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
  } catch {
    return new Response(JSON.stringify({ error: 'Failed GET request' }), {
      status: 404,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}