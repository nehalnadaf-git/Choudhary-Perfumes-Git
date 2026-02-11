
"use client";

import Link from "next/link";
import { FaWhatsapp, FaInstagram, FaMapMarkerAlt, FaPhone, FaEnvelope } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="bg-black text-white pt-16 pb-8 border-t border-white/10">
            <div className="container mx-auto px-4 md:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                    {/* Brand Column */}
                    <div>
                        <h2 className="text-2xl font-serif font-bold text-gold mb-4">CHOUDHARY PERFUMES</h2>
                        <p className="text-gray-400 text-sm leading-relaxed mb-6">
                            "Perfume follows you everywhere you go"
                            <br /><br />
                            Hubli's trusted destination for premium attars and luxury perfume master copies. Quality, authenticity, and affordability in every bottle.
                        </p>
                        <div className="flex space-x-4">
                            <a href="https://instagram.com/choudharyperfumes" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gold transition-colors">
                                <FaInstagram size={24} />
                            </a>
                            <a href="https://wa.me/916363278962" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-whatsapp transition-colors">
                                <FaWhatsapp size={24} />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-serif font-semibold mb-6 text-white border-b border-gold/30 inline-block pb-1">Explore</h3>
                        <ul className="space-y-3">
                            {['Home', 'Products', 'About Us', 'Reviews', 'Contact', 'FAQ'].map((item) => (
                                <li key={item}>
                                    <Link
                                        href={item === 'Home' ? '/' : `/${item.toLowerCase().replace(' ', '-')}`}
                                        className="text-gray-400 hover:text-gold text-sm transition-colors"
                                    >
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Products */}
                    <div>
                        <h3 className="text-lg font-serif font-semibold mb-6 text-white border-b border-gold/30 inline-block pb-1">Collections</h3>
                        <ul className="space-y-3">
                            <li><Link href="/products?category=attar" className="text-gray-400 hover:text-gold text-sm transition-colors">Traditional Attars</Link></li>
                            <li><Link href="/products?category=perfume" className="text-gray-400 hover:text-gold text-sm transition-colors">Designer Perfumes</Link></li>
                            <li><Link href="/products?filter=best-sellers" className="text-gray-400 hover:text-gold text-sm transition-colors">Best Sellers</Link></li>
                            <li><Link href="/products?filter=featured" className="text-gray-400 hover:text-gold text-sm transition-colors">Featured Collection</Link></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="text-lg font-serif font-semibold mb-6 text-white border-b border-gold/30 inline-block pb-1">Get in Touch</h3>
                        <ul className="space-y-4">
                            <li className="flex items-start space-x-3 text-sm text-gray-400">
                                <FaMapMarkerAlt className="text-gold mt-1 shrink-0" />
                                <span>Madani Colony near Akshaya Park,<br />Hubli, Karnataka 580030</span>
                            </li>
                            <li className="flex items-center space-x-3 text-sm text-gray-400">
                                <FaPhone className="text-gold shrink-0" />
                                <span>+91 6363 278 962</span>
                            </li>
                            <li className="flex items-center space-x-3 text-sm text-gray-400">
                                <FaEnvelope className="text-gold shrink-0" />
                                <span>info@choudharyperfumes.com</span>
                            </li>
                            <li className="text-sm text-gray-500 pt-2">
                                <span className="block text-gold mb-1">Business Hours:</span>
                                Mon-Sat: 10AM - 9PM<br />Sun: 11AM - 8PM
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-xs text-gray-600">
                    <p>© {new Date().getFullYear()} Choudhary Perfumes. All rights reserved.</p>
                    <p className="flex items-center">Made with <span className="text-red-500 mx-1">❤️</span> in Hubli, Karnataka</p>
                    <div className="flex space-x-6">
                        <Link href="/privacy" className="hover:text-gold">Privacy Policy</Link>
                        <Link href="/terms" className="hover:text-gold">Terms & Conditions</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
