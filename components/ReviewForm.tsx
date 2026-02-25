"use client";

import { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { HiXMark } from 'react-icons/hi2';

interface ReviewFormProps {
    productSlug: string;
    productName: string;
    onClose: () => void;
    onSuccess: () => void;
}

export default function ReviewForm({ productSlug, productName, onClose, onSuccess }: ReviewFormProps) {
    const [customerName, setCustomerName] = useState('');
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        try {
            const avatarColors = ['#D0AB64', '#8B6F47', '#5C4033', '#6B4423', '#7B9E6B', '#4A7C59', '#4169E1', '#E8A0BF'];
            const randomColor = avatarColors[Math.floor(Math.random() * avatarColors.length)];

            const res = await fetch('/api/reviews', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    product_slug: productSlug,
                    customer_name: customerName,
                    rating,
                    comment,
                    avatar_color: randomColor
                }),
            });

            const data = await res.json();

            if (res.ok) {
                onSuccess();
            } else {
                setError(data.error || 'Failed to submit review. Please try again.');
            }
        } catch (err) {
            setError('Something went wrong. Please check your connection.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 overflow-y-auto bg-black/60 backdrop-blur-sm">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                    className="bg-white w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl relative"
                >
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors z-10"
                    >
                        <HiXMark size={24} className="text-gray-400" />
                    </button>

                    <div className="p-6 md:p-8">
                        <div className="text-center mb-8">
                            <h2 className="text-2xl font-serif font-bold text-black mb-1">Write a Review</h2>
                            <p className="text-sm text-gray-500">Sharing your thoughts on <span className="text-gold font-semibold">{productName}</span></p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">
                                    Your Name
                                </label>
                                <input
                                    required
                                    type="text"
                                    value={customerName}
                                    onChange={(e) => setCustomerName(e.target.value)}
                                    placeholder="e.g. Imran Khan"
                                    className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-gold/20 focus:border-gold outline-none transition-all"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">
                                    Rating
                                </label>
                                <div className="flex gap-2">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <button
                                            key={star}
                                            type="button"
                                            onClick={() => setRating(star)}
                                            className="focus:outline-none p-1 transition-transform active:scale-90"
                                        >
                                            <FaStar
                                                size={28}
                                                className={star <= rating ? 'text-gold' : 'text-gray-200'}
                                            />
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">
                                    Your Review
                                </label>
                                <textarea
                                    required
                                    rows={4}
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                    placeholder="Tell us what you loved about this fragrance..."
                                    className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-gold/20 focus:border-gold outline-none transition-all resize-none"
                                />
                            </div>

                            {error && (
                                <p className="text-red-500 text-sm bg-red-50 p-3 rounded-lg border border-red-100">
                                    {error}
                                </p>
                            )}

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className={`w-full py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2 shadow-lg ${isSubmitting
                                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                        : 'bg-black text-white hover:bg-gold hover:text-black hover:shadow-gold-sm shadow-black/10'
                                    }`}
                            >
                                {isSubmitting ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin" />
                                        Submitting...
                                    </>
                                ) : (
                                    'Submit Review'
                                )}
                            </button>
                        </form>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
