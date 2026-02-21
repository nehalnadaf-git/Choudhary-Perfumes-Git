
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import CategoryCards from "@/components/CategoryCards";
import BestSellers from "@/components/BestSellers";

import Link from "next/link";
import Image from "next/image";
import { getProducts } from "@/lib/products";
import { FaShieldAlt, FaGem, FaLeaf, FaWhatsapp } from "react-icons/fa";

export default async function Home() {
  const products = await getProducts();
  const bestSellers = [
    products.find(p => p.slug === "mystic-amber-oudh"),
    products.find(p => p.slug === "dior-homme-intense-edp"),
    products.find(p => p.slug === "sandal-attar"),
    products.find(p => p.slug === "oud-attar"),
  ].filter(Boolean);

  const features = [
    {
      icon: <FaShieldAlt className="text-4xl text-gold mb-4" />,
      title: "Premium Quality Guaranteed",
      description: "Strict quality control for all our attars and master copies."
    },
    {
      icon: <FaGem className="text-4xl text-gold mb-4" />,
      title: "Affordable Luxury",
      description: "90% of the designer experience at 30% of the cost."
    },
    {
      icon: <FaLeaf className="text-4xl text-gold mb-4" />,
      title: "Authentic Attars",
      description: "100% pure, alcohol-free traditional fragrance oils."
    },
    {
      icon: <FaWhatsapp className="text-4xl text-gold mb-4" />,
      title: "Easy WhatsApp Ordering",
      description: "Personalized service and quick delivery via WhatsApp."
    }
  ];

  return (
    <main className="min-h-screen bg-white overflow-x-hidden">
      <Header />
      <Hero />

      {/* ─── Shop by Category ─── */}
      <section className="relative pt-12 md:pt-16 pb-16 md:pb-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 md:mb-16">
            <p className="text-gold text-xs font-semibold tracking-[0.25em] uppercase mb-4">Explore Our Collections</p>
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-black mb-5">Shop by Category</h2>
            <div className="w-20 h-[2px] bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mb-6" />
            <p className="text-gray-500 max-w-2xl mx-auto leading-relaxed">
              Choose from our curated collection of pure traditional attars or premium designer perfume master copies.
            </p>
          </div>
          <CategoryCards />
        </div>
      </section>

      {/* ─── Best Sellers ─── */}
      <section className="py-16 md:py-24 bg-white relative">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, black 1px, transparent 0)', backgroundSize: '40px 40px' }} />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12 md:mb-16">
            <p className="text-gold text-xs font-semibold tracking-[0.25em] uppercase mb-4">Most Popular</p>
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-black mb-5">Best Sellers</h2>
            <div className="w-20 h-[2px] bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mb-6" />
            <p className="text-gray-500 max-w-2xl mx-auto leading-relaxed">
              Loved by our customers. These are the fragrances everyone&apos;s talking about.
            </p>
          </div>
          <BestSellers products={bestSellers as any} />
          <div className="text-center mt-12">
            <Link
              href="/products"
              className="inline-block px-10 py-3.5 border-2 border-black text-black font-semibold rounded-full hover:bg-gold hover:border-gold hover:text-black transition-all duration-300 hover:shadow-gold-md"
            >
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Why Choose Us ─── */}
      <section className="py-16 md:py-24 bg-black text-white relative overflow-hidden">
        {/* Decorative glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gold/5 rounded-full blur-3xl pointer-events-none" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <p className="text-gold text-xs font-semibold tracking-[0.25em] uppercase mb-4">Our Promise</p>
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-5">Why Choudhary Perfumes?</h2>
            <div className="w-20 h-[2px] bg-gradient-to-r from-transparent via-gold to-transparent mx-auto" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white/5 p-6 md:p-8 rounded-2xl border border-white/10 hover:border-gold/50 hover:bg-white/[0.08] transition-all duration-300 text-center group">
                <div className="group-hover:scale-110 transition-transform duration-300 inline-block">
                  {feature.icon}
                </div>
                <h3 className="text-base md:text-xl font-serif font-bold mb-2 md:mb-3 text-gold-light">{feature.title}</h3>
                <p className="text-gray-400 text-xs md:text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── About Preview ─── */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
        {/* Decorative accent */}
        <div className="absolute top-24 right-0 w-64 h-64 bg-gold/5 rounded-full blur-3xl pointer-events-none" />
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-10 md:gap-16 relative z-10">
          <div className="md:w-1/2 relative h-[300px] md:h-[450px] w-full rounded-2xl overflow-hidden shadow-2xl bg-black">
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-black via-black-charcoal to-black" />
            {/* Subtle gold radial glow */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(208,171,100,0.12)_0%,_transparent_65%)]" />
            {/* Border accent */}
            <div className="absolute inset-4 md:inset-6 border border-gold/20 rounded-xl pointer-events-none" />
            {/* Logo + Brand */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="relative w-24 h-24 md:w-32 md:h-32 mb-6">
                <Image
                  src="/images/favicon/logo.png"
                  alt="Choudhary Perfumes Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <h3 className="text-2xl md:text-3xl font-serif font-bold text-gold tracking-wider">CHOUDHARY</h3>
              <span className="text-[10px] md:text-xs font-sans tracking-[0.4em] text-white/50 mt-1">PERFUMES</span>
              <div className="w-12 h-px bg-gold/30 mt-5" />
              <p className="text-white/30 text-xs md:text-sm mt-4 tracking-widest uppercase">Est. Hubli</p>
            </div>
          </div>
          <div className="md:w-1/2">
            <p className="text-gold text-xs font-semibold tracking-[0.25em] uppercase mb-4">The Choudhary Story</p>
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-black mb-6">The Choudhary Promise</h2>
            <div className="w-16 h-[2px] bg-gold mb-8" />
            <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-6">
              We&apos;re not just selling fragrances – we&apos;re creating experiences. Located in the heart of Hubli, we bridge the gap between traditional Indian perfumery and modern luxury.
            </p>
            <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-8">
              Whether you prefer the timeless depth of a pure Oud Attar or the sophisticated allure of a designer perfume master copy, we guarantee quality in every bottle.
            </p>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 bg-black text-white px-8 py-3.5 rounded-full font-medium hover:bg-gold hover:text-black transition-all duration-300 shadow-lg hover:shadow-gold-md"
            >
              Read Our Story
              <span>→</span>
            </Link>
          </div>
        </div>
      </section>

      <Footer />

    </main>
  );
}
