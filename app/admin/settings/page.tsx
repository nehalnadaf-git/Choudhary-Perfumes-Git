"use client";

import React, { useState, useEffect } from 'react';
import { FiSave, FiCheck } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';

export default function SettingsPage() {
    const [whatsappNumber, setWhatsappNumber] = useState('');
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [saveSuccess, setSaveSuccess] = useState(false);

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const res = await fetch('/api/settings?key=whatsapp_number');
                if (res.ok) {
                    const data = await res.json();
                    setWhatsappNumber(data.value || '916363278962');
                }
            } catch (err) {
                console.error('Failed to fetch settings:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchSettings();
    }, []);

    const handleSave = async () => {
        setSaving(true);
        try {
            const res = await fetch('/api/settings', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ key: 'whatsapp_number', value: whatsappNumber })
            });
            if (res.ok) {
                setSaveSuccess(true);
                setTimeout(() => setSaveSuccess(false), 2000);
            } else {
                alert('Failed to save WhatsApp number. Please try again.');
            }
        } catch (err) {
            console.error('Save error:', err);
            alert('Something went wrong. Check your connection.');
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* Header */}
            <div className="pb-6 border-b border-black/8">
                <p className="text-[10px] uppercase tracking-[0.4em] text-[#D0AB64] font-bold mb-3">Configuration</p>
                <h1 className="text-4xl lg:text-5xl font-serif font-bold text-[#1A1A1A] tracking-tight">
                    Site <span className="italic text-[#D0AB64]">Settings</span>
                </h1>
                <p className="text-xs uppercase tracking-[0.25em] text-black/35 mt-3 font-medium">
                    Manage your website configuration
                </p>
            </div>

            {/* WhatsApp Number Section */}
            <div className="bg-white rounded-2xl border border-black/5 shadow-sm overflow-hidden max-w-2xl">
                <div className="px-6 py-5 border-b border-black/5 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center">
                        <FaWhatsapp className="text-green-500" size={20} />
                    </div>
                    <div>
                        <h2 className="text-lg font-serif font-bold text-[#1A1A1A]">WhatsApp Number</h2>
                        <p className="text-[10px] uppercase tracking-widest text-black/30 font-bold">Used in all WhatsApp links across the website</p>
                    </div>
                </div>

                <div className="p-6 space-y-5">
                    {loading ? (
                        <div className="flex items-center gap-3 text-black/30">
                            <div className="w-5 h-5 border-2 border-[#D0AB64] border-t-transparent rounded-full animate-spin" />
                            <span className="text-xs font-bold uppercase tracking-widest">Loading...</span>
                        </div>
                    ) : (
                        <>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black tracking-[0.3em] uppercase text-black/40 block">
                                    Phone Number (with country code, no + sign)
                                </label>
                                <input
                                    type="text"
                                    value={whatsappNumber}
                                    onChange={(e) => setWhatsappNumber(e.target.value.replace(/[^0-9]/g, ''))}
                                    placeholder="916363278962"
                                    className="w-full px-5 py-4 bg-gray-50 border border-black/8 rounded-xl text-lg font-mono outline-none focus:border-[#D0AB64] focus:ring-4 focus:ring-[#D0AB64]/8 transition-all"
                                />
                                <p className="text-[10px] text-black/30 font-medium mt-1">
                                    Example: <span className="font-mono font-bold">916363278962</span> — This is the number customers will message when clicking any WhatsApp button on your website.
                                </p>
                            </div>

                            {/* Preview */}
                            <div className="bg-gray-50 rounded-xl p-4 border border-black/[0.03]">
                                <p className="text-[10px] font-bold uppercase tracking-widest text-black/30 mb-2">Preview Link</p>
                                <p className="text-sm text-blue-600 font-mono break-all">
                                    https://wa.me/{whatsappNumber || '...'}
                                </p>
                            </div>

                            {/* Save Button */}
                            <button
                                onClick={handleSave}
                                disabled={saving || !whatsappNumber}
                                className={`flex items-center justify-center gap-2.5 w-full py-4 rounded-xl font-bold text-xs uppercase tracking-[0.2em] transition-all duration-300 shadow-lg ${saveSuccess
                                        ? 'bg-emerald-500 text-white shadow-emerald-200'
                                        : 'bg-[#1A1A1A] text-[#D0AB64] hover:bg-[#D0AB64] hover:text-black shadow-black/10'
                                    } disabled:opacity-50`}
                            >
                                {saveSuccess ? (
                                    <><FiCheck size={16} /> Saved Successfully!</>
                                ) : saving ? (
                                    <><div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" /> Saving...</>
                                ) : (
                                    <><FiSave size={16} /> Save WhatsApp Number</>
                                )}
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
