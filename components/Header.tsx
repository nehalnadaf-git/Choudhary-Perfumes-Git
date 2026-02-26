
"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiX, FiSearch, FiShoppingBag, FiInstagram } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import clsx from "clsx";
import { useCart } from "@/context/CartContext";
import { useSettings } from "@/context/SettingsContext";
import { Product } from "@/lib/types";

const Header = () => {
    const pathname = usePathname();
    const router = useRouter();
    const { cartCount, toggleCart, isMenuOpen, toggleMenu, closeMenu } = useCart();
    const { whatsappNumber } = useSettings();
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState<Product[]>([]);
    const [allProducts, setAllProducts] = useState<Product[]>([]);
    const searchInputRef = useRef<HTMLInputElement>(null);

    // Fetch all products once for search
    useEffect(() => {
        fetch('/api/products')
            .then(res => res.json())
            .then(data => { if (Array.isArray(data)) setAllProducts(data); })
            .catch(() => { });
    }, []);

    // Filter products as user types
    useEffect(() => {
        if (!searchQuery.trim()) {
            setSearchResults([]);
            return;
        }
        const q = searchQuery.toLowerCase();
        setSearchResults(
            allProducts.filter(p =>
                p.name.toLowerCase().includes(q) ||
                p.brand.toLowerCase().includes(q) ||
                p.category.toLowerCase().includes(q)
            ).slice(0, 6)
        );
    }, [searchQuery, allProducts]);

    // Focus input when search opens
    useEffect(() => {
        if (isSearchOpen) {
            setTimeout(() => searchInputRef.current?.focus(), 100);
        } else {
            setSearchQuery('');
            setSearchResults([]);
        }
    }, [isSearchOpen]);

    // Close search on ESC
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setIsSearchOpen(false);
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, []);

    const handleSearchSubmit = useCallback(() => {
        if (searchQuery.trim()) {
            setIsSearchOpen(false);
            router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
        }
    }, [searchQuery, router]);

    useEffect(() => {
        closeMenu();
    }, [pathname]);

    // Lock body scroll when menu is open
    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isMenuOpen]);

    const navLinks = [
        { name: "Home", href: "/" },
        { name: "Products", href: "/products" },
        { name: "About Us", href: "/about" },
        { name: "Contact", href: "/contact" },
    ];

    return (
        <>
            {/* Floating Glassmorphism Header */}
            <header
                className="fixed z-[65] top-3 left-3 right-3 md:top-5 md:left-6 md:right-6 lg:left-10 lg:right-10"
            >
                <div
                    className="relative rounded-[22px] md:rounded-[28px] overflow-hidden py-3.5 md:py-4"
                    style={{
                        background: 'linear-gradient(135deg, rgba(8,8,8,0.65) 0%, rgba(18,16,10,0.58) 40%, rgba(12,12,12,0.62) 100%)',
                        WebkitBackdropFilter: 'blur(28px) saturate(200%)',
                        backdropFilter: 'blur(28px) saturate(200%)',
                        boxShadow: '0 8px 40px rgba(0,0,0,0.4), 0 2px 12px rgba(208,171,100,0.06), inset 0 1px 0 rgba(255,255,255,0.04)',
                    }}
                >
                    {/* Multi-layer inner border glow */}
                    <div className="absolute inset-0 rounded-[22px] md:rounded-[28px] border border-white/[0.07] pointer-events-none" />
                    <div className="absolute inset-[1px] rounded-[21px] md:rounded-[27px] border border-white/[0.03] pointer-events-none" />
                    {/* Top gold shimmer line */}
                    <div className="absolute top-0 left-[8%] right-[8%] h-[1px] bg-gradient-to-r from-transparent via-gold/25 to-transparent pointer-events-none" />
                    {/* Bottom subtle edge */}
                    <div className="absolute bottom-0 left-[5%] right-[5%] h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent pointer-events-none" />
                    {/* Corner glow accents */}
                    <div className="absolute top-0 left-0 w-24 h-24 bg-gold/[0.02] rounded-full blur-2xl pointer-events-none" />
                    <div className="absolute top-0 right-0 w-24 h-24 bg-gold/[0.02] rounded-full blur-2xl pointer-events-none" />

                    <div className="relative z-[70] px-4 md:px-6 flex items-center justify-between">
                        {/* Left: Menu Button */}
                        <div className="flex items-center gap-3 md:gap-4 w-[80px] md:w-[120px]">
                            <button
                                className="text-white/80 hover:text-gold transition-all duration-300 focus:outline-none relative z-[70] p-1.5 rounded-xl hover:bg-white/[0.06]"
                                onClick={toggleMenu}
                                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                            >
                                {isMenuOpen ? (
                                    <FiX size={24} className="md:w-6 md:h-6" />
                                ) : (
                                    <FiMenu size={22} className="md:w-6 md:h-6" />
                                )}
                            </button>
                        </div>

                        {/* Center: Logo */}
                        <Link href="/" className="flex items-center gap-2 md:gap-2.5 group relative z-[70]">
                            <div className="relative w-8 h-8 md:w-10 md:h-10">
                                <Image
                                    src="/images/favicon/logo.png"
                                    alt="Choudhary Perfumes Logo"
                                    fill
                                    className="object-contain group-hover:scale-105 transition-transform duration-300"
                                    priority
                                />
                            </div>
                            <div>
                                <h1 className="text-lg md:text-2xl font-serif font-bold text-gold tracking-wider leading-none group-hover:text-gold-light transition-colors duration-300">
                                    CHOUDHARY
                                </h1>
                                <span className="block text-[8px] md:text-[10px] font-sans font-light tracking-[0.35em] text-white/60 leading-none mt-0.5">
                                    PERFUMES
                                </span>
                            </div>
                        </Link>

                        {/* Right: Actions */}
                        <div className="flex items-center gap-2 md:gap-3 w-[80px] md:w-[120px] justify-end">
                            {/* Search */}
                            <button
                                onClick={() => setIsSearchOpen(true)}
                                className="text-white/70 hover:text-gold transition-all duration-300 focus:outline-none p-1.5 rounded-xl hover:bg-white/[0.06]"
                                aria-label="Search products"
                            >
                                <FiSearch size={20} className="md:w-5 md:h-5" />
                            </button>

                            {/* Cart - desktop only, mobile has floating button */}
                            <button
                                onClick={toggleCart}
                                className="hidden md:flex text-white/70 hover:text-gold transition-all duration-300 focus:outline-none p-1.5 rounded-xl hover:bg-white/[0.06] relative items-center justify-center"
                                aria-label="Open cart"
                            >
                                <FiShoppingBag size={20} className="md:w-5 md:h-5" />
                                {cartCount > 0 && (
                                    <span className="absolute -top-0.5 -right-0.5 bg-gold text-black text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                                        {cartCount}
                                    </span>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Full-screen Navigation Overlay */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 z-[55] bg-black/[0.97]"
                    >
                        {/* Close Button - Top Right */}
                        <button
                            onClick={closeMenu}
                            className="absolute top-6 right-6 md:top-8 md:right-10 z-20 text-white/70 hover:text-gold transition-colors duration-200 p-2"
                            aria-label="Close menu"
                        >
                            <FiX size={32} />
                        </button>

                        {/* Menu Content */}
                        <div className="flex flex-col items-center justify-center h-full space-y-7">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    onClick={closeMenu}
                                    className={clsx(
                                        "text-3xl md:text-4xl font-serif font-medium transition-colors duration-200",
                                        pathname === link.href
                                            ? "text-gold"
                                            : "text-white/80 hover:text-gold"
                                    )}
                                >
                                    {link.name}
                                </Link>
                            ))}

                            {/* Divider */}
                            <div className="w-12 h-px bg-gold/30 my-2" />

                            {/* Cart */}
                            <button
                                onClick={() => {
                                    closeMenu();
                                    toggleCart();
                                }}
                                className="flex items-center gap-3 text-white/60 hover:text-gold text-lg font-serif font-medium transition-colors duration-200"
                            >
                                <FiShoppingBag size={22} /> Cart ({cartCount})
                            </button>

                            {/* Social */}
                            <div className="flex items-center space-x-6 mt-6">
                                <a
                                    href={`https://wa.me/${whatsappNumber}`}
                                    className="text-white/40 hover:text-gold transition-colors duration-200"
                                >
                                    <FaWhatsapp size={26} />
                                </a>
                                <a
                                    href="https://instagram.com/choudharyperfumes"
                                    className="text-white/40 hover:text-gold transition-colors duration-200"
                                >
                                    <FiInstagram size={26} />
                                </a>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ─── Search Overlay ─── */}
            <AnimatePresence>
                {isSearchOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 z-[65] bg-black/95 flex flex-col items-center"
                    >
                        {/* Close Button */}
                        <button
                            onClick={() => setIsSearchOpen(false)}
                            className="absolute top-6 right-6 md:top-8 md:right-10 text-white/70 hover:text-gold transition-colors p-2"
                            aria-label="Close search"
                        >
                            <FiX size={28} />
                        </button>

                        {/* Search Input */}
                        <div className="w-full max-w-xl px-6 pt-28 md:pt-36">
                            <div className="relative">
                                <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gold" size={22} />
                                <input
                                    ref={searchInputRef}
                                    type="text"
                                    placeholder="Search for fragrances..."
                                    value={searchQuery}
                                    onChange={e => setSearchQuery(e.target.value)}
                                    onKeyDown={e => e.key === 'Enter' && handleSearchSubmit()}
                                    className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/10 rounded-2xl text-white text-lg placeholder-white/30 focus:outline-none focus:border-gold/50 focus:bg-white/[0.12] transition-all"
                                />
                            </div>

                            {/* Results */}
                            {searchResults.length > 0 && (
                                <div className="mt-4 space-y-2">
                                    {searchResults.map(product => (
                                        <Link
                                            key={product.id}
                                            href={`/product/${product.slug}`}
                                            onClick={() => setIsSearchOpen(false)}
                                            className="flex items-center gap-4 p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-gold/20 transition-all"
                                        >
                                            <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-white/10 flex-shrink-0">
                                                <Image src={product.imageUrl} alt={product.name} fill className="object-cover" sizes="48px" />
                                            </div>
                                            <div className="min-w-0">
                                                <p className="text-white font-medium text-sm truncate">{product.name}</p>
                                                <p className="text-gold text-xs">₹{product.price}</p>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            )}

                            {searchQuery.trim() && searchResults.length === 0 && (
                                <p className="text-white/40 text-center mt-8 text-sm">No fragrances found for &ldquo;{searchQuery}&rdquo;</p>
                            )}

                            {!searchQuery.trim() && (
                                <p className="text-white/30 text-center mt-8 text-sm">Start typing to search our collection...</p>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Header;
