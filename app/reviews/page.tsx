
"use client";
import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { FaStar, FaQuoteLeft } from "react-icons/fa";
import { motion } from "framer-motion";

const staticReviews = [
    {
        name: "Farhan Khan",
        rating: 5,
        date: "2026-01-15",
        product_slug: "oud-attar",
        comment: "Absolutely love the Oud Attar! The fragrance is rich, authentic, and lasts the entire day. Ordering through WhatsApp was super easy - got my delivery the very next day in Hubli."
    },
    {
        name: "Imran Ahmed",
        rating: 5,
        date: "2026-01-08",
        product_slug: "dior-homme-intense-edp",
        comment: "I was skeptical about master copies, but Choudhary Perfumes completely changed my mind! Smells exactly like the original. Saved thousands while still smelling like a million bucks."
    },
    {
        name: "Asif Shaikh",
        rating: 5,
        date: "2025-12-28",
        product_slug: "dolce-and-gabbana-devotion-parfum",
        comment: "This perfume is absolutely divine! The sweet vanilla scent is so addictive. The WhatsApp ordering process is brilliant - no hassle, just quick replies and fast delivery."
    },
    {
        name: "Mohammed Rizwan",
        rating: 5,
        date: "2025-12-20",
        product_slug: "mystic-amber-oudh",
        comment: "Mystic Amber Oudh is a MASTERPIECE! I'm blown away by this fragrance. Got so many compliments at a wedding. Better than most designer brands."
    },
    {
        name: "Zakir Hussain",
        rating: 4,
        date: "2025-12-12",
        product_slug: "ysl-libre-le-parfum",
        comment: "Very good perfume with great longevity. Lasts around 8 hours on my skin. Only giving 4 stars because the projection could be slightly stronger initially, but excellent value."
    },
    {
        name: "Arif Patel",
        rating: 5,
        date: "2025-11-30",
        product_slug: "1-million-parfum",
        comment: "BEST PURCHASE EVER! This 1 Million Parfum is a beast - lasts 10+ hours easily. Choudhary Perfumes is the real deal. Already recommended to 5 friends!"
    }
];

export default function ReviewsPage() {
    const [dynamicReviews, setDynamicReviews] = useState<any[]>([]);

    useEffect(() => {
        const fetchAllReviews = async () => {
            try {
                const res = await fetch('/api/reviews');
                if (res.ok) {
                    const data = await res.json();
                    setDynamicReviews(data);
                }
            } catch (err) {
                console.error('Failed to fetch reviews:', err);
            }
        };
        fetchAllReviews();
    }, []);

    // Merge and sort reviews
    const allReviews = [
        ...dynamicReviews.map(r => ({
            name: r.customer_name,
            rating: r.rating,
            date: r.created_at,
            product: r.product_slug.replace(/-/g, ' ').toUpperCase(),
            text: r.comment
        })),
        ...staticReviews.map(r => ({
            name: r.name,
            rating: r.rating,
            date: r.date,
            product: r.product_slug.replace(/-/g, ' ').toUpperCase(),
            text: r.comment
        }))
    ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

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
                    <p className="text-gray-400">See what our community is saying about their fragrance journey.</p>
                </div>
            </div>

            <section className="py-16 container mx-auto px-4">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {allReviews.map((review, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.05 }}
                            className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-gold-sm transition-shadow flex flex-col"
                        >
                            <div className="flex justify-between items-start mb-6">
                                <div className="flex text-gold">
                                    {[...Array(5)].map((_, stars) => (
                                        <FaStar key={stars} className={stars < review.rating ? "text-gold" : "text-gray-300"} />
                                    ))}
                                </div>
                                <FaQuoteLeft className="text-gray-200 text-3xl" />
                            </div>
                            <p className="text-gray-700 italic mb-6 leading-relaxed flex-1">"{review.text}"</p>

                            <div className="border-t border-gray-100 pt-4">
                                <h4 className="font-bold text-black">{review.name}</h4>
                                <div className="flex justify-between text-[10px] text-gray-500 mt-1 uppercase tracking-widest font-bold">
                                    <span className="text-gold">{review.product}</span>
                                    <span>{new Date(review.date).toLocaleDateString()}</span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-16 text-center bg-white p-12 rounded-2xl shadow-sm border border-gray-100 max-w-4xl mx-auto">
                    <h3 className="text-2xl font-serif font-bold mb-4">Want to share your experience?</h3>
                    <p className="text-gray-600 mb-8">Go to any product page and click "Write a Review" to share your thoughts with the community!</p>
                </div>
            </section>

            <Footer />
        </main>
    );
}
