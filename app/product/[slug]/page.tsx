import { Metadata } from 'next';
import { getProducts } from '@/lib/products';
import ProductDetailClient from './ProductDetailClient';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://choudhary-perfumes-git.vercel.app';

// ─── Server-side: generate OG / Twitter meta tags per product ────────────────
export async function generateMetadata(
    { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
    const { slug } = await params;
    const products = await getProducts();
    const product = products.find((p) => p.slug === slug);

    if (!product) {
        return {
            title: 'Product Not Found | Choudhary Perfumes',
        };
    }

    const title = `${product.name} | Choudhary Perfumes`;
    const description = product.description
        || `Shop ${product.name} by ${product.brand} at Choudhary Perfumes — premium attars & designer fragrances.`;

    // Use the dynamic OG image generator so WhatsApp gets a fast, optimised JPEG
    const ogImageUrl = `${SITE_URL}/api/og?` + new URLSearchParams({
        name: product.name,
        brand: product.brand,
        price: String(product.price),
        category: product.category,
        image: product.imageUrl,
    }).toString();

    return {
        title,
        description,
        openGraph: {
            title,
            description,
            url: `${SITE_URL}/product/${slug}`,
            siteName: 'Choudhary Perfumes',
            images: [
                {
                    url: ogImageUrl,
                    width: 1200,
                    height: 630,
                    alt: product.name,
                },
            ],
            type: 'website',
            locale: 'en_IN',
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: [ogImageUrl],
        },
    };
}

// ─── Page: renders the interactive client component ──────────────────────────
export default function ProductPage() {
    return <ProductDetailClient />;
}
