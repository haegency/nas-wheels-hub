import { useState } from "react";
import { Fuel, Gauge, Settings2, Calendar, Eye } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CarQuickView } from "./CarQuickView";
import { Link } from "react-router-dom";

interface Car {
  id: string;
  make: string;
  model: string;
  year: number;
  price: number;
  discount_price?: number | null;
  mileage?: number | null;
  transmission: string;
  fuel_type: string;
  body_type: string;
  condition: string;
  status: string;
  main_image?: string | null;
  images?: string[] | null;
  stock_id?: string | null;
  is_negotiable?: boolean | null;
  trim?: string | null;
  engine?: string | null;
  exterior_color?: string | null;
  interior_color?: string | null;
  location?: string | null;
  description?: string | null;
}

interface CarCardWithQuickViewProps {
  car: Car;
  className?: string;
}

export function CarCardWithQuickView({ car, className }: CarCardWithQuickViewProps) {
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const formatMileage = (mileage: number | null | undefined) => {
    if (!mileage) return "0 km";
    return new Intl.NumberFormat("en-NG").format(mileage) + " km";
  };

  const getConditionLabel = (condition: string) => {
    switch (condition) {
      case "brand_new":
        return "Brand New";
      case "foreign_used":
        return "Foreign Used";
      case "nigerian_used":
        return "Nigerian Used";
      default:
        return condition;
    }
  };

  const getStatusBadge = () => {
    switch (car.status) {
      case "available":
        return <Badge className="badge-available border">Available</Badge>;
      case "reserved":
        return <Badge className="badge-reserved border">Reserved</Badge>;
      case "sold":
        return <Badge className="badge-sold border">Sold</Badge>;
      default:
        return null;
    }
  };

  const carSlug = `${car.year}-${car.make}-${car.model}`.toLowerCase().replace(/\s+/g, "-");

  return (
    <>
      <div
        className={cn(
          "group block bg-card rounded-xl overflow-hidden shadow-card card-hover border border-border",
          className
        )}
      >
        {/* Image */}
        <div className="relative aspect-[4/3] overflow-hidden img-zoom">
          <Link to={`/cars/${carSlug}-${car.stock_id || car.id}`}>
            <img
              src={car.main_image || "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=600&q=80"}
              alt={`${car.year} ${car.make} ${car.model}`}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </Link>
          
          {/* Status Badge */}
          <div className="absolute top-3 left-3">
            {getStatusBadge()}
          </div>

          {/* Condition Badge */}
          <div className="absolute top-3 right-3">
            <Badge variant="secondary" className="bg-charcoal/80 text-white backdrop-blur-sm border-0">
              {getConditionLabel(car.condition)}
            </Badge>
          </div>

          {/* Quick View Button */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
            <Button
              variant="secondary"
              size="sm"
              className="bg-white/90 hover:bg-white"
              onClick={(e) => {
                e.preventDefault();
                setIsQuickViewOpen(true);
              }}
            >
              <Eye className="h-4 w-4 mr-2" />
              Quick View
            </Button>
          </div>

          {/* Discount Badge */}
          {car.discount_price && (
            <div className="absolute bottom-3 left-3">
              <Badge className="bg-accent text-charcoal font-semibold border-0">
                SALE
              </Badge>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-5">
          {/* Title */}
          <Link to={`/cars/${carSlug}-${car.stock_id || car.id}`}>
            <h3 className="font-display text-xl font-semibold text-foreground mb-1 group-hover:text-accent transition-colors">
              {car.year} {car.make} {car.model}
            </h3>
          </Link>

          {/* Stock ID */}
          <p className="text-xs text-muted-foreground mb-4">
            Stock ID: {car.stock_id || car.id.slice(0, 8).toUpperCase()}
          </p>

          {/* Specs Grid */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Gauge className="h-4 w-4" />
              <span>{formatMileage(car.mileage)}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Settings2 className="h-4 w-4" />
              <span className="capitalize">{car.transmission}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Fuel className="h-4 w-4" />
              <span className="capitalize">{car.fuel_type}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>{car.year}</span>
            </div>
          </div>

          {/* Price */}
          <div className="flex items-end justify-between pt-4 border-t border-border">
            <div>
              {car.discount_price ? (
                <div className="flex flex-col">
                  <span className="text-sm text-muted-foreground line-through">
                    {formatPrice(car.price)}
                  </span>
                  <span className="font-display text-xl font-bold text-accent">
                    {formatPrice(car.discount_price)}
                  </span>
                </div>
              ) : (
                <span className="font-display text-xl font-bold text-foreground">
                  {formatPrice(car.price)}
                </span>
              )}
              {car.is_negotiable && (
                <span className="text-xs text-muted-foreground">Negotiable</span>
              )}
            </div>
            <Button 
              variant="gold" 
              size="sm" 
              className="group-hover:shadow-gold transition-shadow"
              onClick={() => setIsQuickViewOpen(true)}
            >
              View Details
            </Button>
          </div>
        </div>
      </div>

      <CarQuickView
        car={car}
        open={isQuickViewOpen}
        onOpenChange={setIsQuickViewOpen}
      />
    </>
  );
}
