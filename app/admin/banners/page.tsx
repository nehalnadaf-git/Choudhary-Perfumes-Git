"use client";

import React, { useState, useEffect } from 'react';
import { FiPlus, FiEdit2, FiTrash2, FiX, FiCheck, FiUploadCloud, FiImage, FiEye, FiEyeOff, FiSmartphone, FiMonitor, FiChevronUp, FiChevronDown } from 'react-icons/fi';
import Image from 'next/image';

interface Banner {
    id: string;
    title: string;
    subtitle: string;
    link: string;
    mobileImageUrl: string;
    desktopImageUrl: string;
    isActive: boolean;
    sortOrder: number;
    createdAt: string;
}

export default function BannersPage() {
    const [banners, setBanners] = useState<Banner[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [currentBanner, setCurrentBanner] = useState<Partial<Banner>>({});
    const [bannerToDelete, setBannerToDelete] = useState<string | null>(null);
    const [isSaving, setIsSaving] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [saveSuccess, setSaveSuccess] = useState(false);
    const [uploadingField, setUploadingField] = useState<'mobile' | 'desktop' | null>(null);

    const fetchBanners = async () => {
        try {
            const res = await fetch('/api/banners');
            const data = await res.json();
            if (Array.isArray(data)) setBanners(data);
        } catch (error) {
            console.error('Failed to fetch banners', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchBanners(); }, []);

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        const isEditing = !!currentBanner.id;
        const url = isEditing ? `/api/banners/${currentBanner.id}` : '/api/banners';
        const method = isEditing ? 'PUT' : 'POST';
        try {
            const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(currentBanner) });
            if (res.ok) {
                await fetchBanners();
                setSaveSuccess(true);
                setTimeout(() => {
                    setIsModalOpen(false);
                    setCurrentBanner({});
                    setSaveSuccess(false);
                }, 800);
            }
        } catch (error) {
            console.error('Failed to save banner', error);
        } finally {
            setIsSaving(false);
        }
    };

    const handleDelete = async () => {
        if (!bannerToDelete) return;
        setIsDeleting(true);
        try {
            const res = await fetch(`/api/banners/${bannerToDelete}`, { method: 'DELETE' });
            if (res.ok) {
                await fetchBanners();
                setIsDeleteModalOpen(false);
                setBannerToDelete(null);
            }
        } catch (error) {
            console.error('Failed to delete banner', error);
        } finally {
            setIsDeleting(false);
        }
    };

    const toggleActive = async (banner: Banner) => {
        try {
            await fetch(`/api/banners/${banner.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...banner, isActive: !banner.isActive }),
            });
            await fetchBanners();
        } catch (error) {
            console.error('Failed to toggle banner', error);
        }
    };

    const handleUpload = async (file: File, field: 'mobile' | 'desktop', inputElement?: HTMLInputElement) => {
        console.log(`Starting banner upload for ${file.name} (${(file.size / 1024 / 1024).toFixed(2)} MB)`);

        // Client-side validation for file size (4MB)
        const MAX_SIZE = 4 * 1024 * 1024;
        if (file.size > MAX_SIZE) {
            const sizeInMB = (file.size / (1024 * 1024)).toFixed(2);
            alert(`File is too large (${sizeInMB} MB). Maximum allowed size is 4 MB.`);
            if (inputElement) inputElement.value = '';
            return;
        }

        setUploadingField(field);
        try {
            const formData = new FormData();
            formData.append('file', file);
            const res = await fetch('/api/upload', { method: 'POST', body: formData });
            const data = await res.json();
            if (res.ok && data.imageUrl) {
                console.log('Banner upload successful:', data.imageUrl);
                setCurrentBanner(prev => ({
                    ...prev,
                    [field === 'mobile' ? 'mobileImageUrl' : 'desktopImageUrl']: data.imageUrl
                }));
            } else {
                console.error('Banner upload failed:', data.error);
                alert(data.error || 'Upload failed. Please check the file and try again.');
            }
        } catch (err) {
            console.error('Banner upload network error:', err);
            alert('Upload failed due to a network error. Please try again.');
        } finally {
            setUploadingField(null);
            if (inputElement) inputElement.value = '';
        }
    };

    const openAddModal = () => {
        setCurrentBanner({ isActive: true, sortOrder: banners.length, title: '', subtitle: '', link: '/products' });
        setIsModalOpen(true);
    };

    const openEditModal = (banner: Banner) => {
        setCurrentBanner({ ...banner });
        setIsModalOpen(true);
    };

    const activeBanners = banners.filter(b => b.isActive).length;

    return (
        <div className="animate-in fade-in duration-500">

            {/* ====== MOBILE LAYOUT ====== */}
            <div className="lg:hidden space-y-3">
                <div className="flex items-center justify-between gap-3">
                    <div className="min-w-0">
                        <h1 className="text-xl font-serif font-bold text-[#1A1A1A] tracking-tight">Banners</h1>
                        <p className="text-[9px] uppercase tracking-[0.2em] text-black/35 font-semibold">{banners.length} banners • {activeBanners} active</p>
                    </div>
                    <button onClick={openAddModal} className="flex items-center gap-1.5 bg-[#1A1A1A] text-[#D0AB64] px-4 py-2.5 rounded-lg font-bold tracking-wider uppercase text-[10px] flex-shrink-0">
                        <FiPlus size={13} /> Add
                    </button>
                </div>

                {loading ? (
                    <div className="py-12 text-center">
                        <div className="w-8 h-8 border-3 border-[#D0AB64] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
                        <p className="text-[9px] uppercase tracking-[0.4em] text-black/20 font-bold">Loading</p>
                    </div>
                ) : banners.length === 0 ? (
                    <div className="py-12 text-center bg-white rounded-xl border border-dashed border-black/10">
                        <FiImage className="mx-auto text-black/15 mb-2" size={28} />
                        <p className="text-xs text-black/30 font-bold uppercase tracking-widest">No banners yet</p>
                    </div>
                ) : (
                    <div className="space-y-2">
                        {banners.map((banner) => (
                            <div key={banner.id} className="bg-white rounded-xl overflow-hidden shadow-sm border border-black/5 p-2.5">
                                {/* Preview */}
                                <div className="relative w-full h-24 rounded-lg overflow-hidden bg-gray-100 mb-2">
                                    <Image src={banner.desktopImageUrl} alt={banner.title || 'Banner'} fill className="object-cover" sizes="400px" />
                                    {!banner.isActive && (
                                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                                            <span className="text-[9px] uppercase tracking-widest text-white/80 font-bold bg-black/50 px-2 py-1 rounded-full">Inactive</span>
                                        </div>
                                    )}
                                </div>
                                {/* Info + Actions */}
                                <div className="flex items-center justify-between gap-2">
                                    <div className="min-w-0 flex-1">
                                        <h3 className="text-[13px] font-serif font-bold text-black truncate leading-tight">{banner.title || 'Untitled Banner'}</h3>
                                        <p className="text-[9px] uppercase tracking-[0.15em] text-black/30 font-semibold truncate">{banner.subtitle || 'No subtitle'}</p>
                                    </div>
                                    <div className="flex items-center gap-1 flex-shrink-0">
                                        <button onClick={() => toggleActive(banner)} className={`p-2 rounded-lg transition-all ${banner.isActive ? 'text-emerald-500' : 'text-black/20'}`} title={banner.isActive ? 'Active' : 'Inactive'}>
                                            {banner.isActive ? <FiEye size={14} /> : <FiEyeOff size={14} />}
                                        </button>
                                        <button onClick={() => openEditModal(banner)} className="p-2 bg-[#1A1A1A] text-[#D0AB64] rounded-lg">
                                            <FiEdit2 size={13} />
                                        </button>
                                        <button onClick={() => { setBannerToDelete(banner.id); setIsDeleteModalOpen(true); }} className="p-2 text-red-400 rounded-lg">
                                            <FiTrash2 size={13} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* ====== DESKTOP LAYOUT ====== */}
            <div className="hidden lg:block space-y-8">
                <div className="flex items-end justify-between gap-6 pb-6 border-b border-black/8">
                    <div>
                        <p className="text-[10px] uppercase tracking-[0.4em] text-[#D0AB64] font-bold mb-3">Banner Management</p>
                        <h1 className="text-5xl font-serif font-bold text-[#1A1A1A] tracking-tight leading-tight">
                            Homepage <span className="italic text-[#D0AB64]">Banners</span>
                        </h1>
                        <p className="text-xs uppercase tracking-[0.25em] text-black/35 mt-3 font-medium">
                            {banners.length} banners • {activeBanners} active
                        </p>
                    </div>
                    <button onClick={openAddModal}
                        className="group flex items-center justify-center gap-3 bg-[#1A1A1A] text-[#D0AB64] px-8 py-4 rounded-xl font-bold tracking-[0.15em] uppercase text-xs hover:bg-[#D0AB64] hover:text-black transition-all duration-400 shadow-xl hover:shadow-[#D0AB64]/25 hover:scale-[1.02]">
                        <FiPlus size={16} className="group-hover:rotate-90 transition-transform duration-300" />
                        Add New Banner
                    </button>
                </div>

                {loading ? (
                    <div className="py-24 text-center">
                        <div className="relative w-14 h-14 mx-auto mb-6">
                            <div className="absolute inset-0 border-4 border-[#D0AB64]/20 rounded-full" />
                            <div className="absolute inset-0 border-4 border-[#D0AB64] border-t-transparent rounded-full animate-spin" />
                        </div>
                        <p className="uppercase tracking-[0.5em] text-xs font-bold text-black/20">Loading Banners</p>
                    </div>
                ) : banners.length === 0 ? (
                    <div className="py-24 text-center bg-white rounded-2xl border-2 border-dashed border-black/8">
                        <FiImage className="mx-auto text-black/15 mb-4" size={40} />
                        <p className="uppercase tracking-widest text-sm font-bold text-black/30">No banners configured</p>
                        <p className="text-xs text-black/20 mt-2">Add your first homepage banner</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {banners.map((banner, index) => (
                            <div key={banner.id} className={`group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border ${banner.isActive ? 'border-black/5' : 'border-red-200/50 bg-red-50/30'}`}>
                                <div className="flex">
                                    {/* Desktop Preview */}
                                    <div className="relative w-80 h-44 flex-shrink-0 bg-gray-100 overflow-hidden">
                                        <Image src={banner.desktopImageUrl} alt={banner.title || 'Banner'} fill className="object-cover group-hover:scale-105 transition-transform duration-700" sizes="320px" />
                                        {!banner.isActive && (
                                            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                                                <span className="text-[10px] uppercase tracking-widest text-white font-bold bg-black/60 px-3 py-1 rounded-full">Inactive</span>
                                            </div>
                                        )}
                                        <div className="absolute top-3 left-3 flex gap-1.5">
                                            <span className="bg-black/60 backdrop-blur-sm text-white px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider rounded-full flex items-center gap-1">
                                                <FiMonitor size={10} /> Desktop
                                            </span>
                                        </div>
                                    </div>

                                    {/* Mobile Preview */}
                                    <div className="relative w-24 h-44 flex-shrink-0 bg-gray-100 overflow-hidden border-l border-black/5">
                                        <Image src={banner.mobileImageUrl} alt={banner.title || 'Banner Mobile'} fill className="object-cover" sizes="96px" />
                                        <div className="absolute top-3 left-1/2 -translate-x-1/2">
                                            <span className="bg-black/60 backdrop-blur-sm text-white px-1.5 py-0.5 text-[7px] font-bold uppercase tracking-wider rounded-full flex items-center gap-0.5">
                                                <FiSmartphone size={8} />
                                            </span>
                                        </div>
                                    </div>

                                    {/* Info */}
                                    <div className="flex-1 p-6 flex flex-col justify-between">
                                        <div>
                                            <div className="flex items-center gap-2 mb-2">
                                                <span className={`w-2 h-2 rounded-full ${banner.isActive ? 'bg-emerald-500' : 'bg-red-400'}`} />
                                                <span className="text-[9px] uppercase tracking-[0.3em] text-black/30 font-bold">
                                                    {banner.isActive ? 'Active' : 'Inactive'} • Order #{banner.sortOrder}
                                                </span>
                                            </div>
                                            <h3 className="text-xl font-serif font-bold text-black mb-1">{banner.title || 'Untitled Banner'}</h3>
                                            <p className="text-sm text-black/40">{banner.subtitle || 'No subtitle'}</p>
                                            {banner.link && (
                                                <p className="text-[10px] text-[#D0AB64] mt-2 font-semibold uppercase tracking-wider">Links to: {banner.link}</p>
                                            )}
                                        </div>

                                        <div className="flex items-center gap-2 mt-4 pt-4 border-t border-black/5">
                                            <button onClick={() => toggleActive(banner)}
                                                className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-[10px] font-bold tracking-widest uppercase transition-all ${banner.isActive
                                                    ? 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100'
                                                    : 'bg-gray-100 text-black/40 hover:bg-gray-200'}`}>
                                                {banner.isActive ? <><FiEye size={12} /> Visible</> : <><FiEyeOff size={12} /> Hidden</>}
                                            </button>
                                            <button onClick={() => openEditModal(banner)}
                                                className="flex items-center gap-1.5 px-4 py-2.5 bg-[#1A1A1A] text-[#D0AB64] rounded-xl text-[10px] font-bold tracking-widest uppercase hover:bg-[#D0AB64] hover:text-black transition-all duration-300">
                                                <FiEdit2 size={12} /> Edit
                                            </button>
                                            <button onClick={() => { setBannerToDelete(banner.id); setIsDeleteModalOpen(true); }}
                                                className="p-2.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all">
                                                <FiTrash2 size={14} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* ====== ADD/EDIT MODAL ====== */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-end lg:items-center justify-center lg:p-8">
                    <div className="absolute inset-0 bg-black/70 backdrop-blur-lg" onClick={() => { setIsModalOpen(false); setCurrentBanner({}); }} />
                    <div className="relative bg-white w-full lg:max-w-2xl rounded-t-2xl lg:rounded-2xl shadow-2xl overflow-y-auto max-h-[92vh] animate-in slide-in-from-bottom-4 lg:zoom-in-95 duration-300">

                        {/* Header */}
                        <div className="sticky top-0 bg-white z-10 px-5 lg:px-8 pt-5 lg:pt-8 pb-4 lg:pb-6 border-b border-black/5 flex items-center justify-between">
                            <div>
                                <p className="text-[9px] lg:text-[10px] uppercase tracking-[0.4em] text-[#D0AB64] font-bold mb-0.5">
                                    {currentBanner.id ? 'Editing' : 'New Banner'}
                                </p>
                                <h2 className="text-lg lg:text-2xl font-serif font-bold text-[#1A1A1A]">
                                    {currentBanner.id ? 'Update Banner' : 'Add Banner'}
                                </h2>
                            </div>
                            <button onClick={() => { setIsModalOpen(false); setCurrentBanner({}); }} className="p-2 rounded-lg text-black/30 hover:text-black hover:bg-gray-100 transition-all">
                                <FiX size={18} />
                            </button>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSave} className="p-5 lg:p-8 space-y-5">

                            {/* Title + Subtitle */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 lg:gap-5">
                                <div className="space-y-1.5">
                                    <label className="text-[9px] lg:text-[10px] font-black tracking-[0.3em] uppercase text-black/40 block">Title (optional)</label>
                                    <input
                                        type="text"
                                        className="w-full px-4 py-3 bg-gray-50 border border-black/8 rounded-xl text-sm outline-none focus:border-[#D0AB64] focus:ring-4 focus:ring-[#D0AB64]/8 transition-all placeholder-black/25"
                                        value={currentBanner.title || ''}
                                        onChange={e => setCurrentBanner({ ...currentBanner, title: e.target.value })}
                                        placeholder="Welcome to Choudhary Perfumes"
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-[9px] lg:text-[10px] font-black tracking-[0.3em] uppercase text-black/40 block">Subtitle (optional)</label>
                                    <input
                                        type="text"
                                        className="w-full px-4 py-3 bg-gray-50 border border-black/8 rounded-xl text-sm outline-none focus:border-[#D0AB64] focus:ring-4 focus:ring-[#D0AB64]/8 transition-all placeholder-black/25"
                                        value={currentBanner.subtitle || ''}
                                        onChange={e => setCurrentBanner({ ...currentBanner, subtitle: e.target.value })}
                                        placeholder="Premium Attars & Designer Fragrances"
                                    />
                                </div>
                            </div>

                            {/* Link + Sort Order */}
                            <div className="grid grid-cols-2 gap-3 lg:gap-5">
                                <div className="space-y-1.5">
                                    <label className="text-[9px] lg:text-[10px] font-black tracking-[0.3em] uppercase text-black/40 block">Link URL (optional)</label>
                                    <input
                                        type="text"
                                        className="w-full px-4 py-3 bg-gray-50 border border-black/8 rounded-xl text-sm outline-none focus:border-[#D0AB64] focus:ring-4 focus:ring-[#D0AB64]/8 transition-all placeholder-black/25"
                                        value={currentBanner.link || ''}
                                        onChange={e => setCurrentBanner({ ...currentBanner, link: e.target.value })}
                                        placeholder="/products"
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-[9px] lg:text-[10px] font-black tracking-[0.3em] uppercase text-black/40 block">Sort Order</label>
                                    <input
                                        type="number"
                                        className="w-full px-4 py-3 bg-gray-50 border border-black/8 rounded-xl text-sm outline-none focus:border-[#D0AB64] focus:ring-4 focus:ring-[#D0AB64]/8 transition-all placeholder-black/25"
                                        value={currentBanner.sortOrder ?? 0}
                                        onChange={e => setCurrentBanner({ ...currentBanner, sortOrder: Number(e.target.value) })}
                                        placeholder="0"
                                    />
                                </div>
                            </div>

                            {/* Active Toggle */}
                            <div
                                className={`px-3 py-3 rounded-xl border-2 cursor-pointer transition-all duration-200 flex items-center justify-between ${currentBanner.isActive ? 'border-[#D0AB64] bg-[#D0AB64]/5' : 'border-black/8 bg-gray-50'}`}
                                onClick={() => setCurrentBanner({ ...currentBanner, isActive: !currentBanner.isActive })}
                            >
                                <span className="text-[10px] font-bold uppercase tracking-widest text-black/70">Active (Visible on website)</span>
                                <div className={`w-9 h-5 rounded-full transition-all duration-200 relative ${currentBanner.isActive ? 'bg-[#D0AB64]' : 'bg-black/15'}`}>
                                    <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow-md transition-all duration-200 ${currentBanner.isActive ? 'left-[18px]' : 'left-0.5'}`} />
                                </div>
                            </div>

                            {/* Desktop Banner Image */}
                            <div className="space-y-1.5">
                                <label className="text-[9px] lg:text-[10px] font-black tracking-[0.3em] uppercase text-black/40 flex items-center gap-2">
                                    <FiMonitor size={12} /> Desktop Banner Image
                                </label>
                                <div className="space-y-2">
                                    <label className="relative flex flex-col items-center justify-center w-full h-36 bg-gray-50 border-2 border-dashed border-black/10 rounded-xl cursor-pointer hover:border-[#D0AB64]/50 hover:bg-[#D0AB64]/5 transition-all overflow-hidden">
                                        {currentBanner.desktopImageUrl ? (
                                            <>
                                                <Image src={currentBanner.desktopImageUrl} alt="Desktop Preview" fill className="object-cover" sizes="600px" />
                                                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                                                    <div className="text-white text-center">
                                                        <FiUploadCloud size={20} className="mx-auto mb-1" />
                                                        <p className="text-[9px] font-bold uppercase tracking-widest">Change Image</p>
                                                    </div>
                                                </div>
                                            </>
                                        ) : uploadingField === 'desktop' ? (
                                            <div className="text-center">
                                                <div className="w-6 h-6 border-2 border-[#D0AB64] border-t-transparent rounded-full animate-spin mx-auto mb-2" />
                                                <p className="text-[9px] font-bold uppercase tracking-widest text-black/40">Uploading...</p>
                                            </div>
                                        ) : (
                                            <div className="text-center py-4">
                                                <FiMonitor size={24} className="mx-auto mb-2 text-black/20" />
                                                <p className="text-[10px] font-bold uppercase tracking-widest text-black/40">Desktop Banner (1920×1080)</p>
                                                <p className="text-[8px] text-black/25 mt-1">JPG, PNG, WebP • Max 4MB</p>
                                            </div>
                                        )}
                                        <input type="file" accept="image/*" className="hidden"
                                            onChange={(e) => { const file = e.target.files?.[0]; if (file) handleUpload(file, 'desktop', e.target); }} />
                                    </label>
                                    <div className="flex items-center gap-2">
                                        <div className="flex-1 h-px bg-black/5" />
                                        <span className="text-[8px] uppercase tracking-widest text-black/25 font-bold">or paste url</span>
                                        <div className="flex-1 h-px bg-black/5" />
                                    </div>
                                    <div className="relative">
                                        <FiImage className="absolute left-3 top-1/2 -translate-y-1/2 text-black/20" size={14} />
                                        <input
                                            type="text"
                                            className="w-full pl-9 pr-4 py-2.5 bg-gray-50 border border-black/8 rounded-xl text-xs outline-none focus:border-[#D0AB64] focus:ring-4 focus:ring-[#D0AB64]/8 transition-all placeholder-black/25"
                                            value={currentBanner.desktopImageUrl || ''}
                                            onChange={e => setCurrentBanner({ ...currentBanner, desktopImageUrl: e.target.value })}
                                            placeholder="https://example.com/desktop-banner.jpg"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Mobile Banner Image */}
                            <div className="space-y-1.5">
                                <label className="text-[9px] lg:text-[10px] font-black tracking-[0.3em] uppercase text-black/40 flex items-center gap-2">
                                    <FiSmartphone size={12} /> Mobile Banner Image
                                </label>
                                <div className="space-y-2">
                                    <label className="relative flex flex-col items-center justify-center w-full h-36 bg-gray-50 border-2 border-dashed border-black/10 rounded-xl cursor-pointer hover:border-[#D0AB64]/50 hover:bg-[#D0AB64]/5 transition-all overflow-hidden">
                                        {currentBanner.mobileImageUrl ? (
                                            <>
                                                <Image src={currentBanner.mobileImageUrl} alt="Mobile Preview" fill className="object-cover" sizes="600px" />
                                                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                                                    <div className="text-white text-center">
                                                        <FiUploadCloud size={20} className="mx-auto mb-1" />
                                                        <p className="text-[9px] font-bold uppercase tracking-widest">Change Image</p>
                                                    </div>
                                                </div>
                                            </>
                                        ) : uploadingField === 'mobile' ? (
                                            <div className="text-center">
                                                <div className="w-6 h-6 border-2 border-[#D0AB64] border-t-transparent rounded-full animate-spin mx-auto mb-2" />
                                                <p className="text-[9px] font-bold uppercase tracking-widest text-black/40">Uploading...</p>
                                            </div>
                                        ) : (
                                            <div className="text-center py-4">
                                                <FiSmartphone size={24} className="mx-auto mb-2 text-black/20" />
                                                <p className="text-[10px] font-bold uppercase tracking-widest text-black/40">Mobile Banner (1080×1920)</p>
                                                <p className="text-[8px] text-black/25 mt-1">JPG, PNG, WebP • Max 4MB</p>
                                            </div>
                                        )}
                                        <input type="file" accept="image/*" className="hidden"
                                            onChange={(e) => { const file = e.target.files?.[0]; if (file) handleUpload(file, 'mobile', e.target); }} />
                                    </label>
                                    <div className="flex items-center gap-2">
                                        <div className="flex-1 h-px bg-black/5" />
                                        <span className="text-[8px] uppercase tracking-widest text-black/25 font-bold">or paste url</span>
                                        <div className="flex-1 h-px bg-black/5" />
                                    </div>
                                    <div className="relative">
                                        <FiImage className="absolute left-3 top-1/2 -translate-y-1/2 text-black/20" size={14} />
                                        <input
                                            type="text"
                                            className="w-full pl-9 pr-4 py-2.5 bg-gray-50 border border-black/8 rounded-xl text-xs outline-none focus:border-[#D0AB64] focus:ring-4 focus:ring-[#D0AB64]/8 transition-all placeholder-black/25"
                                            value={currentBanner.mobileImageUrl || ''}
                                            onChange={e => setCurrentBanner({ ...currentBanner, mobileImageUrl: e.target.value })}
                                            placeholder="https://example.com/mobile-banner.png"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Submit */}
                            <div className="flex gap-3 pt-3 border-t border-black/5">
                                <button type="button" onClick={() => { setIsModalOpen(false); setCurrentBanner({}); }}
                                    className="flex-1 py-3.5 uppercase tracking-wider text-[10px] font-bold text-black/40 hover:text-black transition-colors rounded-xl hover:bg-gray-50">
                                    Cancel
                                </button>
                                <button type="submit" disabled={isSaving || !currentBanner.mobileImageUrl || !currentBanner.desktopImageUrl}
                                    className={`flex-[2] py-3.5 uppercase tracking-wider text-[10px] font-bold rounded-xl transition-all duration-300 shadow-lg flex items-center justify-center gap-2 ${saveSuccess
                                        ? 'bg-green-500 text-white'
                                        : 'bg-[#1A1A1A] text-[#D0AB64] hover:bg-[#D0AB64] hover:text-black shadow-black/20'
                                        } disabled:opacity-60`}>
                                    {saveSuccess ? (
                                        <><FiCheck size={12} /> Saved!</>
                                    ) : isSaving ? (
                                        <><div className="w-3 h-3 border-2 border-current border-t-transparent rounded-full animate-spin" /> Saving...</>
                                    ) : (
                                        currentBanner.id ? 'Update Banner' : 'Add Banner'
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* ====== DELETE MODAL ====== */}
            {isDeleteModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-5">
                    <div className="absolute inset-0 bg-black/70 backdrop-blur-lg" onClick={() => setIsDeleteModalOpen(false)} />
                    <div className="relative bg-white w-full max-w-xs rounded-2xl shadow-2xl p-6 animate-in zoom-in-95 duration-300 text-center">
                        <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
                            <FiTrash2 className="text-red-500" size={20} />
                        </div>
                        <h3 className="text-lg font-serif font-bold text-[#1A1A1A] mb-1">Delete Banner?</h3>
                        <p className="text-xs text-black/40 mb-6 leading-relaxed">This cannot be undone.</p>
                        <div className="flex gap-2.5">
                            <button onClick={() => setIsDeleteModalOpen(false)}
                                className="flex-1 py-3 rounded-xl border border-black/10 text-[10px] font-bold uppercase tracking-widest text-black/50 hover:bg-gray-50 transition-all">
                                Cancel
                            </button>
                            <button onClick={handleDelete} disabled={isDeleting}
                                className="flex-1 py-3 rounded-xl bg-red-500 text-white text-[10px] font-bold uppercase tracking-widest hover:bg-red-600 transition-all flex items-center justify-center gap-1.5 disabled:opacity-60">
                                {isDeleting ? <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <FiTrash2 size={11} />}
                                {isDeleting ? 'Removing' : 'Remove'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
