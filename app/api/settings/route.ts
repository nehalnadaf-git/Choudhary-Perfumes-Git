import { NextResponse } from 'next/server';
import { supabaseAdmin as supabase } from '@/lib/supabaseAdmin';

// GET: Fetch a setting by key (e.g., ?key=whatsapp_number)
export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const key = searchParams.get('key');

    try {
        if (key) {
            const { data, error } = await supabase
                .from('settings')
                .select('value')
                .eq('key', key)
                .single();

            if (error) {
                // Return a default for whatsapp_number if not found
                if (key === 'whatsapp_number') {
                    return NextResponse.json({ key, value: '916363278962' });
                }
                return NextResponse.json({ error: 'Setting not found' }, { status: 404 });
            }
            return NextResponse.json({ key, value: data.value });
        }

        // Return all settings
        const { data, error } = await supabase
            .from('settings')
            .select('*');

        if (error) {
            console.error('Error fetching settings:', error);
            return NextResponse.json({ error: 'Failed to fetch settings' }, { status: 500 });
        }
        return NextResponse.json(data);
    } catch (e) {
        console.error('Settings GET error:', e);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

// PUT: Update or insert a setting
export async function PUT(request: Request) {
    try {
        const body = await request.json();
        const { key, value } = body;

        if (!key || value === undefined) {
            return NextResponse.json({ error: 'Key and value are required' }, { status: 400 });
        }

        const { data, error } = await supabase
            .from('settings')
            .upsert({ key, value, updated_at: new Date().toISOString() }, { onConflict: 'key' })
            .select()
            .single();

        if (error) {
            console.error('Error updating setting:', error);
            return NextResponse.json({ error: 'Failed to update setting' }, { status: 500 });
        }

        return NextResponse.json(data);
    } catch (e) {
        console.error('Settings PUT error:', e);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
