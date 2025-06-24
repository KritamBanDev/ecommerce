"use client";
import Container from "@/components/Container";
import { ShieldCheck, Lock, User, Share2, Database, UserCheck, Info } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const privacySections = [
	{
		icon: <User className="w-6 h-6 text-primary" />,
		title: "Information Collection",
		desc: "We collect information you provide directly to us when using our services, as well as information about your use of our services.",
	},
	{
		icon: <Database className="w-6 h-6 text-primary" />,
		title: "Use of Information",
		desc: "We use the information we collect to provide, maintain, and improve our services, as well as to communicate with you.",
	},
	{
		icon: <Share2 className="w-6 h-6 text-primary" />,
		title: "Information Sharing",
		desc: "We do not share your personal information with third parties except as described in this Privacy Policy or with your consent.",
	},
	{
		icon: <Lock className="w-6 h-6 text-primary" />,
		title: "Data Security",
		desc: "We take reasonable measures to help protect your personal information from loss, theft, misuse, and unauthorized access.",
	},
	{
		icon: <UserCheck className="w-6 h-6 text-primary" />,
		title: "Your Rights",
		desc: "You have the right to access, correct, or delete your personal information. Please contact us for assistance with these requests.",
	},
];

const PrivacyPage = () => {
	return (
		<Container>
			<div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
				{/* Hero Section */}
				<div className="flex flex-col items-center text-center mb-10 animate-fade-in">
					<ShieldCheck className="w-16 h-16 text-primary mb-4 animate-bounce-slow" />
					<h1 className="text-4xl font-extrabold mb-2 text-gray-900">Privacy Policy</h1>
					<p className="mb-4 text-gray-600 text-lg max-w-2xl">
						Your privacy is our top priority. Learn how we collect, use, and protect your data—and how you stay in control.
					</p>
					<div className="flex flex-wrap gap-4 justify-center mt-2">
						{privacySections.map((section, idx) => (
							<div key={idx} className="flex items-center gap-2 bg-primary/10 rounded-full px-4 py-2 text-primary text-sm font-medium shadow-sm">
								{section.icon}
								{section.title}
							</div>
						))}
					</div>
				</div>
				{/* Collapsible Sections */}
				<Accordion type="single" collapsible className="w-full mb-8" defaultValue="item-0">
					{privacySections.map((section, idx) => (
						<AccordionItem value={`item-${idx}`} key={idx} className="mb-4 bg-white rounded-lg shadow border border-gray-100">
							<AccordionTrigger className="text-left text-lg font-semibold text-darkColor/80 flex items-center gap-2 px-4 py-3">
								{section.icon}
								{section.title}
							</AccordionTrigger>
							<AccordionContent className="text-gray-700 text-base px-6 pb-4">
								{section.desc}
							</AccordionContent>
						</AccordionItem>
					))}
				</Accordion>
				{/* Visual Summary */}
				<div className="flex flex-col sm:flex-row items-center justify-between gap-6 bg-primary/5 rounded-lg py-8 px-4 mt-8 animate-fade-in">
					<div className="flex-1 text-center sm:text-left">
						<h2 className="text-xl font-bold mb-2 text-primary flex items-center gap-2 justify-center sm:justify-start">
							<Info className="w-5 h-5" /> Your Data, Your Rights
						</h2>
						<p className="mb-2 text-gray-700">
							We empower you to control your data. You can request access, correction, or deletion at any time.
						</p>
						<a
							href="/contact"
							className="inline-block bg-primary text-white px-6 py-2 rounded-lg font-semibold shadow hover:bg-primary/90 transition mt-2"
						>
							Contact Support
						</a>
					</div>
					<div className="flex-1 flex justify-center">
						<ShieldCheck className="w-24 h-24 text-primary/30" />
					</div>
				</div>
			</div>
		</Container>
	);
};

export default PrivacyPage;