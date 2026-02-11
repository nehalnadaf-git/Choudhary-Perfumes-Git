
import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                gold: {
                    light: "#E8D4A8",
                    DEFAULT: "#D0AB64",
                    dark: "#B8935A",
                },
                black: {
                    DEFAULT: "#000000",
                    charcoal: "#1A1A1A",
                },
                white: "#FFFFFF",
                gray: {
                    light: "#F8F8F8",
                    medium: "#E5E5E5",
                },
                success: "#10B981",
                error: "#EF4444",
                warning: "#F59E0B",
                info: "#3B82F6",
                whatsapp: "#25D366",
            },
            fontFamily: {
                serif: ["var(--font-cormorant)", "serif"],
                sans: ["var(--font-montserrat)", "sans-serif"],
            },
            boxShadow: {
                "gold-sm": "0 2px 8px rgba(208, 171, 100, 0.1)",
                "gold-md": "0 4px 16px rgba(208, 171, 100, 0.15)",
                "gold-lg": "0 8px 32px rgba(208, 171, 100, 0.2)",
                "dark-sm": "0 2px 8px rgba(0, 0, 0, 0.08)",
                "dark-md": "0 4px 16px rgba(0, 0, 0, 0.12)",
                "dark-lg": "0 8px 32px rgba(0, 0, 0, 0.16)",
            },
            borderRadius: {
                'sm': '8px',
                'md': '16px',
                'lg': '24px',
                'xl': '32px',
                'full': '9999px',
            },
        },
    },
    plugins: [],
};
export default config;
