import { useState } from "react";
import { Link } from "react-router-dom";
import { Calculator, CheckCircle, FileText, Clock, HelpCircle, ArrowRight, Send } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import heroFinancing from "@/assets/hero-financing.jpg";

const benefits = [
  {
    icon: Calculator,
    title: "Competitive Rates",
    description: "We work with trusted financial partners to offer you the best interest rates available.",
  },
  {
    icon: Clock,
    title: "Quick Approval",
    description: "Get pre-approved in as little as 24 hours. No lengthy waiting periods.",
  },
  {
    icon: FileText,
    title: "Flexible Terms",
    description: "Choose from 12 to 60 month payment plans that fit your budget.",
  },
  {
    icon: CheckCircle,
    title: "Simple Process",
    description: "We handle the paperwork. You focus on choosing your dream car.",
  },
];

const faqs = [
  {
    question: "What documents do I need for financing?",
    answer: "You'll typically need a valid ID (National ID, Driver's License, or International Passport), proof of income (employment letter or bank statements), proof of address, and 2 passport photographs. Requirements may vary based on the financing partner.",
  },
  {
    question: "How long does the approval process take?",
    answer: "Most applications receive a decision within 24-48 hours. Once approved, you can take delivery of your vehicle immediately after completing the paperwork.",
  },
  {
    question: "What is the minimum down payment required?",
    answer: "Down payment requirements typically range from 20% to 40% of the vehicle price, depending on the financing partner and your credit profile.",
  },
  {
    question: "Can I pay off my loan early?",
    answer: "Yes, most of our financing partners allow early repayment. Some may have early settlement fees, which will be disclosed upfront.",
  },
  {
    question: "Do you offer financing for used cars?",
    answer: "Yes, we offer financing for both new and pre-owned vehicles in our inventory, subject to the vehicle meeting the financing partner's criteria.",
  },
];

export default function Financing() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    employmentStatus: "",
    monthlyIncome: "",
    vehicleInterest: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const message = `Employment: ${formData.employmentStatus}\nMonthly Income: ${formData.monthlyIncome}\nVehicle Interest: ${formData.vehicleInterest}\n\n${formData.message}`;
      
      const { error } = await supabase.from("leads").insert({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        lead_type: "financing_request" as const,
        message,
      });

      if (error) throw error;

      // Send email notification
      await supabase.functions.invoke("send-lead-notification", {
        body: {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          leadType: "financing_request",
          message,
        },
      });

      toast({
        title: "Request Submitted!",
        description: "Our financing team will contact you shortly.",
      });

      setFormData({
        name: "",
        email: "",
        phone: "",
        employmentStatus: "",
        monthlyIncome: "",
        vehicleInterest: "",
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
          style={{ backgroundImage: `url(${heroFinancing})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal/90 via-charcoal/70 to-charcoal/50" />
        <div className="section-container relative z-10">
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4 animate-fade-in-up">
            Car Financing Made Easy
          </h1>
          <p className="text-xl text-white/80 max-w-2xl animate-fade-in-up delay-100">
            Don't let budget constraints stop you from driving your dream car. 
            Flexible financing options tailored to your needs.
          </p>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20">
        <div className="section-container">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              Why Finance With Us?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We've partnered with leading financial institutions to make your 
              car ownership dreams a reality.
            </p>
          </div>

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

      {/* How It Works */}
      <section className="py-20 bg-muted">
        <div className="section-container">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              How It Works
            </h2>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: "1", title: "Apply Online", desc: "Fill out our simple financing application form" },
              { step: "2", title: "Get Pre-Approved", desc: "Receive a decision within 24 hours" },
              { step: "3", title: "Choose Your Car", desc: "Browse our inventory and select your vehicle" },
              { step: "4", title: "Drive Home", desc: "Complete paperwork and take delivery" },
            ].map((item) => (
              <div key={item.step} className="relative">
                <div className="w-12 h-12 rounded-full bg-accent text-charcoal flex items-center justify-center font-display font-bold text-xl mb-4">
                  {item.step}
                </div>
                <h3 className="font-display text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="py-20">
        <div className="section-container">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
                Get Pre-Approved Today
              </h2>
              <p className="text-muted-foreground mb-8">
                Fill out the form and our financing team will reach out with 
                personalized options for you.
              </p>

              <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 mb-8">
                <h3 className="font-semibold text-amber-800 mb-2 flex items-center gap-2">
                  <HelpCircle className="h-5 w-5" />
                  Disclaimer
                </h3>
                <p className="text-amber-700 text-sm">
                  Nas Autos facilitates vehicle financing through partner institutions. 
                  We do not directly provide loans. All financing is subject to approval 
                  by our financial partners based on their criteria.
                </p>
              </div>

              <Button variant="gold-outline" asChild>
                <Link to="/inventory">
                  Browse Available Cars
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
            </div>

            <div className="bg-card rounded-2xl border border-border p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
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
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="employment">Employment Status</Label>
                    <Input
                      id="employment"
                      placeholder="e.g., Employed, Self-employed"
                      value={formData.employmentStatus}
                      onChange={(e) => setFormData({ ...formData, employmentStatus: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="income">Monthly Income Range</Label>
                    <Input
                      id="income"
                      placeholder="e.g., ₦500,000 - ₦1,000,000"
                      value={formData.monthlyIncome}
                      onChange={(e) => setFormData({ ...formData, monthlyIncome: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="vehicle">Vehicle of Interest</Label>
                  <Input
                    id="vehicle"
                    placeholder="e.g., Toyota Land Cruiser, SUV under ₦50M"
                    value={formData.vehicleInterest}
                    onChange={(e) => setFormData({ ...formData, vehicleInterest: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Additional Information</Label>
                  <Textarea
                    id="message"
                    rows={3}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />
                </div>

                <Button type="submit" variant="gold" size="lg" disabled={isSubmitting} className="w-full">
                  {isSubmitting ? "Submitting..." : "Submit Application"}
                  <Send className="h-5 w-5" />
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-20 bg-muted">
        <div className="section-container">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="bg-card rounded-xl border border-border px-6"
                >
                  <AccordionTrigger className="text-left font-semibold hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>
    </Layout>
  );
}
