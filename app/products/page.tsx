
"use client";

import { useState, useMemo } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import ProductCard from "@/components/ProductCard";
import { products } from "@/lib/products";
import { FiSearch, FiFilter, FiX } from "react-icons/fi";
import clsx from "clsx";

export default function ProductsPage() {
    const [filter, setFilter] = useState<'all' | 'attar' | 'perfume' | 'featured'>('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    // Filter Logic
    const filteredProducts = useMemo(() => {
        return products.filter(product => {
            // 1. Text Search
            const matchesSearch =
                product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
                (product.description || '').toLowerCase().includes(searchQuery.toLowerCase());

            if (!matchesSearch) return false;

            // 2. Category Filter
            if (filter === 'all') return true;
            if (filter === 'featured') return product.featured;
            return product.category === filter;
        });
    }, [filter, searchQuery]);

    // Categories for filter buttons
    const categories = [
        { id: 'all', label: 'All Products' },
        { id: 'attar', label: 'Traditional Attars' },
        { id: 'perfume', label: 'Designer Perfumes' },
        { id: 'featured', label: 'Best Sellers' },
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />

            {/* Page Header */}
            <div className="bg-black text-white pt-32 pb-12 md:pb-20 px-4">
                <div className="container mx-auto text-center">
                    <h1 className="text-4xl md:text-6xl font-serif font-bold mb-4">Our Collection</h1>
                    <p className="text-gray-400 max-w-2xl mx-auto text-lg font-light">
                        Explore our curated selection of 14 premium fragrances, from timeless attars to modern designer master copies.
                    </p>
                </div>
            </div>

            {/* Filter & Search Bar */}
            <div className="sticky top-[72px] z-30 bg-white/95 backdrop-blur shadow-sm border-b border-gray-100">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-4">

                        {/* Desktop Filters */}
                        <div className="hidden lg:flex items-center space-x-2">
                            {categories.map((cat) => (
                                <button
                                    key={cat.id}
                                    onClick={() => setFilter(cat.id as any)}
                                    className={clsx(
                                        "px-4 py-2 rounded-full text-sm font-medium transition-all duration-300",
                                        filter === cat.id
                                            ? "bg-black text-gold shadow-md"
                                            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                    )}
                                >
                                    {cat.label}
                                </button>
                            ))}
                        </div>

                        {/* Mobile Filter Button */}
                        <button
                            className="lg:hidden w-full flex items-center justify-center gap-2 bg-black text-white py-3 rounded-lg"
                            onClick={() => setIsFilterOpen(!isFilterOpen)}
                        >
                            <FiFilter />
                            <span>Filter Products</span>
                        </button>

                        {/* Search Bar */}
                        <div className="relative w-full lg:w-96">
                            <input
                                type="text"
                                placeholder="Search fragrances..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-full focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold bg-gray-50 text-black"
                            />
                            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        </div>
                    </div>

                    {/* Mobile Filter Dropdown */}
                    {isFilterOpen && (
                        <div className="lg:hidden mt-4 grid grid-cols-2 gap-2 animate-fadeIn">
                            {categories.map((cat) => (
                                <button
                                    key={cat.id}
                                    onClick={() => {
                                        setFilter(cat.id as any);
                                        setIsFilterOpen(false);
                                    }}
                                    className={clsx(
                                        "px-4 py-3 rounded-lg text-sm font-medium transition-colors border",
                                        filter === cat.id
                                            ? "bg-gold/10 border-gold text-black"
                                            : "bg-white border-gray-200 text-gray-600"
                                    )}
                                >
                                    {cat.label}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Product Grid */}
            <section className="py-12 md:py-16 container mx-auto px-4 min-h-[60vh]">
                {filteredProducts.length > 0 ? (
                    <>
                        <p className="text-sm text-gray-500 mb-6">Showing {filteredProducts.length} results</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
                            {filteredProducts.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    </>
                ) : (
                    <div className="flex flex-col items-center justify-center py-20 text-gray-500">
                        <FiSearch size={48} className="mb-4 text-gray-300" />
                        <h3 className="text-xl font-bold mb-2">No fragrances found</h3>
                        <p className="max-w-md text-center mb-6">We couldn't find any matches for "{searchQuery}". Try searching for 'Oud', 'Dior', or 'Attar'.</p>
                        <button
                            onClick={() => {
                                setSearchQuery('');
                                setFilter('all');
                            }}
                            className="text-gold hover:underline font-medium"
                        >
                            Clear all filters
                        </button>
                    </div>
                )}
            </section>

            <Footer />
            <WhatsAppButton />
        </div>
    );
}
