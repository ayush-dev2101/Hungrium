import React from 'react';
import { useCartStore } from '../store/cartStore';
import { Button } from '@/components/ui/button';
import { Minus, Plus, Trash2 } from 'lucide-react';

export default function Cart() {
  const { items, removeItem, updateQuantity, clearCart, total } = useCartStore();

  if (items.length === 0) {
    return (
      <div className="container py-20 flex flex-col items-center justify-center min-h-[60vh] text-center">
        <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-6">
          <span className="text-4xl">🛒</span>
        </div>
        <h2 className="text-3xl font-bold mb-2">Your cart is empty</h2>
        <p className="text-muted-foreground mb-8">Looks like you haven't added any premium dishes yet.</p>
        <Button size="lg" onClick={() => window.history.back()}>
          Explore Food
        </Button>
      </div>
    );
  }

  return (
    <div className="container py-10 max-w-4xl min-h-screen">
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          {items.map((item) => (
            <div key={item.id} className="flex gap-4 p-4 border rounded-2xl bg-card shadow-sm">
              <div className="w-24 h-24 bg-muted rounded-xl overflow-hidden shrink-0">
                <video src={item.image} className="w-full h-full object-cover" />
              </div>
              <div className="flex flex-col flex-grow justify-between py-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-lg leading-tight">{item.name}</h3>
                    <p className="text-muted-foreground text-sm mt-1">${item.price.toFixed(2)}</p>
                  </div>
                  <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive shrink-0" onClick={() => removeItem(item.id)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
                
                <div className="flex items-center gap-3">
                  <Button variant="outline" size="icon" className="w-8 h-8 rounded-full" onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}>
                    <Minus className="w-3 h-3" />
                  </Button>
                  <span className="font-medium w-4 text-center">{item.quantity}</span>
                  <Button variant="outline" size="icon" className="w-8 h-8 rounded-full" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                    <Plus className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="p-6 border rounded-2xl bg-card shadow-sm h-fit space-y-6 sticky top-6">
          <h2 className="text-xl font-bold">Order Summary</h2>
          
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="font-medium">${total().toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Delivery Fee</span>
              <span className="font-medium">$2.99</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Taxes</span>
              <span className="font-medium">${(total() * 0.05).toFixed(2)}</span>
            </div>
          </div>
          
          <div className="h-px bg-border my-4" />
          
          <div className="flex justify-between font-bold text-lg">
            <span>Total</span>
            <span>${(total() + 2.99 + (total() * 0.05)).toFixed(2)}</span>
          </div>

          <Button className="w-full" size="lg">
            Proceed to Checkout
          </Button>
          <Button variant="ghost" className="w-full text-destructive hover:text-destructive hover:bg-destructive/10" onClick={clearCart}>
            Clear Cart
          </Button>
        </div>
      </div>
    </div>
  );
}
