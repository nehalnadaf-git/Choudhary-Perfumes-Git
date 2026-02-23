import { Metadata } from 'next';
import { getProducts } from '@/lib/products';

export async function generateMetadata(
    { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
    const { slug } = await params;
    const products = await getProducts();
    const product = products.find((p) => p.slug === slug);

    if (!product) {
        return {
            title: 'Product Not Found | Choudhary Perfumes',
            description: 'The requested product could not be found.',
        };
    }

    return {
        title: `${product.name} | Choudhary Perfumes`,
        description: product.description.slice(0, 160) + '...',
        openGraph: {
            title: `${product.name} | Choudhary Perfumes`,
            description: product.description.slice(0, 160) + '...',
            images: [
                {
                    url: product.imageUrl,
                    width: 800,
                    height: 800,
                    alt: product.name,
                },
            ],
            type: 'website',
            siteName: 'Choudhary Perfumes',
        },
        twitter: {
            card: 'summary_large_image',
            title: `${product.name} | Choudhary Perfumes`,
            description: product.description.slice(0, 160) + '...',
            images: [product.imageUrl],
        },
    };
}

export default function ProductLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
