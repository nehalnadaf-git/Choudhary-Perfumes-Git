"use client";

import React, { useState, useEffect } from 'react';
import { FiTrash2, FiSearch, FiStar, FiFilter, FiCheckCircle, FiClock, FiX } from 'react-icons/fi';
import { HiCheckBadge } from 'react-icons/hi2';
import { motion, AnimatePresence } from 'framer-motion';

export default function ReviewManagement() {
    const [reviews, setReviews] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [isDeleting, setIsDeleting] = useState<string | null>(null);

    const fetchAllReviews = async () => {
        try {
            const res = await fetch('/api/reviews');
            if (res.ok) {
                const data = await res.json();
                setReviews(data);
            }
        } catch (err) {
            console.error('Failed to fetch reviews:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAllReviews();
    }, []);

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this review?')) return;

        setIsDeleting(id);
        try {
            const res = await fetch(`/api/reviews?id=${id}`, { method: 'DELETE' });
            if (res.ok) {
                setReviews(reviews.filter(r => r.id !== id));
            } else {
                alert('Failed to delete review');
            }
        } catch (err) {
            console.error('Delete error:', err);
            alert('Something went wrong');
        } finally {
            setIsDeleting(null);
        }
    };

    const filteredReviews = reviews.filter(r =>
        r.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.comment.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.product_slug.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* Header */}
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-black/8">
                <div>
                    <p className="text-[10px] uppercase tracking-[0.4em] text-[#D0AB64] font-bold mb-3">Customer Feedback</p>
                    <h1 className="text-4xl lg:text-5xl font-serif font-bold text-[#1A1A1A] tracking-tight">
                        Review <span className="italic text-[#D0AB64]">Management</span>
                    </h1>
                    <p className="text-xs uppercase tracking-[0.25em] text-black/35 mt-3 font-medium">
                        Monitor and moderate product reviews
                    </p>
                </div>

                <div className="flex items-center gap-4">
                    <div className="bg-white px-6 py-4 rounded-xl border border-black/5 shadow-sm">
                        <p className="text-[9px] uppercase tracking-widest text-black/30 font-bold mb-1">Total Reviews</p>
                        <p className="text-2xl font-serif font-bold text-[#D0AB64] leading-none">{reviews.length}</p>
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-black/5 flex flex-col md:flex-row gap-4">
                <div className="relative flex-1 group">
                    <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-black/25 group-focus-within:text-[#D0AB64] transition-colors" size={18} />
                    <input
                        type="text"
                        placeholder="Search by customer, product, or content..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-11 pr-5 py-3.5 bg-gray-50 rounded-xl outline-none border border-transparent focus:border-[#D0AB64]/40 focus:bg-white transition-all text-sm text-black"
                    />
                </div>
                <div className="flex gap-2">
                    <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 text-black/40 rounded-xl text-xs font-bold uppercase tracking-widest border border-transparent">
                        <FiFilter size={14} />
                        Sort by Latest
                    </div>
                </div>
            </div>

            {/* Content */}
            {loading ? (
                <div className="py-24 text-center">
                    <div className="w-12 h-12 border-4 border-[#D0AB64]/20 border-t-[#D0AB64] rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-xs font-bold uppercase tracking-[0.3em] text-black/30">Loading reviews...</p>
                </div>
            ) : filteredReviews.length === 0 ? (
                <div className="py-24 text-center bg-white rounded-2xl border-2 border-dashed border-black/5">
                    <FiClock className="mx-auto text-black/10 mb-4" size={48} />
                    <p className="text-sm font-bold uppercase tracking-widest text-black/40">No reviews found</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <AnimatePresence mode='popLayout'>
                        {filteredReviews.map((review) => (
                            <motion.div
                                layout
                                key={review.id}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="bg-white rounded-2xl p-6 border border-black/5 shadow-sm hover:shadow-md transition-all group overflow-hidden relative"
                            >
                                <div className="flex justify-between items-start mb-4">
                                    <div className="flex items-center gap-3">
                                        <div
                                            className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold shadow-sm"
                                            style={{ backgroundColor: review.avatar_color || '#D0AB64' }}
                                        >
                                            {review.customer_name.charAt(0)}
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-1.5">
                                                <h3 className="font-serif font-bold text-lg text-black">{review.customer_name}</h3>
                                                {review.verified && <HiCheckBadge className="text-blue-500" size={18} />}
                                            </div>
                                            <div className="flex items-center gap-0.5 mt-0.5">
                                                {[...Array(5)].map((_, i) => (
                                                    <FiStar
                                                        key={i}
                                                        size={12}
                                                        className={i < review.rating ? "fill-[#D0AB64] text-[#D0AB64]" : "text-gray-200"}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => handleDelete(review.id)}
                                        disabled={isDeleting === review.id}
                                        className="p-3 text-black/20 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                                        title="Delete Review"
                                    >
                                        {isDeleting === review.id ? (
                                            <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                                        ) : (
                                            <FiTrash2 size={18} />
                                        )}
                                    </button>
                                </div>

                                <div className="space-y-4">
                                    <div className="bg-gray-50 rounded-xl p-4 border border-black/[0.03]">
                                        <p className="text-gray-600 italic text-sm leading-relaxed">
                                            "{review.comment}"
                                        </p>
                                    </div>

                                    <div className="flex items-center justify-between pt-2">
                                        <div className="flex items-center gap-2">
                                            <span className="text-[10px] font-bold uppercase tracking-widest text-[#D0AB64] bg-[#D0AB64]/10 px-3 py-1.5 rounded-full">
                                                {review.product_slug.replace(/-/g, ' ')}
                                            </span>
                                        </div>
                                        <div className="text-[10px] text-black/30 font-bold uppercase tracking-widest">
                                            {new Date(review.created_at).toLocaleDateString('en-IN', {
                                                day: 'numeric',
                                                month: 'short',
                                                year: 'numeric'
                                            })}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            )}
        </div>
    );
}
