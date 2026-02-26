
"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getProducts } from "@/lib/products";
import { Product } from "@/lib/types";
import { productReviews } from "@/lib/reviews";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useCart } from "@/context/CartContext";
import { useSettings } from "@/context/SettingsContext";
import ReviewForm from "@/components/ReviewForm";
import { FiPlus, FiMinus, FiShoppingBag, FiArrowLeft } from "react-icons/fi";
import { FaWhatsapp, FaStar } from "react-icons/fa";
import { HiCheckBadge } from "react-icons/hi2";
import { motion } from "framer-motion";

export default function ProductDetailClient() {
    const { slug } = useParams();
    const router = useRouter();
    const { addToCart } = useCart();
    const { whatsappNumber } = useSettings();
    const [quantity, setQuantity] = useState(1);
    const [selectedVolumeIndex, setSelectedVolumeIndex] = useState(0);
    const [product, setProduct] = useState<Product | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [reviews, setReviews] = useState<any[]>([]);
    const [showReviewForm, setShowReviewForm] = useState(false);
    const [submissionSuccess, setSubmissionSuccess] = useState(false);

    const fetchReviews = async () => {
        if (!slug) return;
        try {
            const res = await fetch(`/api/reviews?slug=${slug}`);
            if (res.ok) {
                const data = await res.json();
                setReviews(data);
            }
        } catch (err) {
            console.error('Failed to fetch reviews:', err);
        }
    };

    useEffect(() => {
        getProducts().then(allProducts => {
            const found = allProducts.find((p) => p.slug === slug);
            setProduct(found || null);
            setIsLoading(false);
        });
        fetchReviews();
    }, [slug]);

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <div className="w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-gray-400 text-sm">Loading fragrance details...</p>
                </div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
                <h1 className="text-4xl font-serif font-bold mb-4">Product Not Found</h1>
                <p className="text-gray-500 mb-8">The fragrance you are looking for does not exist.</p>
                <Link href="/products" className="bg-black text-white px-6 py-3 rounded-full hover:bg-gold transition-colors">
                    Back to Collection
                </Link>
            </div>
        );
    }

    const hasVolumes = product.volumes && product.volumes.length > 0;

    // Current display price & volume
    const currentPrice = hasVolumes
        ? product.volumes![selectedVolumeIndex].price
        : product.price;
    const currentVolume = hasVolumes
        ? product.volumes![selectedVolumeIndex].volume
        : product.volume;

    const handleAddToCart = () => {
        const cartProduct = hasVolumes
            ? {
                ...product,
                id: `${product.id}-${currentVolume}`,
                price: currentPrice,
                volume: currentVolume,
            }
            : product;

        for (let i = 0; i < quantity; i++) {
            addToCart(cartProduct);
        }
    };

    const message = `Hi Choudhary Perfumes!\n\nI would like to order:\n\n1. ${product.name} (${currentVolume}) (x${quantity}) - ₹${currentPrice * quantity}\n\nTotal Order Value: ₹${currentPrice * quantity}\n\nPlease confirm availability and delivery details. Thanks!`;
    const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

    return (
        <main className="min-h-screen bg-white">
            <Header />

            {/* Header Background & Back Button */}
            <div className="bg-black pt-32 pb-12 px-4">
                <div className="container mx-auto">
                    <button
                        onClick={() => router.back()}
                        className="flex items-center gap-2 text-gray-400 hover:text-gold transition-colors"
                    >
                        <FiArrowLeft /> Back to Products
                    </button>
                </div>
            </div>

            <div className="py-8 md:py-12 container mx-auto px-4">

                <div className="grid md:grid-cols-2 gap-8 md:gap-12 lg:gap-20 items-start">
                    {/* Image Gallery */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="relative bg-gradient-to-b from-gray-50 to-white rounded-2xl overflow-hidden aspect-square border border-gray-100"
                    >
                        <Image
                            src={product.imageUrl}
                            alt={product.name}
                            fill
                            className="object-cover"
                            priority
                        />
                        {product.featured && (
                            <span className="absolute top-5 left-5 md:top-6 md:left-6 bg-black/60 backdrop-blur-md text-gold px-4 py-1.5 text-xs md:text-sm font-bold uppercase tracking-widest rounded-full border border-gold/20 shadow-sm">
                                ★ Best Seller
                            </span>
                        )}
                    </motion.div>

                    {/* Product Info */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <p className="text-gold font-bold tracking-widest uppercase mb-2 text-xs md:text-sm">{product.brand}</p>
                        <h1 className="text-3xl md:text-5xl font-serif font-bold text-black mb-4">{product.name}</h1>

                        <div className="flex items-center flex-wrap gap-3 mb-5">
                            <span className="text-2xl md:text-3xl font-bold text-black">₹{currentPrice}</span>
                            <span className="text-lg md:text-xl text-gray-300 line-through">₹{Math.round(currentPrice * 1.3)}</span>
                        </div>

                        <div className="flex items-center gap-1 text-gold mb-6">
                            <FaStar size={14} /><FaStar size={14} /><FaStar size={14} /><FaStar size={14} /><FaStar size={14} />
                            <span className="text-gray-400 text-xs md:text-sm ml-2">(4.9/5 based on customer reviews)</span>
                        </div>

                        <p className="text-gray-500 leading-relaxed mb-8 text-sm md:text-base font-light">
                            {product.description}
                        </p>

                        {/* Volume Selector — Only for Attars (3 Options) */}
                        {hasVolumes && (
                            <div className="mb-8">
                                <h3 className="font-semibold text-xs md:text-sm text-gray-500 mb-3 uppercase tracking-[0.15em]">Select Size</h3>
                                <div className="grid grid-cols-3 gap-2 md:gap-3">
                                    {product.volumes!.map((vol, idx) => (
                                        <button
                                            key={vol.volume}
                                            onClick={() => setSelectedVolumeIndex(idx)}
                                            className={`relative flex flex-col items-center justify-center py-3 md:py-4 rounded-xl border-2 transition-all duration-250 ${selectedVolumeIndex === idx
                                                ? 'border-gold bg-gradient-to-b from-gold/8 to-gold/3 shadow-sm shadow-gold/10'
                                                : 'border-gray-200 bg-white hover:border-gold/30 hover:bg-gold/3'
                                                }`}
                                        >
                                            <span className={`text-base md:text-lg font-bold transition-colors ${selectedVolumeIndex === idx ? 'text-black' : 'text-gray-700'
                                                }`}>{vol.volume}</span>
                                            <span className={`text-xs md:text-sm mt-0.5 font-semibold transition-colors ${selectedVolumeIndex === idx ? 'text-gold' : 'text-gray-400'
                                                }`}>
                                                ₹{vol.price}
                                            </span>

                                            {/* Selected Checkmark */}
                                            {selectedVolumeIndex === idx && (
                                                <motion.div
                                                    initial={{ scale: 0 }}
                                                    animate={{ scale: 1 }}
                                                    className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-gold rounded-full flex items-center justify-center shadow-sm"
                                                >
                                                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                                    </svg>
                                                </motion.div>
                                            )}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Actions */}
                        <div className="space-y-3">
                            <div className="flex items-center gap-3">
                                {/* Quantity Selector */}
                                <div className="flex items-center border border-gray-200 rounded-full bg-gray-50">
                                    <button
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                        className="w-11 h-11 md:w-12 md:h-12 flex items-center justify-center hover:bg-gray-100 rounded-full transition-colors"
                                    >
                                        <FiMinus size={16} />
                                    </button>
                                    <span className="w-8 md:w-10 text-center font-bold text-base md:text-lg">{quantity}</span>
                                    <button
                                        onClick={() => setQuantity(quantity + 1)}
                                        className="w-11 h-11 md:w-12 md:h-12 flex items-center justify-center hover:bg-gray-100 rounded-full transition-colors"
                                    >
                                        <FiPlus size={16} />
                                    </button>
                                </div>

                                {/* Add to Cart Button */}
                                <button
                                    onClick={handleAddToCart}
                                    className="flex-1 bg-black text-white h-11 md:h-12 rounded-full font-bold hover:bg-gold hover:text-black transition-all shadow-lg hover:shadow-gold-sm flex items-center justify-center gap-2 text-sm md:text-base"
                                >
                                    <FiShoppingBag className="text-lg md:text-xl" /> Add to Cart
                                </button>
                            </div>

                            {/* WhatsApp Button */}
                            <a
                                href={whatsappLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full bg-green-500 text-white h-12 md:h-14 rounded-full font-bold hover:bg-green-600 transition-all shadow-lg hover:shadow-green-200 flex items-center justify-center gap-2 text-sm md:text-lg"
                            >
                                <FaWhatsapp className="text-xl md:text-2xl" /> Buy Now on WhatsApp
                            </a>
                        </div>

                        {/* Trust Badges */}
                        <div className="mt-8 pt-6 border-t border-gray-100 grid grid-cols-1 md:grid-cols-3 gap-3">
                            <div className="flex items-center gap-2 text-xs md:text-sm text-gray-500">
                                <span className="text-emerald-500 text-base">✓</span>
                                <span>100% Authentic Quality</span>
                            </div>
                            <div className="flex items-center gap-2 text-xs md:text-sm text-gray-500">
                                <span className="text-emerald-500 text-base">✓</span>
                                <span>Fast Delivery</span>
                            </div>
                            <div className="flex items-center gap-2 text-xs md:text-sm text-gray-500">
                                <span className="text-emerald-500 text-base">✓</span>
                                <span>Secure Packaging</span>
                            </div>
                        </div>

                    </motion.div>
                </div>
            </div>

            {/* Customer Reviews Section */}
            <motion.section
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="py-10 md:py-16 border-t border-gray-100"
            >
                <div className="container mx-auto px-4">
                    {/* Section Header */}
                    <div className="flex items-center gap-4 mb-8">
                        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
                        <div className="text-center">
                            <h2 className="text-xl md:text-2xl font-serif font-bold text-black">Customer Reviews</h2>
                            <p className="text-xs md:text-sm text-gray-400 mt-1">What our customers say about this product</p>
                        </div>
                        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
                    </div>

                    {/* Review Cards */}
                    {reviews.length > 0 || (slug && productReviews[slug as string] && productReviews[slug as string].length > 0) ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 max-w-4xl mx-auto">
                            {[...reviews, ...(slug && productReviews[slug as string] ? productReviews[slug as string] : [])]
                                .sort((a, b) => new Date(b.date || b.created_at).getTime() - new Date(a.date || a.created_at).getTime())
                                .map((review, index) => (
                                    <motion.div
                                        key={review.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.2 + index * 0.05, duration: 0.4 }}
                                        className="bg-white rounded-2xl p-5 md:p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300"
                                    >
                                        {/* Reviewer Info */}
                                        <div className="flex items-start gap-3 mb-4">
                                            <div
                                                className="w-11 h-11 rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0 shadow-sm"
                                                style={{ backgroundColor: review.avatarColor || review.avatar_color || '#D0AB64' }}
                                            >
                                                {review.customerName || review.customer_name ? (review.customerName || review.customer_name).charAt(0) : '?'}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-1.5">
                                                    <h4 className="font-semibold text-sm text-gray-900">
                                                        {review.customerName || review.customer_name}
                                                    </h4>
                                                    {review.verified && (
                                                        <HiCheckBadge className="text-blue-500 text-sm shrink-0" />
                                                    )}
                                                </div>
                                                {/* Stars */}
                                                <div className="flex items-center gap-0.5 mt-1">
                                                    {[...Array(5)].map((_, i) => (
                                                        <FaStar
                                                            key={i}
                                                            size={12}
                                                            className={i < review.rating ? 'text-gold' : 'text-gray-200'}
                                                        />
                                                    ))}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Comment */}
                                        <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                                            &ldquo;{review.comment}&rdquo;
                                        </p>

                                        {/* Date */}
                                        <p className="text-[11px] text-gray-400 mt-4 pt-3 border-t border-gray-50">
                                            {new Date(review.date || review.created_at).toLocaleDateString('en-IN', {
                                                day: 'numeric',
                                                month: 'long',
                                                year: 'numeric'
                                            })}
                                        </p>
                                    </motion.div>
                                ))}
                        </div>
                    ) : (
                        <div className="text-center py-8 max-w-md mx-auto">
                            <p className="text-gray-400 text-sm">No reviews yet for this product. Be the first to share your experience!</p>
                        </div>
                    )}

                    {/* Write a Review Button */}
                    <div className="text-center mt-8 max-w-md mx-auto">
                        {submissionSuccess ? (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="bg-emerald-50 text-emerald-700 py-4 px-6 rounded-2xl border border-emerald-100 font-semibold"
                            >
                                Thank you for your review! It has been submitted successfully.
                            </motion.div>
                        ) : (
                            <>
                                <button
                                    onClick={() => setShowReviewForm(true)}
                                    className="inline-flex items-center gap-2.5 bg-black text-white px-8 py-3.5 rounded-full font-semibold text-sm hover:bg-gold hover:text-black transition-all duration-300 shadow-lg hover:shadow-gold-md"
                                >
                                    <FaStar className="text-gold group-hover:text-black" size={16} />
                                    Write a Review
                                </button>
                                <p className="text-[11px] text-gray-400 mt-3">Share your experience with us directly</p>
                            </>
                        )}
                    </div>
                </div>
            </motion.section>

            {/* Review Form Modal */}
            {showReviewForm && (
                <ReviewForm
                    productSlug={slug as string}
                    productName={product.name}
                    onClose={() => setShowReviewForm(false)}
                    onSuccess={() => {
                        setShowReviewForm(false);
                        setSubmissionSuccess(true);
                        fetchReviews();
                        setTimeout(() => setSubmissionSuccess(false), 5000);
                    }}
                />
            )}

            <Footer />
        </main>
    );
}
