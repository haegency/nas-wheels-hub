import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CarCard } from "@/components/cars/CarCard";
import { CarCardSkeleton } from "@/components/cars/CarCardSkeleton";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface FeaturedCarsProps {
  title?: string;
  subtitle?: string;
  filter?: "featured" | "new_arrivals" | "top_deals";
}

export function FeaturedCars({ 
  title = "Featured Vehicles", 
  subtitle = "Hand-picked premium cars ready for delivery",
  filter = "featured" 
}: FeaturedCarsProps) {
  const { data: cars, isLoading } = useQuery({
    queryKey: ["cars", filter],
    queryFn: async () => {
      let query = supabase
        .from("cars")
        .select("*")
        .eq("status", "available")
        .order("created_at", { ascending: false })
        .limit(6);

      if (filter === "featured") {
        query = query.eq("is_featured", true);
      } else if (filter === "new_arrivals") {
        query = query.eq("is_new_arrival", true);
      } else if (filter === "top_deals") {
        query = query.eq("is_top_deal", true);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data;
    },
  });

  return (
    <section className="py-20 bg-background">
      <div className="section-container">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
              {title}
            </h2>
            <p className="text-muted-foreground text-lg">{subtitle}</p>
          </div>
          <Button variant="gold-outline" asChild>
            <Link to="/inventory">
              View All Cars
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        {/* Cars Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading ? (
            <>
              <CarCardSkeleton />
              <CarCardSkeleton />
              <CarCardSkeleton />
            </>
          ) : cars && cars.length > 0 ? (
            cars.map((car) => <CarCard key={car.id} car={car} />)
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-muted-foreground text-lg">
                No {filter.replace("_", " ")} available at the moment.
              </p>
              <Button variant="gold" className="mt-4" asChild>
                <Link to="/inventory">Browse All Inventory</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
