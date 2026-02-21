"use client";

import { motion, AnimatePresence } from "framer-motion";
import { FiCheck } from "react-icons/fi";

interface CartToastProps {
    message: string;
    isVisible: boolean;
}

const CartToast = ({ message, isVisible }: CartToastProps) => {
    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, y: 60, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 20, scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    className="fixed bottom-24 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-3 bg-black text-white px-5 py-3 rounded-full shadow-xl border border-white/10"
                >
                    <span className="w-6 h-6 bg-gold rounded-full flex items-center justify-center shrink-0">
                        <FiCheck size={14} className="text-black" />
                    </span>
                    <span className="text-sm font-medium whitespace-nowrap">{message}</span>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default CartToast;
