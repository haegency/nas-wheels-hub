import { Layout } from "@/components/layout/Layout";
import { HeroSection } from "@/components/home/HeroSection";
import { FeaturedCars } from "@/components/home/FeaturedCars";
import { TrustSection } from "@/components/home/TrustSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { FAQSection } from "@/components/home/FAQSection";
import { CTASection } from "@/components/home/CTASection";

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <FeaturedCars 
        title="Featured Vehicles" 
        subtitle="Hand-picked premium cars ready for delivery"
        filter="featured"
      />
      <TrustSection />
      <FeaturedCars 
        title="New Arrivals" 
        subtitle="Fresh additions to our inventory"
        filter="new_arrivals"
      />
      <TestimonialsSection />
      <FAQSection />
      <FeaturedCars 
        title="Top Deals" 
        subtitle="Best value cars in our collection"
        filter="top_deals"
      />
      <CTASection />
    </Layout>
  );
};

export default Index;
