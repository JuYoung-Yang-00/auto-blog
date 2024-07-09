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
        const { data: categories, error: categoryError } = await supabase
            .from('categories')
            .select('id, name')
            .eq('user_id', user_id);
        if (categoryError || !categories) {
            console.log(categoryError);
            return new Response(JSON.stringify({ error: "Categories not found" }), {
                status: 404,
                headers: { 'Content-Type': 'application/json' },
            });        
        }
        return new Response(JSON.stringify(categories), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error: any) {
        console.error("Error in GET handler:", error);
        return new Response(JSON.stringify({ message: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}

export async function POST(req: Request) {
    const supabase = createClient();
    const {
        data: userData,
        error: userError,
    } = await supabase.auth.getUser();

    if (userError || !userData?.user) {
        return new Response(JSON.stringify({ message: 'Unauthorized' }), {
            status: 401,
            headers: { 'Content-Type': 'application/json' },
        });
    }
    const user_id = userData.user.id;
    const { name }: { name: string } = await req.json();
    try {
        const {
            data: newCategory,
            error: categoryError,
        } = await supabase
            .from('categories')
            .insert([{ name, user_id }])
            .select()
            .single();

        if (categoryError || !newCategory) {
            console.error('Category Error:', categoryError);
            return new Response(JSON.stringify({ error: 'Failed to create category' }), {
                status: 500,
                headers: { 'Content-Type': 'application/json' },
            });
        }
        return new Response(JSON.stringify(newCategory), {
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
            .from('categories')
            .delete()
            .eq('id', id)
            .eq('user_id', user_id);
        if (deleteError) {
            console.log(deleteError);
            return new Response(JSON.stringify({ error: "Failed to delete category" }), {
                status: 500,
                headers: { 'Content-Type': 'application/json' },
            });              
        }
        return new Response(JSON.stringify({ message: "Category deleted successfully" }), {
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
