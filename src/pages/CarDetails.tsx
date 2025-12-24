import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Phone, MessageCircle, Calendar, MapPin, Fuel, Gauge, Settings2, Palette, Check, Share2 } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CarCard } from "@/components/cars/CarCard";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";

export default function CarDetails() {
  const { slug } = useParams();
  const carId = slug?.split("-").pop();

  const { data: car, isLoading } = useQuery({
    queryKey: ["car", carId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("cars")
        .select("*")
        .or(`id.eq.${carId},stock_id.eq.${carId}`)
        .single();
      if (error) throw error;
      return data;
    },
    enabled: !!carId,
  });

  const { data: similarCars } = useQuery({
    queryKey: ["similar-cars", car?.make, car?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("cars")
        .select("*")
        .eq("make", car!.make)
        .neq("id", car!.id)
        .eq("status", "available")
        .limit(3);
      if (error) throw error;
      return data;
    },
    enabled: !!car,
  });

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

  const whatsappMessage = car
    ? `Hello, I'm interested in the ${car.year} ${car.make} ${car.model} (Stock ID: ${car.stock_id || car.id.slice(0, 8)}). Is it still available?`
    : "";

  if (isLoading) {
    return (
      <Layout>
        <section className="py-32">
          <div className="section-container">
            <Skeleton className="h-8 w-48 mb-8" />
            <div className="grid lg:grid-cols-2 gap-12">
              <Skeleton className="aspect-[4/3] rounded-xl" />
              <div className="space-y-4">
                <Skeleton className="h-10 w-3/4" />
                <Skeleton className="h-6 w-1/2" />
                <Skeleton className="h-12 w-1/3" />
              </div>
            </div>
          </div>
        </section>
      </Layout>
    );
  }

  if (!car) {
    return (
      <Layout>
        <section className="py-32 text-center">
          <div className="section-container">
            <h1 className="font-display text-3xl font-bold mb-4">Car Not Found</h1>
            <p className="text-muted-foreground mb-8">
              The vehicle you're looking for doesn't exist or has been removed.
            </p>
            <Button variant="gold" asChild>
              <Link to="/inventory">Browse Inventory</Link>
            </Button>
          </div>
        </section>
      </Layout>
    );
  }

  const specs = [
    { label: "Year", value: car.year, icon: Calendar },
    { label: "Mileage", value: formatMileage(car.mileage || 0), icon: Gauge },
    { label: "Transmission", value: car.transmission, icon: Settings2 },
    { label: "Fuel Type", value: car.fuel_type, icon: Fuel },
    { label: "Body Type", value: car.body_type, icon: null },
    { label: "Engine", value: car.engine || "N/A", icon: null },
    { label: "Exterior Color", value: car.exterior_color || "N/A", icon: Palette },
    { label: "Interior Color", value: car.interior_color || "N/A", icon: null },
    { label: "Location", value: car.location || "Karu, Abuja", icon: MapPin },
    { label: "VIN", value: car.vin || "Available on request", icon: null },
  ];

  return (
    <Layout>
      {/* Breadcrumb */}
      <section className="bg-muted py-4 pt-24">
        <div className="section-container">
          <Link to="/inventory" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-4 w-4" />
            Back to Inventory
          </Link>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="section-container">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Images */}
            <div className="space-y-4">
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-muted">
                <img
                  src={car.main_image || "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800&q=80"}
                  alt={`${car.year} ${car.make} ${car.model}`}
                  className="w-full h-full object-cover"
                />
                {/* Status Badge */}
                <div className="absolute top-4 left-4">
                  <Badge className={
                    car.status === "available" ? "badge-available" :
                    car.status === "reserved" ? "badge-reserved" : "badge-sold"
                  }>
                    {car.status.charAt(0).toUpperCase() + car.status.slice(1)}
                  </Badge>
                </div>
                {/* Share Button */}
                <Button
                  variant="secondary"
                  size="icon"
                  className="absolute top-4 right-4"
                  onClick={() => navigator.share?.({ title: `${car.year} ${car.make} ${car.model}`, url: window.location.href })}
                >
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>

              {/* Thumbnail Gallery */}
              {car.images && car.images.length > 0 && (
                <div className="grid grid-cols-4 gap-2">
                  {car.images.slice(0, 4).map((img, i) => (
                    <div key={i} className="aspect-square rounded-lg overflow-hidden bg-muted">
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Details */}
            <div>
              <div className="mb-6">
                <Badge variant="secondary" className="mb-3">
                  {getConditionLabel(car.condition)}
                </Badge>
                <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
                  {car.year} {car.make} {car.model}
                </h1>
                {car.trim && (
                  <p className="text-muted-foreground text-lg">{car.trim}</p>
                )}
                <p className="text-sm text-muted-foreground mt-2">
                  Stock ID: {car.stock_id || car.id.slice(0, 8).toUpperCase()}
                </p>
              </div>

              {/* Price */}
              <div className="mb-8">
                {car.discount_price ? (
                  <div className="flex items-end gap-4">
                    <span className="font-display text-4xl font-bold text-accent">
                      {formatPrice(car.discount_price)}
                    </span>
                    <span className="text-xl text-muted-foreground line-through">
                      {formatPrice(car.price)}
                    </span>
                  </div>
                ) : (
                  <span className="font-display text-4xl font-bold text-foreground">
                    {formatPrice(car.price)}
                  </span>
                )}
                {car.is_negotiable && (
                  <p className="text-muted-foreground mt-1">Price is negotiable</p>
                )}
              </div>

              {/* Quick Actions */}
              <div className="flex flex-wrap gap-3 mb-8">
                <Button variant="gold" size="lg" asChild>
                  <a href={`https://wa.me/2340000000000?text=${encodeURIComponent(whatsappMessage)}`} target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="h-5 w-5" />
                    WhatsApp Inquiry
                  </a>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <a href="tel:+2340000000000">
                    <Phone className="h-5 w-5" />
                    Call Now
                  </a>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link to={`/contact?car=${car.id}`}>
                    Schedule Viewing
                  </Link>
                </Button>
              </div>

              <Separator className="mb-8" />

              {/* Key Features */}
              <div className="mb-8">
                <h3 className="font-display text-xl font-semibold mb-4">Key Features</h3>
                <div className="grid grid-cols-2 gap-4">
                  {specs.slice(0, 6).map((spec) => (
                    <div key={spec.label} className="flex items-center gap-3">
                      {spec.icon && <spec.icon className="h-5 w-5 text-accent" />}
                      <div>
                        <p className="text-sm text-muted-foreground">{spec.label}</p>
                        <p className="font-medium capitalize">{spec.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Trust Points */}
              <div className="bg-muted rounded-xl p-6">
                <h3 className="font-display text-lg font-semibold mb-4">Why Buy From Nas Autos?</h3>
                <ul className="space-y-3">
                  {["Verified vehicle history", "Professional inspection", "Transparent pricing", "Paperwork assistance", "Nationwide delivery"].map((item) => (
                    <li key={item} className="flex items-center gap-3">
                      <Check className="h-5 w-5 text-accent" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Full Specifications */}
          <div className="mt-16">
            <h2 className="font-display text-2xl font-bold mb-6">Full Specifications</h2>
            <div className="bg-card rounded-xl border border-border overflow-hidden">
              <div className="grid md:grid-cols-2">
                {specs.map((spec, i) => (
                  <div
                    key={spec.label}
                    className={`flex justify-between p-4 ${i % 2 === 0 ? "bg-card" : "bg-muted/50"} border-b border-border last:border-0`}
                  >
                    <span className="text-muted-foreground">{spec.label}</span>
                    <span className="font-medium capitalize">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Description */}
          {car.description && (
            <div className="mt-16">
              <h2 className="font-display text-2xl font-bold mb-6">Description</h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-muted-foreground">{car.description}</p>
              </div>
            </div>
          )}

          {/* Inspection Notes */}
          {car.inspection_notes && (
            <div className="mt-16">
              <h2 className="font-display text-2xl font-bold mb-6">Inspection Notes</h2>
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
                <p className="text-amber-800">{car.inspection_notes}</p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Similar Cars */}
      {similarCars && similarCars.length > 0 && (
        <section className="py-16 bg-muted">
          <div className="section-container">
            <h2 className="font-display text-2xl font-bold mb-8">Similar Vehicles</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {similarCars.map((similar) => (
                <CarCard key={similar.id} car={similar} />
              ))}
            </div>
          </div>
        </section>
      )}
    </Layout>
  );
}
