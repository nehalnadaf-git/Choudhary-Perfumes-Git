import { NextResponse } from 'next/server';
import { supabaseAdmin as supabase } from '@/lib/supabaseAdmin';

export async function GET() {
    try {
        const { data: banners, error } = await supabase
            .from('banners')
            .select('*')
            .order('sort_order', { ascending: true })
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Error fetching banners:', error);
            if (error.code === '42P01') {
                return NextResponse.json([]);
            }
            return NextResponse.json({ error: 'Failed to fetch banners' }, { status: 500 });
        }

        // Map to camelCase for frontend
        const formatted = (banners || []).map(b => ({
            id: b.id,
            title: b.title,
            subtitle: b.subtitle,
            link: b.link,
            mobileImageUrl: b.mobile_image_url,
            desktopImageUrl: b.desktop_image_url,
            isActive: b.is_active,
            sortOrder: b.sort_order,
            createdAt: b.created_at,
        }));

        return NextResponse.json(formatted);
    } catch (e) {
        console.error('GET /api/banners error:', e);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();

        if (!body.mobileImageUrl || !body.desktopImageUrl) {
            return NextResponse.json({ error: 'Both mobile and desktop banner images are required' }, { status: 400 });
        }

        const { data, error } = await supabase
            .from('banners')
            .insert({
                title: body.title || '',
                subtitle: body.subtitle || '',
                link: body.link || '',
                mobile_image_url: body.mobileImageUrl,
                desktop_image_url: body.desktopImageUrl,
                is_active: body.isActive ?? true,
                sort_order: body.sortOrder ?? 0,
            })
            .select()
            .single();

        if (error) {
            console.error('Error creating banner:', error);
            return NextResponse.json({ error: 'Failed to create banner' }, { status: 500 });
        }

        return NextResponse.json({
            id: data.id,
            title: data.title,
            subtitle: data.subtitle,
            link: data.link,
            mobileImageUrl: data.mobile_image_url,
            desktopImageUrl: data.desktop_image_url,
            isActive: data.is_active,
            sortOrder: data.sort_order,
        }, { status: 201 });
    } catch (e) {
        console.error('POST /api/banners error:', e);
        return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
    }
}
