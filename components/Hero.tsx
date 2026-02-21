"use client";

import Image from "next/image";

const Hero = () => {
    return (
        <section className="relative w-full">

            {/* Banner Images */}
            <div className="w-full">
                {/* Mobile Banner */}
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

                {/* Desktop/Web Banner */}
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
};

export default Hero;
