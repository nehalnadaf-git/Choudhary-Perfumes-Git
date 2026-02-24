"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FiBox, FiShoppingBag, FiLogOut, FiMenu, FiX, FiHome, FiChevronRight, FiSettings, FiImage } from 'react-icons/fi';

const NAV_ITEMS = [
    { href: '/admin', icon: FiBox, label: 'Products', exact: true },
    { href: '/admin/banners', icon: FiImage, label: 'Banners', exact: false },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isLoginPage = pathname === '/admin/login';
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const pageTitle = (() => {
        if (pathname === '/admin') return 'Products & Inventory';
        if (pathname === '/admin/banners') return 'Banner Management';
        if (pathname === '/admin/orders') return 'Order Management';
        return 'Dashboard';
    })();

    if (isLoginPage) return <>{children}</>;

    const handleLogout = () => {
        document.cookie = "admin_session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        window.location.href = "/admin/login";
    };

    return (
        <div className="min-h-screen flex font-sans overflow-x-hidden" style={{ background: '#F4F5F7' }}>

            {/* ──────────────────────────────────────────────
                DESKTOP SIDEBAR
            ────────────────────────────────────────────── */}
            <aside className="w-64 flex-shrink-0 hidden lg:flex flex-col fixed h-full z-20" style={{ background: '#111111' }}>

                {/* Brand */}
                <div className="px-6 py-7 border-b border-white/5">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl flex items-center justify-center font-serif font-bold text-base shadow-lg flex-shrink-0"
                            style={{ background: 'linear-gradient(135deg, #D0AB64 0%, #AD8B45 100%)', color: '#111' }}>
                            C
                        </div>
                        <div>
                            <h2 className="text-sm font-bold tracking-[0.18em] uppercase" style={{ color: '#D0AB64', fontFamily: 'Cormorant Garamond, serif' }}>
                                Choudhary
                            </h2>
                            <p className="text-[9px] tracking-[0.25em] uppercase mt-0.5" style={{ color: 'rgba(255,255,255,0.3)' }}>
                                Admin Portal
                            </p>
                        </div>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="flex-1 px-3 py-6 space-y-1">
                    <p className="text-[9px] uppercase tracking-[0.35em] px-4 mb-4" style={{ color: 'rgba(255,255,255,0.2)' }}>Navigation</p>
                    {NAV_ITEMS.map(({ href, icon: Icon, label, exact }) => {
                        const isActive = exact ? pathname === href : pathname.startsWith(href);
                        return (
                            <Link
                                key={href}
                                href={href}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium tracking-wide transition-all duration-200 group ${isActive
                                    ? 'text-black shadow-lg'
                                    : 'hover:bg-white/5'
                                    }`}
                                style={isActive ? {
                                    background: 'linear-gradient(135deg, #D0AB64 0%, #AD8B45 100%)',
                                    color: '#111',
                                    boxShadow: '0 4px 20px rgba(208,171,100,0.3)'
                                } : { color: 'rgba(255,255,255,0.45)' }}
                            >
                                <Icon size={17} className={`flex-shrink-0 ${isActive ? '' : 'group-hover:text-white transition-colors'}`} style={isActive ? { color: '#111' } : {}} />
                                <span className={`font-semibold ${isActive ? '' : 'group-hover:text-white transition-colors'}`}>{label}</span>
                                {isActive && <FiChevronRight size={14} className="ml-auto opacity-60" />}
                            </Link>
                        );
                    })}
                </nav>

                {/* Quick Links */}
                <div className="px-3 pb-4">
                    <p className="text-[9px] uppercase tracking-[0.35em] px-4 mb-3" style={{ color: 'rgba(255,255,255,0.2)' }}>Quick Access</p>
                    <Link href="/" target="_blank"
                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium tracking-wide transition-all duration-200 group"
                        style={{ color: 'rgba(255,255,255,0.3)' }}
                    >
                        <FiHome size={16} className="group-hover:text-white transition-colors flex-shrink-0" />
                        <span className="group-hover:text-white transition-colors">View Storefront</span>
                        <FiChevronRight size={12} className="ml-auto opacity-0 group-hover:opacity-60 transition-opacity" />
                    </Link>
                </div>

                {/* Logout */}
                <div className="px-3 pb-6 border-t border-white/5 pt-4">
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-medium tracking-wide transition-all duration-200 group"
                        style={{ color: 'rgba(255,255,255,0.3)' }}
                    >
                        <FiLogOut size={16} className="group-hover:text-red-400 transition-colors flex-shrink-0" />
                        <span className="group-hover:text-red-400 transition-colors">Sign Out</span>
                    </button>
                </div>
            </aside>

            {/* ──────────────────────────────────────────────
                MAIN CONTENT
            ────────────────────────────────────────────── */}
            <main className="flex-1 lg:ml-64 flex flex-col min-h-screen overflow-x-hidden">

                {/* Top Header Bar */}
                <header className="sticky top-0 z-30 flex justify-between items-center px-3 lg:px-8 h-12 lg:h-16"
                    style={{ background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(0,0,0,0.06)' }}>

                    {/* Left: Mobile menu button + Breadcrumb */}
                    <div className="flex items-center gap-2 min-w-0">
                        <button
                            onClick={() => setMobileMenuOpen(true)}
                            className="lg:hidden p-1.5 rounded-lg hover:bg-black/5 transition-colors flex-shrink-0"
                        >
                            <FiMenu size={18} className="text-black/70" />
                        </button>

                        {/* Mobile brand */}
                        <span className="lg:hidden text-sm font-bold tracking-widest uppercase truncate" style={{ color: '#D0AB64', fontFamily: 'Cormorant Garamond, serif' }}>
                            Choudhary
                        </span>

                        {/* Desktop breadcrumb */}
                        <div className="hidden lg:flex items-center gap-2">
                            <span className="text-xs font-medium text-black/30 uppercase tracking-widest">Admin</span>
                            <FiChevronRight size={12} className="text-black/20" />
                            <span className="text-xs font-bold text-black/70 uppercase tracking-widest">{pageTitle}</span>
                        </div>
                    </div>

                    {/* Right: Actions */}
                    <div className="flex items-center gap-2 flex-shrink-0">
                        <Link href="/" target="_blank"
                            className="hidden md:flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest text-black/40 hover:text-black hover:bg-black/5 transition-all">
                            <FiHome size={14} />
                            <span>Store</span>
                        </Link>
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center text-[11px] font-black tracking-wider flex-shrink-0"
                            style={{ background: 'linear-gradient(135deg, #D0AB64 0%, #AD8B45 100%)', color: '#111' }}>
                            A
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <div className="px-3 py-3 lg:p-8 flex-1">
                    <div className="max-w-7xl mx-auto">
                        {children}
                    </div>
                </div>
            </main>

            {/* ──────────────────────────────────────────────
                MOBILE SIDEBAR DRAWER
            ────────────────────────────────────────────── */}
            {mobileMenuOpen && (
                <div className="fixed inset-0 z-50 lg:hidden">
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        onClick={() => setMobileMenuOpen(false)}
                    />

                    {/* Drawer */}
                    <div className="absolute left-0 top-0 bottom-0 w-72 flex flex-col shadow-2xl animate-in slide-in-from-left duration-300"
                        style={{ background: '#111111' }}>

                        {/* Drawer Header */}
                        <div className="px-6 py-6 border-b border-white/5 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-xl flex items-center justify-center font-serif font-bold text-sm"
                                    style={{ background: 'linear-gradient(135deg, #D0AB64 0%, #AD8B45 100%)', color: '#111' }}>
                                    C
                                </div>
                                <span className="text-sm font-bold tracking-widest uppercase" style={{ color: '#D0AB64', fontFamily: 'Cormorant Garamond, serif' }}>
                                    Choudhary
                                </span>
                            </div>
                            <button
                                onClick={() => setMobileMenuOpen(false)}
                                className="p-2 rounded-xl hover:bg-white/5 transition-colors"
                                style={{ color: 'rgba(255,255,255,0.4)' }}
                            >
                                <FiX size={20} />
                            </button>
                        </div>

                        {/* Drawer Nav */}
                        <nav className="flex-1 px-3 py-6 space-y-1">
                            {NAV_ITEMS.map(({ href, icon: Icon, label, exact }) => {
                                const isActive = exact ? pathname === href : pathname.startsWith(href);
                                return (
                                    <Link
                                        key={href}
                                        href={href}
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-semibold transition-all duration-200"
                                        style={isActive ? {
                                            background: 'linear-gradient(135deg, #D0AB64 0%, #AD8B45 100%)',
                                            color: '#111',
                                            boxShadow: '0 4px 20px rgba(208,171,100,0.3)'
                                        } : { color: 'rgba(255,255,255,0.45)' }}
                                    >
                                        <Icon size={18} />
                                        <span>{label}</span>
                                    </Link>
                                );
                            })}
                        </nav>

                        {/* Drawer Footer */}
                        <div className="p-4 border-t border-white/5">
                            <button
                                onClick={handleLogout}
                                className="flex items-center gap-3 w-full px-4 py-3.5 rounded-xl text-sm font-medium transition-all hover:bg-red-500/10"
                                style={{ color: 'rgba(255,255,255,0.3)' }}
                            >
                                <FiLogOut size={17} />
                                <span>Sign Out</span>
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Google Fonts */}
            <style jsx global>{`
                @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,700&family=Inter:wght@300;400;500;600;700&display=swap');
                body { font-family: 'Inter', sans-serif; }
            `}</style>
        </div>
    );
}
