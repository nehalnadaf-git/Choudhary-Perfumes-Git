"use client";

import React, { useState } from 'react';
import { FiMapPin, FiDownload, FiChevronRight, FiCheckCircle, FiClock, FiTruck, FiXCircle, FiSearch, FiFilter } from 'react-icons/fi';

const orders = [
    { id: 'ORD-7829', customer: 'Rahul Sharma', items: 'Sandal Attar (12ml), Oud Attar (5ml)', total: 1498, status: 'Pending', date: '10 mins ago', location: 'Hubli, Karnataka' },
    { id: 'ORD-7828', customer: 'Priya Patel', items: 'Dior Homme Intense EDP (100ml)', total: 1799, status: 'Shipped', date: '2 hours ago', location: 'Bangalore, Karnataka' },
    { id: 'ORD-7827', customer: 'Mohammed Ali', items: 'Musk Rijali (12ml)', total: 949, status: 'Delivered', date: 'Yesterday', location: 'Dharwad, Karnataka' },
    { id: 'ORD-7826', customer: 'Sneha Gupta', items: 'Mystic Amber Oudh (100ml)', total: 1499, status: 'Cancelled', date: '2 days ago', location: 'Mumbai, Maharashtra' },
];

const statusConfig: Record<string, { bg: string; text: string; border: string; icon: React.ElementType }> = {
    Pending: { bg: '#FFFBEB', text: '#92400E', border: '#FDE68A', icon: FiClock },
    Shipped: { bg: '#EFF6FF', text: '#1E40AF', border: '#BFDBFE', icon: FiTruck },
    Delivered: { bg: '#F0FDF4', text: '#166534', border: '#BBF7D0', icon: FiCheckCircle },
    Cancelled: { bg: '#FEF2F2', text: '#991B1B', border: '#FECACA', icon: FiXCircle },
};

const summaryStats = [
    { label: 'Total Orders', value: orders.length, accent: '#D0AB64' },
    { label: 'Pending', value: orders.filter(o => o.status === 'Pending').length, accent: '#F59E0B' },
    { label: 'Shipped', value: orders.filter(o => o.status === 'Shipped').length, accent: '#3B82F6' },
    { label: 'Delivered', value: orders.filter(o => o.status === 'Delivered').length, accent: '#22C55E' },
];

