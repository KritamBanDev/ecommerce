"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Container from "@/components/Container";
import { faqsData } from "@/constants";
import { useState } from "react";
import { HelpCircle, Search } from "lucide-react";

const FAQPage = () => {
  const [search, setSearch] = useState("");
  const filteredFaqs = faqsData.filter(
    (faq) =>
      faq.question.toLowerCase().includes(search.toLowerCase()) ||
      faq.answer.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Container>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold mb-2 text-gray-900 flex items-center gap-2">
          <HelpCircle className="w-8 h-8 text-primary" /> Frequently Asked Questions
        </h1>
        <p className="mb-8 text-gray-600 text-lg">
          Find answers to common questions. If you need more help, contact our support team below.
        </p>
        <div className="mb-8 flex items-center gap-2 bg-gray-100 rounded-lg px-3 py-2 shadow-sm">
          <Search className="w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search FAQs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-transparent outline-none text-base py-1 px-2"
          />
        </div>
        <Accordion
          type="single"
          collapsible
          className="w-full"
          defaultValue="item-0"
        >
          {filteredFaqs.length === 0 ? (
            <div className="text-center text-gray-500 py-8">No FAQs found.</div>
          ) : (
            filteredFaqs.map((faq, index) => (
              <AccordionItem
                value={`item-${index}`}
                key={index}
                className="group bg-white rounded-lg shadow mb-4 border border-gray-100"
              >
                <AccordionTrigger className="text-left text-lg font-semibold text-darkColor/80 group-hover:text-darkColor hover:no-underline hoverEffect flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-primary shrink-0" />
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 text-base px-2 pb-4">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))
          )}
        </Accordion>
        <div className="mt-12 text-center bg-primary/5 rounded-lg py-8 px-4">
          <h2 className="text-xl font-bold mb-2 text-primary">Still have questions?</h2>
          <p className="mb-4 text-gray-700">Contact our support team and we’ll get back to you as soon as possible.</p>
          <a
            href="/contact"
            className="inline-block bg-primary text-white px-6 py-2 rounded-lg font-semibold shadow hover:bg-primary/90 transition"
          >
            Contact Support
          </a>
        </div>
      </div>
    </Container>
  );
};

export default FAQPage;