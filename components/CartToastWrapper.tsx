"use client";

import CartToast from "@/components/CartToast";
import { useCart } from "@/context/CartContext";
import { usePathname } from "next/navigation";

const CartToastWrapper = () => {
    const { toastMessage, isToastVisible } = useCart();
    const pathname = usePathname();

    // Hide on admin pages
    if (pathname.startsWith("/admin")) return null;

    return <CartToast message={toastMessage} isVisible={isToastVisible} />;
};

export default CartToastWrapper;
