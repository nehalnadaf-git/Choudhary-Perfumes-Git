"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/lib/types";
import { getProducts } from "@/lib/products";
import { useCart } from "@/context/CartContext";
import { FiPlus } from "react-icons/fi";
import { FaStar } from "react-icons/fa";
import { motion } from "framer-motion";

const BestSellers = () => {
    const { addToCart } = useCart();
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getProducts().then(allProducts => {
            const featured = allProducts.filter(p => p.featured);
            setProducts(featured);
            setLoading(false);
        });
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center py-12">
                <div className="w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    if (products.length === 0) return null;

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {products.map((product, index) => (
                <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    className="group"
                >
                    <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 flex flex-col h-full">
                        {/* Product Image */}
                        <Link href={`/product/${product.slug}`} className="block">
                            <div className="relative w-full aspect-square overflow-hidden bg-white">
                                <Image
                                    src={product.imageUrl}
                                    alt={product.name}
                                    fill
                                    sizes="(max-width: 640px) 50vw, 25vw"
                                    className="object-contain object-center group-hover:scale-105 transition-transform duration-500"
                                />

                                {/* Best Seller Badge */}
                                <span className="absolute top-2 left-2 md:top-3 md:left-3 bg-white/20 backdrop-blur-md text-white px-1.5 py-0.5 md:px-2.5 md:py-1 text-[7px] md:text-[9px] font-bold uppercase tracking-widest rounded-full border border-white/30 shadow-sm">
                                    #{index + 1} Best Seller
                                </span>
                            </div>
                        </Link>

                        {/* Product Info */}
                        <div className="p-4 flex-1 flex flex-col">
                            {/* Star Rating */}
                            <div className="flex items-center gap-0.5 text-gold mb-2">
                                <FaStar size={10} />
                                <FaStar size={10} />
                                <FaStar size={10} />
                                <FaStar size={10} />
                                <FaStar size={10} />
                                <span className="text-gray-400 text-[10px] ml-1.5">4.9</span>
                            </div>

                            <Link href={`/product/${product.slug}`} className="block flex-1">
                                <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-1">{product.category}</p>
                                <h3 className="font-serif font-bold text-sm md:text-base text-black mb-1 group-hover:text-gold transition-colors line-clamp-2 leading-tight">
                                    {product.name}
                                </h3>
                                <p className="text-xs text-gray-500 truncate">{product.brand}</p>
                            </Link>

                            <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
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
    );
};

export default BestSellers;
