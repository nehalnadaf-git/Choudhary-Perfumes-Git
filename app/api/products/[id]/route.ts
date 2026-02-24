import { NextResponse } from 'next/server';
import { supabaseAdmin as supabase } from '@/lib/supabaseAdmin';

export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const body = await request.json();
        const { id } = await params;

        // Always sanitize slug
        const rawSlug = body.slug || body.name;
        const slug = rawSlug.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

        const { data: updatedProduct, error: productError } = await supabase
            .from('products')
            .update({
                name: body.name,
                brand: body.brand,
                slug: slug,
                price: body.price,
                category: body.category,
                gender: body.gender,
                image_url: body.imageUrl,
                description: body.description,
                in_stock: body.inStock,
                featured: body.featured,
                updated_at: new Date().toISOString()
            })
            .eq('id', id)
            .select()
            .single();

        if (productError) {
            console.error('Error updating product:', productError);
            return NextResponse.json({ error: 'Failed to update product' }, { status: 500 });
        }

        // 2. Update volumes
        // Simplest approach for volumes: delete existing and re-insert
        if (body.volumes) {
            // Delete old
            await supabase.from('volumes').delete().eq('product_id', id);

            // Insert new
            if (body.volumes.length > 0) {
                const volumeInserts = body.volumes.map((v: any) => ({
                    product_id: id,
                    volume: v.volume,
                    price: v.price
                }));
                await supabase.from('volumes').insert(volumeInserts);
            }
        }

        return NextResponse.json({ ...body, id });
    } catch (e) {
        console.error('PUT /api/products/[id] error:', e);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;

        // The volumes table should have ON DELETE CASCADE setup in the DB, 
        // but just in case, we can manually delete from volumes first or let cascade handle it.
        const { error } = await supabase.from('products').delete().eq('id', id);

        if (error) {
            console.error('Error deleting product:', error);
            return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 });
        }

        return NextResponse.json({ success: true });
    } catch (e) {
        console.error('DELETE /api/products/[id] error:', e);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
