
"use client";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/lib/types";
import { FiPlus, FiChevronDown } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";

interface ProductCardProps {
    product: Product;
    onQuickView?: (product: Product) => void;
}

const ProductCard = ({ product, onQuickView }: ProductCardProps) => {
    const { addToCart } = useCart();
    const hasVolumes = product.volumes && product.volumes.length > 0;
    const [selectedVolumeIndex, setSelectedVolumeIndex] = useState(0);
    const [isVolumeOpen, setIsVolumeOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Current display price & volume
    const currentPrice = hasVolumes
        ? product.volumes![selectedVolumeIndex].price
        : product.price;
    const currentVolume = hasVolumes
        ? product.volumes![selectedVolumeIndex].volume
        : product.volume;

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setIsVolumeOpen(false);
            }
        };
        if (isVolumeOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isVolumeOpen]);

    const handleAddToCart = () => {
        const cartProduct = hasVolumes
            ? {
                ...product,
                id: `${product.id}-${currentVolume}`,
                price: currentPrice,
                volume: currentVolume,
            }
            : product;
        addToCart(cartProduct);
    };

    return (
        <motion.div
            whileHover={{ y: -4 }}
            className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 flex flex-col"
        >
            {/* Image Container */}
            <div className="relative w-full aspect-square shrink-0 overflow-hidden bg-gradient-to-b from-gray-50 to-white">
                {product.imageUrl ? (
                    <Link href={`/product/${product.slug}`} className="block w-full h-full">
                        <Image
                            src={product.imageUrl}
                            alt={product.name}
                            fill
                            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                            className="object-contain object-center group-hover:scale-105 transition-transform duration-500"
                        />
                    </Link>
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-400">
                        No Image
                    </div>
                )}

                {/* Featured Badge */}
                {product.featured && (
                    <span className="absolute top-2.5 left-2.5 md:top-3 md:left-3 bg-black/60 backdrop-blur-md text-gold px-2.5 py-1 text-[8px] md:text-[10px] font-bold uppercase tracking-widest rounded-full border border-gold/20 shadow-sm z-10">
                        ★ Featured
                    </span>
                )}
            </div>

            {/* Content */}
            <div className="p-3 md:p-4 flex-1 flex flex-col">
                <Link href={`/product/${product.slug}`} className="block flex-1">
                    <p className="text-[9px] md:text-[10px] text-gold/70 uppercase tracking-[0.15em] font-semibold mb-1">{product.category}</p>
                    <h3 className="font-serif font-bold text-[13px] md:text-base text-black mb-0.5 group-hover:text-gold transition-colors line-clamp-2 leading-snug">
                        {product.name}
                    </h3>
                    <p className="text-[11px] md:text-xs text-gray-400 mb-2 truncate">{product.brand}</p>
                </Link>

                {/* Volume Selector — Only for Attars */}
                {hasVolumes && (
                    <div className="relative mb-3" ref={dropdownRef}>
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                setIsVolumeOpen(!isVolumeOpen);
                            }}
                            className={`w-full flex items-center justify-between gap-1 px-3 py-2 rounded-xl border transition-all duration-200 text-xs md:text-sm ${isVolumeOpen
                                ? 'border-gold bg-gold/5 shadow-sm'
                                : 'border-gray-200 bg-gray-50/80 hover:border-gold/40'
                                }`}
                        >
                            <div className="flex items-center gap-1.5">
                                <span className="text-[9px] md:text-[10px] text-gray-400 uppercase tracking-wider font-semibold">Size</span>
                                <span className="font-bold text-gray-900">{currentVolume}</span>
                            </div>
                            <FiChevronDown
                                size={14}
                                className={`text-gray-400 transition-transform duration-200 ${isVolumeOpen ? 'rotate-180 text-gold' : ''}`}
                            />
                        </button>

                        {/* Dropdown */}
                        <AnimatePresence>
                            {isVolumeOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: -6, scale: 0.96 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: -6, scale: 0.96 }}
                                    transition={{ duration: 0.15, ease: "easeOut" }}
                                    className="absolute bottom-full left-0 right-0 mb-2 bg-white rounded-xl border border-gray-100 shadow-xl z-50 overflow-hidden"
                                >
                                    <div className="p-1.5">
                                        {product.volumes!.map((vol, idx) => (
                                            <button
                                                key={vol.volume}
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    e.stopPropagation();
                                                    setSelectedVolumeIndex(idx);
                                                    setIsVolumeOpen(false);
                                                }}
                                                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs md:text-sm transition-all duration-150 ${selectedVolumeIndex === idx
                                                    ? 'bg-gold/10 text-black font-bold'
                                                    : 'hover:bg-gray-50 text-gray-600'
                                                    }`}
                                            >
                                                <span className="flex items-center gap-2">
                                                    <span
                                                        className={`w-2 h-2 rounded-full transition-colors ${selectedVolumeIndex === idx ? 'bg-gold' : 'bg-gray-200'
                                                            }`}
                                                    />
                                                    {vol.volume}
                                                </span>
                                                <span className={`font-bold ${selectedVolumeIndex === idx ? 'text-gold' : 'text-gray-900'}`}>
                                                    ₹{vol.price}
                                                </span>
                                            </button>
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                )}



                {/* Price + Add to Cart */}
                <div className="flex items-center justify-between mt-auto pt-2 border-t border-gray-50">
                    <div className="flex flex-col">
                        <span className="text-gold font-bold text-base md:text-xl leading-tight">₹{currentPrice}</span>
                        <span className="text-[10px] md:text-xs text-gray-400 line-through">₹{Math.round(currentPrice * 1.3)}</span>
                    </div>

                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleAddToCart();
                        }}
                        className="w-9 h-9 md:w-11 md:h-11 bg-black text-white rounded-full flex items-center justify-center hover:bg-gold hover:text-black transition-all shadow-md active:scale-90 shrink-0"
                        title="Add to Cart"
                        aria-label="Add to Cart"
                    >
                        <FiPlus size={16} className="md:hidden" />
                        <FiPlus size={20} className="hidden md:block" />
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

export default ProductCard;
