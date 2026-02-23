import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'All Products | Choudhary Perfumes',
    description: 'Explore our curated selection of premium fragrances, from timeless traditional attars to modern designer master copies.',
};

export default function ProductsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
