
"use client";
import ProductCard from "./ProductCard";
import { Product } from "@/lib/types";

interface ProductGridProps {
    products: Product[];
    title?: string;
}

const ProductGrid = ({ products, title }: ProductGridProps) => {
    if (!products || products.length === 0) {
        return (
            <div className="text-center py-20 text-gray-500">
                <p>No products found.</p>
            </div>
        );
    }

    return (
        <section className="py-16 md:py-24 bg-gray-light">
            <div className="container mx-auto px-4">
                {title && (
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-5xl font-serif font-bold text-black mb-4">{title}</h2>
                        <div className="w-24 h-1 bg-gold mx-auto" />
                    </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ProductGrid;
