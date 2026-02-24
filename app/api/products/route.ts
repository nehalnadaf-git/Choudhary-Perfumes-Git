import { NextResponse } from 'next/server';
import { supabaseAdmin as supabase } from '@/lib/supabaseAdmin';

export async function GET() {
    try {
        const { data: products, error } = await supabase
            .from('products')
            .select('*, volumes(*)');

        if (error) {
            console.error('Error fetching products:', error);
            // Fallback empty array since user may not have created tables yet
            if (error.code === '42P01') {
                return NextResponse.json([]);
            }
            return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
        }

        // Map Supabase snake_case to frontend camelCase expected by Product type
        const formattedProducts = products.map(p => ({
            id: p.id,
            name: p.name,
            brand: p.brand,
            slug: p.slug,
            price: p.price,
            category: p.category,
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

        return NextResponse.json(formattedProducts);
    } catch (e) {
        console.error('GET /api/products error:', e);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();

        // Basic validation
        if (!body.name || !body.price || !body.category) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        // Always sanitize slug - generate from name if missing, sanitize if provided
        const rawSlug = body.slug || body.name;
        const slug = rawSlug.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

        // 1. Insert product
        const { data: insertedProduct, error: productError } = await supabase
            .from('products')
            .insert({
                name: body.name,
                brand: body.brand,
                slug: slug,
                price: body.price,
                category: body.category,
                gender: body.gender || 'unisex',
                image_url: body.imageUrl || '/images/placeholder.png',
                description: body.description || '',
                in_stock: body.inStock ?? true,
                featured: body.featured ?? false
            })
            .select()
            .single();

        if (productError) {
            console.error('Error inserting product:', productError);
            return NextResponse.json({ error: 'Failed to create product' }, { status: 500 });
        }

        // 2. Insert volumes if any
        if (body.volumes && body.volumes.length > 0) {
            const volumeInserts = body.volumes.map((v: any) => ({
                product_id: insertedProduct.id,
                volume: v.volume,
                price: v.price
            }));

            const { error: volumeError } = await supabase
                .from('volumes')
                .insert(volumeInserts);

            if (volumeError) {
                console.error('Error inserting volumes:', volumeError);
            }
        }

        // Return inserted product with identical structure
        return NextResponse.json({ ...body, id: insertedProduct.id, slug: slug }, { status: 201 });
    } catch (e) {
        console.error('POST /api/products error:', e);
        return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
    }
}
