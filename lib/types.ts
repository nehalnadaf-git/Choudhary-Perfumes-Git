
export interface VolumeOption {
    volume: string;
    price: number;
}

export interface Product {
    id: string;
    name: string;
    slug: string;
    brand: string;
    category: 'attar' | 'perfume';
    type?: string;
    volume: string;
    price: number;
    volumes?: VolumeOption[];
    description: string;
    featured: boolean;
    inStock: boolean;
    imageUrl: string;
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
    avatarColor?: string;
}