export default function AdminOrders() {
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');

    const filtered = orders.filter(o => {
        const matchSearch = o.customer.toLowerCase().includes(searchTerm.toLowerCase()) || o.id.toLowerCase().includes(searchTerm.toLowerCase());
        const matchStatus = statusFilter === 'all' || o.status === statusFilter;
        return matchSearch && matchStatus;
    });

    const totalRevenue = filtered.reduce((acc, o) => acc + o.total, 0);

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">

            {/* ── Header ── */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-black/8">
                <div>
                    <p className="text-[10px] uppercase tracking-[0.4em] text-[#D0AB64] font-bold mb-3">Sales Ledger</p>
                    <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#1A1A1A] tracking-tight leading-tight">
                        Order <span className="italic text-[#D0AB64]">Registry</span>
                    </h1>
                    <p className="text-xs uppercase tracking-[0.25em] text-black/35 mt-3 font-medium">
                        Monitor & fulfil customer orders
                    </p>
                </div>
                <button className="group flex items-center justify-center gap-3 bg-white text-black/60 border border-black/10 px-8 py-4 rounded-xl font-bold tracking-[0.15em] uppercase text-xs hover:bg-[#1A1A1A] hover:text-[#D0AB64] hover:border-transparent transition-all duration-300 shadow-sm hover:shadow-xl">
                    <FiDownload size={15} className="group-hover:-translate-y-0.5 transition-transform duration-200" />
                    Export Records
                </button>
            </div>

            {/* ── Stats ── */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {summaryStats.map(stat => (
                    <div key={stat.label} className="bg-white rounded-2xl p-5 shadow-sm border border-black/5 hover:shadow-md transition-all duration-200">
                        <p className="text-[9px] uppercase tracking-[0.35em] text-black/35 font-bold mb-3">{stat.label}</p>
                        <p className="text-3xl font-serif font-bold" style={{ color: stat.accent }}>{stat.value}</p>
                    </div>
                ))}
            </div>

            {/* ── Search & Filter ── */}
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-black/5 flex flex-col md:flex-row gap-3">
                <div className="relative flex-1 group">
                    <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-black/25 group-focus-within:text-[#D0AB64] transition-colors" size={17} />
                    <input
                        type="text"
                        placeholder="Search by customer or order ID..."
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                        className="w-full pl-11 pr-5 py-3.5 bg-gray-50 rounded-xl outline-none border border-transparent focus:border-[#D0AB64]/40 focus:bg-white transition-all text-sm placeholder-black/25"
                    />
                </div>
                <div className="flex gap-2 flex-wrap">
                    {['all', 'Pending', 'Shipped', 'Delivered', 'Cancelled'].map(s => (
                        <button
                            key={s}
                            onClick={() => setStatusFilter(s)}
                            className={`px-4 py-3.5 rounded-xl text-[10px] font-bold tracking-widest uppercase transition-all duration-200 ${statusFilter === s
                                ? 'bg-[#1A1A1A] text-[#D0AB64] shadow-md'
                                : 'bg-gray-50 text-black/40 hover:bg-gray-100 hover:text-black'
                                }`}
                        >
                            {s === 'all' ? 'All' : s}
                        </button>
                    ))}
                </div>
            </div>

            {/* ── Desktop Table ── */}
            <div className="hidden lg:block bg-white rounded-2xl overflow-hidden shadow-sm border border-black/5">
                <div className="px-8 py-5 border-b border-black/5 flex items-center justify-between">
                    <p className="text-xs font-bold uppercase tracking-[0.3em] text-black/40">{filtered.length} Orders</p>
                    <p className="text-xs font-bold uppercase tracking-widest text-black/40">
                        Total: <span className="text-[#D0AB64]">₹{totalRevenue.toLocaleString()}</span>
                    </p>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr style={{ background: '#FAFAFA', borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
                                {['Order ID', 'Customer', 'Items', 'Value', 'Status', ''].map(h => (
                                    <th key={h} className="px-7 py-5 text-[9px] tracking-[0.4em] uppercase font-black text-black/25">{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.map((order, idx) => (
                                <tr key={order.id} className="group hover:bg-gray-50/50 transition-colors border-b border-black/4 last:border-0">
                                    <td className="px-7 py-5">
                                        <span className="font-mono text-xs font-bold text-black/70 group-hover:text-[#D0AB64] transition-colors">{order.id}</span>
                                        <div className="text-[9px] mt-1 font-semibold text-black/25 tracking-widest uppercase">{order.date}</div>
                                    </td>
                                    <td className="px-7 py-5">
                                        <p className="text-sm font-bold text-black">{order.customer}</p>
                                        <p className="flex items-center gap-1 text-[10px] mt-1 text-black/35 font-medium">
                                            <FiMapPin size={9} /> {order.location}
                                        </p>
                                    </td>
                                    <td className="px-7 py-5 max-w-[200px]">
                                        <p className="text-xs text-black/50 truncate font-medium">{order.items}</p>
                                    </td>
                                    <td className="px-7 py-5">
                                        <span className="text-sm font-black text-black">₹{order.total.toLocaleString()}</span>
                                    </td>
                                    <td className="px-7 py-5">
                                        <StatusPill status={order.status} />
                                    </td>
                                    <td className="px-7 py-5 text-right">
                                        <button className="p-2.5 bg-gray-100 text-black/30 hover:bg-[#1A1A1A] hover:text-[#D0AB64] rounded-xl transition-all duration-200">
                                            <FiChevronRight size={16} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {filtered.length === 0 && (
                                <tr>
                                    <td colSpan={6} className="px-7 py-16 text-center text-sm text-black/30 uppercase tracking-widest font-bold">
                                        No orders match your search
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* ── Mobile Cards ── */}
            <div className="lg:hidden space-y-4">
                {filtered.map((order) => (
                    <div key={order.id} className="bg-white p-5 rounded-2xl shadow-sm border border-black/5">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <span className="font-mono text-xs font-bold text-black/60">{order.id}</span>
                                <p className="text-sm font-bold text-black mt-0.5">{order.customer}</p>
                                <p className="flex items-center gap-1 text-[10px] text-black/35 font-medium mt-0.5">
                                    <FiMapPin size={9} /> {order.location}
                                </p>
                            </div>
                            <StatusPill status={order.status} />
                        </div>

                        <div className="bg-gray-50 p-3.5 rounded-xl border border-black/5 mb-4">
                            <p className="text-[9px] uppercase tracking-widest font-black text-black/25 mb-1.5">Items Ordered</p>
                            <p className="text-xs text-black/55 font-medium leading-relaxed">{order.items}</p>
                        </div>

                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-[9px] uppercase tracking-widest font-black text-black/25 mb-1">Order Total</p>
                                <p className="text-lg font-black text-black">₹{order.total.toLocaleString()}</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <p className="text-[9px] text-black/30 font-medium uppercase tracking-widest">{order.date}</p>
                                <button className="p-2.5 bg-[#1A1A1A] text-[#D0AB64] rounded-xl text-[10px] font-bold shadow-lg">
                                    <FiChevronRight size={14} />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
                {filtered.length === 0 && (
                    <div className="py-16 text-center">
                        <p className="text-sm text-black/30 uppercase tracking-widest font-bold">No orders found</p>
                    </div>
                )}
            </div>
        </div>
    );
}

function StatusPill({ status }: { status: string }) {
    const s = statusConfig[status] || statusConfig.Pending;
    const Icon = s.icon;
    return (
        <span
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[9px] font-black tracking-widest uppercase border"
            style={{ background: s.bg, color: s.text, borderColor: s.border }}
        >
            <Icon size={10} />
            {status}
        </span>
    );
}
