
"use client";

import { useEffect } from "react";
import { useCart } from "@/context/CartContext";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiTrash2, FiMinus, FiPlus, FiShoppingBag } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import { useSettings } from "@/context/SettingsContext";

const CartDrawer = () => {
    const {
        cartItems,
        cartTotal,
        isCartOpen,
        toggleCart,
        updateQuantity,
        removeFromCart
    } = useCart();
    const pathname = usePathname();
    const { whatsappNumber } = useSettings();

    // Lock body scroll when cart is open so the background page doesn't scroll
    useEffect(() => {
        if (isCartOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isCartOpen]);

    // Hide on admin pages
    if (pathname.startsWith("/admin")) return null;

    const handleCheckout = () => {
        const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
        let message = `Hi Choudhary Perfumes!\n\nI would like to order:\n\n`;
        cartItems.forEach((item, index) => {
            const subtotal = item.price * item.quantity;
            const volumeInfo = item.volume ? ` (${item.volume})` : '';
            message += `${index + 1}. ${item.name}${volumeInfo} (x${item.quantity}) - ₹${subtotal}\n`;
        });
        message += `\nTotal Order Value: ₹${cartTotal}\n`;
        message += `Total Items: ${itemCount}\n\n`;
        message += `Please confirm availability and delivery details. Thanks!`;

        const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, "_blank");
    };

    return (
        <AnimatePresence>
            {isCartOpen && (
                <>
                    {/* Overlay */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={toggleCart}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[70]"
                    />

                    {/* Drawer */}
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed top-0 right-0 w-full md:w-[450px] bg-white shadow-2xl z-[75] flex flex-col"
                        style={{ height: '100dvh' }}
                    >
                        {/* Header */}
                        <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-white sticky top-0 z-10">
                            <h2 className="text-2xl font-serif font-bold flex items-center gap-2">
                                <FiShoppingBag className="text-gold" />
                                Your Cart
                                <span className="text-sm font-sans font-normal text-gray-500 ml-2">({cartItems.length} items)</span>
                            </h2>
                            <button onClick={toggleCart} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                                <FiX size={24} />
                            </button>
                        </div>

                        {/* Cart Items */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-6">
                            {cartItems.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-center space-y-4 text-gray-400">
                                    <FiShoppingBag size={64} className="opacity-20" />
                                    <p className="text-lg font-medium">Your cart is empty</p>
                                    <button
                                        onClick={toggleCart}
                                        className="text-gold hover:underline font-medium"
                                    >
                                        Start Shopping
                                    </button>
                                </div>
                            ) : (
                                cartItems.map((item) => (
                                    <div key={item.id} className="flex gap-4">
                                        <div className="relative w-24 h-24 bg-gray-50 rounded-lg overflow-hidden shrink-0 border border-gray-100">
                                            <Image
                                                src={item.imageUrl}
                                                alt={item.name}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <div className="flex-1 flex flex-col justify-between">
                                            <div>
                                                <div className="flex justify-between items-start">
                                                    <h3 className="font-serif font-bold text-gray-900 line-clamp-2">{item.name}</h3>
                                                    <button
                                                        onClick={() => removeFromCart(item.id)}
                                                        className="text-gray-400 hover:text-red-500 transition-colors p-1"
                                                    >
                                                        <FiTrash2 size={18} />
                                                    </button>
                                                </div>
                                                <p className="text-sm text-gray-500">{item.volume} • {item.brand}</p>
                                            </div>

                                            <div className="flex items-center justify-between mt-2">
                                                <div className="flex items-center border border-gray-200 rounded-lg">
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                        className="p-2 hover:bg-gray-100 transition-colors text-gray-600"
                                                        disabled={item.quantity <= 1}
                                                    >
                                                        <FiMinus size={14} />
                                                    </button>
                                                    <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                        className="p-2 hover:bg-gray-100 transition-colors text-gray-600"
                                                    >
                                                        <FiPlus size={14} />
                                                    </button>
                                                </div>
                                                <p className="font-bold text-gray-900">₹{item.price * item.quantity}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        {/* Footer */}
                        {cartItems.length > 0 && (
                            <div className="p-6 border-t border-gray-100 bg-gray-50 space-y-4">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-500">Subtotal ({cartItems.reduce((s, i) => s + i.quantity, 0)} items)</span>
                                    <span className="text-xl font-bold">₹{cartTotal}</span>
                                </div>
                                <p className="text-xs text-gray-400 text-center">
                                    Shipping & taxes calculated at checkout via WhatsApp
                                </p>
                                <button
                                    onClick={handleCheckout}
                                    className="w-full bg-[#25D366] hover:bg-[#1EBE5A] text-white py-4 rounded-xl font-bold flex items-center justify-center gap-3 transition-all shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
                                >
                                    <FaWhatsapp size={24} />
                                    <span>Order on WhatsApp</span>
                                </button>
                                <p className="text-[10px] text-gray-400 text-center leading-relaxed">
                                    Your order details will be pre-filled in WhatsApp for quick checkout
                                </p>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default CartDrawer;
