
"use client";
import { FaWhatsapp } from "react-icons/fa";

const WhatsAppButton = () => {
    return (
        <a
            href="https://wa.me/916363278962?text=Hello%20Choudhary%20Perfumes%2C%20I%27m%20interested%20in%20your%20fragrances.%20Please%20help%20me%20find%20the%20perfect%20scent!"
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-transform hover:scale-110 hover:shadow-xl animate-bounce-slow"
            aria-label="Chat on WhatsApp"
        >
            <FaWhatsapp size={32} />
        </a>
    );
};

export default WhatsAppButton;
