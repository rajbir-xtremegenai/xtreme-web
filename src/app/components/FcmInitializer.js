// FILE: /components/Layout.js or /app/layout.js or even a dedicated component
"use client"
import { useEffect } from 'react';
import { requestForToken } from '@/lib/firebase'; // Adjust the import path

export default function FcmInitializer() {
  useEffect(() => {
    if (typeof window !== 'undefined' && 'Notification' in window) {
      // If permission is not denied, request for a token.
      // This will prompt the user if permission is 'default'.
      if (Notification.permission !== 'denied') {
        requestForToken();
      }
    }
  }, []);

  return null; // This component doesn't render anything
}