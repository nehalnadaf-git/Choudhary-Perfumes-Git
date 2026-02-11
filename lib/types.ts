
export interface Product {
    id: string;
    name: string;
    slug: string;
    brand: string;
    category: 'attar' | 'perfume';
    type?: string;
    volume: string;
    price: number;
    description: string;
    featured: boolean;
    inStock: boolean;
    imageUrl: string;
    notes?: {
        top: string;
        heart: string;
        base: string;
    };
    gender?: 'men' | 'women' | 'unisex';
}

export interface Review {
    id: string;
    customerName: string;
    rating: number;
    date: string;
    productName: string;
    comment: string;
    verified: boolean;
}
