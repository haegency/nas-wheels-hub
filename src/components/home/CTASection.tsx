import { Link } from "react-router-dom";
import { ArrowRight, Phone, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CTASection() {
  return (
    <section className="py-20 bg-gradient-hero text-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      </div>

      <div className="section-container relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-6">
            Can't Find What You're Looking For?
          </h2>
          <p className="text-xl text-white/80 mb-10">
            Tell us your requirements and let us source the perfect vehicle for you. 
            We have access to a network of trusted importers and can help you get 
            any make or model you desire.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button variant="hero" size="xl" asChild>
              <Link to="/contact">
                Submit Your Request
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
            <Button variant="hero-outline" size="xl" asChild>
              <a href="tel:+2340000000000">
                <Phone className="h-5 w-5" />
                Call Us Now
              </a>
            </Button>
            <Button variant="whatsapp" size="xl" asChild>
              <a
                href="https://wa.me/2340000000000?text=Hello, I'm looking for a specific car..."
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="h-5 w-5" />
                WhatsApp
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
