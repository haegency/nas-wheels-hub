import { Link } from "react-router-dom";
import { Phone, MessageCircle, Calendar, MapPin, Fuel, Gauge, Settings2, Palette, X, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";

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

interface CarQuickViewProps {
  car: Car | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CarQuickView({ car, open, onOpenChange }: CarQuickViewProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!car) return null;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const formatMileage = (mileage: number) => {
    return new Intl.NumberFormat("en-NG").format(mileage) + " km";
  };

  const getConditionLabel = (condition: string) => {
    switch (condition) {
      case "brand_new": return "Brand New";
      case "foreign_used": return "Foreign Used";
      case "nigerian_used": return "Nigerian Used";
      default: return condition;
    }
  };

  const allImages = [car.main_image, ...(car.images || [])].filter(Boolean) as string[];
  const carSlug = `${car.year}-${car.make}-${car.model}`.toLowerCase().replace(/\s+/g, "-");
  
  const whatsappMessage = `Hello, I'm interested in the ${car.year} ${car.make} ${car.model} (Stock ID: ${car.stock_id || car.id.slice(0, 8)}). Is it still available?`;

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
  };

  const specs = [
    { label: "Year", value: car.year, icon: Calendar },
    { label: "Mileage", value: formatMileage(car.mileage || 0), icon: Gauge },
    { label: "Transmission", value: car.transmission, icon: Settings2 },
    { label: "Fuel Type", value: car.fuel_type, icon: Fuel },
    { label: "Body Type", value: car.body_type, icon: null },
    { label: "Engine", value: car.engine || "N/A", icon: null },
    { label: "Exterior", value: car.exterior_color || "N/A", icon: Palette },
    { label: "Location", value: car.location || "Karu, Abuja", icon: MapPin },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0">
        <DialogHeader className="p-6 pb-0">
          <div className="flex items-start justify-between">
            <div>
              <Badge variant="secondary" className="mb-2">
                {getConditionLabel(car.condition)}
              </Badge>
              <DialogTitle className="font-display text-2xl md:text-3xl font-bold text-foreground">
                {car.year} {car.make} {car.model}
              </DialogTitle>
              {car.trim && (
                <p className="text-muted-foreground mt-1">{car.trim}</p>
              )}
              <p className="text-sm text-muted-foreground mt-1">
                Stock ID: {car.stock_id || car.id.slice(0, 8).toUpperCase()}
              </p>
            </div>
          </div>
        </DialogHeader>

        <div className="p-6 pt-4 grid md:grid-cols-2 gap-6">
          {/* Image Gallery */}
          <div className="space-y-3">
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-muted">
              <img
                src={allImages[currentImageIndex] || "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800&q=80"}
                alt={`${car.year} ${car.make} ${car.model}`}
                className="w-full h-full object-cover"
              />
              {/* Status Badge */}
              <div className="absolute top-3 left-3">
                <Badge className={
                  car.status === "available" ? "badge-available" :
                  car.status === "reserved" ? "badge-reserved" : "badge-sold"
                }>
                  {car.status.charAt(0).toUpperCase() + car.status.slice(1)}
                </Badge>
              </div>
              
              {/* Navigation Arrows */}
              {allImages.length > 1 && (
                <>
                  <Button
                    variant="secondary"
                    size="icon"
                    className="absolute left-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-white/80 hover:bg-white"
                    onClick={prevImage}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="secondary"
                    size="icon"
                    className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-white/80 hover:bg-white"
                    onClick={nextImage}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </>
              )}
            </div>

            {/* Thumbnails */}
            {allImages.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-2">
                {allImages.slice(0, 5).map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentImageIndex(i)}
                    className={`shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors ${
                      i === currentImageIndex ? "border-accent" : "border-transparent"
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div>
            {/* Price */}
            <div className="mb-6">
              {car.discount_price ? (
                <div className="flex items-end gap-3">
                  <span className="font-display text-3xl font-bold text-accent">
                    {formatPrice(car.discount_price)}
                  </span>
                  <span className="text-lg text-muted-foreground line-through">
                    {formatPrice(car.price)}
                  </span>
                </div>
              ) : (
                <span className="font-display text-3xl font-bold text-foreground">
                  {formatPrice(car.price)}
                </span>
              )}
              {car.is_negotiable && (
                <p className="text-sm text-muted-foreground mt-1">Price is negotiable</p>
              )}
            </div>

            <Separator className="mb-6" />

            {/* Specs Grid */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              {specs.map((spec) => (
                <div key={spec.label} className="flex items-center gap-2">
                  {spec.icon && <spec.icon className="h-4 w-4 text-accent shrink-0" />}
                  <div className="min-w-0">
                    <p className="text-xs text-muted-foreground">{spec.label}</p>
                    <p className="text-sm font-medium capitalize truncate">{spec.value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Description */}
            {car.description && (
              <div className="mb-6">
                <p className="text-sm text-muted-foreground line-clamp-3">
                  {car.description}
                </p>
              </div>
            )}

            {/* Actions */}
            <div className="flex flex-wrap gap-2">
              <Button variant="gold" size="sm" asChild>
                <a href={`https://wa.me/2340000000000?text=${encodeURIComponent(whatsappMessage)}`} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="h-4 w-4" />
                  WhatsApp
                </a>
              </Button>
              <Button variant="outline" size="sm" asChild>
                <a href="tel:+2340000000000">
                  <Phone className="h-4 w-4" />
                  Call
                </a>
              </Button>
              <Button variant="outline" size="sm" asChild>
                <Link to={`/cars/${carSlug}-${car.stock_id || car.id}`} onClick={() => onOpenChange(false)}>
                  View Full Details
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
