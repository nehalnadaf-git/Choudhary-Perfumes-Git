
"use client";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { FaWhatsapp } from "react-icons/fa";

const Hero = () => {
    const images = [
        "/images/hero-bg.jpg", // Placeholder - you will likely want to replace this
    ];
    const [currentImage, setCurrentImage] = useState(0);

    return (
        <section className="relative h-screen w-full overflow-hidden bg-black">
            {/* Background Image/Overlay */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black z-10" />
                {/* In a real app, you might want a carousel here. For now, a solid dark luxury gradient is a safe fallback if image missing */}
                <div className="w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-900 via-black to-black opacity-80" />
            </div>

            <div className="relative z-20 container mx-auto px-4 h-full flex flex-col justify-center items-center text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <h2 className="text-gold text-lg md:text-xl font-sans tracking-[0.3em] uppercase mb-4">
                        Royal Luxury Meets Digital Elegance
                    </h2>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                    className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-white mb-6 leading-tight"
                >
                    Choudhary <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-light via-gold to-gold-dark">
                        Perfumes
                    </span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="text-gray-300 text-lg md:text-xl font-light max-w-2xl mx-auto mb-10 leading-relaxed"
                >
                    "Perfume follows you everywhere you go"
                    <br />
                    Discover the art of luxury fragrances in Hubli. Premium master copies and authentic attars.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    className="flex flex-col md:flex-row gap-4"
                >
                    <Link
                        href="/products"
                        className="px-8 py-4 bg-gold hover:bg-gold-light text-black font-semibold rounded-full transition-all duration-300 transform hover:scale-105 shadow-gold-md hover:shadow-gold-lg"
                    >
                        Shop Our Collection
                    </Link>
                    <a
                        href="https://wa.me/916363278962"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-8 py-4 bg-transparent border border-white text-white hover:bg-white hover:text-black font-semibold rounded-full transition-all duration-300 flex items-center justify-center gap-2 group"
                    >
                        <FaWhatsapp className="text-xl group-hover:text-green-600 transition-colors" />
                        <span>Order on WhatsApp</span>
                    </a>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, y: [0, 10, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 1.5 }}
                className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20 text-white/50"
            >
                <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-1">
                    <div className="w-1 h-2 bg-white/50 rounded-full" />
                </div>
            </motion.div>
        </section>
    );
};

export default Hero;
