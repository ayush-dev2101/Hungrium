import React from 'react';
import { useAuthStore } from '../store/authStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { User, Mail, ShieldCheck } from 'lucide-react';
import { Navigate } from 'react-router-dom';

export default function Profile() {
  const { user, logout } = useAuthStore();

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="container py-10 max-w-2xl min-h-[80vh]">
      <h1 className="text-3xl font-bold mb-8">Your Profile</h1>
      
      <div className="p-8 border rounded-2xl bg-card shadow-sm space-y-8">
        <div className="flex items-center gap-6 pb-8 border-b">
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center text-primary">
            <User className="w-10 h-10" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">{user.fullName}</h2>
            <p className="text-muted-foreground flex items-center gap-2 mt-1">
              <Mail className="w-4 h-4" /> {user.email}
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-primary" /> Account Details
          </h3>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input id="fullName" defaultValue={user.fullName} readOnly className="bg-muted/50" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" defaultValue={user.email} readOnly className="bg-muted/50" />
            </div>
          </div>
        </div>

        <div className="pt-4 flex gap-4">
          <Button variant="outline" className="w-full">Edit Profile</Button>
          <Button variant="destructive" className="w-full" onClick={logout}>Sign Out</Button>
        </div>
      </div>
    </div>
  );
}
