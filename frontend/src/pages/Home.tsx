import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { foodApi } from '../api/food';
import FoodCard from '../components/cards/FoodCard';
import { Skeleton } from '@/components/ui/skeleton';

export default function Home() {
  const { data: foods, isLoading, isError } = useQuery({
    queryKey: ['foods'],
    queryFn: foodApi.getAllFood,
  });

  return (
    <div className="container py-8 min-h-screen">
      <div className="flex flex-col gap-8">
        <section>
          <h1 className="text-4xl font-bold tracking-tight text-foreground">Discover Premium Food</h1>
          <p className="text-muted-foreground mt-2 text-lg">
            Explore the best culinary experiences around you.
          </p>
        </section>

        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="flex flex-col space-y-3">
                <Skeleton className="h-[200px] w-full rounded-xl" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[250px]" />
                  <Skeleton className="h-4 w-[200px]" />
                </div>
              </div>
            ))}
          </div>
        )}

        {isError && (
          <div className="p-6 text-center border rounded-xl bg-destructive/10 text-destructive border-destructive/20">
            <p className="font-semibold">Failed to load foods. Please try again later.</p>
          </div>
        )}

        {foods && foods.length === 0 && (
          <div className="py-12 text-center text-muted-foreground">
            No food items found.
          </div>
        )}

        {foods && foods.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {foods.map((food) => (
              <FoodCard key={food._id} food={food} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
