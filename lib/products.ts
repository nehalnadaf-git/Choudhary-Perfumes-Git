import { Product } from './types';
import { supabase } from './supabaseClient';

export async function getProducts(): Promise<Product[]> {
    // Determine the base URL dynamically based on environment
    // For server components, we can just call our own API route or use Supabase directly.
    // Using Supabase directly is faster for Server Components.
    const { data: products, error } = await supabase
        .from('products')
        .select('*, volumes(*)');

    if (error) {
        if (error.code === '42P01') {
            return []; // Table not found, graceful fallback
        }
        console.error('Error fetching products in lib/products.ts:', error);
        return [];
    }

    // Map Supabase snake_case to frontend camelCase expected by Product type
    return products.map(p => ({
        id: p.id,
        name: p.name,
        brand: p.brand,
        slug: p.slug,
        price: p.price,
        category: p.category,
        volume: p.category === 'attar' ? '12ml' : '100ml',
        gender: p.gender,
        imageUrl: p.image_url,
        description: p.description,
        inStock: p.in_stock,
        featured: p.featured,
        volumes: p.volumes?.map((v: any) => ({
            id: v.id,
            volume: v.volume,
            price: v.price
        })) || []
    }));
}

// Keep a static fallback for pages that haven't been migrated to async yet if they crash
export const products: Product[] = []; 
