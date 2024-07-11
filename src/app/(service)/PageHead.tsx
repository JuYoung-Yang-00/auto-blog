// PageHead.tsx
'use client';

import { useEffect } from 'react';
import { useUsername } from '@/app/(service)/components/ServiceUsernameContext';
import UsernameProviderComponent from '@/app/(service)/components/UsernameProvider';

function PageHead() {  
  const { username } = useUsername();

  useEffect(() => {
    if (username) {
      document.title = `BOX | ${username}`;
    }
  }, [username]);

  return <UsernameProviderComponent />;
}

export default PageHead;
