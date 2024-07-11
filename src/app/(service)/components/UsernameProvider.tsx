// UsernameProvider.tsx
'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';
import { useUsername } from '@/app/(service)/components/ServiceUsernameContext';

const UsernameProviderComponent: React.FC = () => {
  const supabase = createClient();
  const [userId, setUserId] = useState<string | undefined>();
  const { setUsername } = useUsername();

  useEffect(() => {
    const fetchUserId = async () => {
      const { data: userData, error: userError } = await supabase.auth.getUser();
      if (userError || !userData?.user) {
        console.error('Error fetching user:', userError);
        return;
      }
      setUserId(userData.user.id);
    };

    fetchUserId();
  }, [supabase]);

  useEffect(() => {
    if (!userId) return;

    const fetchUsername = async () => {
      const { data, error } = await supabase.from('user').select('username').eq('id', userId).single();
      if (error) {
        console.error('Error fetching username:', error);
        return;
      }
      setUsername(data.username);
    };

    fetchUsername();
  }, [userId, setUsername, supabase]);
  return null; 
};

export default UsernameProviderComponent;
