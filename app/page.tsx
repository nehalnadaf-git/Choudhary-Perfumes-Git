
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import ProductGrid from "@/components/ProductGrid";
import WhatsAppButton from "@/components/WhatsAppButton";
import Link from "next/link";
import { products } from "@/lib/products";
import { FaShieldAlt, FaGem, FaLeaf, FaWhatsapp } from "react-icons/fa";

export default function Home() {
  const featuredProducts = products.filter(p => p.featured).slice(0, 4);

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
    <main className="min-h-screen bg-white">
      <Header />
      <Hero />

      {/* Featured Products */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-black mb-4">Featured Collections</h2>
            <div className="w-24 h-1 bg-gold mx-auto mb-6" />
            <p className="text-gray-600 max-w-2xl mx-auto">
              Handpicked fragrances that define luxury. Explore our most popular attars and designer perfumes.
            </p>
          </div>
          <ProductGrid products={featuredProducts} />
          <div className="text-center mt-12">
            <Link
              href="/products"
              className="inline-block px-8 py-3 border-2 border-black text-black font-semibold rounded-full hover:bg-black hover:text-white transition-all duration-300"
            >
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-black text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-4">Why Choudhary Perfumes?</h2>
            <div className="w-24 h-1 bg-gold mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white/5 p-8 rounded-2xl border border-white/10 hover:border-gold/50 transition-colors duration-300 text-center group">
                <div className="group-hover:scale-110 transition-transform duration-300 inline-block">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-serif font-bold mb-3 text-gold-light">{feature.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Preview */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2 relative bg-gray-100 h-[400px] w-full rounded-2xl overflow-hidden shadow-2xl">
            {/* Image Placeholder */}
            <div className="absolute inset-0 bg-gold/10 flex items-center justify-center text-gold/30 font-serif text-4xl">
              Our Story Image
            </div>
          </div>
          <div className="md:w-1/2">
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-black mb-6">The Choudhary Promise</h2>
            <div className="w-16 h-1 bg-gold mb-8" />
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              We're not just selling fragrances – we're creating experiences. Located in the heart of Hubli, we bridge the gap between traditional Indian perfumery and modern luxury.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              Whether you prefer the timeless depth of a pure Oud Attar or the sophisticated allure of a designer perfume master copy, we guarantee quality in every bottle.
            </p>
            <Link
              href="/about"
              className="text-gold font-bold uppercase tracking-widest hover:text-black transition-colors border-b-2 border-gold pb-1"
            >
              Read Our Story
            </Link>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </main>
  );
}
