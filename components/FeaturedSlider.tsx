"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/lib/types";
import { FiChevronLeft, FiChevronRight, FiPlus } from "react-icons/fi";
import { useCart } from "@/context/CartContext";
import { motion } from "framer-motion";

interface FeaturedSliderProps {
    products: Product[];
}

const FeaturedSlider = ({ products }: FeaturedSliderProps) => {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);
    const { addToCart } = useCart();

    const checkScroll = () => {
        if (!scrollRef.current) return;
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        setCanScrollLeft(scrollLeft > 10);
        setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    };

    useEffect(() => {
        const el = scrollRef.current;
        if (el) {
            el.addEventListener("scroll", checkScroll);
            checkScroll();
            return () => el.removeEventListener("scroll", checkScroll);
        }
    }, []);

    const scroll = (direction: "left" | "right") => {
        if (!scrollRef.current) return;
        const cardWidth = scrollRef.current.querySelector("div")?.offsetWidth || 320;
        scrollRef.current.scrollBy({
            left: direction === "left" ? -cardWidth - 20 : cardWidth + 20,
            behavior: "smooth",
        });
    };

    return (
        <div className="relative">
            {/* Navigation Arrows - Desktop */}
            {canScrollLeft && (
                <button
                    onClick={() => scroll("left")}
                    className="hidden md:flex absolute -left-5 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white rounded-full shadow-lg items-center justify-center text-black hover:bg-gold hover:text-white transition-all border border-gray-200"
                >
                    <FiChevronLeft size={24} />
                </button>
            )}
            {canScrollRight && (
                <button
                    onClick={() => scroll("right")}
                    className="hidden md:flex absolute -right-5 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white rounded-full shadow-lg items-center justify-center text-black hover:bg-gold hover:text-white transition-all border border-gray-200"
                >
                    <FiChevronRight size={24} />
                </button>
            )}

            {/* Scrollable Container */}
            <div
                ref={scrollRef}
                className="flex gap-5 overflow-x-auto overflow-y-visible py-2 px-1 scrollbar-hide snap-x snap-mandatory scroll-smooth"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none", touchAction: "pan-y pinch-zoom" }}
            >
                {products.map((product, index) => (
                    <motion.div
                        key={product.id}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1, duration: 0.5 }}
                        className="snap-start shrink-0 w-[200px] md:w-[280px] group"
                    >
                        <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100">
                            {/* Product Image - clean, no overlay tags */}
                            <Link href={`/product/${product.slug}`} className="block">
                                <div className="relative w-full aspect-square overflow-hidden bg-white">
                                    <Image
                                        src={product.imageUrl}
                                        alt={product.name}
                                        fill
                                        sizes="(max-width: 768px) 200px, 280px"
                                        className="object-contain object-center group-hover:scale-105 transition-transform duration-500"
                                    />
                                </div>
                            </Link>

                            {/* Product Info */}
                            <div className="p-4">
                                <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-1">{product.category}</p>
                                <Link href={`/product/${product.slug}`}>
                                    <h3 className="font-serif font-bold text-sm md:text-base text-black mb-1 group-hover:text-gold transition-colors line-clamp-1">
                                        {product.name}
                                    </h3>
                                </Link>
                                <p className="text-xs text-gray-500 mb-3 truncate">{product.brand}</p>

                                <div className="flex items-center justify-between">
                                    <div className="flex flex-col">
                                        <span className="text-lg font-bold text-black">₹{product.price}</span>
                                        <span className="text-xs text-gray-400 line-through">₹{Math.round(product.price * 1.3)}</span>
                                    </div>
                                    <button
                                        onClick={() => addToCart(product)}
                                        className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center hover:bg-gold hover:text-black transition-all active:scale-95 shadow-md"
                                        aria-label="Add to Cart"
                                    >
                                        <FiPlus size={18} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default FeaturedSlider;
