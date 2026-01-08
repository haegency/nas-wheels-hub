import { Star, Quote, MapPin } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";
import heroAbout from "@/assets/hero-about.jpg";

export default function Testimonials() {
  const { data: testimonials, isLoading } = useQuery({
    queryKey: ["public-testimonials"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("testimonials")
        .select("*")
        .eq("is_approved", true)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-5 w-5 ${i < rating ? "text-accent fill-accent" : "text-muted-foreground"}`}
      />
    ));
  };

  return (
    <Layout>
      {/* Hero */}
      <section className="relative text-white py-24 pt-32 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroAbout})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal/90 via-charcoal/70 to-charcoal/50" />
        <div className="section-container relative z-10">
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4 animate-fade-in-up [text-shadow:_0_2px_10px_rgb(0_0_0_/_40%)]">
            Customer Testimonials
          </h1>
          <p className="text-xl text-white/80 max-w-2xl animate-fade-in-up delay-100 [text-shadow:_0_1px_4px_rgb(0_0_0_/_30%)]">
            Hear what our satisfied customers have to say about their experience with Nas Autos.
          </p>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="section-container">
          {/* Stats */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="text-center p-8 bg-card rounded-xl border border-border">
              <div className="font-display text-5xl font-bold text-accent mb-2">500+</div>
              <p className="text-muted-foreground">Happy Customers</p>
            </div>
            <div className="text-center p-8 bg-card rounded-xl border border-border">
              <div className="font-display text-5xl font-bold text-accent mb-2">4.9</div>
              <p className="text-muted-foreground">Average Rating</p>
            </div>
            <div className="text-center p-8 bg-card rounded-xl border border-border">
              <div className="font-display text-5xl font-bold text-accent mb-2">98%</div>
              <p className="text-muted-foreground">Would Recommend</p>
            </div>
          </div>

          {/* Testimonials Grid */}
          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-card rounded-xl border border-border p-6">
                  <Skeleton className="h-6 w-32 mb-4" />
                  <Skeleton className="h-20 w-full mb-4" />
                  <Skeleton className="h-4 w-24" />
                </div>
              ))}
            </div>
          ) : testimonials && testimonials.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="bg-card rounded-xl border border-border p-6 hover:shadow-lg transition-shadow"
                >
                  <Quote className="h-8 w-8 text-accent/30 mb-4" />
                  
                  <div className="flex gap-1 mb-4">
                    {renderStars(testimonial.rating)}
                  </div>
                  
                  <p className="text-foreground mb-6 leading-relaxed">
                    "{testimonial.content}"
                  </p>
                  
                  <div className="flex items-center gap-4">
                    {testimonial.photo ? (
                      <img
                        src={testimonial.photo}
                        alt={testimonial.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                        <span className="font-display text-lg font-bold text-accent">
                          {testimonial.name.charAt(0)}
                        </span>
                      </div>
                    )}
                    <div>
                      <p className="font-semibold">{testimonial.name}</p>
                      {testimonial.location && (
                        <p className="text-sm text-muted-foreground flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {testimonial.location}
                        </p>
                      )}
                    </div>
                  </div>
                  
                  {testimonial.car_purchased && (
                    <Badge variant="secondary" className="mt-4">
                      Purchased: {testimonial.car_purchased}
                    </Badge>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-muted/30 rounded-xl">
              <p className="text-muted-foreground text-lg">
                No testimonials available yet.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-charcoal text-white">
        <div className="section-container text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            Ready to Join Our Happy Customers?
          </h2>
          <p className="text-white/80 max-w-2xl mx-auto mb-8">
            Experience the Nas Autos difference. Browse our inventory and find your perfect vehicle today.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="/inventory" className="inline-flex items-center gap-2 bg-accent text-charcoal px-6 py-3 rounded-lg font-semibold hover:bg-accent/90 transition-colors">
              Browse Inventory
            </a>
            <a href="/contact" className="inline-flex items-center gap-2 border border-white/30 px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors">
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
}
