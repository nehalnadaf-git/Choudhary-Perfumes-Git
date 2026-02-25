import { NextResponse } from 'next/server';
import { supabaseAdmin as supabase } from '@/lib/supabaseAdmin';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug');

    try {
        let query = supabase
            .from('reviews')
            .select('*')
            .order('created_at', { ascending: false });

        if (slug) {
            query = query.eq('product_slug', slug);
        }

        const { data: reviews, error } = await query;

        if (error) {
            console.error('Error fetching reviews:', error);
            return NextResponse.json({ error: 'Failed to fetch reviews' }, { status: 500 });
        }

        return NextResponse.json(reviews);
    } catch (e) {
        console.error('API /api/reviews GET error:', e);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { product_slug, customer_name, rating, comment, avatar_color } = body;

        if (!product_slug || !customer_name || !rating || !comment) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const { data, error } = await supabase
            .from('reviews')
            .insert({
                product_slug,
                customer_name,
                rating,
                comment,
                avatar_color: avatar_color || '#D0AB64',
                verified: false
            })
            .select()
            .single();

        if (error) {
            console.error('Error inserting review:', error);
            return NextResponse.json({ error: 'Failed to submit review' }, { status: 500 });
        }

        return NextResponse.json(data, { status: 201 });
    } catch (e) {
        console.error('API /api/reviews POST error:', e);
        return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
    }
}

export async function DELETE(request: Request) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
        return NextResponse.json({ error: 'Review ID is required' }, { status: 400 });
    }

    try {
        const { error } = await supabase
            .from('reviews')
            .delete()
            .eq('id', id);

        if (error) {
            console.error('Error deleting review:', error);
            return NextResponse.json({ error: 'Failed to delete review' }, { status: 500 });
        }

        return NextResponse.json({ message: 'Review deleted successfully' });
    } catch (e) {
        console.error('API /api/reviews DELETE error:', e);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

