
"use client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

import { useState } from "react";
import { FiPlus, FiMinus } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
    {
        category: "Products",
        items: [
            {
                q: "What are master copies of perfumes?",
                a: "Master copies are high-quality replicas of designer perfumes created using premium ingredients. They capture 90% of the scent profile, projection, and longevity of luxury brands at about 30% of the cost.",
                isOpen: true
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

            <div className="bg-black text-white pt-28 pb-12 md:pt-40 md:pb-28 px-4">
                <div className="container mx-auto text-center">
                    <p className="text-gold text-xs md:text-base font-bold uppercase tracking-[0.2em] mb-2 md:mb-4">Common Questions</p>
                    <h1 className="text-3xl md:text-6xl font-serif font-bold mb-3 md:mb-4">FAQs</h1>
                    <p className="text-gray-400 text-base md:text-xl font-light">Everything you need to know about us.</p>
                </div>
            </div>

            <section className="py-10 md:py-20 container mx-auto px-4 max-w-3xl">
                {faqs.map((section, idx) => (
                    <div key={idx} className="mb-8 md:mb-12">
                        <h2 className="text-xl md:text-2xl font-serif font-bold mb-4 md:mb-6 text-black border-b border-gray-200 pb-2 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-gold inline-block"></span>
                            {section.category}
                        </h2>
                        <div className="space-y-3 md:space-y-4">
                            {section.items.map((item, i) => (
                                <FAQItem key={i} question={item.q} answer={item.a} defaultOpen={i === 0 && idx === 0} />
                            ))}
                        </div>
                    </div>
                ))}
            </section>

            <Footer />
        </main>
    )
}

function FAQItem({ question, answer, defaultOpen = false }: { question: string, answer: string, defaultOpen?: boolean }) {
    const [isOpen, setIsOpen] = useState(defaultOpen);

    return (
        <div className="bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-sm transition-shadow">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between p-4 md:p-6 text-left focus:outline-none bg-white hover:bg-gray-50 transition-colors"
            >
                <span className="font-bold text-base md:text-lg text-gray-900 pr-4">{question}</span>
                <span className={`text-gold transition-transform duration-300 shrink-0 ${isOpen ? 'rotate-180' : ''}`}>
                    {isOpen ? <FiMinus size={20} className="md:w-6 md:h-6" /> : <FiPlus size={20} className="md:w-6 md:h-6" />}
                </span>
            </button>
            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                        <div className="px-4 pb-4 md:px-6 md:pb-6 text-gray-600 leading-relaxed text-sm md:text-base border-t border-gray-50 pt-3 md:pt-4">
                            {answer}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
