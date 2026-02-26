import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

const SITE_URL = 'https://choudhary-perfumes-git.vercel.app';

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const name = searchParams.get('name') || 'Choudhary Perfumes';
    const brand = searchParams.get('brand') || 'Choudhary Perfumes';
    const price = searchParams.get('price') || '';
    const category = searchParams.get('category') || 'Fragrance';
    const imagePath = searchParams.get('image') || '';

    // Build absolute image URL
    const imageUrl = imagePath.startsWith('http')
        ? imagePath
        : `${SITE_URL}${imagePath}`;

    return new ImageResponse(
        (
            <div
                style={{
                    width: '1200px',
                    height: '630px',
                    display: 'flex',
                    background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1208 50%, #0a0a0a 100%)',
                    fontFamily: 'serif',
                    overflow: 'hidden',
                    position: 'relative',
                }}
            >
                {/* Gold decorative lines */}
                <div style={{
                    position: 'absolute',
                    top: 0, left: 0, right: 0,
                    height: '3px',
                    background: 'linear-gradient(90deg, transparent, #D0AB64, transparent)',
                    display: 'flex',
                }} />
                <div style={{
                    position: 'absolute',
                    bottom: 0, left: 0, right: 0,
                    height: '3px',
                    background: 'linear-gradient(90deg, transparent, #D0AB64, transparent)',
                    display: 'flex',
                }} />

                {/* Left: Product Image */}
                <div style={{
                    width: '500px',
                    height: '630px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '40px',
                    background: 'radial-gradient(ellipse at center, #1e1508 0%, #0a0a0a 70%)',
                    position: 'relative',
                    flexShrink: 0,
                }}>
                    {/* Glow behind product */}
                    <div style={{
                        position: 'absolute',
                        width: '300px',
                        height: '300px',
                        borderRadius: '50%',
                        background: 'radial-gradient(circle, rgba(208,171,100,0.15) 0%, transparent 70%)',
                        display: 'flex',
                    }} />
                    {imageUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                            src={imageUrl}
                            alt={name}
                            style={{
                                width: '420px',
                                height: '420px',
                                objectFit: 'contain',
                                filter: 'drop-shadow(0 20px 60px rgba(208,171,100,0.3))',
                            }}
                        />
                    ) : null}
                </div>

                {/* Vertical divider */}
                <div style={{
                    width: '1px',
                    height: '400px',
                    alignSelf: 'center',
                    background: 'linear-gradient(180deg, transparent, #D0AB64, transparent)',
                    display: 'flex',
                    flexShrink: 0,
                }} />

                {/* Right: Product Info */}
                <div style={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    padding: '60px 60px 60px 56px',
                }}>
                    {/* Category badge */}
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        marginBottom: '20px',
                    }}>
                        <div style={{
                            background: 'rgba(208,171,100,0.15)',
                            border: '1px solid rgba(208,171,100,0.4)',
                            borderRadius: '100px',
                            padding: '6px 20px',
                            display: 'flex',
                        }}>
                            <span style={{
                                color: '#D0AB64',
                                fontSize: '13px',
                                fontFamily: 'sans-serif',
                                letterSpacing: '3px',
                                textTransform: 'uppercase',
                                fontWeight: 600,
                            }}>
                                {category}
                            </span>
                        </div>
                    </div>

                    {/* Product Name */}
                    <div style={{
                        fontSize: '62px',
                        fontWeight: 700,
                        color: '#ffffff',
                        lineHeight: 1.05,
                        marginBottom: '16px',
                        display: 'flex',
                        flexDirection: 'column',
                    }}>
                        {name}
                    </div>

                    {/* Brand */}
                    <div style={{
                        fontSize: '18px',
                        color: 'rgba(255,255,255,0.45)',
                        marginBottom: '32px',
                        fontFamily: 'sans-serif',
                        letterSpacing: '1px',
                        display: 'flex',
                    }}>
                        {brand}
                    </div>

                    {/* Price */}
                    {price && (
                        <div style={{
                            display: 'flex',
                            alignItems: 'baseline',
                            gap: '8px',
                            marginBottom: '40px',
                        }}>
                            <span style={{
                                fontSize: '48px',
                                fontWeight: 800,
                                color: '#D0AB64',
                                display: 'flex',
                            }}>
                                ₹{price}
                            </span>
                            <span style={{
                                fontSize: '16px',
                                color: 'rgba(255,255,255,0.3)',
                                fontFamily: 'sans-serif',
                                display: 'flex',
                            }}>
                                onwards
                            </span>
                        </div>
                    )}

                    {/* Divider */}
                    <div style={{
                        width: '60px',
                        height: '2px',
                        background: '#D0AB64',
                        marginBottom: '28px',
                        display: 'flex',
                    }} />

                    {/* Brand footer */}
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                    }}>
                        <span style={{
                            fontSize: '20px',
                            color: '#D0AB64',
                            fontWeight: 700,
                            letterSpacing: '1px',
                            display: 'flex',
                        }}>
                            CHOUDHARY PERFUMES
                        </span>
                    </div>
                    <div style={{
                        display: 'flex',
                        marginTop: '6px',
                    }}>
                        <span style={{
                            fontSize: '13px',
                            color: 'rgba(255,255,255,0.3)',
                            fontFamily: 'sans-serif',
                            letterSpacing: '2px',
                        }}>
                            choudhary-perfumes-git.vercel.app
                        </span>
                    </div>
                </div>
            </div>
        ),
        {
            width: 1200,
            height: 630,
        }
    );
}
