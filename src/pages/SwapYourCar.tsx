import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle, Car, DollarSign, RefreshCw, Send } from "lucide-react";
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
import heroSwap from "@/assets/hero-swap.jpg";

const benefits = [
  "Get fair market value for your current vehicle",
  "Reduce your out-of-pocket cost on a new purchase",
  "Seamless one-stop experience",
  "No need to deal with private buyers",
  "Instant valuation and offer",
];

export default function SwapYourCar() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    currentMake: "",
    currentModel: "",
    currentYear: "",
    mileage: "",
    condition: "",
    interestedVehicle: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const message = `Current Vehicle: ${formData.currentYear} ${formData.currentMake} ${formData.currentModel}\nMileage: ${formData.mileage}\nCondition: ${formData.condition}\nInterested In: ${formData.interestedVehicle}\n\n${formData.message}`;
      
      const { error } = await supabase.from("leads").insert({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        lead_type: "trade_in" as const,
        message,
      });

      if (error) throw error;

      // Send email notification
      await supabase.functions.invoke("send-lead-notification", {
        body: {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          leadType: "trade_in",
          message,
        },
      });

      toast({
        title: "Request Submitted!",
        description: "We'll evaluate your car and contact you shortly.",
      });

      setFormData({
        name: "",
        email: "",
        phone: "",
        currentMake: "",
        currentModel: "",
        currentYear: "",
        mileage: "",
        condition: "",
        interestedVehicle: "",
        message: "",
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
          style={{ backgroundImage: `url(${heroSwap})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal/90 via-charcoal/70 to-charcoal/50" />
        <div className="section-container relative z-10">
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4 animate-fade-in-up [text-shadow:_0_2px_10px_rgb(0_0_0_/_40%)]">
            Swap Your Car
          </h1>
          <p className="text-xl text-white/80 max-w-2xl animate-fade-in-up delay-100 [text-shadow:_0_1px_4px_rgb(0_0_0_/_30%)]">
            Upgrade to a newer vehicle by swapping your current car. 
            Simple, transparent, hassle-free.
          </p>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="section-container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">
                How Car Swap Works
              </h2>
              <p className="text-muted-foreground mb-8">
                Swapping your vehicle is the easiest way to upgrade. We handle 
                everything – you simply drive away in your new car.
              </p>

              <div className="space-y-6">
                {[
                  { step: "1", title: "Submit Your Car Details", desc: "Tell us about your current vehicle" },
                  { step: "2", title: "Get a Valuation", desc: "We'll assess your car and make an offer" },
                  { step: "3", title: "Choose Your New Car", desc: "Browse our inventory for your upgrade" },
                  { step: "4", title: "Complete the Swap", desc: "Your car's value is deducted from the price" },
                ].map((item) => (
                  <div key={item.step} className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-accent text-charcoal flex items-center justify-center font-bold shrink-0">
                      {item.step}
                    </div>
                    <div>
                      <h3 className="font-semibold">{item.title}</h3>
                      <p className="text-muted-foreground">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-accent/20 to-accent/5 rounded-3xl blur-2xl" />
              <img
                src="https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&q=80"
                alt="Car swap process"
                className="relative rounded-2xl shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-muted">
        <div className="section-container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1 grid grid-cols-3 gap-4">
              <div className="bg-card rounded-xl border border-border p-6 text-center">
                <Car className="h-8 w-8 text-accent mx-auto mb-3" />
                <p className="font-semibold">Easy Upgrade</p>
              </div>
              <div className="bg-card rounded-xl border border-border p-6 text-center">
                <DollarSign className="h-8 w-8 text-accent mx-auto mb-3" />
                <p className="font-semibold">Fair Value</p>
              </div>
              <div className="bg-card rounded-xl border border-border p-6 text-center">
                <RefreshCw className="h-8 w-8 text-accent mx-auto mb-3" />
                <p className="font-semibold">Quick Process</p>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">
                Benefits of Swapping Your Car
              </h2>
              <ul className="space-y-4">
                {benefits.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
              <Button variant="gold" className="mt-8" asChild>
                <Link to="/inventory">
                  Browse Available Cars
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Swap Form */}
      <section className="py-20">
        <div className="section-container">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
                Get Your Car Swap Value
              </h2>
              <p className="text-muted-foreground">
                Tell us about your current vehicle and we'll provide a fair valuation.
              </p>
            </div>

            <div className="bg-card rounded-2xl border border-border p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
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

                <div className="border-t border-border pt-6">
                  <h3 className="font-semibold mb-4">Your Current Vehicle</h3>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="make">Make *</Label>
                      <Input
                        id="make"
                        required
                        placeholder="e.g., Toyota"
                        value={formData.currentMake}
                        onChange={(e) => setFormData({ ...formData, currentMake: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="model">Model *</Label>
                      <Input
                        id="model"
                        required
                        placeholder="e.g., Camry"
                        value={formData.currentModel}
                        onChange={(e) => setFormData({ ...formData, currentModel: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="year">Year *</Label>
                      <Input
                        id="year"
                        required
                        placeholder="e.g., 2018"
                        value={formData.currentYear}
                        onChange={(e) => setFormData({ ...formData, currentYear: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6 mt-6">
                    <div className="space-y-2">
                      <Label htmlFor="mileage">Mileage (km)</Label>
                      <Input
                        id="mileage"
                        placeholder="e.g., 50000"
                        value={formData.mileage}
                        onChange={(e) => setFormData({ ...formData, mileage: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="condition">Condition</Label>
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
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="interested">Vehicle You're Interested In</Label>
                  <Input
                    id="interested"
                    placeholder="e.g., 2023 Toyota Land Cruiser"
                    value={formData.interestedVehicle}
                    onChange={(e) => setFormData({ ...formData, interestedVehicle: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Additional Notes</Label>
                  <Textarea
                    id="message"
                    rows={3}
                    placeholder="Any additional details about your vehicle..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />
                </div>

                <Button type="submit" variant="gold" size="lg" disabled={isSubmitting} className="w-full">
                  {isSubmitting ? "Submitting..." : "Get Swap Value"}
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