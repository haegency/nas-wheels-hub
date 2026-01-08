import { useState } from "react";
import { Link } from "react-router-dom";
import { Plus, X, ArrowRight, Check, Minus } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import heroInventory from "@/assets/hero-inventory.jpg";

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
  stock_id?: string | null;
  engine?: string | null;
  exterior_color?: string | null;
  interior_color?: string | null;
  is_negotiable?: boolean | null;
}

export default function Compare() {
  const [selectedCars, setSelectedCars] = useState<Car[]>([]);
  const [isSelectDialogOpen, setIsSelectDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const { data: availableCars } = useQuery({
    queryKey: ["available-cars"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("cars")
        .select("*")
        .eq("status", "available")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const formatMileage = (mileage: number | null) => {
    if (!mileage) return "N/A";
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

  const addCar = (car: Car) => {
    if (selectedCars.length < 3 && !selectedCars.find(c => c.id === car.id)) {
      setSelectedCars([...selectedCars, car]);
      setIsSelectDialogOpen(false);
      setSearchQuery("");
    }
  };

  const removeCar = (carId: string) => {
    setSelectedCars(selectedCars.filter(c => c.id !== carId));
  };

  const filteredCars = availableCars?.filter(car => 
    !selectedCars.find(c => c.id === car.id) &&
    (searchQuery === "" || 
      `${car.year} ${car.make} ${car.model}`.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const comparisonRows = [
    { label: "Price", getValue: (car: Car) => formatPrice(car.discount_price || car.price) },
    { label: "Year", getValue: (car: Car) => car.year.toString() },
    { label: "Condition", getValue: (car: Car) => getConditionLabel(car.condition) },
    { label: "Mileage", getValue: (car: Car) => formatMileage(car.mileage) },
    { label: "Transmission", getValue: (car: Car) => car.transmission },
    { label: "Fuel Type", getValue: (car: Car) => car.fuel_type },
    { label: "Body Type", getValue: (car: Car) => car.body_type },
    { label: "Engine", getValue: (car: Car) => car.engine || "N/A" },
    { label: "Exterior Color", getValue: (car: Car) => car.exterior_color || "N/A" },
    { label: "Interior Color", getValue: (car: Car) => car.interior_color || "N/A" },
    { label: "Negotiable", getValue: (car: Car) => car.is_negotiable ? "Yes" : "No" },
  ];

  return (
    <Layout>
      {/* Hero */}
      <section className="relative text-white py-24 pt-32 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroInventory})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal/90 via-charcoal/70 to-charcoal/50" />
        <div className="section-container relative z-10">
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4 animate-fade-in-up [text-shadow:_0_2px_10px_rgb(0_0_0_/_40%)]">
            Compare Vehicles
          </h1>
          <p className="text-xl text-white/80 max-w-2xl animate-fade-in-up delay-100 [text-shadow:_0_1px_4px_rgb(0_0_0_/_30%)]">
            Select up to 3 vehicles to compare their features, specifications, and pricing side by side.
          </p>
        </div>
      </section>

      <section className="py-12 bg-background">
        <div className="section-container">
          {/* Car Selection Slots */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {[0, 1, 2].map((index) => {
              const car = selectedCars[index];
              return (
                <div
                  key={index}
                  className="bg-card rounded-xl border border-border overflow-hidden"
                >
                  {car ? (
                    <div className="relative">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-2 right-2 z-10 bg-white/80 hover:bg-white rounded-full h-8 w-8"
                        onClick={() => removeCar(car.id)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                      <div className="aspect-[4/3] overflow-hidden">
                        <img
                          src={car.main_image || "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=600&q=80"}
                          alt={`${car.year} ${car.make} ${car.model}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-4">
                        <Badge variant="secondary" className="mb-2">
                          {getConditionLabel(car.condition)}
                        </Badge>
                        <h3 className="font-display text-lg font-semibold">
                          {car.year} {car.make} {car.model}
                        </h3>
                        <p className="font-display text-xl font-bold text-accent mt-2">
                          {formatPrice(car.discount_price || car.price)}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <Dialog open={isSelectDialogOpen && selectedCars.length === index} onOpenChange={setIsSelectDialogOpen}>
                      <DialogTrigger asChild>
                        <button
                          className="w-full aspect-[4/3] flex flex-col items-center justify-center gap-4 text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
                          onClick={() => setIsSelectDialogOpen(true)}
                        >
                          <div className="w-16 h-16 rounded-full border-2 border-dashed border-current flex items-center justify-center">
                            <Plus className="h-8 w-8" />
                          </div>
                          <span className="font-medium">Add Vehicle</span>
                        </button>
                      </DialogTrigger>
                      <DialogContent className="max-w-lg max-h-[80vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle>Select a Vehicle</DialogTitle>
                        </DialogHeader>
                        <Input
                          placeholder="Search vehicles..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="mb-4"
                        />
                        <div className="space-y-2 max-h-[50vh] overflow-y-auto">
                          {filteredCars?.map((car) => (
                            <button
                              key={car.id}
                              onClick={() => addCar(car)}
                              className="w-full flex items-center gap-4 p-3 rounded-lg hover:bg-muted transition-colors text-left"
                            >
                              <img
                                src={car.main_image || "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=100&q=80"}
                                alt=""
                                className="w-16 h-12 object-cover rounded"
                              />
                              <div className="flex-1 min-w-0">
                                <p className="font-medium truncate">
                                  {car.year} {car.make} {car.model}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                  {formatPrice(car.discount_price || car.price)}
                                </p>
                              </div>
                            </button>
                          ))}
                          {filteredCars?.length === 0 && (
                            <p className="text-center text-muted-foreground py-8">
                              No vehicles found
                            </p>
                          )}
                        </div>
                      </DialogContent>
                    </Dialog>
                  )}
                </div>
              );
            })}
          </div>

          {/* Comparison Table */}
          {selectedCars.length >= 2 && (
            <div className="bg-card rounded-xl border border-border overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left p-4 font-semibold bg-muted">Specification</th>
                      {selectedCars.map((car) => (
                        <th key={car.id} className="text-left p-4 font-semibold bg-muted min-w-[200px]">
                          {car.year} {car.make} {car.model}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {comparisonRows.map((row, i) => (
                      <tr key={row.label} className={i % 2 === 0 ? "bg-background" : "bg-muted/30"}>
                        <td className="p-4 text-muted-foreground font-medium">{row.label}</td>
                        {selectedCars.map((car) => (
                          <td key={car.id} className="p-4 capitalize">
                            {row.getValue(car)}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {selectedCars.length < 2 && (
            <div className="text-center py-16 bg-muted/30 rounded-xl">
              <p className="text-muted-foreground text-lg mb-2">
                Select at least 2 vehicles to compare
              </p>
              <p className="text-sm text-muted-foreground">
                Click "Add Vehicle" above to start comparing
              </p>
            </div>
          )}

          {/* CTA */}
          <div className="text-center mt-12">
            <p className="text-muted-foreground mb-4">
              Found the perfect car? Get in touch with us today.
            </p>
            <Button variant="gold" size="lg" asChild>
              <Link to="/contact">
                Contact Us
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
