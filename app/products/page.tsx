
"use client";

import { useState, useMemo, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { getProducts } from "@/lib/products";
import { Product } from "@/lib/types";
import { FiSearch, FiFilter } from "react-icons/fi";
import clsx from "clsx";

type FilterType = 'all' | 'attar' | 'perfume' | 'featured';

function ProductsContent() {
    const searchParams = useSearchParams();
    const [filter, setFilter] = useState<FilterType>('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getProducts().then(data => {
            setProducts(data);
            setIsLoading(false);
        });
    }, []);

    // Read filter from URL query params on mount & when params change
    useEffect(() => {
        const urlFilter = searchParams.get('filter') || searchParams.get('category');
        if (urlFilter) {
            // Normalize the value
            const normalized = urlFilter.toLowerCase().trim();
            if (normalized === 'attar' || normalized === 'attars' || normalized === 'traditional-attars') {
                setFilter('attar');
            } else if (normalized === 'perfume' || normalized === 'perfumes' || normalized === 'designer-perfumes') {
                setFilter('perfume');
            } else if (normalized === 'featured' || normalized === 'best-sellers' || normalized === 'bestsellers') {
                setFilter('featured');
            } else {
                setFilter('all');
            }
        }
    }, [searchParams]);

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

    // Dynamic page title
    const pageTitle = filter === 'all' ? 'Our Collection'
        : filter === 'attar' ? 'Traditional Attars'
            : filter === 'perfume' ? 'Designer Perfumes'
                : 'Best Sellers';

    const pageSubtitle = filter === 'all'
        ? 'Explore our curated selection of 14 premium fragrances, from timeless attars to modern designer master copies.'
        : filter === 'attar'
            ? 'Pure, alcohol-free traditional fragrance oils crafted from the finest natural ingredients.'
            : filter === 'perfume'
                ? 'Premium designer perfume master copies — luxury fragrances at accessible prices.'
                : 'Loved by our customers. These are the fragrances everyone\'s talking about.';

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />

            {/* Page Header */}
            <div className="bg-black text-white pt-32 pb-12 md:pb-20 px-4">
                <div className="container mx-auto text-center">
                    <h1 className="text-4xl md:text-6xl font-serif font-bold mb-4">{pageTitle}</h1>
                    <p className="text-gray-400 max-w-2xl mx-auto text-lg font-light">
                        {pageSubtitle}
                    </p>
                </div>
            </div>

            {/* Filter & Search Bar */}
            <div className="relative z-10 bg-white shadow-sm border-b border-gray-100">
                <div className="container mx-auto px-4 py-3 md:py-4">
                    <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3 md:gap-4">

                        {/* Desktop Filters */}
                        <div className="hidden lg:flex items-center space-x-2">
                            {categories.map((cat) => (
                                <button
                                    key={cat.id}
                                    onClick={() => setFilter(cat.id as FilterType)}
                                    className={clsx(
                                        "px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300",
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
                            className="lg:hidden w-full flex items-center justify-center gap-2 bg-black text-white py-3.5 rounded-xl font-medium text-sm active:scale-98 transition-transform"
                            onClick={() => setIsFilterOpen(!isFilterOpen)}
                        >
                            <FiFilter size={18} />
                            <span>Filter Products</span>
                        </button>

                        {/* Search Bar */}
                        <div className="relative w-full lg:w-96">
                            <input
                                type="text"
                                placeholder="Search fragrances..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-11 pr-4 py-3 md:py-2.5 border border-gray-200 rounded-xl md:rounded-full focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 bg-white text-black text-sm"
                            />
                            <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                        </div>
                    </div>

                    {/* Mobile Filter Dropdown */}
                    {isFilterOpen && (
                        <div className="lg:hidden mt-3 grid grid-cols-2 gap-2.5 animate-fadeIn">
                            {categories.map((cat) => (
                                <button
                                    key={cat.id}
                                    onClick={() => {
                                        setFilter(cat.id as FilterType);
                                        setIsFilterOpen(false);
                                    }}
                                    className={clsx(
                                        "px-4 py-3.5 rounded-xl text-sm font-medium transition-all border-2 active:scale-95",
                                        filter === cat.id
                                            ? "bg-gold/10 border-gold text-black font-semibold"
                                            : "bg-white border-gray-200 text-gray-600 active:bg-gray-50"
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
            <section className="py-8 md:py-16 container mx-auto px-4 min-h-[60vh]">
                {isLoading ? (
                    <div className="flex flex-col items-center justify-center py-20">
                        <div className="w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin mb-4" />
                        <p className="text-gray-400 text-sm">Loading collection...</p>
                    </div>
                ) : filteredProducts.length > 0 ? (
                    <>
                        <p className="text-sm text-gray-500 mb-6">Showing {filteredProducts.length} results</p>

                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
                            {filteredProducts.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    </>
                ) : (
                    <div className="flex flex-col items-center justify-center py-20 text-gray-500">
                        <FiSearch size={48} className="mb-4 text-gray-300" />
                        <h3 className="text-xl font-bold mb-2">No fragrances found</h3>
                        <p className="max-w-md text-center mb-6">We couldn&apos;t find any matches for &quot;{searchQuery}&quot;. Try searching for &apos;Oud&apos;, &apos;Dior&apos;, or &apos;Attar&apos;.</p>
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
        </div>
    );
}

export default function ProductsPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-gray-400 text-sm">Loading collection...</p>
                </div>
            </div>
        }>
            <ProductsContent />
        </Suspense>
    );
}
