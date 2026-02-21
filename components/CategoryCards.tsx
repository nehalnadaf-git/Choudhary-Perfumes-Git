"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

const categories = [
    {
        title: "Traditional Attars",
        subtitle: "Pure. Natural. Timeless.",
        href: "/products?filter=attar",
        image: "/images/Cards Image/Traditional Attar Card.jpg",
        isBackgroundCard: true,
        imgPos: "object-right", // Bottle is on the right side of image
        count: "4 Fragrances",
        icon: "🌿",
        imgFit: "object-contain",
    },
    {
        title: "Designer Perfumes",
        subtitle: "Luxury. Accessible. Premium.",
        href: "/products?filter=perfume",
        image: "/images/Cards Image/Designer perfumes Card.jpg",
        isBackgroundCard: true,
        imgPos: "object-right", // Reset to standard right alignment 
        count: "10 Fragrances",
        icon: "✨",
        imgFit: "object-contain",
    },
];

const CategoryCards = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {categories.map((cat, index) => (
                <motion.div
                    key={cat.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.15, duration: 0.6 }}
                >
                    <Link
                        href={cat.href}
                        className="group relative block h-[280px] md:h-[400px] w-full rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 bg-black border border-white/10"
                    >
                        {cat.isBackgroundCard ? (
                            // ─── Case 1: Full Background Composition (e.g. Attar Card) ───
                            <>
                                <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-105">
                                    <Image
                                        src={cat.image}
                                        alt={cat.title}
                                        fill
                                        sizes="(max-width: 768px) 100vw, 50vw"
                                        className={`${cat.imgFit || 'object-cover'} ${cat.imgPos}`}
                                        priority={true}
                                        unoptimized={true} // Bypassing optimization to force reload and avoid cache issues
                                    />
                                </div>
                                {/* Gradient Overlay for Left-side Text Validity */}
                                <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent pointer-events-none" />
                            </>
                        ) : (
                            // ─── Case 2: Split Layout with Floating Product (e.g. Perfume Card) ───
                            <>
                                {/* Background Glows */}
                                <div className="absolute top-0 right-0 bottom-0 w-[60%] overflow-hidden pointer-events-none">
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-900/40 rounded-full blur-[80px] group-hover:bg-blue-800/50 transition-colors duration-700" />
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-amber-400/10 rounded-full blur-[50px] mix-blend-screen" />
                                </div>

                                {/* Floating Image on Right */}
                                <div className="absolute right-0 top-0 bottom-0 w-[45%] h-full flex items-center justify-center pointer-events-none">
                                    <div className="relative w-full h-[85%] transform group-hover:scale-105 group-hover:-rotate-2 transition-transform duration-700 ease-out">
                                        <Image
                                            src={cat.image}
                                            alt={cat.title}
                                            fill
                                            sizes="(max-width: 768px) 50vw, 25vw"
                                            className="object-contain object-center drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)] brightness-110 contrast-110"
                                        />
                                    </div>
                                </div>
                            </>
                        )}

                        {/* ─── Text Content (Left Aligned for Both Layouts) ─── */}
                        <div className="relative z-10 w-full h-full flex items-center">
                            <div className="w-[60%] h-full flex flex-col justify-center p-6 md:p-8">
                                <span className="text-gold/90 text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase mb-3 drop-shadow-md">
                                    {cat.subtitle}
                                </span>
                                <h3 className="text-2xl md:text-4xl font-serif font-bold text-white mb-6 leading-tight group-hover:text-gold-light transition-colors drop-shadow-lg">
                                    {cat.title}
                                </h3>

                                <div className="inline-flex items-center gap-2 text-white/90 text-xs md:text-sm font-medium border-b border-white/30 pb-1 w-fit group-hover:border-gold group-hover:text-gold transition-all duration-300">
                                    Explore Collection
                                    <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                                </div>
                            </div>
                        </div>

                    </Link>
                </motion.div>
            ))}
        </div>
    );
};

export default CategoryCards;
