
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiX, FiSearch, FiShoppingBag, FiInstagram } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import clsx from "clsx";

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        setIsOpen(false);
    }, [pathname]);

    const navLinks = [
        { name: "Home", href: "/" },
        { name: "Products", href: "/products" },
        { name: "About Us", href: "/about" },
        { name: "Reviews", href: "/reviews" },
        { name: "Contact", href: "/contact" },
    ];

    return (
        <header
            className={clsx(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
                isScrolled
                    ? "bg-black/95 backdrop-blur-md shadow-gold-sm py-4"
                    : "bg-transparent py-6"
            )}
        >
            <div className="container mx-auto px-4 md:px-8 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="relative z-50">
                    <h1 className="text-2xl md:text-3xl font-serif font-bold text-gold tracking-wider">
                        CHOUDHARY
                        <span className="block text-xs font-sans font-light tracking-[0.3em] text-white">
                            PERFUMES
                        </span>
                    </h1>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center space-x-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className={clsx(
                                "text-sm font-medium tracking-wide transition-colors duration-300 relative group",
                                pathname === link.href ? "text-gold" : "text-white hover:text-gold-light"
                            )}
                        >
                            {link.name}
                            <span className={clsx(
                                "absolute -bottom-1 left-0 w-0 h-0.5 bg-gold transition-all duration-300 group-hover:w-full",
                                pathname === link.href ? "w-full" : ""
                            )} />
                        </Link>
                    ))}
                </nav>

                {/* Right Actions */}
                <div className="hidden md:flex items-center space-x-6">
                    <button className="text-white hover:text-gold transition-colors">
                        <FiSearch size={22} />
                    </button>
                    <a
                        href="https://instagram.com/choudharyperfumes"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white hover:text-gold transition-colors"
                    >
                        <FiInstagram size={22} />
                    </a>
                    <a
                        href="https://wa.me/916363278962"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 bg-gold hover:bg-gold-dark text-black px-4 py-2 rounded-full font-medium text-sm transition-all shadow-gold-sm hover:shadow-gold-md"
                    >
                        <FaWhatsapp size={18} />
                        <span>Chat</span>
                    </a>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden text-white z-50 focus:outline-none"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <FiX size={28} /> : <FiMenu size={28} />}
                </button>
            </div>

            {/* Mobile Navigation Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="fixed inset-0 bg-black z-40 flex flex-col items-center justify-center space-y-8 md:hidden"
                    >
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className={clsx(
                                    "text-2xl font-serif font-medium transition-colors",
                                    pathname === link.href ? "text-gold" : "text-white"
                                )}
                            >
                                {link.name}
                            </Link>
                        ))}
                        <div className="flex items-center space-x-6 mt-8">
                            <a href="https://wa.me/916363278962" className="text-white hover:text-gold">
                                <FaWhatsapp size={28} />
                            </a>
                            <a href="https://instagram.com/choudharyperfumes" className="text-white hover:text-gold">
                                <FiInstagram size={28} />
                            </a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
};

export default Header;
