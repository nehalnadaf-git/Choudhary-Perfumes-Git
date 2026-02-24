"use client";

import React, { useState, useEffect } from 'react';
import { FiPlus, FiEdit2, FiTrash2, FiSearch, FiX, FiMinus, FiExternalLink, FiBox, FiPackage, FiStar, FiAlertTriangle, FiCheck, FiUploadCloud, FiImage } from 'react-icons/fi';
import { Product, VolumeOption } from '@/lib/types';
import Image from 'next/image';
import Link from 'next/link';

function generateSlug(name: string): string {
    return name
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');
}

const DEFAULT_ATTAR_VOLUMES: VolumeOption[] = [
    { volume: '5ml', price: 449 },
    { volume: '10ml', price: 799 },
    { volume: '20ml', price: 1399 },
];

export default function AdminDashboard() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('all');

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [currentProduct, setCurrentProduct] = useState<Partial<Product>>({});
    const [productToDelete, setProductToDelete] = useState<string | null>(null);
    const [isSaving, setIsSaving] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [saveSuccess, setSaveSuccess] = useState(false);

    const fetchProducts = async () => {
        try {
            const res = await fetch('/api/products');
            const data = await res.json();
            setProducts(data);
        } catch (error) {
            console.error('Failed to fetch products', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchProducts(); }, []);

    const filteredProducts = products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.brand.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter;
        return matchesSearch && matchesCategory;
    });

    const handleCategoryChange = (newCategory: 'attar' | 'perfume') => {
        const updated: Partial<Product> = { ...currentProduct, category: newCategory };
        if (newCategory === 'attar') {
            if (!updated.volumes || updated.volumes.length === 0) {
                updated.volumes = DEFAULT_ATTAR_VOLUMES.map(v => ({ ...v }));
            }
        } else {
            updated.volumes = [];
        }
        setCurrentProduct(updated);
    };

    const handleVolumeChange = (index: number, field: keyof VolumeOption, value: string | number) => {
        const volumes = [...(currentProduct.volumes || [])];
        volumes[index] = { ...volumes[index], [field]: field === 'price' ? Number(value) : value };
        setCurrentProduct({ ...currentProduct, volumes });
    };

    const addVolume = () => {
        const volumes = [...(currentProduct.volumes || []), { volume: '', price: 0 }];
        setCurrentProduct({ ...currentProduct, volumes });
    };

    const removeVolume = (index: number) => {
        const volumes = (currentProduct.volumes || []).filter((_, i) => i !== index);
        setCurrentProduct({ ...currentProduct, volumes });
    };

    const handleSaveProduct = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        const isEditing = !!currentProduct.id;
        const url = isEditing ? `/api/products/${currentProduct.id}` : '/api/products';
        const method = isEditing ? 'PUT' : 'POST';
        try {
            const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(currentProduct) });
            if (res.ok) {
                await fetchProducts();
                setSaveSuccess(true);
                setTimeout(() => {
                    setIsModalOpen(false);
                    setCurrentProduct({});
                    setSaveSuccess(false);
                }, 800);
            }
        } catch (error) {
            console.error('Failed to save product', error);
        } finally {
            setIsSaving(false);
        }
    };

    const handleDeleteProduct = async () => {
        if (!productToDelete) return;
        setIsDeleting(true);
        try {
            const res = await fetch(`/api/products/${productToDelete}`, { method: 'DELETE' });
            if (res.ok) {
                await fetchProducts();
                setIsDeleteModalOpen(false);
                setProductToDelete(null);
            }
        } catch (error) {
            console.error('Failed to delete product', error);
        } finally {
            setIsDeleting(false);
        }
    };

    const openEditModal = (product: Product) => { setCurrentProduct(product); setIsModalOpen(true); };
    const openAddModal = () => {
        setCurrentProduct({ inStock: true, featured: false, category: 'attar', gender: 'unisex', volumes: DEFAULT_ATTAR_VOLUMES.map(v => ({ ...v })) });
        setIsModalOpen(true);
    };

    const inStock = products.filter(p => p.inStock).length;
    const bestsellers = products.filter(p => p.featured).length;
    const outOfStock = products.filter(p => !p.inStock).length;

    return (
        <div className="animate-in fade-in duration-500 overflow-x-hidden">

            {/* ====== MOBILE LAYOUT (< lg) ====== */}
            <div className="lg:hidden space-y-3">

                {/* ── Header Row ── */}
                <div className="flex items-center justify-between gap-3">
                    <div className="min-w-0">
                        <h1 className="text-xl font-serif font-bold text-[#1A1A1A] tracking-tight">
                            Products
                        </h1>
                        <p className="text-[9px] uppercase tracking-[0.2em] text-black/35 font-semibold">{filteredProducts.length} items in collection</p>
                    </div>
                    <button
                        onClick={openAddModal}
                        className="flex items-center gap-1.5 bg-[#1A1A1A] text-[#D0AB64] px-4 py-2.5 rounded-lg font-bold tracking-wider uppercase text-[10px] flex-shrink-0"
                    >
                        <FiPlus size={13} /> Add
                    </button>
                </div>

                {/* ── Stats: 4-column grid ── */}
                <div className="grid grid-cols-4 gap-1.5">
                    <MiniStat label="Total" value={products.length} color="#D0AB64" />
                    <MiniStat label="In Stock" value={inStock} color="#22c55e" />
                    <MiniStat label="Best" value={bestsellers} color="#f59e0b" />
                    <MiniStat label="Out" value={outOfStock} color="#ef4444" />
                </div>

                {/* ── Search ── */}
                <div className="relative">
                    <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-black/25" size={14} />
                    <input
                        type="text"
                        placeholder="Search products..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-8 pr-8 py-2.5 bg-white rounded-lg outline-none border border-black/8 focus:border-[#D0AB64]/50 text-xs text-black placeholder-black/30"
                    />
                    {searchTerm && (
                        <button onClick={() => setSearchTerm('')} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-black/30">
                            <FiX size={12} />
                        </button>
                    )}
                </div>

                {/* ── Category Filters (own row, full width) ── */}
                <div className="flex gap-2">
                    {['all', 'attar', 'perfume'].map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setCategoryFilter(cat)}
                            className={`flex-1 py-2.5 rounded-lg text-[10px] font-bold tracking-widest uppercase text-center transition-all ${categoryFilter === cat
                                ? 'bg-[#1A1A1A] text-[#D0AB64]'
                                : 'bg-white text-black/40 border border-black/8'
                                }`}
                        >
                            {cat === 'all' ? 'All' : cat === 'attar' ? 'Attars' : 'Perfumes'}
                        </button>
                    ))}
                </div>

                {/* ── Mobile Product List ── */}
                {loading ? (
                    <div className="py-12 text-center">
                        <div className="w-8 h-8 border-3 border-[#D0AB64] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
                        <p className="text-[9px] uppercase tracking-[0.4em] text-black/20 font-bold">Loading</p>
                    </div>
                ) : filteredProducts.length === 0 ? (
                    <div className="py-12 text-center bg-white rounded-xl border border-dashed border-black/10">
                        <FiBox className="mx-auto text-black/15 mb-2" size={28} />
                        <p className="text-xs text-black/30 font-bold uppercase tracking-widest">No products found</p>
                    </div>
                ) : (
                    <div className="space-y-2">
                        {filteredProducts.map((product) => (
                            <MobileProductCard
                                key={product.id}
                                product={product}
                                onEdit={() => openEditModal(product)}
                                onDelete={() => { setProductToDelete(product.id); setIsDeleteModalOpen(true); }}
                            />
                        ))}
                    </div>
                )}
            </div>

            {/* ====== DESKTOP LAYOUT (>= lg) ====== */}
            <div className="hidden lg:block space-y-8">

                {/* ── Page Title & Primary Action ── */}
                <div className="flex items-end justify-between gap-6 pb-6 border-b border-black/8">
                    <div>
                        <p className="text-[10px] uppercase tracking-[0.4em] text-[#D0AB64] font-bold mb-3">Inventory Management</p>
                        <h1 className="text-5xl font-serif font-bold text-[#1A1A1A] tracking-tight leading-tight">
                            Product <span className="italic text-[#D0AB64]">Collection</span>
                        </h1>
                        <p className="text-xs uppercase tracking-[0.25em] text-black/35 mt-3 font-medium">
                            Manage your fragrance portfolio
                        </p>
                    </div>
                    <button
                        onClick={openAddModal}
                        className="group flex items-center justify-center gap-3 bg-[#1A1A1A] text-[#D0AB64] px-8 py-4 rounded-xl font-bold tracking-[0.15em] uppercase text-xs hover:bg-[#D0AB64] hover:text-black transition-all duration-400 shadow-xl hover:shadow-[#D0AB64]/25 hover:scale-[1.02]"
                    >
                        <FiPlus size={16} className="group-hover:rotate-90 transition-transform duration-300" />
                        Add New Product
                    </button>
                </div>

                {/* ── Stats ── */}
                <div className="grid grid-cols-4 gap-5">
                    <StatBox icon={<FiPackage />} label="Total Products" value={products.length} subtitle="In collection" accent="#D0AB64" />
                    <StatBox icon={<FiCheck />} label="In Stock" value={inStock} subtitle="Ready to ship" accent="#22c55e" />
                    <StatBox icon={<FiStar />} label="Bestsellers" value={bestsellers} subtitle="Top picks" accent="#D0AB64" />
                    <StatBox icon={<FiAlertTriangle />} label="Out of Stock" value={outOfStock} subtitle="Needs attention" accent="#ef4444" />
                </div>

                {/* ── Filters & Search ── */}
                <div className="bg-white p-4 rounded-2xl shadow-sm border border-black/5 flex gap-3">
                    <div className="relative flex-1 group">
                        <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-black/25 group-focus-within:text-[#D0AB64] transition-colors duration-200" size={18} />
                        <input
                            type="text"
                            placeholder="Search by name or brand..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-11 pr-5 py-3.5 bg-gray-50 rounded-xl outline-none border border-transparent focus:border-[#D0AB64]/40 focus:bg-white transition-all duration-200 text-sm text-black placeholder-black/30"
                        />
                        {searchTerm && (
                            <button onClick={() => setSearchTerm('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-black/30 hover:text-black transition-colors">
                                <FiX size={14} />
                            </button>
                        )}
                    </div>
                    <div className="flex gap-2">
                        {['all', 'attar', 'perfume'].map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setCategoryFilter(cat)}
                                className={`px-5 py-3.5 rounded-xl text-xs font-bold tracking-widest uppercase transition-all duration-200 ${categoryFilter === cat
                                    ? 'bg-[#1A1A1A] text-[#D0AB64] shadow-lg'
                                    : 'bg-gray-50 text-black/40 hover:bg-gray-100 hover:text-black'
                                    }`}
                            >
                                {cat === 'all' ? 'All' : cat === 'attar' ? 'Attars' : 'Perfumes'}
                            </button>
                        ))}
                    </div>
                </div>

                {/* ── Desktop Product Grid ── */}
                <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                    {loading ? (
                        <div className="col-span-full py-24 text-center">
                            <div className="relative w-14 h-14 mx-auto mb-6">
                                <div className="absolute inset-0 border-4 border-[#D0AB64]/20 rounded-full" />
                                <div className="absolute inset-0 border-4 border-[#D0AB64] border-t-transparent rounded-full animate-spin" />
                            </div>
                            <p className="uppercase tracking-[0.5em] text-xs font-bold text-black/20">Loading Collection</p>
                        </div>
                    ) : filteredProducts.length === 0 ? (
                        <div className="col-span-full py-24 text-center bg-white rounded-2xl border-2 border-dashed border-black/8">
                            <FiBox className="mx-auto text-black/15 mb-4" size={40} />
                            <p className="uppercase tracking-widest text-sm font-bold text-black/30">No products found</p>
                            <p className="text-xs text-black/20 mt-2">Try adjusting your search or filters</p>
                        </div>
                    ) : (
                        filteredProducts.map((product) => (
                            <DesktopProductCard
                                key={product.id}
                                product={product}
                                onEdit={() => openEditModal(product)}
                                onDelete={() => { setProductToDelete(product.id); setIsDeleteModalOpen(true); }}
                            />
                        ))
                    )}
                </div>
            </div>

            {/* ====== MODALS (shared) ====== */}

            {/* ── Add/Edit Product Modal ── */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-end lg:items-center justify-center lg:p-8">
                    <div className="absolute inset-0 bg-black/70 backdrop-blur-lg" onClick={() => { setIsModalOpen(false); setCurrentProduct({}); }} />
                    <div className="relative bg-white w-full lg:max-w-2xl rounded-t-2xl lg:rounded-2xl shadow-2xl overflow-y-auto max-h-[92vh] animate-in slide-in-from-bottom-4 lg:zoom-in-95 duration-300">

                        {/* Modal Header */}
                        <div className="sticky top-0 bg-white z-10 px-5 lg:px-8 pt-5 lg:pt-8 pb-4 lg:pb-6 border-b border-black/5 flex items-center justify-between">
                            <div>
                                <p className="text-[9px] lg:text-[10px] uppercase tracking-[0.4em] text-[#D0AB64] font-bold mb-0.5">
                                    {currentProduct.id ? 'Editing' : 'New Product'}
                                </p>
                                <h2 className="text-lg lg:text-2xl font-serif font-bold text-[#1A1A1A]">
                                    {currentProduct.id ? 'Update Product' : 'Add to Collection'}
                                </h2>
                            </div>
                            <button
                                onClick={() => { setIsModalOpen(false); setCurrentProduct({}); }}
                                className="p-2 rounded-lg text-black/30 hover:text-black hover:bg-gray-100 transition-all"
                            >
                                <FiX size={18} />
                            </button>
                        </div>

                        {/* Modal Form */}
                        <form onSubmit={handleSaveProduct} className="p-5 lg:p-8 space-y-4 lg:space-y-6">

                            {/* Row 1: Name + Brand */}
                            <div className="grid grid-cols-2 gap-3 lg:gap-5">
                                <FieldGroup label="Name">
                                    <FormInput required value={currentProduct.name || ''} onChange={v => {
                                        const updated: Partial<Product> = { ...currentProduct, name: v };
                                        // Auto-generate slug from name (only if slug hasn't been manually customized)
                                        if (!currentProduct.id || currentProduct.slug === generateSlug(currentProduct.name || '')) {
                                            updated.slug = generateSlug(v);
                                        }
                                        setCurrentProduct(updated);
                                    }} placeholder="Royal Musk" />
                                </FieldGroup>
                                <FieldGroup label="Brand">
                                    <FormInput required value={currentProduct.brand || ''} onChange={v => setCurrentProduct({ ...currentProduct, brand: v })} placeholder="Choudhary" />
                                </FieldGroup>
                            </div>

                            {/* Row 2: Slug + Price */}
                            <div className="grid grid-cols-2 gap-3 lg:gap-5">
                                <FieldGroup label="Slug">
                                    <FormInput required value={currentProduct.slug || ''} onChange={v => setCurrentProduct({ ...currentProduct, slug: generateSlug(v) })} placeholder="royal-musk" />
                                </FieldGroup>
                                <FieldGroup label="Price (₹)">
                                    <FormInput type="number" required value={String(currentProduct.price || '')} onChange={v => setCurrentProduct({ ...currentProduct, price: Number(v) })} placeholder="799" />
                                </FieldGroup>
                            </div>

                            {/* Row 3: Category + Gender */}
                            <div className="grid grid-cols-2 gap-3 lg:gap-5">
                                <FieldGroup label="Category">
                                    <FormSelect
                                        value={currentProduct.category || 'attar'}
                                        onChange={(v) => handleCategoryChange(v as 'attar' | 'perfume')}
                                        options={[{ value: 'attar', label: 'Attar' }, { value: 'perfume', label: 'Perfume' }]}
                                    />
                                </FieldGroup>
                                <FieldGroup label="Gender">
                                    <FormSelect
                                        value={currentProduct.gender || 'unisex'}
                                        onChange={(v) => setCurrentProduct({ ...currentProduct, gender: v as any })}
                                        options={[{ value: 'unisex', label: 'Unisex' }, { value: 'men', label: 'Men' }, { value: 'women', label: 'Women' }]}
                                    />
                                </FieldGroup>
                            </div>

                            {/* Image Upload */}
                            <FieldGroup label="Product Image">
                                <div className="space-y-2">
                                    {/* Upload area */}
                                    <label className="relative flex flex-col items-center justify-center w-full h-32 bg-gray-50 border-2 border-dashed border-black/10 rounded-xl cursor-pointer hover:border-[#D0AB64]/50 hover:bg-[#D0AB64]/5 transition-all overflow-hidden">
                                        {currentProduct.imageUrl ? (
                                            <>
                                                <Image
                                                    src={currentProduct.imageUrl}
                                                    alt="Preview"
                                                    fill
                                                    className="object-cover"
                                                    sizes="600px"
                                                />
                                                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                                                    <div className="text-white text-center">
                                                        <FiUploadCloud size={20} className="mx-auto mb-1" />
                                                        <p className="text-[9px] font-bold uppercase tracking-widest">Change Image</p>
                                                    </div>
                                                </div>
                                            </>
                                        ) : isUploading ? (
                                            <div className="text-center">
                                                <div className="w-6 h-6 border-2 border-[#D0AB64] border-t-transparent rounded-full animate-spin mx-auto mb-2" />
                                                <p className="text-[9px] font-bold uppercase tracking-widest text-black/40">Uploading...</p>
                                            </div>
                                        ) : (
                                            <div className="text-center py-4">
                                                <FiUploadCloud size={24} className="mx-auto mb-2 text-black/20" />
                                                <p className="text-[10px] font-bold uppercase tracking-widest text-black/40">Tap to upload</p>
                                                <p className="text-[8px] text-black/25 mt-1">JPG, PNG, WebP • Max 5MB</p>
                                            </div>
                                        )}
                                        <input
                                            type="file"
                                            accept="image/jpeg,image/png,image/webp,image/avif,image/gif"
                                            className="hidden"
                                            onChange={async (e) => {
                                                const file = e.target.files?.[0];
                                                if (!file) return;
                                                setIsUploading(true);
                                                try {
                                                    const formData = new FormData();
                                                    formData.append('file', file);
                                                    const res = await fetch('/api/upload', { method: 'POST', body: formData });
                                                    const data = await res.json();
                                                    if (res.ok && data.imageUrl) {
                                                        setCurrentProduct({ ...currentProduct, imageUrl: data.imageUrl });
                                                    } else {
                                                        alert(data.error || 'Upload failed');
                                                    }
                                                } catch (err) {
                                                    alert('Upload failed. Please try again.');
                                                } finally {
                                                    setIsUploading(false);
                                                }
                                            }}
                                        />
                                    </label>

                                    {/* Or paste URL */}
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
                                            value={currentProduct.imageUrl || ''}
                                            onChange={e => setCurrentProduct({ ...currentProduct, imageUrl: e.target.value })}
                                            placeholder="https://example.com/image.jpg"
                                        />
                                    </div>
                                </div>
                            </FieldGroup>

                            {/* Description */}
                            <FieldGroup label="Description">
                                <textarea
                                    rows={2}
                                    className="w-full px-4 py-3 bg-gray-50 border border-black/8 rounded-xl text-sm outline-none focus:border-[#D0AB64] focus:ring-4 focus:ring-[#D0AB64]/8 transition-all resize-none"
                                    value={currentProduct.description || ''}
                                    onChange={e => setCurrentProduct({ ...currentProduct, description: e.target.value })}
                                    placeholder="A luxurious blend of..."
                                />
                            </FieldGroup>

                            {/* Toggles */}
                            <div className="grid grid-cols-2 gap-3">
                                <ToggleField
                                    label="In Stock"
                                    value={!!currentProduct.inStock}
                                    onChange={v => setCurrentProduct({ ...currentProduct, inStock: v })}
                                />
                                <ToggleField
                                    label="Bestseller"
                                    value={!!currentProduct.featured}
                                    onChange={v => setCurrentProduct({ ...currentProduct, featured: v })}
                                />
                            </div>

                            {/* Volume Options (Attar only) */}
                            {currentProduct.category === 'attar' && (
                                <div>
                                    <div className="flex items-center justify-between mb-3">
                                        <label className="text-[9px] lg:text-[10px] font-black tracking-[0.3em] uppercase text-black/40">Volumes</label>
                                        <button type="button" onClick={addVolume} className="text-[9px] font-bold tracking-widest uppercase text-[#D0AB64] hover:text-black transition-colors flex items-center gap-1">
                                            <FiPlus size={10} /> Add
                                        </button>
                                    </div>
                                    <div className="space-y-2">
                                        {(currentProduct.volumes || []).map((vol, index) => (
                                            <div key={index} className="flex gap-2 items-center">
                                                <input
                                                    className="flex-1 px-3 py-2.5 bg-gray-50 border border-black/8 rounded-lg text-xs outline-none focus:border-[#D0AB64] transition-all"
                                                    placeholder="12ml"
                                                    value={vol.volume}
                                                    onChange={e => handleVolumeChange(index, 'volume', e.target.value)}
                                                />
                                                <input
                                                    type="number"
                                                    className="flex-1 px-3 py-2.5 bg-gray-50 border border-black/8 rounded-lg text-xs outline-none focus:border-[#D0AB64] transition-all"
                                                    placeholder="₹ Price"
                                                    value={vol.price}
                                                    onChange={e => handleVolumeChange(index, 'price', e.target.value)}
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => removeVolume(index)}
                                                    className="p-2 text-red-400 hover:text-red-600 rounded-lg transition-all"
                                                >
                                                    <FiMinus size={12} />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Submit */}
                            <div className="flex gap-3 pt-3 border-t border-black/5">
                                <button
                                    type="button"
                                    onClick={() => { setIsModalOpen(false); setCurrentProduct({}); }}
                                    className="flex-1 py-3.5 uppercase tracking-wider text-[10px] font-bold text-black/40 hover:text-black transition-colors rounded-xl hover:bg-gray-50"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={isSaving}
                                    className={`flex-[2] py-3.5 uppercase tracking-wider text-[10px] font-bold rounded-xl transition-all duration-300 shadow-lg flex items-center justify-center gap-2 ${saveSuccess
                                        ? 'bg-green-500 text-white'
                                        : 'bg-[#1A1A1A] text-[#D0AB64] hover:bg-[#D0AB64] hover:text-black shadow-black/20'
                                        } disabled:opacity-60`}
                                >
                                    {saveSuccess ? (
                                        <><FiCheck size={12} /> Saved!</>
                                    ) : isSaving ? (
                                        <><div className="w-3 h-3 border-2 border-current border-t-transparent rounded-full animate-spin" /> Saving...</>
                                    ) : (
                                        currentProduct.id ? 'Update' : 'Add Product'
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* ── Delete Confirm Modal ── */}
            {isDeleteModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-5">
                    <div className="absolute inset-0 bg-black/70 backdrop-blur-lg" onClick={() => setIsDeleteModalOpen(false)} />
                    <div className="relative bg-white w-full max-w-xs rounded-2xl shadow-2xl p-6 animate-in zoom-in-95 duration-300 text-center">
                        <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
                            <FiTrash2 className="text-red-500" size={20} />
                        </div>
                        <h3 className="text-lg font-serif font-bold text-[#1A1A1A] mb-1">Remove Product?</h3>
                        <p className="text-xs text-black/40 mb-6 leading-relaxed">
                            This cannot be undone.
                        </p>
                        <div className="flex gap-2.5">
                            <button
                                onClick={() => setIsDeleteModalOpen(false)}
                                className="flex-1 py-3 rounded-xl border border-black/10 text-[10px] font-bold uppercase tracking-widest text-black/50 hover:bg-gray-50 transition-all"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDeleteProduct}
                                disabled={isDeleting}
                                className="flex-1 py-3 rounded-xl bg-red-500 text-white text-[10px] font-bold uppercase tracking-widest hover:bg-red-600 transition-all flex items-center justify-center gap-1.5 disabled:opacity-60"
                            >
                                {isDeleting ? (
                                    <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                ) : (
                                    <FiTrash2 size={11} />
                                )}
                                {isDeleting ? 'Removing' : 'Remove'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Hide scrollbar utility */}
            <style jsx>{`
                .no-scrollbar::-webkit-scrollbar { display: none; }
                .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
            `}</style>
        </div>
    );
}


/* ═══════════════════════════════════════════════
   MOBILE PRODUCT CARD — horizontal row/list item
   ═══════════════════════════════════════════════ */
function MobileProductCard({ product, onEdit, onDelete }: { product: Product; onEdit: () => void; onDelete: () => void }) {
    return (
        <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-black/5 flex items-center gap-3 p-2.5">
            {/* Square thumbnail — clean, no overlays */}
            <div className="relative w-16 h-16 rounded-lg bg-gradient-to-br from-gray-100 to-gray-50 overflow-hidden flex-shrink-0">
                {product.imageUrl ? (
                    <Image src={product.imageUrl} alt={product.name} fill className="object-cover" sizes="64px" />
                ) : (
                    <div className="flex items-center justify-center h-full">
                        <FiBox size={18} className="text-black/10" />
                    </div>
                )}
            </div>

            {/* Info — middle section grows */}
            <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 mb-0.5">
                    <h3 className="text-[13px] font-serif font-bold text-black truncate leading-tight">{product.name}</h3>
                </div>
                <p className="text-[9px] uppercase tracking-[0.2em] text-black/35 font-semibold truncate">{product.brand}</p>
                <div className="flex items-center gap-2 mt-1">
                    <div className="flex items-center gap-1">
                        {product.featured && <span className="w-1.5 h-1.5 rounded-full flex-shrink-0 bg-[#D0AB64]" title="Bestseller" />}
                        <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${product.inStock ? 'bg-emerald-500' : 'bg-red-500'}`} title={product.inStock ? 'In Stock' : 'Out of Stock'} />
                    </div>
                    <span className="text-xs font-bold text-black">₹{product.price}</span>
                    <span className="text-[8px] uppercase tracking-widest text-black/25 font-bold">{product.category}</span>
                </div>
            </div>

            {/* Actions — right side */}
            <div className="flex items-center gap-1 flex-shrink-0">
                <button
                    onClick={onEdit}
                    className="p-2 bg-[#1A1A1A] text-[#D0AB64] rounded-lg"
                >
                    <FiEdit2 size={13} />
                </button>
                <button onClick={onDelete} className="p-2 text-red-400 rounded-lg">
                    <FiTrash2 size={13} />
                </button>
            </div>
        </div>
    );
}


/* ═══════════════════════════════════════════════
   DESKTOP PRODUCT CARD — full detailed card
   ═══════════════════════════════════════════════ */
function DesktopProductCard({ product, onEdit, onDelete }: { product: Product; onEdit: () => void; onDelete: () => void }) {
    return (
        <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-black/5 flex flex-col hover:-translate-y-1">
            <div className="relative aspect-square w-full bg-gradient-to-br from-gray-50 to-white overflow-hidden">
                {product.imageUrl ? (
                    <Image src={product.imageUrl} alt={product.name} fill className="object-contain p-3 group-hover:scale-105 transition-transform duration-700" />
                ) : (
                    <div className="flex items-center justify-center h-full">
                        <FiBox size={48} className="text-black/10" />
                    </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            </div>

            <div className="p-5 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-3">
                    <div className="flex-1 min-w-0 pr-3">
                        <p className="text-[9px] uppercase tracking-[0.4em] text-[#D0AB64] font-bold mb-1">{product.brand}</p>
                        <h3 className="text-base font-serif font-bold text-black tracking-tight group-hover:text-[#D0AB64] transition-colors truncate">{product.name}</h3>
                    </div>
                    <div className="text-right flex-shrink-0 flex flex-col items-end gap-0.5">
                        <p className="text-base font-bold text-black">₹{product.price}</p>
                        <p className="text-[9px] text-black/30 font-medium uppercase tracking-wide">{product.category}</p>
                        <div className="flex items-center gap-1.5 mt-0.5">
                            {product.featured && <span className="w-1.5 h-1.5 rounded-full bg-[#D0AB64]" title="Bestseller" />}
                            <span className={`w-1.5 h-1.5 rounded-full ${product.inStock ? 'bg-emerald-500' : 'bg-red-500'}`} title={product.inStock ? 'In Stock' : 'Out of Stock'} />
                        </div>
                    </div>
                </div>



                <div className="mt-auto pt-4 border-t border-black/5 flex items-center justify-between gap-2">
                    <div className="flex gap-2 flex-1">
                        <button
                            onClick={onEdit}
                            className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2.5 bg-[#1A1A1A] text-[#D0AB64] rounded-xl text-[10px] font-bold tracking-widest uppercase hover:bg-[#D0AB64] hover:text-black transition-all duration-300"
                        >
                            <FiEdit2 size={12} /> Edit
                        </button>
                        <button
                            onClick={onDelete}
                            className="p-2.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
                        >
                            <FiTrash2 size={14} />
                        </button>
                    </div>
                    <Link
                        href={`/product/${product.slug}`}
                        target="_blank"
                        className="p-2.5 text-black/25 hover:text-[#D0AB64] hover:bg-[#D0AB64]/10 rounded-xl transition-all"
                        title="View in Shop"
                    >
                        <FiExternalLink size={16} />
                    </Link>
                </div>
            </div>
        </div>
    );
}


/* ═══════════════════════════════════════════════
   SUB-COMPONENTS
   ═══════════════════════════════════════════════ */

/* Mini stat pill for mobile — compact 4-col grid cell */
function MiniStat({ label, value, color }: { label: string; value: number; color: string }) {
    return (
        <div className="bg-white rounded-lg border border-black/5 py-2 px-2 text-center">
            <span className="text-lg font-serif font-bold block leading-none" style={{ color }}>{value}</span>
            <span className="text-[7px] uppercase tracking-wider text-black/40 font-bold mt-1 block">{label}</span>
        </div>
    );
}

/* Desktop stat box - full size */
function StatBox({ icon, label, value, subtitle, accent }: { icon: React.ReactNode; label: string; value: number; subtitle: string; accent: string }) {
    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-black/5 hover:border-black/10 transition-all duration-300 group hover:shadow-md">
            <div className="flex items-start justify-between mb-4">
                <div className="p-2.5 rounded-xl transition-all duration-300" style={{ background: `${accent}15` }}>
                    <span className="text-lg block" style={{ color: accent }}>{icon}</span>
                </div>
            </div>
            <div className="text-3xl font-serif font-bold mb-1 transition-all duration-300 group-hover:scale-105 origin-left" style={{ color: accent }}>
                {value}
            </div>
            <p className="text-xs font-black tracking-[0.2em] uppercase text-black/60 mb-1">{label}</p>
            <p className="text-[10px] text-black/25 uppercase tracking-widest font-medium">{subtitle}</p>
        </div>
    );
}

/* Form helpers */
function FieldGroup({ label, children }: { label: string; children: React.ReactNode }) {
    return (
        <div className="space-y-1.5">
            <label className="text-[9px] lg:text-[10px] font-black tracking-[0.3em] uppercase text-black/40 block">{label}</label>
            {children}
        </div>
    );
}

function FormInput({ value, onChange, placeholder, required, type = 'text' }: {
    value: string; onChange: (v: string) => void; placeholder?: string; required?: boolean; type?: string;
}) {
    return (
        <input
            required={required}
            type={type}
            className="w-full px-4 py-3 bg-gray-50 border border-black/8 rounded-xl text-sm outline-none focus:border-[#D0AB64] focus:ring-4 focus:ring-[#D0AB64]/8 transition-all placeholder-black/25"
            value={value}
            onChange={e => onChange(e.target.value)}
            placeholder={placeholder}
        />
    );
}

function FormSelect({ value, onChange, options }: { value: string; onChange: (v: string) => void; options: { value: string; label: string }[] }) {
    return (
        <select
            value={value}
            onChange={e => onChange(e.target.value)}
            className="w-full px-4 py-3 bg-gray-50 border border-black/8 rounded-xl text-sm outline-none focus:border-[#D0AB64] focus:ring-4 focus:ring-[#D0AB64]/8 transition-all appearance-none cursor-pointer"
        >
            {options.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
        </select>
    );
}

function ToggleField({ label, value, onChange }: { label: string; value: boolean; onChange: (v: boolean) => void }) {
    return (
        <div
            className={`px-3 py-3 rounded-xl border-2 cursor-pointer transition-all duration-200 flex items-center justify-between ${value ? 'border-[#D0AB64] bg-[#D0AB64]/5' : 'border-black/8 bg-gray-50'}`}
            onClick={() => onChange(!value)}
        >
            <span className="text-[10px] font-bold uppercase tracking-widest text-black/70">{label}</span>
            <div className={`w-9 h-5 rounded-full transition-all duration-200 relative ${value ? 'bg-[#D0AB64]' : 'bg-black/15'}`}>
                <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow-md transition-all duration-200 ${value ? 'left-[18px]' : 'left-0.5'}`} />
            </div>
        </div>
    );
}
