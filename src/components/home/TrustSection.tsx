import { Shield, FileCheck, Eye, Truck, CreditCard, HeadphonesIcon } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Verified Listings",
    description: "Every car is thoroughly inspected and verified before listing. No hidden issues, no surprises."
  },
  {
    icon: FileCheck,
    title: "Paperwork Support",
    description: "We handle all documentation - registration, customs clearance, and ownership transfer."
  },
  {
    icon: Eye,
    title: "Inspection Assistance",
    description: "Schedule a physical inspection at our showroom or arrange a third-party inspection."
  },
  {
    icon: CreditCard,
    title: "Flexible Financing",
    description: "Partner with trusted banks and finance houses for competitive auto loan rates."
  },
  {
    icon: Truck,
    title: "Nationwide Delivery",
    description: "We deliver vehicles across Nigeria. Safe transport to your preferred location."
  },
  {
    icon: HeadphonesIcon,
    title: "After-Sales Support",
    description: "Our relationship doesn't end at sale. We provide ongoing support and service referrals."
  }
];

export function TrustSection() {
  return (
    <section className="py-20 bg-cream">
      <div className="section-container">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Why Choose <span className="text-gradient-gold">Nas Autos</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            We're committed to making your car buying experience seamless, 
            transparent, and trustworthy. Here's what sets us apart.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="group bg-background rounded-2xl p-8 shadow-card hover:shadow-xl transition-all duration-300 border border-border hover:-translate-y-1"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="w-14 h-14 rounded-xl bg-gradient-gold flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <feature.icon className="h-7 w-7 text-charcoal" />
              </div>
              <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                {feature.title}
              </h3>
              <p className="text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
