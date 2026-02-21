
"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { Product } from "@/lib/types";

export interface CartItem extends Product {
    quantity: number;
}

interface CartContextType {
    cartStart: boolean;
    cartItems: CartItem[];
    cartCount: number;
    cartTotal: number;
    isCartOpen: boolean;
    isMenuOpen: boolean;
    toastMessage: string;
    isToastVisible: boolean;
    addToCart: (product: Product) => void;
    removeFromCart: (productId: string) => void;
    updateQuantity: (productId: string, quantity: number) => void;
    clearCart: () => void;
    toggleCart: () => void;
    toggleMenu: () => void;
    closeMenu: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [cartStart, setCartStart] = useState(false);
    const [toastMessage, setToastMessage] = useState("");
    const [isToastVisible, setIsToastVisible] = useState(false);
    const [toastTimer, setToastTimer] = useState<NodeJS.Timeout | null>(null);

    // Load cart from localStorage on mount
    useEffect(() => {
        const savedCart = localStorage.getItem("choudhary-cart");
        if (savedCart) {
            try {
                setCartItems(JSON.parse(savedCart));
            } catch (e) {
                console.error("Failed to parse cart", e);
            }
        }
        setCartStart(true);
    }, []);

    // Save cart to localStorage whenever it changes
    useEffect(() => {
        if (cartStart) {
            localStorage.setItem("choudhary-cart", JSON.stringify(cartItems));
        }
    }, [cartItems, cartStart]);

    const showToast = useCallback((productName: string) => {
        // Clear any existing timer
        if (toastTimer) clearTimeout(toastTimer);

        setToastMessage(`${productName} added to cart`);
        setIsToastVisible(true);

        const timer = setTimeout(() => {
            setIsToastVisible(false);
        }, 2000);
        setToastTimer(timer);
    }, [toastTimer]);

    const addToCart = (product: Product) => {
        setCartItems((prev) => {
            const existingItem = prev.find((item) => item.id === product.id);
            if (existingItem) {
                return prev.map((item) =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            return [...prev, { ...product, quantity: 1 }];
        });
        showToast(product.name);
    };

    const removeFromCart = (productId: string) => {
        setCartItems((prev) => prev.filter((item) => item.id !== productId));
    };

    const updateQuantity = (productId: string, quantity: number) => {
        if (quantity < 1) {
            removeFromCart(productId);
            return;
        }
        setCartItems((prev) =>
            prev.map((item) =>
                item.id === productId ? { ...item, quantity } : item
            )
        );
    };

    const clearCart = () => {
        setCartItems([]);
    };

    const toggleCart = () => {
        setIsCartOpen((prev) => !prev);
        if (isMenuOpen) setIsMenuOpen(false); // Close menu if cart opens
    };

    const toggleMenu = () => {
        setIsMenuOpen((prev) => !prev);
        if (isCartOpen) setIsCartOpen(false); // Close cart if menu opens
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
    const cartTotal = cartItems.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
    );

    return (
        <CartContext.Provider
            value={{
                cartStart,
                cartItems,
                cartCount,
                cartTotal,
                isCartOpen,
                isMenuOpen,
                toastMessage,
                isToastVisible,
                addToCart,
                removeFromCart,
                updateQuantity,
                clearCart,
                toggleCart,
                toggleMenu,
                closeMenu,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
};
