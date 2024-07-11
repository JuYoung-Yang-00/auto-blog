import { createClient } from '@/utils/supabase/server'
import { profile } from 'console'
import { redirect } from 'next/navigation'


export default async function Profile() {
  const supabase = createClient()

  const { data: userData, error: userError } = await supabase.auth.getUser()
  if (userError || !userData?.user) {
    redirect('/auth/login')
  }

  const { data: profileData, error: profileError } = await supabase
  .from('user')
  .select('*')
  .eq('id', userData.user.id)
  .single();  
  if (profileError || !profileData) {
    console.log(profileError);
    return new Response(JSON.stringify({ error: "Profile not found" }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
    });
}
  
return (
  <main className="flex min-h-screen flex-col items-center justify-between max-w-[1480px] mx-auto px-5 mt-28">
    <div className="flex flex-col gap-10 w-full p-8 rounded">
      <h1 className="self-center text-xl">Welcome Back, {profileData.first_name}</h1>
      <div className="flex flex-col gap-4 mt-10 ">
        {/* <h2 className="self-center text-lg font-semibold ">Account Info</h2> */}
        <div className="flex flex-col gap-2 ">
          <p><span className="font-medium">First Name:</span> {profileData.first_name}</p>
          <p><span className="font-medium">Last Name:</span> {profileData.last_name}</p>
          <p><span className="font-medium">Email:</span> {profileData.email}</p>
        </div>
        <div>
          <p>
            <span className="font-medium">Your public page url: </span>
            <a href={`https://box-jet.vercel.app/${profileData.username}/`} className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">
              https://box-jet.vercel.app/{profileData.username}/
            </a>
          </p>
        </div>
      </div>
    </div>
  </main>
);
}

// use sheet https://ui.shadcn.com/docs/components/sheet for changing username, etc.