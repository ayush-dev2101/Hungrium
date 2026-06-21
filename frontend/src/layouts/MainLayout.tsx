import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { useCartStore } from '../store/cartStore';
import { Button } from '@/components/ui/button';
import { ShoppingCart, User, LogOut, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

export default function MainLayout() {
  const { user, logout } = useAuthStore();
  const items = useCartStore((state) => state.items);
  const cartItemCount = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-6 md:gap-10">
            <Link to="/" className="flex items-center space-x-2">
              <span className="inline-block font-bold text-xl tracking-tight text-primary">Hungrium.</span>
            </Link>
            <div className="hidden md:flex relative w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search premium food..."
                className="pl-9 bg-muted/50 border-none focus-visible:ring-1"
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground font-bold">
                    {cartItemCount}
                  </span>
                )}
                <span className="sr-only">Cart</span>
              </Button>
            </Link>
            
            {user ? (
              <div className="flex items-center gap-2">
                <Button variant="ghost" className="hidden sm:flex" asChild>
                  <Link to="/profile">
                    <User className="h-4 w-4 mr-2" />
                    {user.fullName.split(' ')[0]}
                  </Link>
                </Button>
                <Button variant="ghost" size="icon" onClick={logout} title="Logout">
                  <LogOut className="h-5 w-5" />
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Button variant="ghost" asChild className="hidden sm:flex">
                  <Link to="/login">Log in</Link>
                </Button>
                <Button asChild>
                  <Link to="/register">Sign up</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>
      
      <footer className="border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            Built for Hungrium by Advanced AI.
          </p>
        </div>
      </footer>
    </div>
  );
}
