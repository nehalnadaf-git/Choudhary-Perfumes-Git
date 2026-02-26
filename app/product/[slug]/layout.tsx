// SERVER component — no "use client"
// generateMetadata runs on the server for every request, including
// WhatsApp / Facebook / Twitter crawlers that can't execute JavaScript.

import { Metadata } from "next";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

interface Props {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;

    // Determine canonical site URL for absolute OG image paths
    const siteUrl =
        process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
        (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "https://choudhary-perfumes-git.vercel.app");

    try {
        // Query Supabase directly — avoids HTTP fetch that can fail silently at build/crawl time
        const { data: product, error } = await supabaseAdmin
            .from("products")
            .select("name, brand, description, image_url, price, category, slug")
            .eq("slug", slug)
            .single();

        if (error || !product) {
            return {
                title: "Product Not Found | Choudhary Perfumes",
                description: "The requested product could not be found.",
            };
        }

        const title = `${product.name} – ${product.brand} | Choudhary Perfumes`;
        const rawDesc = product.description || `Buy ${product.name} by ${product.brand} at the best price. Starting from ₹${product.price}. 100% authentic, fast delivery.`;
        const description = rawDesc.length > 160 ? rawDesc.slice(0, 157) + "..." : rawDesc;
        const pageUrl = `${siteUrl}/product/${slug}`;

        // MUST be absolute for social crawlers — relative URLs won't work
        const imageUrl = product.image_url?.startsWith("http")
            ? product.image_url
            : `${siteUrl}${product.image_url}`;

        return {
            title,
            description,
            openGraph: {
                title,
                description,
                url: pageUrl,
                siteName: "Choudhary Perfumes",
                type: "website",
                images: [
                    {
                        url: imageUrl,
                        width: 800,
                        height: 800,
                        alt: `${product.name} - Choudhary Perfumes`,
                    },
                ],
            },
            twitter: {
                card: "summary_large_image",
                title,
                description,
                images: [imageUrl],
            },
        };
    } catch {
        return {
            title: "Choudhary Perfumes",
            description: "Premium fragrances and attars — shop the finest collection.",
        };
    }
}

export default function ProductLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
