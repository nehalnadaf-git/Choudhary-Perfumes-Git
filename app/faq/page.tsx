
"use client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { useState } from "react";
import { FiPlus, FiMinus } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
    {
        category: "Products",
        items: [
            {
                q: "What are master copies of perfumes?",
                a: "Master copies are high-quality replicas of designer perfumes created using premium ingredients. They capture 90% of the scent profile, projection, and longevity of luxury brands at about 30% of the cost."
            },
            {
                q: "What is the difference between Attars and Perfumes?",
                a: "Attars are 100% natural, alcohol-free concentrated oils that last 12-16 hours and are applied to pulse points. Modern perfumes are alcohol-based sprays offering immediate scent release and typically last 6-10 hours."
            },
            {
                q: "Are your products authentic?",
                a: "Yes! Our Attars are 100% pure and alcohol-free. Our Master Copy perfumes are premium quality, rigorously tested for longevity and scent accuracy."
            }
        ]
    },
    {
        category: "Ordering & Delivery",
        items: [
            {
                q: "How do I place an order?",
                a: "Simply browse our website, click 'Buy on WhatsApp' for any product, and send the pre-filled message. We'll confirm availability and delivery details instantly."
            },
            {
                q: "Do you deliver outside Hubli?",
                a: "Yes! We offer FREE delivery in Hubli & Dharwad. We ship to other cities in Karnataka for a flat ₹100 fee (2-4 days delivery)."
            },
            {
                q: "What payment methods do you accept?",
                a: "We accept UPI (Google Pay, PhonePe, Paytm), Bank Transfer, and Cash on Delivery (COD) within Hubli city limits."
            }
        ]
    }
];

export default function FAQPage() {
    return (
        <main className="min-h-screen bg-gray-50">
            <Header />

            <div className="bg-black text-white pt-32 pb-16 px-4">
                <div className="container mx-auto text-center">
                    <h1 className="text-4xl md:text-6xl font-serif font-bold mb-4">Frequently Asked Questions</h1>
                    <p className="text-gray-400">Everything you need to know about Choudhary Perfumes.</p>
                </div>
            </div>

            <section className="py-16 container mx-auto px-4 max-w-4xl">
                {faqs.map((section, idx) => (
                    <div key={idx} className="mb-12">
                        <h2 className="text-2xl font-serif font-bold mb-6 text-gold border-b border-gray-200 pb-2">{section.category}</h2>
                        <div className="space-y-4">
                            {section.items.map((item, i) => (
                                <FAQItem key={i} question={item.q} answer={item.a} />
                            ))}
                        </div>
                    </div>
                ))}
            </section>

            <Footer />
            <WhatsAppButton />
        </main>
    )
}

function FAQItem({ question, answer }: { question: string, answer: string }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-sm transition-shadow">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
            >
                <span className="font-bold text-lg text-gray-900">{question}</span>
                <span className={`text-gold transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                    {isOpen ? <FiMinus size={24} /> : <FiPlus size={24} />}
                </span>
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="px-6 pb-6 text-gray-600 leading-relaxed border-t border-gray-50 pt-4">
                            {answer}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
