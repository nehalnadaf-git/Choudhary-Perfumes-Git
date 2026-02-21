"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { FaGem, FaLeaf, FaHistory, FaHandHoldingHeart } from "react-icons/fa";

const AboutPage = () => {
    return (
        <main className="min-h-screen bg-white">
            <Header />

            {/* ─── Premium Hero Section ─── */}
            <section className="relative h-[60vh] md:h-[70vh] flex items-center justify-center overflow-hidden bg-black">
                {/* Background Gradient & Effects */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/80 to-black z-10" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gold/10 via-black/0 to-black/0 opacity-60" />

                {/* Animated Background Placeholder (Abstract Dark Luxury) */}
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-[url('/images/pattern-bg.jpg')] opacity-20 bg-cover bg-center" />
                    {/* Fallback gradient if image missing */}
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black" />
                </div>

                <div className="relative z-20 container mx-auto px-4 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="block text-gold text-xs md:text-sm font-semibold tracking-[0.3em] uppercase mb-3 md:mb-4">
                            Est. Hubli
                        </span>
                        <h1 className="text-3xl md:text-7xl font-serif font-bold text-white mb-4 md:mb-6 leading-tight">
                            The Essence of <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold via-yellow-200 to-gold">
                                Elegance & Tradition
                            </span>
                        </h1>
                        <div className="w-16 md:w-24 h-1 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mb-6 md:mb-8" />
                        <p className="text-base md:text-xl text-gray-300 font-light italic max-w-2xl mx-auto leading-relaxed px-4">
                            "Where the timeless art of Indian perfumery meets modern sophistication in the heart of Karnataka."
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* ─── Our Story Section ─── */}
            <section className="py-12 md:py-32 bg-white relative overflow-hidden">
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-gold/5 rounded-full blur-[60px] md:blur-[100px] pointer-events-none -translate-y-1/2 translate-x-1/2" />

                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row items-center gap-10 md:gap-24">
                        {/* Left: Brand Card */}
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="w-full md:w-1/2 relative aspect-[4/5] md:aspect-square max-h-[400px] md:max-h-[600px] rounded-2xl overflow-hidden shadow-2xl bg-black"
                        >
                            {/* Premium Card Content */}
                            <div className="absolute inset-0 bg-gradient-to-br from-black via-zinc-900 to-black" />
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(208,171,100,0.15)_0%,_transparent_70%)]" />
                            <div className="absolute inset-6 border border-gold/20 rounded-xl" />

                            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
                                <div className="relative w-24 h-24 md:w-48 md:h-48 mb-6 md:mb-8 transition-transform duration-700 hover:scale-105">
                                    <Image
                                        src="/images/favicon/logo.png"
                                        alt="Choudhary Perfumes Logo"
                                        fill
                                        className="object-contain drop-shadow-[0_0_15px_rgba(208,171,100,0.3)]"
                                    />
                                </div>
                                <h3 className="text-2xl md:text-4xl font-serif font-bold text-gold tracking-widest mb-1">CHOUDHARY</h3>
                                <span className="text-[10px] md:text-sm font-sans tracking-[0.5em] text-white/40">PERFUMES</span>
                                <div className="w-12 md:w-16 h-px bg-gold/40 mt-6 md:mt-8 mb-4" />
                                <p className="text-white/60 text-xs md:text-sm font-light italic">"Crafting memories, one scent at a time."</p>
                            </div>
                        </motion.div>

                        {/* Right: Text Content */}
                        <motion.div
                            className="w-full md:w-1/2"
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            <span className="text-gold text-xs font-bold tracking-[0.2em] uppercase mb-2 block text-center md:text-left">Our Heritage</span>
                            <h2 className="text-3xl md:text-5xl font-serif font-bold text-black mb-6 md:mb-8 leading-tight text-center md:text-left">
                                A Legacy of <br />Scent & Soul
                            </h2>
                            <div className="space-y-4 md:space-y-6 text-gray-600 text-base md:text-lg leading-relaxed text-justify md:text-left">
                                <p>
                                    Located at the vibrant Madani Colony near Akshaya Park, <span className="text-black font-semibold">Choudhary Perfumes</span> has blossomed into Hubli's most trusted sanctuary for fragrance connoisseurs.
                                </p>
                                <p>
                                    Our journey began with a singular, passionate belief: that luxury should not be a privilege, but an experience accessible to all. We stand at the crossroads of two distinct worlds — preserving the ancient, soulful art of <span className="text-gold font-medium">natural attars</span> while embracing the modern allure of <span className="text-gold font-medium">designer master copies</span>.
                                </p>
                                <p>
                                    Every bottle on our shelf tells a story. Whether it is the deep, resinous warmth of pure Oudh or the crisp, floral notes of a French-inspired perfume, we ensure that what you wear is not just a scent, but an extension of your persona.
                                </p>
                            </div>

                            <div className="mt-8 md:mt-10 flex flex-col md:flex-row gap-3 md:gap-4">
                                <Link
                                    href="/products"
                                    className="inline-flex justify-center items-center gap-3 bg-black text-white px-6 py-3.5 md:px-8 md:py-4 rounded-full font-medium hover:bg-gold hover:text-black transition-all duration-300 shadow-xl hover:shadow-gold/20 text-sm md:text-base"
                                >
                                    Explore Our Collection <span>→</span>
                                </Link>
                                <Link
                                    href="/contact"
                                    className="inline-flex justify-center items-center gap-3 bg-transparent text-black border border-black/20 px-6 py-3.5 md:px-8 md:py-4 rounded-full font-medium hover:border-black hover:bg-black/5 transition-all duration-300 text-sm md:text-base"
                                >
                                    Visit Our Store
                                </Link>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ─── Values Section ─── */}
            <section className="py-12 md:py-20 bg-gray-50 relative">
                <div className="container mx-auto px-4">
                    <div className="text-center max-w-3xl mx-auto mb-10 md:mb-16">
                        <span className="text-gold text-xs font-bold tracking-[0.2em] uppercase mb-2 block">Why Choose Us</span>
                        <h2 className="text-2xl md:text-4xl font-serif font-bold text-black mb-4 md:mb-6">The Choudhary Standard</h2>
                        <div className="w-12 md:w-16 h-1 bg-gold mx-auto" />
                    </div>

                    <div className="grid md:grid-cols-3 gap-6 md:gap-8">
                        {values.map((value, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="bg-white p-6 md:p-10 rounded-2xl shadow-lg border border-gray-100 hover:border-gold/30 hover:shadow-xl transition-all duration-300 group"
                            >
                                <div className="w-12 h-12 md:w-14 md:h-14 bg-gold/10 rounded-xl flex items-center justify-center text-gold text-xl md:text-2xl mb-4 md:mb-6 group-hover:scale-110 transition-transform duration-300">
                                    {value.icon}
                                </div>
                                <h3 className="text-lg md:text-xl font-serif font-bold text-black mb-2 md:mb-3">{value.title}</h3>
                                <p className="text-gray-500 leading-relaxed text-sm md:text-base">{value.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── Personal Note / Mission ─── */}
            <section className="py-24 bg-black text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-5 pointer-events-none" />
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

                <div className="container mx-auto px-4 text-center relative z-10">
                    <FaHandHoldingHeart className="text-gold text-4xl mx-auto mb-8" />
                    <h2 className="text-3xl md:text-5xl font-serif font-bold mb-8">Our Promise to You</h2>
                    <p className="text-xl md:text-2xl text-gray-300 font-light leading-relaxed max-w-4xl mx-auto italic">
                        "To democratize luxury fragrances, making premium scents accessible to everyone in Hubli and beyond, while maintaining unwavering standards of quality and service."
                    </p>
                    <div className="mt-12 flex items-center justify-center gap-4">
                        <div className="w-12 h-px bg-gold/50" />
                        <span className="text-gold text-sm tracking-[0.3em] uppercase">Choudhary Perfumes</span>
                        <div className="w-12 h-px bg-gold/50" />
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
};

const values = [
    {
        title: "Pure Tradition",
        description: "Our attars are alcohol-free and crafted from the finest natural ingredients like Sandalwood, Musk, and Oud.",
        icon: <FaLeaf />,
    },
    {
        title: "Masterful Quality",
        description: "Our designer perfume copies are meticulously formulated to match 90% of the original scent profile and longevity.",
        icon: <FaGem />,
    },
    {
        title: "Honest Pricing",
        description: "Luxury shouldn't break the bank. We offer premium fragrance experiences at prices that make sense.",
        icon: <FaHistory />, // Using History/Legacy icon as a proxy for 'Fair/Honest' or 'Trust'
    },
];

export default AboutPage;
