import { Link } from "react-router-dom";
import { Shield, Users, Award, TrendingUp, CheckCircle, ArrowRight } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";

const values = [
  {
    icon: Shield,
    title: "Transparency",
    description: "Every vehicle comes with complete history, honest pricing, and no hidden fees. What you see is what you get.",
  },
  {
    icon: Users,
    title: "Customer First",
    description: "Your satisfaction is our priority. We go above and beyond to ensure you drive away happy.",
  },
  {
    icon: Award,
    title: "Quality Assurance",
    description: "Each vehicle undergoes thorough inspection. We only sell cars that meet our high standards.",
  },
  {
    icon: TrendingUp,
    title: "Fair Pricing",
    description: "Competitive, market-driven prices with room for negotiation. No pressure, just value.",
  },
];

const milestones = [
  { number: "500+", label: "Cars Sold" },
  { number: "5+", label: "Years Experience" },
  { number: "98%", label: "Happy Customers" },
  { number: "24h", label: "Response Time" },
];

export default function About() {
  return (
    <Layout>
      {/* Hero */}
      <section className="bg-gradient-hero text-white py-24 pt-32">
        <div className="section-container">
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4 animate-fade-in-up">
            About Nas Autos
          </h1>
          <p className="text-xl text-white/80 max-w-2xl animate-fade-in-up delay-100">
            Your trusted partner for premium vehicles in Karu, Abuja. 
            Building relationships, one car at a time.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20">
        <div className="section-container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-accent font-medium mb-4 block">Our Story</span>
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">
                Redefining Car Buying in Abuja
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Nas Autos was founded with a simple mission: to make car buying in Nigeria 
                  a transparent, enjoyable, and trustworthy experience. We understand the 
                  challenges Nigerian car buyers face – uncertainty about vehicle history, 
                  unclear pricing, and lack of after-sales support.
                </p>
                <p>
                  Located in Karu, Abuja, we've built our reputation on honesty and quality. 
                  Every vehicle in our inventory is carefully inspected, properly documented, 
                  and priced fairly. We believe that buying a car should be exciting, not stressful.
                </p>
                <p>
                  Our team consists of automotive enthusiasts who genuinely care about matching 
                  you with the right vehicle. Whether you're looking for a brand new luxury SUV 
                  or a reliable used sedan, we're here to help you find your perfect match.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-accent/20 to-accent/5 rounded-3xl blur-2xl" />
              <img
                src="https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800&q=80"
                alt="Nas Autos showroom"
                className="relative rounded-2xl shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-muted">
        <div className="section-container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {milestones.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="font-display text-4xl md:text-5xl font-bold text-accent mb-2">
                  {stat.number}
                </p>
                <p className="text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20">
        <div className="section-container">
          <div className="text-center mb-12">
            <span className="text-accent font-medium mb-4 block">Our Values</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              What Sets Us Apart
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              At Nas Autos, we're driven by principles that put you first.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value) => (
              <div
                key={value.title}
                className="bg-card rounded-xl border border-border p-6 hover:shadow-lg transition-shadow"
              >
                <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
                  <value.icon className="h-7 w-7 text-accent" />
                </div>
                <h3 className="font-display text-xl font-semibold mb-2">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 bg-charcoal text-white">
        <div className="section-container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-accent font-medium mb-4 block">Our Services</span>
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">
                Complete Automotive Solutions
              </h2>
              <p className="text-white/70 mb-8">
                From finding your dream car to handling all the paperwork, 
                we provide end-to-end support for your automotive needs.
              </p>
              <ul className="space-y-4">
                {[
                  "New and pre-owned vehicle sales",
                  "Vehicle inspection and verification",
                  "Trade-in and valuation services",
                  "Financing assistance",
                  "Paperwork and registration support",
                  "Nationwide delivery",
                  "After-sales support",
                ].map((service) => (
                  <li key={service} className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-accent shrink-0" />
                    <span>{service}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=800&q=80"
                alt="Premium car service"
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="section-container text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            Ready to Find Your Perfect Car?
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            Visit our showroom in Karu, Abuja or browse our online inventory. 
            Our team is ready to assist you.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="gold" size="lg" asChild>
              <Link to="/inventory">
                Browse Inventory
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
