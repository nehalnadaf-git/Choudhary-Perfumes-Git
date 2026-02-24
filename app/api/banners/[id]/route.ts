import { NextResponse } from 'next/server';
import { supabaseAdmin as supabase } from '@/lib/supabaseAdmin';

export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const body = await request.json();
        const { id } = await params;

        const { data, error } = await supabase
            .from('banners')
            .update({
                title: body.title,
                subtitle: body.subtitle,
                link: body.link,
                mobile_image_url: body.mobileImageUrl,
                desktop_image_url: body.desktopImageUrl,
                is_active: body.isActive,
                sort_order: body.sortOrder,
                updated_at: new Date().toISOString(),
            })
            .eq('id', id)
            .select()
            .single();

        if (error) {
            console.error('Error updating banner:', error);
            return NextResponse.json({ error: 'Failed to update banner' }, { status: 500 });
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
        });
    } catch (e) {
        console.error('PUT /api/banners/[id] error:', e);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;

        const { error } = await supabase
            .from('banners')
            .delete()
            .eq('id', id);

        if (error) {
            console.error('Error deleting banner:', error);
            return NextResponse.json({ error: 'Failed to delete banner' }, { status: 500 });
        }

        return NextResponse.json({ success: true });
    } catch (e) {
        console.error('DELETE /api/banners/[id] error:', e);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
