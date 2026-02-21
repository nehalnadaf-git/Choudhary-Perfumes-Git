"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FiUser, FiLock, FiArrowRight, FiEye, FiEyeOff, FiAlertCircle } from 'react-icons/fi';

export default function AdminLogin() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });

            if (res.ok) {
                router.push('/admin');
                router.refresh();
            } else {
                setError('Invalid credentials. Please try again.');
                setLoading(false);
            }
        } catch {
            setError('Connection error. Please try again.');
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center relative overflow-hidden" style={{ background: '#0A0A0A' }}>

            {/* Ambient background */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute inset-0" style={{
                    backgroundImage: `url('https://images.unsplash.com/photo-1615634260167-c8cdede054de?q=80&w=2070&auto=format&fit=crop')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    opacity: 0.08
                }} />
                {/* Gradient overlays */}
                <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 30% 50%, rgba(208,171,100,0.08) 0%, transparent 60%)' }} />
                <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 70% 50%, rgba(208,171,100,0.05) 0%, transparent 60%)' }} />
                {/* Subtle grid */}
                <div className="absolute inset-0" style={{
                    backgroundImage: `linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)`,
                    backgroundSize: '60px 60px'
                }} />
            </div>

            {/* Login Card */}
            <div className="relative z-10 w-full max-w-[420px] px-5">
                {/* Brand Mark */}
                <div className="text-center mb-10">
                    <div className="w-14 h-14 rounded-2xl mx-auto mb-5 flex items-center justify-center font-serif font-bold text-2xl shadow-2xl"
                        style={{ background: 'linear-gradient(135deg, #D0AB64 0%, #AD8B45 100%)', color: '#0A0A0A' }}>
                        C
                    </div>
                    <h1 className="text-2xl font-bold tracking-[0.2em] uppercase mb-2" style={{ color: '#D0AB64', fontFamily: 'Cormorant Garamond, Georgia, serif' }}>
                        Choudhary
                    </h1>
                    <p className="text-xs tracking-[0.3em] uppercase" style={{ color: 'rgba(255,255,255,0.3)' }}>
                        Admin Portal
                    </p>
                </div>

                {/* Card */}
                <div className="rounded-2xl p-7 shadow-2xl" style={{
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    backdropFilter: 'blur(30px)'
                }}>
                    <h2 className="text-xl font-bold text-white mb-1">Welcome back</h2>
                    <p className="text-xs mb-7" style={{ color: 'rgba(255,255,255,0.35)' }}>
                        Sign in to manage your fragrance collection
                    </p>

                    {/* Error */}
                    {error && (
                        <div className="flex items-center gap-3 px-4 py-3.5 rounded-xl mb-5 text-xs font-medium"
                            style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', color: '#FCA5A5' }}>
                            <FiAlertCircle size={14} className="flex-shrink-0" />
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleLogin} className="space-y-4">
                        {/* Username */}
                        <div>
                            <label className="block text-[10px] font-black uppercase tracking-[0.35em] mb-2.5" style={{ color: 'rgba(255,255,255,0.35)' }}>
                                Username
                            </label>
                            <div className="relative group">
                                <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 transition-colors" size={15}
                                    style={{ color: username ? '#D0AB64' : 'rgba(255,255,255,0.2)' }} />
                                <input
                                    type="text"
                                    value={username}
                                    onChange={e => setUsername(e.target.value)}
                                    required
                                    placeholder="admin"
                                    className="w-full pl-11 pr-4 py-3.5 rounded-xl text-sm text-white placeholder-white/20 outline-none transition-all"
                                    style={{
                                        background: 'rgba(255,255,255,0.06)',
                                        border: `1px solid ${username ? 'rgba(208,171,100,0.4)' : 'rgba(255,255,255,0.08)'}`,
                                    }}
                                    onFocus={e => e.target.style.border = '1px solid rgba(208,171,100,0.5)'}
                                    onBlur={e => e.target.style.border = `1px solid ${username ? 'rgba(208,171,100,0.4)' : 'rgba(255,255,255,0.08)'}`}
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-[10px] font-black uppercase tracking-[0.35em] mb-2.5" style={{ color: 'rgba(255,255,255,0.35)' }}>
                                Password
                            </label>
                            <div className="relative group">
                                <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 transition-colors" size={15}
                                    style={{ color: password ? '#D0AB64' : 'rgba(255,255,255,0.2)' }} />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    required
                                    placeholder="••••••••"
                                    className="w-full pl-11 pr-12 py-3.5 rounded-xl text-sm text-white placeholder-white/20 outline-none transition-all"
                                    style={{
                                        background: 'rgba(255,255,255,0.06)',
                                        border: `1px solid ${password ? 'rgba(208,171,100,0.4)' : 'rgba(255,255,255,0.08)'}`,
                                    }}
                                    onFocus={e => e.target.style.border = '1px solid rgba(208,171,100,0.5)'}
                                    onBlur={e => e.target.style.border = `1px solid ${password ? 'rgba(208,171,100,0.4)' : 'rgba(255,255,255,0.08)'}`}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 transition-colors"
                                    style={{ color: 'rgba(255,255,255,0.2)' }}
                                    onMouseEnter={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.6)')}
                                    onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.2)')}
                                >
                                    {showPassword ? <FiEyeOff size={15} /> : <FiEye size={15} />}
                                </button>
                            </div>
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={loading || !username || !password}
                            className="group w-full flex items-center justify-center gap-2.5 py-4 rounded-xl font-bold text-sm uppercase tracking-[0.15em] transition-all duration-300 mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            style={{
                                background: 'linear-gradient(135deg, #D0AB64 0%, #AD8B45 100%)',
                                color: '#0A0A0A',
                                boxShadow: loading ? 'none' : '0 8px 30px rgba(208,171,100,0.3)'
                            }}
                        >
                            {loading ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                                    Signing In...
                                </>
                            ) : (
                                <>
                                    Sign In
                                    <FiArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-200" />
                                </>
                            )}
                        </button>
                    </form>
                </div>

                <p className="text-center text-[10px] mt-8 tracking-widest uppercase" style={{ color: 'rgba(255,255,255,0.15)' }}>
                    © 2026 Choudhary Perfumes · Secure Access
                </p>
            </div>

            <style jsx global>{`
                @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=Inter:wght@400;500;600;700&display=swap');
                body { font-family: 'Inter', sans-serif; }
            `}</style>
        </div>
    );
}
