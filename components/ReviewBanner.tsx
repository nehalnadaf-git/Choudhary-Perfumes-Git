"use client";

import { Review } from "@/lib/types";
import { FaStar, FaQuoteLeft } from "react-icons/fa";
import { HiCheckBadge } from "react-icons/hi2";
import { motion } from "framer-motion";

interface ReviewBannerProps {
    reviews: Review[];
}

const ReviewBanner = ({ reviews }: ReviewBannerProps) => {
    if (reviews.length === 0) return null;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="my-6 md:my-10"
        >
            {/* Section Header */}
            <div className="flex items-center gap-3 mb-5">
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-gold flex items-center gap-2">
                    <FaStar size={10} />
                    Customer Reviews
                    <FaStar size={10} />
                </span>
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
            </div>

            {/* Reviews Scroll Container */}
            <div className="flex gap-4 overflow-x-auto pb-3 scrollbar-hide snap-x snap-mandatory -mx-4 px-4">
                {reviews.map((review, index) => (
                    <motion.div
                        key={review.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.08, duration: 0.4 }}
                        className="min-w-[280px] md:min-w-[320px] max-w-[340px] snap-start"
                    >
                        <div className="relative bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 h-full flex flex-col group">
                            {/* Quote Icon */}
                            <FaQuoteLeft className="absolute top-4 right-4 text-gold/10 text-2xl group-hover:text-gold/20 transition-colors" />

                            {/* Header: Avatar + Name + Stars */}
                            <div className="flex items-start gap-3 mb-3">
                                {/* Avatar */}
                                <div
                                    className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0 shadow-sm"
                                    style={{ backgroundColor: review.avatarColor || '#D0AB64' }}
                                >
                                    {review.customerName.charAt(0)}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-1.5">
                                        <h4 className="font-semibold text-sm text-gray-900 truncate">
                                            {review.customerName}
                                        </h4>
                                        {review.verified && (
                                            <HiCheckBadge className="text-blue-500 text-sm shrink-0" />
                                        )}
                                    </div>
                                    {/* Stars */}
                                    <div className="flex items-center gap-0.5 mt-0.5">
                                        {[...Array(5)].map((_, i) => (
                                            <FaStar
                                                key={i}
                                                size={10}
                                                className={i < review.rating ? "text-gold" : "text-gray-200"}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Product Name */}
                            <p className="text-[10px] font-bold uppercase tracking-widest text-gold/70 mb-2">
                                {review.productName}
                            </p>

                            {/* Comment */}
                            <p className="text-sm text-gray-600 leading-relaxed flex-1 line-clamp-3">
                                &ldquo;{review.comment}&rdquo;
                            </p>

                            {/* Date */}
                            <p className="text-[10px] text-gray-400 mt-3 pt-3 border-t border-gray-50">
                                {new Date(review.date).toLocaleDateString('en-IN', {
                                    day: 'numeric',
                                    month: 'short',
                                    year: 'numeric'
                                })}
                            </p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
};

export default ReviewBanner;
