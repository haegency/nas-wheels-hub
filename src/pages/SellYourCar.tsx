import { useState } from "react";
import { CheckCircle, DollarSign, Shield, Clock, Send, Upload } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import heroSell from "@/assets/hero-sell.jpg";

const benefits = [
  {
    icon: DollarSign,
    title: "Best Market Price",
    description: "We offer competitive prices based on current market conditions.",
  },
  {
    icon: Clock,
    title: "Quick Sale",
    description: "Get an offer within 24 hours. No waiting for buyers.",
  },
  {
    icon: Shield,
    title: "Safe & Secure",
    description: "Verified transactions with proper documentation.",
  },
  {
    icon: CheckCircle,
    title: "No Hidden Fees",
    description: "Transparent process with no surprise deductions.",
  },
];

export default function SellYourCar() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    make: "",
    model: "",
    year: "",
    mileage: "",
    condition: "",
    transmission: "",
    fuelType: "",
    color: "",
    askingPrice: "",
    description: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const message = `Vehicle: ${formData.year} ${formData.make} ${formData.model}
Mileage: ${formData.mileage} km
Condition: ${formData.condition}
Transmission: ${formData.transmission}
Fuel Type: ${formData.fuelType}
Color: ${formData.color}
Asking Price: ₦${formData.askingPrice}

${formData.description}`;

      const { error } = await supabase.from("leads").insert({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        lead_type: "sell_car" as const,
        message,
      });

      if (error) throw error;

      // Send email notification
      await supabase.functions.invoke("send-lead-notification", {
        body: {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          leadType: "sell_car",
          message,
        },
      });

      toast({
        title: "Request Submitted!",
        description: "We'll review your vehicle and contact you with an offer.",
      });

      setFormData({
        name: "",
        email: "",
        phone: "",
        make: "",
        model: "",
        year: "",
        mileage: "",
        condition: "",
        transmission: "",
        fuelType: "",
        color: "",
        askingPrice: "",
        description: "",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      {/* Hero */}
      <section className="relative text-white py-24 pt-32 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroSell})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal/90 via-charcoal/70 to-charcoal/50" />
        <div className="section-container relative z-10">
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4 animate-fade-in-up">
            Sell Your Car To Us
          </h1>
          <p className="text-xl text-white/80 max-w-2xl animate-fade-in-up delay-100">
            Get a fair price for your vehicle without the hassle of private sales. 
            Quick, easy, and secure.
          </p>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20">
        <div className="section-container">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit) => (
              <div
                key={benefit.title}
                className="bg-card rounded-xl border border-border p-6 text-center hover:shadow-lg transition-shadow"
              >
                <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mx-auto mb-4">
                  <benefit.icon className="h-7 w-7 text-accent" />
                </div>
                <h3 className="font-display text-xl font-semibold mb-2">{benefit.title}</h3>
                <p className="text-muted-foreground">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 bg-muted">
        <div className="section-container">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              How It Works
            </h2>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: "1", title: "Submit Details", desc: "Fill out the form with your car information" },
              { step: "2", title: "We Evaluate", desc: "Our team reviews and values your vehicle" },
              { step: "3", title: "Receive Offer", desc: "Get a fair price offer within 24 hours" },
              { step: "4", title: "Get Paid", desc: "Accept and receive payment promptly" },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-12 h-12 rounded-full bg-accent text-charcoal flex items-center justify-center font-display font-bold text-xl mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="font-display text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sell Form */}
      <section className="py-20">
        <div className="section-container">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
                Tell Us About Your Car
              </h2>
              <p className="text-muted-foreground">
                Provide accurate details for the best valuation.
              </p>
            </div>

            <div className="bg-card rounded-2xl border border-border p-8">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Contact Info */}
                <div>
                  <h3 className="font-semibold mb-4 text-lg">Your Contact Information</h3>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      />
                    </div>
                  </div>
                </div>

                {/* Vehicle Info */}
                <div className="border-t border-border pt-8">
                  <h3 className="font-semibold mb-4 text-lg">Vehicle Details</h3>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="make">Make *</Label>
                      <Input
                        id="make"
                        required
                        placeholder="e.g., Toyota"
                        value={formData.make}
                        onChange={(e) => setFormData({ ...formData, make: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="model">Model *</Label>
                      <Input
                        id="model"
                        required
                        placeholder="e.g., Camry"
                        value={formData.model}
                        onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="year">Year *</Label>
                      <Input
                        id="year"
                        required
                        placeholder="e.g., 2020"
                        value={formData.year}
                        onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-6 mt-6">
                    <div className="space-y-2">
                      <Label htmlFor="mileage">Mileage (km) *</Label>
                      <Input
                        id="mileage"
                        required
                        placeholder="e.g., 45000"
                        value={formData.mileage}
                        onChange={(e) => setFormData({ ...formData, mileage: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="transmission">Transmission</Label>
                      <Select
                        value={formData.transmission}
                        onValueChange={(value) => setFormData({ ...formData, transmission: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="automatic">Automatic</SelectItem>
                          <SelectItem value="manual">Manual</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="fuelType">Fuel Type</Label>
                      <Select
                        value={formData.fuelType}
                        onValueChange={(value) => setFormData({ ...formData, fuelType: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="petrol">Petrol</SelectItem>
                          <SelectItem value="diesel">Diesel</SelectItem>
                          <SelectItem value="hybrid">Hybrid</SelectItem>
                          <SelectItem value="electric">Electric</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-6 mt-6">
                    <div className="space-y-2">
                      <Label htmlFor="condition">Condition *</Label>
                      <Select
                        value={formData.condition}
                        onValueChange={(value) => setFormData({ ...formData, condition: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select condition" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="excellent">Excellent</SelectItem>
                          <SelectItem value="good">Good</SelectItem>
                          <SelectItem value="fair">Fair</SelectItem>
                          <SelectItem value="poor">Poor</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="color">Exterior Color</Label>
                      <Input
                        id="color"
                        placeholder="e.g., White"
                        value={formData.color}
                        onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="askingPrice">Asking Price (₦)</Label>
                      <Input
                        id="askingPrice"
                        placeholder="e.g., 15000000"
                        value={formData.askingPrice}
                        onChange={(e) => setFormData({ ...formData, askingPrice: e.target.value })}
                      />
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <Label htmlFor="description">Additional Description</Label>
                  <Textarea
                    id="description"
                    rows={4}
                    placeholder="Describe your vehicle's condition, any modifications, known issues, service history, etc."
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  />
                </div>

                {/* Photo Upload Note */}
                <div className="bg-muted rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <Upload className="h-6 w-6 text-accent shrink-0" />
                    <div>
                      <h4 className="font-semibold mb-1">Have Photos?</h4>
                      <p className="text-muted-foreground text-sm">
                        After submitting this form, you can send photos of your vehicle via 
                        WhatsApp to get a more accurate valuation.
                      </p>
                    </div>
                  </div>
                </div>

                <Button type="submit" variant="gold" size="lg" disabled={isSubmitting} className="w-full">
                  {isSubmitting ? "Submitting..." : "Submit for Valuation"}
                  <Send className="h-5 w-5" />
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
