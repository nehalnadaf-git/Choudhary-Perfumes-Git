
"use client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { FaStar, FaQuoteLeft, FaWhatsapp } from "react-icons/fa";

const reviews = [
    {
        name: "Farhan Khan",
        rating: 5,
        date: "January 15, 2026",
        product: "Oud Attar",
        text: "Absolutely love the Oud Attar! The fragrance is rich, authentic, and lasts the entire day. Ordering through WhatsApp was super easy - got my delivery the very next day in Hubli."
    },
    {
        name: "Imran Ahmed",
        rating: 5,
        date: "January 8, 2026",
        product: "Dior Homme Intense EDP",
        text: "I was skeptical about master copies, but Choudhary Perfumes completely changed my mind! Smells exactly like the original. Saved thousands while still smelling like a million bucks."
    },
    {
        name: "Asif Shaikh",
        rating: 5,
        date: "December 28, 2025",
        product: "Dolce & Gabbana Devotion Parfum",
        text: "This perfume is absolutely divine! The sweet vanilla scent is so addictive. The WhatsApp ordering process is brilliant - no hassle, just quick replies and fast delivery."
    },
    {
        name: "Mohammed Rizwan",
        rating: 5,
        date: "December 20, 2025",
        product: "Mystic Amber Oudh",
        text: "Mystic Amber Oudh is a MASTERPIECE! I'm blown away by this fragrance. Got so many compliments at a wedding. Better than most designer brands."
    },
    {
        name: "Zakir Hussain",
        rating: 4,
        date: "December 12, 2025",
        product: "YSL Libre Le Parfum",
        text: "Very good perfume with great longevity. Lasts around 8 hours on my skin. Only giving 4 stars because the projection could be slightly stronger initially, but excellent value."
    },
    {
        name: "Arif Patel",
        rating: 5,
        date: "November 30, 2025",
        product: "1 Million Parfum",
        text: "BEST PURCHASE EVER! This 1 Million Parfum is a beast - lasts 10+ hours easily. Choudhary Perfumes is the real deal. Already recommended to 5 friends!"
    }
];

export default function ReviewsPage() {
    return (
        <main className="min-h-screen bg-gray-50">
            <Header />

            <div className="bg-black text-white pt-32 pb-16 px-4">
                <div className="container mx-auto text-center">
                    <h1 className="text-4xl md:text-6xl font-serif font-bold mb-4">Customer Reviews</h1>
                    <div className="flex items-center justify-center gap-2 text-gold text-xl mb-4">
                        <FaStar /> <FaStar /> <FaStar /> <FaStar /> <FaStar />
                        <span className="text-white text-lg font-sans ml-2">(4.8/5.0 Average Rating)</span>
                    </div>
                    <p className="text-gray-400">See what our community in Hubli is saying about their fragrance journey.</p>
                </div>
            </div>

            <section className="py-16 container mx-auto px-4">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {reviews.map((review, i) => (
                        <div key={i} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-gold-sm transition-shadow">
                            <div className="flex justify-between items-start mb-6">
                                <div className="flex text-gold">
                                    {[...Array(5)].map((_, stars) => (
                                        <FaStar key={stars} className={stars < review.rating ? "text-gold" : "text-gray-300"} />
                                    ))}
                                </div>
                                <FaQuoteLeft className="text-gray-200 text-3xl" />
                            </div>
                            <p className="text-gray-700 italic mb-6 leading-relaxed">"{review.text}"</p>

                            <div className="border-t border-gray-100 pt-4">
                                <h4 className="font-bold text-black">{review.name}</h4>
                                <div className="flex justify-between text-xs text-gray-500 mt-1">
                                    <span>{review.product}</span>
                                    <span>{review.date}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-16 text-center bg-white p-12 rounded-2xl shadow-sm border border-gray-100 max-w-4xl mx-auto">
                    <h3 className="text-2xl font-serif font-bold mb-4">Have you purchased from us?</h3>
                    <p className="text-gray-600 mb-8">We'd love to hear about your experience! Share your review on WhatsApp.</p>
                    <a
                        href="https://wa.me/916363278962?text=I%20want%20to%20submit%20a%20review!"
                        className="bg-green-500 text-white px-8 py-3 rounded-full font-bold hover:bg-green-600 transition-colors inline-flex items-center gap-2 shadow-lg hover:shadow-xl"
                    >
                        <FaWhatsapp size={20} /> Write a Review
                    </a>
                </div>
            </section>

            <Footer />
            <WhatsAppButton />
        </main>
    );
}
