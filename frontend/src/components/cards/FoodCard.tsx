import React from 'react';
import { Food } from '../../api/food';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, Plus } from 'lucide-react';
import { useCartStore } from '../../store/cartStore';

interface FoodCardProps {
  food: Food;
}

export default function FoodCard({ food }: FoodCardProps) {
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = () => {
    addItem({
      id: food._id,
      name: food.name,
      price: 10, // Mock price since it's missing in backend schema
      image: food.video // Using video as placeholder thumbnail if it were an image
    });
    // Optional: add a toast here
  };

  return (
    <Card className="overflow-hidden group">
      <div className="relative aspect-video w-full overflow-hidden bg-muted">
        {/* If video is a direct link to mp4 we could use a video tag, but since we don't know, we use a placeholder */}
        <video 
          src={food.video} 
          className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
          controls
          muted
          loop
        />
        <div className="absolute top-2 right-2 flex gap-2">
          <Button size="icon" variant="secondary" className="rounded-full bg-background/80 backdrop-blur-sm shadow-sm">
            <Heart className="w-4 h-4 text-destructive" />
          </Button>
        </div>
      </div>
      <CardHeader className="p-4">
        <CardTitle className="text-xl">{food.name}</CardTitle>
        <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{food.description}</p>
      </CardHeader>
      <CardFooter className="p-4 pt-0 flex items-center justify-between">
        <div className="font-semibold text-lg">$10.00</div>
        <Button onClick={handleAddToCart} size="sm" className="rounded-full px-4">
          <Plus className="w-4 h-4 mr-1" /> Add
        </Button>
      </CardFooter>
    </Card>
  );
}
