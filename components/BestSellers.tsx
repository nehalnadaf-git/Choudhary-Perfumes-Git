"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/lib/types";
import { getProducts } from "@/lib/products";
import { useCart } from "@/context/CartContext";
import { FiPlus, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { FaStar } from "react-icons/fa";

const BestSellers = () => {
    const { addToCart } = useCart();
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(4);
    const scrollRef = useRef<HTMLDivElement>(null);

    // Drag state
    const isDragging = useRef(false);
    const dragStartX = useRef(0);
    const dragScrollLeft = useRef(0);

    useEffect(() => {
        getProducts().then(allProducts => {
            const featured = allProducts.filter(p => p.featured);
            setProducts(featured);
            setLoading(false);
        });
    }, []);

    // Responsively set items per page
    useEffect(() => {
        const updateItemsPerPage = () => {
            if (window.innerWidth < 768) {
                setItemsPerPage(2);
            } else {
                setItemsPerPage(4);
            }
        };
        updateItemsPerPage();
        window.addEventListener("resize", updateItemsPerPage);
        return () => window.removeEventListener("resize", updateItemsPerPage);
    }, []);

    // Reset page when items per page changes
    useEffect(() => {
        setCurrentPage(0);
        if (scrollRef.current) {
            scrollRef.current.scrollLeft = 0;
        }
    }, [itemsPerPage]);

    const totalPages = Math.ceil(products.length / itemsPerPage);

    // Instantly snap to a page (no animation)
    const snapToPage = useCallback((page: number) => {
        if (!scrollRef.current) return;
        const container = scrollRef.current;
        const pageWidth = container.clientWidth;
        // Instant jump — no smooth scroll
        container.scrollLeft = page * pageWidth;
        setCurrentPage(page);
    }, []);

    const nextPage = useCallback(() => {
        if (currentPage < totalPages - 1) snapToPage(currentPage + 1);
    }, [currentPage, totalPages, snapToPage]);

    const prevPage = useCallback(() => {
        if (currentPage > 0) snapToPage(currentPage - 1);
    }, [currentPage, snapToPage]);

    // Track current page from scroll position (for dots)
    const handleScroll = useCallback(() => {
        if (!scrollRef.current) return;
        const container = scrollRef.current;
        const page = Math.round(container.scrollLeft / container.clientWidth);
        setCurrentPage(page);
    }, []);

    // Mouse drag to scroll
    const onMouseDown = (e: React.MouseEvent) => {
        if (!scrollRef.current) return;
        isDragging.current = true;
        dragStartX.current = e.pageX - scrollRef.current.offsetLeft;
        dragScrollLeft.current = scrollRef.current.scrollLeft;
        scrollRef.current.style.cursor = "grabbing";
        scrollRef.current.style.userSelect = "none";
    };

    const onMouseMove = (e: React.MouseEvent) => {
        if (!isDragging.current || !scrollRef.current) return;
        e.preventDefault();
        const x = e.pageX - scrollRef.current.offsetLeft;
        const walk = x - dragStartX.current;
        scrollRef.current.scrollLeft = dragScrollLeft.current - walk;
    };

    const onMouseUp = () => {
        if (!scrollRef.current) return;
        isDragging.current = false;
        scrollRef.current.style.cursor = "grab";
        scrollRef.current.style.removeProperty("user-select");
        // Snap to nearest page after drag ends
        const page = Math.round(scrollRef.current.scrollLeft / scrollRef.current.clientWidth);
        snapToPage(Math.max(0, Math.min(page, totalPages - 1)));
    };

    const onMouseLeave = () => {
        if (isDragging.current) onMouseUp();
    };

    if (loading) {
        return (
            <div className="flex justify-center py-12">
                <div className="w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    if (products.length === 0) return null;

    return (
        <div className="relative">
            {/* Scroll Container — scroll-snap with NO smooth scroll */}
            <div
                ref={scrollRef}
                onScroll={handleScroll}
                onMouseDown={onMouseDown}
                onMouseMove={onMouseMove}
                onMouseUp={onMouseUp}
                onMouseLeave={onMouseLeave}
                className="overflow-x-auto scrollbar-hide"
                style={{
                    scrollSnapType: "x mandatory",
                    scrollBehavior: "auto",
                    cursor: "grab",
                    WebkitOverflowScrolling: "touch",
                    msOverflowStyle: "none",
                    scrollbarWidth: "none",
                }}
            >

                {/* One wide track holding all "pages" side by side */}
                <div
                    className="flex"
                    style={{ width: `${totalPages * 100}%` }}
                >
                    {Array.from({ length: totalPages }).map((_, pageIndex) => {
                        const pageProducts = products.slice(
                            pageIndex * itemsPerPage,
                            pageIndex * itemsPerPage + itemsPerPage
                        );
                        return (
                            <div
                                key={pageIndex}
                                className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 flex-shrink-0 px-0"
                                style={{
                                    width: `${100 / totalPages}%`,
                                    scrollSnapAlign: "start",
                                }}
                            >
                                {pageProducts.map((product, index) => (
                                    <div key={product.id} className="group">
                                        <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-200 border border-gray-100 flex flex-col h-full">
                                            {/* Product Image */}
                                            <Link href={`/product/${product.slug}`} className="block">
                                                <div className="relative w-full aspect-square overflow-hidden bg-white">
                                                    <Image
                                                        src={product.imageUrl}
                                                        alt={product.name}
                                                        fill
                                                        sizes="(max-width: 640px) 50vw, 25vw"
                                                        className="object-contain object-center group-hover:scale-105 transition-transform duration-300"
                                                    />
                                                    {/* Best Seller Badge */}
                                                    <span className="absolute top-2 left-2 md:top-3 md:left-3 bg-white/20 backdrop-blur-md text-white px-1.5 py-0.5 md:px-2.5 md:py-1 text-[7px] md:text-[9px] font-bold uppercase tracking-widest rounded-full border border-white/30 shadow-sm">
                                                        #{pageIndex * itemsPerPage + index + 1} Best Seller
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
                                                        className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center hover:bg-gold hover:text-black transition-colors active:scale-95 shadow-md"
                                                        aria-label="Add to Cart"
                                                    >
                                                        <FiPlus size={18} />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Navigation Arrows */}
            {totalPages > 1 && (
                <>
                    <button
                        onClick={prevPage}
                        disabled={currentPage === 0}
                        className={`absolute top-1/2 -translate-y-1/2 -left-3 md:-left-5 z-20 w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center shadow-lg ${currentPage === 0
                            ? "bg-gray-100 text-gray-300 cursor-not-allowed"
                            : "bg-white text-black hover:bg-gold hover:text-black border border-gray-200 hover:border-gold transition-colors"
                            }`}
                        aria-label="Previous products"
                    >
                        <FiChevronLeft size={20} />
                    </button>
                    <button
                        onClick={nextPage}
                        disabled={currentPage === totalPages - 1}
                        className={`absolute top-1/2 -translate-y-1/2 -right-3 md:-right-5 z-20 w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center shadow-lg ${currentPage === totalPages - 1
                            ? "bg-gray-100 text-gray-300 cursor-not-allowed"
                            : "bg-white text-black hover:bg-gold hover:text-black border border-gray-200 hover:border-gold transition-colors"
                            }`}
                        aria-label="Next products"
                    >
                        <FiChevronRight size={20} />
                    </button>
                </>
            )}

            {/* Dot Indicators */}
            {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 mt-8">
                    {Array.from({ length: totalPages }).map((_, i) => (
                        <button
                            key={i}
                            onClick={() => snapToPage(i)}
                            className={`rounded-full transition-all duration-150 ${i === currentPage
                                ? "w-8 h-2.5 bg-gold"
                                : "w-2.5 h-2.5 bg-gray-300 hover:bg-gray-400"
                                }`}
                            aria-label={`Go to page ${i + 1}`}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default BestSellers;
