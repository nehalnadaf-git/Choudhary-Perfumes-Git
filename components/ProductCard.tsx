
"use client";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/lib/types";
import { FaWhatsapp, FaEye } from "react-icons/fa";
import { motion } from "framer-motion";

interface ProductCardProps {
    product: Product;
    onQuickView?: (product: Product) => void;
}

const ProductCard = ({ product, onQuickView }: ProductCardProps) => {

    // Construct WhatsApp message
    const message = `Hi Choudhary Perfumes! 👋

I'm interested in:
📦 Product: ${product.name}
💎 Brand: ${product.brand}
📏 Size: ${product.volume}
💰 Price: ₹${product.price}

Please confirm availability and share delivery details.
Thank you!`;

    const whatsappLink = `https://wa.me/916363278962?text=${encodeURIComponent(message)}`;

    return (
        <motion.div
            whileHover={{ y: -10 }}
            className="group relative bg-white rounded-xl overflow-hidden shadow-dark-sm hover:shadow-gold-lg transition-all duration-300 border border-gray-100"
        >
            {/* Image Container */}
            <div className="relative aspect-square overflow-hidden bg-gray-50">
                {product.imageUrl ? (
                    <Image
                        src={product.imageUrl}
                        alt={product.name}
                        fill
                        className="object-cover object-center group-hover:scale-110 transition-transform duration-700"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-400">
                        No Image
                    </div>
                )}

                {/* Overlay actions */}
                <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-gradient-to-t from-black/80 to-transparent flex justify-center gap-3">
                    {onQuickView && (
                        <button
                            onClick={() => onQuickView(product)}
                            className="p-3 bg-white text-black rounded-full hover:bg-gold hover:text-white transition-colors shadow-lg"
                            title="Quick View"
                        >
                            <FaEye />
                        </button>
                    )}
                    <a
                        href={whatsappLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors shadow-lg"
                        title="Buy on WhatsApp"
                    >
                        <FaWhatsapp size={18} />
                    </a>
                </div>

                {product.featured && (
                    <span className="absolute top-3 left-3 bg-gold text-white text-xs font-bold px-3 py-1 rounded-full shadow-md uppercase tracking-wide">
                        Featured
                    </span>
                )}
                {!product.inStock && (
                    <div className="absolute inset-0 bg-white/60 flex items-center justify-center z-10">
                        <span className="bg-black text-white px-4 py-2 text-sm font-bold uppercase tracking-widest">Out of Stock</span>
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="p-4 text-center">
                <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">{product.category}</p>
                <h3 className="font-serif font-bold text-lg text-black mb-1 group-hover:text-gold transition-colors line-clamp-1">
                    {product.name}
                </h3>
                <p className="text-sm text-gray-600 mb-3">{product.brand}</p>
                <div className="flex items-center justify-center gap-2">
                    <span className="text-gold font-bold text-lg">₹{product.price}</span>
                    <span className="text-xs text-gray-400 line-through">₹{Math.round(product.price * 1.3)}</span>
                </div>
            </div>
        </motion.div>
    );
};

export default ProductCard;
