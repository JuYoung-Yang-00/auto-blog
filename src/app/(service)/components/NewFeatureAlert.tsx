import React, { useState } from 'react';
import { Terminal } from 'lucide-react';

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from '@/components/ui/alert';

export function NewFeatureAlert() {
  const [isVisible, setIsVisible] = useState(true);

  const handleClick = () => {
    setIsVisible(false);
  };

  return (
    <>
      {isVisible && (
        <Alert onClick={handleClick} className='hover:bg-gray-100 dark:hover:bg-gray-500 ml-2 mt-1'>
          <Terminal className="h-4 w-4" />
          <AlertTitle>Heads up!</AlertTitle>
          <AlertDescription>
            New Analytics Feature coming up!
          </AlertDescription>
        </Alert>
      )}
    </>
  );
}
