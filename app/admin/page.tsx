
"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { products as initialProducts } from '@/lib/products';
import { FiBox, FiPlus, FiEdit2, FiTrash2, FiSearch } from 'react-icons/fi';
import { FaSignOutAlt } from 'react-icons/fa';

export default function AdminDashboard() {
    const [products, setProducts] = useState(initialProducts);
    const [searchTerm, setSearchTerm] = useState('');

    const filteredProducts = products.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.brand.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-gray-100 flex font-sans">
            {/* Sidebar */}
            <aside className="w-64 bg-black text-white flex-shrink-0 hidden md:block">
                <div className="p-6">
                    <h2 className="text-2xl font-serif font-bold text-gold">Admin Panel</h2>
                    <p className="text-xs text-gray-400 mt-1">Choudhary Perfumes</p>
                </div>

                <nav className="mt-6 px-4 space-y-2">
                    <Link href="/admin" className="flex items-center gap-3 px-4 py-3 bg-white/10 text-gold rounded-lg font-medium">
                        <FiBox size={18} /> Products
                    </Link>
                    <div className="px-4 py-3 text-gray-500 cursor-not-allowed flex items-center gap-3">
                        <span className="w-[18px]" /> Orders (Coming Soon)
                    </div>
                </nav>

                <div className="absolute bottom-6 left-0 right-0 px-4">
                    <button className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors w-full px-4 py-2">
                        <FaSignOutAlt /> Sign Out
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-auto">
                {/* Top Header */}
                <header className="bg-white shadow-sm sticky top-0 z-10 px-8 py-4 flex justify-between items-center">
                    <h1 className="text-xl font-bold text-gray-800 flex items-center gap-2 md:hidden">
                        <span className="text-gold">CP</span> Admin
                    </h1>
                    <h1 className="text-xl font-bold text-gray-800 hidden md:block">Product Management</h1>
                    <div className="flex items-center gap-4">
                        <div className="w-8 h-8 bg-gold rounded-full flex items-center justify-center text-black font-bold">
                            A
                        </div>
                    </div>
                </header>

                <div className="p-4 md:p-8">
                    {/* Actions Bar */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                        <div className="relative w-full md:w-96">
                            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search products..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-gold"
                            />
                        </div>
                        <button className="flex items-center gap-2 bg-black text-white px-6 py-2 rounded-lg hover:bg-gold hover:text-black transition-colors shadow-lg">
                            <FiPlus /> Add New Product
                        </button>
                    </div>

                    {/* Products Table */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-gray-50 border-b border-gray-200">
                                    <tr>
                                        <th className="px-6 py-4 font-semibold text-gray-600 text-sm">Product Name</th>
                                        <th className="px-6 py-4 font-semibold text-gray-600 text-sm">Brand</th>
                                        <th className="px-6 py-4 font-semibold text-gray-600 text-sm">Category</th>
                                        <th className="px-6 py-4 font-semibold text-gray-600 text-sm">Price</th>
                                        <th className="px-6 py-4 font-semibold text-gray-600 text-sm">Stock</th>
                                        <th className="px-6 py-4 font-semibold text-gray-600 text-sm text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {filteredProducts.map((product) => (
                                        <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="font-medium text-gray-900">{product.name}</div>
                                                <div className="text-xs text-gray-500">{product.volume}</div>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-600">{product.brand}</td>
                                            <td className="px-6 py-4 text-sm text-gray-600">
                                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${product.category === 'attar' ? 'bg-amber-100 text-amber-800' : 'bg-purple-100 text-purple-800'
                                                    }`}>
                                                    {product.category}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-sm font-medium text-gray-900">₹{product.price}</td>
                                            <td className="px-6 py-4">
                                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${product.inStock ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                                    }`}>
                                                    {product.inStock ? 'In Stock' : 'Out of Stock'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-right space-x-3">
                                                <button className="text-blue-500 hover:text-blue-700 transition-colors" title="Edit">
                                                    <FiEdit2 size={18} />
                                                </button>
                                                <button className="text-red-400 hover:text-red-600 transition-colors" title="Delete">
                                                    <FiTrash2 size={18} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        {filteredProducts.length === 0 && (
                            <div className="p-12 text-center text-gray-500">
                                No products found matching "{searchTerm}"
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}
