"use client";
import Container from "@/components/Container";
import {
  FileText,
  CheckCircle2,
  Globe,
  Gavel,
  ShieldCheck,
} from "lucide-react";

const termsSections = [
  {
    icon: <CheckCircle2 className="w-6 h-6 text-primary" />,
    title: "1. Acceptance of Terms",
    desc: "By accessing and using our services, you agree to be bound by these Terms and Conditions.",
  },
  {
    icon: <Globe className="w-6 h-6 text-primary" />,
    title: "2. Use of Services",
    desc: "You agree to use our services only for lawful purposes and in accordance with these Terms and Conditions.",
  },
  {
    icon: <FileText className="w-6 h-6 text-primary" />,
    title: "3. Intellectual Property",
    desc: "All content and materials available on our services are our property and are protected by applicable intellectual property laws.",
  },
  {
    icon: <ShieldCheck className="w-6 h-6 text-primary" />,
    title: "4. Limitation of Liability",
    desc: "We shall not be liable for any indirect, incidental, special, consequential or punitive damages resulting from your use of our services.",
  },
  {
    icon: <Gavel className="w-6 h-6 text-primary" />,
    title: "5. Governing Law",
    desc: "These Terms and Conditions shall be governed by and construed in accordance with the laws of the jurisdiction in which we operate.",
  },
];

const TermsPage = () => {
  return (
    <Container>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold mb-2 flex items-center gap-2 text-gray-900">
          <FileText className="w-8 h-8 text-primary" /> Terms and Conditions
        </h1>
        <p className="mb-8 text-gray-600 text-lg">
          Please read these terms carefully before using our services. By
          accessing or using our site, you agree to these terms.
        </p>
        <ol className="relative border-l-2 border-primary/20 space-y-8 bg-white rounded-lg shadow p-6">
          {termsSections.map((section, idx) => (
            <li key={idx} className="ml-4">
              <div className="absolute -left-5 flex items-center justify-center bg-primary/10 rounded-full w-10 h-10">
                {section.icon}
              </div>
              <h2 className="text-xl font-semibold mb-1 flex items-center gap-2 mt-1">
                {section.title}
              </h2>
              <p className="text-gray-700 mb-2 ml-1">{section.desc}</p>
            </li>
          ))}
        </ol>
        <div className="mt-12 text-center bg-primary/5 rounded-lg py-8 px-4">
          <h2 className="text-xl font-bold mb-2 text-primary">
            Questions about our terms?
          </h2>
          <p className="mb-4 text-gray-700">
            Contact our support team for any questions or clarifications
            regarding our terms and conditions.
          </p>
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

export default TermsPage;