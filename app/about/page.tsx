
"use client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import Link from "next/link";
import { FaShieldAlt, FaLeaf } from "react-icons/fa";

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-white">
            <Header />

            {/* Hero Section */}
            <section className="relative h-[60vh] bg-black flex items-center justify-center text-center px-4">
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black z-10" />
                {/* Placeholder for About Hero Image */}
                <div className="absolute inset-0 opacity-50 bg-[url('https://images.unsplash.com/photo-1615634260167-c8cdede054de?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center" />

                <div className="relative z-20 max-w-4xl mx-auto">
                    <h1 className="text-4xl md:text-7xl font-serif font-bold text-white mb-6">The Choudhary Story</h1>
                    <div className="w-24 h-1 bg-gold mx-auto mb-8" />
                    <p className="text-xl text-gray-300 font-light italic">"Where tradition meets luxury in the heart of Hubli"</p>
                </div>
            </section>

            {/* Main Content */}
            <section className="py-20 container mx-auto px-4">
                <div className="grid md:grid-cols-2 gap-16 items-center">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6 text-black">Our Heritage</h2>
                        <p className="text-gray-600 leading-relaxed mb-6 text-lg">
                            Located at Madani Colony near Akshaya Park, Choudhary Perfumes has become Hubli's trusted destination for authentic attars and high-quality master copies of designer perfumes.
                        </p>
                        <p className="text-gray-600 leading-relaxed mb-6 text-lg">
                            Our journey began with a simple belief: everyone deserves to experience the magic of premium fragrances without compromising their budget. We bridge two worlds - the ancient art of natural fragrance-making found in our pure attars, and the modern sophistication of designer scents.
                        </p>

                        <div className="flex gap-4 mt-8">
                            <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 flex-1">
                                <FaLeaf className="text-3xl text-gold mb-3" />
                                <h4 className="font-bold text-lg mb-2">Pure Attars</h4>
                                <p className="text-sm text-gray-500">Alcohol-free, traditional oils crafted from sandalwood, oud, and musk.</p>
                            </div>
                            <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 flex-1">
                                <FaShieldAlt className="text-3xl text-gold mb-3" />
                                <h4 className="font-bold text-lg mb-2">Master Copies</h4>
                                <p className="text-sm text-gray-500">Meticulously crafted replicas capturing 90% of the designer experience.</p>
                            </div>
                        </div>
                    </div>
                    <div className="relative h-[600px] rounded-2xl overflow-hidden shadow-2xl bg-gray-200">
                        {/* Placeholder for Store/Owner Image */}
                        <div className="absolute inset-0 bg-gray-300 flex items-center justify-center text-gray-500">
                            Store Interior / Owner Image
                        </div>
                    </div>
                </div>
            </section>

            {/* Mission */}
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-4 text-center max-w-4xl">
                    <h2 className="text-3xl md:text-5xl font-serif font-bold mb-8 text-black">Our Mission</h2>
                    <p className="text-xl md:text-2xl text-gray-600 font-light leading-relaxed">
                        "To democratize luxury fragrances, making premium scents accessible to everyone in Hubli and beyond, while maintaining unwavering standards of quality and service."
                    </p>
                    <div className="mt-12">
                        <Link href="/products" className="inline-block px-10 py-4 bg-black text-white font-bold rounded-full hover:bg-gold hover:text-black transition-all shadow-lg hover:shadow-gold-lg">
                            Explore Our Collection
                        </Link>
                    </div>
                </div>
            </section>

            <Footer />
            <WhatsAppButton />
        </main>
    );
}
