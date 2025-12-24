import { useState } from "react";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const { data: testimonials = [] } = useQuery({
    queryKey: ["testimonials"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("testimonials")
        .select("*")
        .eq("is_approved", true)
        .order("created_at", { ascending: false })
        .limit(6);
      if (error) throw error;
      return data;
    },
  });

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  if (testimonials.length === 0) {
    return null;
  }

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className="py-20 bg-charcoal text-white overflow-hidden">
      <div className="section-container">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            What Our <span className="text-gradient-gold">Customers Say</span>
          </h2>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Don't just take our word for it. Hear from satisfied customers 
            who found their perfect cars with us.
          </p>
        </div>

        {/* Testimonial Card */}
        <div className="max-w-4xl mx-auto">
          <div className="relative bg-charcoal-light rounded-2xl p-8 md:p-12 border border-white/10">
            {/* Quote Icon */}
            <div className="absolute -top-6 left-8">
              <div className="w-12 h-12 rounded-xl bg-gradient-gold flex items-center justify-center">
                <Quote className="h-6 w-6 text-charcoal" />
              </div>
            </div>

            {/* Content */}
            <div className="pt-6">
              {/* Stars */}
              <div className="flex gap-1 mb-6">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < (currentTestimonial?.rating || 5)
                        ? "text-accent fill-accent"
                        : "text-white/20"
                    }`}
                  />
                ))}
              </div>

              {/* Quote */}
              <blockquote className="text-xl md:text-2xl font-display leading-relaxed mb-8">
                "{currentTestimonial?.content}"
              </blockquote>

              {/* Author */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-gradient-gold flex items-center justify-center text-charcoal font-bold text-xl">
                    {currentTestimonial?.name?.charAt(0) || "C"}
                  </div>
                  <div>
                    <p className="font-semibold text-lg">{currentTestimonial?.name}</p>
                    <p className="text-white/60 text-sm">
                      {currentTestimonial?.location}
                      {currentTestimonial?.car_purchased && ` • ${currentTestimonial.car_purchased}`}
                    </p>
                  </div>
                </div>

                {/* Navigation */}
                {testimonials.length > 1 && (
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={prevTestimonial}
                      className="text-white/70 hover:text-white hover:bg-white/10"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={nextTestimonial}
                      className="text-white/70 hover:text-white hover:bg-white/10"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </Button>
                  </div>
                )}
              </div>
            </div>

            {/* Dots */}
            {testimonials.length > 1 && (
              <div className="flex justify-center gap-2 mt-8">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentIndex
                        ? "w-8 bg-accent"
                        : "bg-white/30 hover:bg-white/50"
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
