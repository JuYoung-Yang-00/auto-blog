import { createClient } from '@/utils/supabase/server'

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
        const { data: profileData, error: profileError } = await supabase
            .from('user')
            .select('*')
            .eq('id', user_id)
            .single();  
        if (profileError || !profileData) {
            console.log(profileError);
            return new Response(JSON.stringify({ error: "Profile not found" }), {
                status: 404,
                headers: { 'Content-Type': 'application/json' },
            });
        }
        console.log("profileData:", profileData);
        return new Response(JSON.stringify(profileData), {
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
