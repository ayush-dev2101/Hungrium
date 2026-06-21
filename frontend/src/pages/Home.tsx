import React from 'react';
import { useAuthStore } from '../store/authStore';

export default function Home() {
  const { user } = useAuthStore();
  
  return (
    <div className="container py-10">
      <h1 className="text-4xl font-bold tracking-tight">Welcome to Hungrium</h1>
      <p className="mt-4 text-muted-foreground">
        {user ? `Hello, ${user.fullName}!` : 'Please log in to see personalized food recommendations.'}
      </p>
    </div>
  );
}
