"use client";

import { useCart } from "@/context/CartContext";
import { usePathname } from "next/navigation";
import { FiShoppingBag } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

const FloatingCartButton = () => {
    const { cartCount, toggleCart, isCartOpen, isMenuOpen } = useCart();
    const pathname = usePathname();

    // Hide on admin pages
    if (pathname.startsWith("/admin")) return null;

    return (
        <AnimatePresence>
            {!isCartOpen && !isMenuOpen && (
                <motion.button
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={toggleCart}
                    className="fixed bottom-6 right-6 z-[60] bg-gold text-black p-4 rounded-full shadow-lg hover:shadow-xl hover:bg-gold-light transition-colors duration-300 md:hidden"
                    aria-label="View Cart"
                >
                    <FiShoppingBag size={24} />
                    {cartCount > 0 && (
                        <span className="absolute -top-1 -right-1 bg-black text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center border border-gold">
                            {cartCount}
                        </span>
                    )}
                </motion.button>
            )}
        </AnimatePresence>
    );
};

export default FloatingCartButton;
