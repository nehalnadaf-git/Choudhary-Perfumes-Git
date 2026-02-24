import { Product } from './types';

function resolveProductsEndpoint() {
    // In the browser, a relative URL works. On the server we need an absolute URL.
    if (typeof window !== 'undefined') return '/api/products';
    const base = process.env.NEXT_PUBLIC_SITE_URL
        || process.env.SITE_URL
        || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000');
    return `${base.replace(/\/$/, '')}/api/products`;
}

function normalizeProduct(p: any): Product {
    return {
        id: p.id,
        name: p.name,
        brand: p.brand || '',
        slug: p.slug,
        price: p.price ?? 0,
        category: p.category,
        volume: p.volume || (p.category === 'attar' ? '12ml' : '100ml'),
        gender: p.gender || 'unisex',
        imageUrl: p.imageUrl || p.image_url,
        description: p.description || '',
        inStock: p.inStock ?? p.in_stock ?? false,
        featured: p.featured ?? false,
        volumes: p.volumes?.map((v: any) => ({
            id: v.id,
            volume: v.volume,
            price: v.price
        })) || []
    };
}

export async function getProducts(): Promise<Product[]> {
    try {
        const res = await fetch(resolveProductsEndpoint(), { cache: 'no-store' });
        if (!res.ok) {
            console.error('Error fetching products:', res.statusText);
            return [];
        }

        const data = await res.json();
        if (!Array.isArray(data)) return [];

        return data.map(normalizeProduct);
    } catch (error) {
        console.error('Error fetching products in lib/products.ts:', error);
        return [];
    }
}

// Keep a static fallback for pages that haven't been migrated to async yet if they crash
export const products: Product[] = []; 
