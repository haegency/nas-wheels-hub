import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How do I know if a car is in good condition?",
    answer: "Every vehicle at Nas Autos undergoes a comprehensive inspection before listing. We provide detailed condition reports, including any faults or issues. You can also schedule a physical inspection at our showroom or arrange for a third-party mechanic inspection."
  },
  {
    question: "Do you offer financing options?",
    answer: "Yes, we partner with reputable banks and finance houses to offer competitive auto loan options. Financing is available for both new and pre-owned vehicles. Visit our Financing page or contact us to discuss your options and requirements."
  },
  {
    question: "What documents do I need to purchase a car?",
    answer: "For a straightforward purchase, you'll need a valid ID (NIN, international passport, or driver's license), proof of address, and your payment. For financed purchases, additional documents like bank statements and employment verification may be required."
  },
  {
    question: "Can you deliver my car outside Abuja?",
    answer: "Absolutely! We offer nationwide delivery across Nigeria. Delivery costs vary based on location and are calculated based on distance. Contact us for a delivery quote to your specific location."
  },
  {
    question: "What's the difference between Foreign Used and Nigerian Used?",
    answer: "Foreign Used (also called Tokunbo) vehicles are imported from overseas markets like the US, Europe, or Asia. They typically have detailed maintenance records and were driven on well-maintained roads. Nigerian Used vehicles were previously registered and used in Nigeria."
  },
  {
    question: "Do you accept trade-ins?",
    answer: "Yes, we accept trade-ins! You can use the value of your current vehicle towards your next purchase. Visit our Trade-In page to submit your vehicle details for a valuation, or bring your car to our showroom for an in-person assessment."
  },
  {
    question: "Are your prices negotiable?",
    answer: "Many of our vehicles are marked as negotiable. We aim for transparent, competitive pricing, but we're open to reasonable discussions. Listings marked 'Negotiable' have more flexibility. Contact us to discuss pricing."
  },
  {
    question: "What happens after I purchase a car?",
    answer: "After purchase, we handle all documentation including registration transfer, customs paperwork (for newly imported vehicles), and provide all necessary receipts. We also offer after-sales support for any questions or concerns."
  }
];

export function FAQSection() {
  return (
    <section className="py-20 bg-background">
      <div className="section-container">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Frequently Asked <span className="text-gradient-gold">Questions</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              Get answers to common questions about buying a car from Nas Autos.
            </p>
          </div>

          {/* FAQ Accordion */}
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-card border border-border rounded-xl px-6 data-[state=open]:shadow-lg transition-shadow"
              >
                <AccordionTrigger className="text-left font-display text-lg font-semibold hover:text-accent py-6">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-6 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
