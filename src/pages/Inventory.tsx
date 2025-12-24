import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, Filter, X, SlidersHorizontal } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { CarCard } from "@/components/cars/CarCard";
import { CarCardSkeleton } from "@/components/cars/CarCardSkeleton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const makes = ["All Makes", "Toyota", "Lexus", "Mercedes-Benz", "Honda", "Hyundai", "Kia", "Ford"];
const bodyTypes = ["All Types", "sedan", "suv", "coupe", "truck", "bus", "hatchback", "wagon", "convertible"];
const transmissions = ["All", "automatic", "manual"];
const fuelTypes = ["All", "petrol", "diesel", "hybrid", "electric"];
const conditions = ["All", "brand_new", "foreign_used", "nigerian_used"];
const statuses = ["All", "available", "reserved", "sold"];

export default function Inventory() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Filter states
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [make, setMake] = useState(searchParams.get("make") || "All Makes");
  const [bodyType, setBodyType] = useState(searchParams.get("body_type") || "All Types");
  const [transmission, setTransmission] = useState(searchParams.get("transmission") || "All");
  const [fuelType, setFuelType] = useState(searchParams.get("fuel_type") || "All");
  const [condition, setCondition] = useState(searchParams.get("condition") || "All");
  const [status, setStatus] = useState(searchParams.get("status") || "available");
  const [sortBy, setSortBy] = useState(searchParams.get("sort") || "newest");
  const [minPrice, setMinPrice] = useState(searchParams.get("min_price") || "");
  const [maxPrice, setMaxPrice] = useState(searchParams.get("max_price") || "");

  const { data: cars, isLoading } = useQuery({
    queryKey: ["inventory", search, make, bodyType, transmission, fuelType, condition, status, sortBy, minPrice, maxPrice],
    queryFn: async () => {
      let query = supabase.from("cars").select("*");

      // Apply filters
      if (search) {
        query = query.or(`make.ilike.%${search}%,model.ilike.%${search}%`);
      }
      if (make !== "All Makes") {
        query = query.eq("make", make);
      }
      if (bodyType !== "All Types") {
        query = query.eq("body_type", bodyType as "sedan" | "suv" | "coupe" | "truck" | "bus" | "hatchback" | "wagon" | "convertible");
      }
      if (transmission !== "All") {
        query = query.eq("transmission", transmission as "automatic" | "manual");
      }
      if (fuelType !== "All") {
        query = query.eq("fuel_type", fuelType as "petrol" | "diesel" | "hybrid" | "electric");
      }
      if (condition !== "All") {
        query = query.eq("condition", condition as "brand_new" | "foreign_used" | "nigerian_used");
      }
      if (status !== "All") {
        query = query.eq("status", status as "available" | "reserved" | "sold");
      }
      if (minPrice) {
        query = query.gte("price", parseInt(minPrice));
      }
      if (maxPrice) {
        query = query.lte("price", parseInt(maxPrice));
      }

      // Apply sorting
      switch (sortBy) {
        case "price_low":
          query = query.order("price", { ascending: true });
          break;
        case "price_high":
          query = query.order("price", { ascending: false });
          break;
        case "mileage":
          query = query.order("mileage", { ascending: true });
          break;
        case "year":
          query = query.order("year", { ascending: false });
          break;
        default:
          query = query.order("created_at", { ascending: false });
      }

      const { data, error } = await query;
      if (error) throw error;
      return data;
    },
  });

  const clearFilters = () => {
    setSearch("");
    setMake("All Makes");
    setBodyType("All Types");
    setTransmission("All");
    setFuelType("All");
    setCondition("All");
    setStatus("available");
    setSortBy("newest");
    setMinPrice("");
    setMaxPrice("");
    setSearchParams({});
  };

  const hasActiveFilters = search || make !== "All Makes" || bodyType !== "All Types" || 
    transmission !== "All" || fuelType !== "All" || condition !== "All" || 
    status !== "available" || minPrice || maxPrice;

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Search */}
      <div className="space-y-2">
        <Label>Search</Label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search make or model..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Make */}
      <div className="space-y-2">
        <Label>Make</Label>
        <Select value={make} onValueChange={setMake}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {makes.map((m) => (
              <SelectItem key={m} value={m}>{m}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Body Type */}
      <div className="space-y-2">
        <Label>Body Type</Label>
        <Select value={bodyType} onValueChange={setBodyType}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {bodyTypes.map((b) => (
              <SelectItem key={b} value={b} className="capitalize">
                {b === "All Types" ? b : b.charAt(0).toUpperCase() + b.slice(1)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Condition */}
      <div className="space-y-2">
        <Label>Condition</Label>
        <Select value={condition} onValueChange={setCondition}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {conditions.map((c) => (
              <SelectItem key={c} value={c}>
                {c === "All" ? c : c.split("_").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Transmission */}
      <div className="space-y-2">
        <Label>Transmission</Label>
        <Select value={transmission} onValueChange={setTransmission}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {transmissions.map((t) => (
              <SelectItem key={t} value={t} className="capitalize">{t}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Fuel Type */}
      <div className="space-y-2">
        <Label>Fuel Type</Label>
        <Select value={fuelType} onValueChange={setFuelType}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {fuelTypes.map((f) => (
              <SelectItem key={f} value={f} className="capitalize">{f}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Status */}
      <div className="space-y-2">
        <Label>Status</Label>
        <Select value={status} onValueChange={setStatus}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {statuses.map((s) => (
              <SelectItem key={s} value={s} className="capitalize">{s}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Price Range */}
      <div className="space-y-2">
        <Label>Price Range (₦)</Label>
        <div className="flex gap-2">
          <Input
            type="number"
            placeholder="Min"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
          />
          <Input
            type="number"
            placeholder="Max"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
          />
        </div>
      </div>

      {/* Clear Filters */}
      {hasActiveFilters && (
        <Button variant="outline" className="w-full" onClick={clearFilters}>
          <X className="h-4 w-4 mr-2" />
          Clear All Filters
        </Button>
      )}
    </div>
  );

  return (
    <Layout>
      {/* Hero */}
      <section className="bg-gradient-hero text-white py-24 pt-32">
        <div className="section-container">
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4 animate-fade-in-up">
            Our Inventory
          </h1>
          <p className="text-xl text-white/80 max-w-2xl animate-fade-in-up delay-100">
            Browse our curated selection of premium vehicles. Every car is inspected, 
            verified, and ready for delivery.
          </p>
        </div>
      </section>

      <section className="py-12 bg-background">
        <div className="section-container">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Desktop Filters */}
            <aside className="hidden lg:block w-72 shrink-0">
              <div className="sticky top-24 bg-card rounded-xl border border-border p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-display text-lg font-semibold">Filters</h2>
                  <SlidersHorizontal className="h-5 w-5 text-muted-foreground" />
                </div>
                <FilterContent />
              </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1">
              {/* Toolbar */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
                <div className="flex items-center gap-4">
                  {/* Mobile Filter Button */}
                  <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
                    <SheetTrigger asChild>
                      <Button variant="outline" className="lg:hidden">
                        <Filter className="h-4 w-4 mr-2" />
                        Filters
                        {hasActiveFilters && (
                          <span className="ml-2 w-2 h-2 bg-accent rounded-full" />
                        )}
                      </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="w-80 overflow-y-auto">
                      <SheetHeader>
                        <SheetTitle>Filters</SheetTitle>
                      </SheetHeader>
                      <div className="mt-6">
                        <FilterContent />
                      </div>
                    </SheetContent>
                  </Sheet>

                  <p className="text-muted-foreground">
                    {isLoading ? "Loading..." : `${cars?.length || 0} vehicles found`}
                  </p>
                </div>

                {/* Sort */}
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest First</SelectItem>
                    <SelectItem value="price_low">Price: Low to High</SelectItem>
                    <SelectItem value="price_high">Price: High to Low</SelectItem>
                    <SelectItem value="mileage">Mileage: Low to High</SelectItem>
                    <SelectItem value="year">Year: Newest</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Cars Grid */}
              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                {isLoading ? (
                  <>
                    <CarCardSkeleton />
                    <CarCardSkeleton />
                    <CarCardSkeleton />
                    <CarCardSkeleton />
                    <CarCardSkeleton />
                    <CarCardSkeleton />
                  </>
                ) : cars && cars.length > 0 ? (
                  cars.map((car) => <CarCard key={car.id} car={car} />)
                ) : (
                  <div className="col-span-full text-center py-16">
                    <p className="text-muted-foreground text-lg mb-4">
                      No vehicles match your criteria.
                    </p>
                    <Button variant="gold" onClick={clearFilters}>
                      Clear Filters
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
