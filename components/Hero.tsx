"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

interface Banner {
    id: string;
    title: string;
    subtitle: string;
    link: string;
    mobileImageUrl: string;
    desktopImageUrl: string;
    isActive: boolean;
    sortOrder: number;
}

const Hero = () => {
    const [banners, setBanners] = useState<Banner[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        fetch('/api/banners')
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) {
                    const active = data.filter((b: Banner) => b.isActive);
                    setBanners(active);
                }
                setLoaded(true);
            })
            .catch(() => setLoaded(true));
    }, []);

    // Auto-rotate banners if more than one
    useEffect(() => {
        if (banners.length <= 1) return;
        const interval = setInterval(() => {
            setCurrentIndex(prev => (prev + 1) % banners.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [banners.length]);

    // Fallback to static banner if no banners from DB
    if (!loaded) {
        return (
            <section className="relative w-full">
                <div className="w-full">
                    <div className="block md:hidden w-full">
                        <Image
                            src="/images/Banner/Mobile/Mobile Banner.png"
                            alt="Choudhary Perfumes Mobile Banner"
                            width={1080}
                            height={1920}
                            className="w-full h-auto block"
                            quality={100}
                            priority
                        />
                    </div>
                    <div className="hidden md:block w-full">
                        <Image
                            src="/images/Banner/Web/Web Banner.jpg"
                            alt="Choudhary Perfumes Web Banner"
                            width={1920}
                            height={1080}
                            className="w-full h-auto block"
                            quality={100}
                            priority
                            sizes="100vw"
                            unoptimized
                        />
                    </div>
                </div>
            </section>
        );
    }

    if (banners.length === 0) {
        // Fallback to static banners if none configured
        return (
            <section className="relative w-full">
                <div className="w-full">
                    <div className="block md:hidden w-full">
                        <Image
                            src="/images/Banner/Mobile/Mobile Banner.png"
                            alt="Choudhary Perfumes Mobile Banner"
                            width={1080}
                            height={1920}
                            className="w-full h-auto block"
                            quality={100}
                            priority
                        />
                    </div>
                    <div className="hidden md:block w-full">
                        <Image
                            src="/images/Banner/Web/Web Banner.jpg"
                            alt="Choudhary Perfumes Web Banner"
                            width={1920}
                            height={1080}
                            className="w-full h-auto block"
                            quality={100}
                            priority
                            sizes="100vw"
                            unoptimized
                        />
                    </div>
                </div>
            </section>
        );
    }

    const banner = banners[currentIndex];

    return (
        <section className="relative w-full">
            <div className="w-full relative">
                {/* Mobile Banner */}
                <div className="block md:hidden w-full">
                    {banner.link ? (
                        <a href={banner.link}>
                            <Image
                                src={banner.mobileImageUrl}
                                alt={banner.title || "Choudhary Perfumes Banner"}
                                width={1080}
                                height={1920}
                                className="w-full h-auto block"
                                quality={100}
                                priority
                            />
                        </a>
                    ) : (
                        <Image
                            src={banner.mobileImageUrl}
                            alt={banner.title || "Choudhary Perfumes Banner"}
                            width={1080}
                            height={1920}
                            className="w-full h-auto block"
                            quality={100}
                            priority
                        />
                    )}
                </div>

                {/* Desktop/Web Banner */}
                <div className="hidden md:block w-full">
                    {banner.link ? (
                        <a href={banner.link}>
                            <Image
                                src={banner.desktopImageUrl}
                                alt={banner.title || "Choudhary Perfumes Banner"}
                                width={1920}
                                height={1080}
                                className="w-full h-auto block"
                                quality={100}
                                priority
                                sizes="100vw"
                                unoptimized
                            />
                        </a>
                    ) : (
                        <Image
                            src={banner.desktopImageUrl}
                            alt={banner.title || "Choudhary Perfumes Banner"}
                            width={1920}
                            height={1080}
                            className="w-full h-auto block"
                            quality={100}
                            priority
                            sizes="100vw"
                            unoptimized
                        />
                    )}
                </div>

                {/* Dots indicator for multiple banners */}
                {banners.length > 1 && (
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 z-10">
                        {banners.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => setCurrentIndex(idx)}
                                className={`rounded-full transition-all duration-300 ${idx === currentIndex
                                    ? 'w-6 h-2 bg-white shadow-lg'
                                    : 'w-2 h-2 bg-white/50 hover:bg-white/70'
                                    }`}
                                aria-label={`Go to banner ${idx + 1}`}
                            />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default Hero;
