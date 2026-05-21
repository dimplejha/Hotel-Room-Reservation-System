import { useState } from 'react';

export function useToast() {
  const [message, setMessage] = useState('');

  return {
    message,
    showToast: setMessage,
    clearToast: () => setMessage(''),
  };
}

