import fs from 'fs';
import path from 'path';
import { Product } from './types';

const DATA_DIR = path.join(process.cwd(), 'data');
const PRODUCTS_FILE = path.join(DATA_DIR, 'products.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
}

export function getProducts(): Product[] {
    if (!fs.existsSync(PRODUCTS_FILE)) {
        return [];
    }
    const data = fs.readFileSync(PRODUCTS_FILE, 'utf8');
    try {
        return JSON.parse(data);
    } catch (error) {
        console.error("Error parsing products.json:", error);
        return [];
    }
}

export function saveProducts(products: Product[]): void {
    fs.writeFileSync(PRODUCTS_FILE, JSON.stringify(products, null, 2), 'utf8');
}

export function getProductById(id: string): Product | undefined {
    const products = getProducts();
    return products.find(p => p.id === id);
}

export function addProduct(product: Product): void {
    const products = getProducts();
    products.push(product);
    saveProducts(products);
}

export function updateProduct(id: string, updates: Partial<Product>): Product | null {
    const products = getProducts();
    const index = products.findIndex(p => p.id === id);

    if (index === -1) return null;

    products[index] = { ...products[index], ...updates };
    saveProducts(products);
    return products[index];
}

export function deleteProduct(id: string): boolean {
    const products = getProducts();
    const filtered = products.filter(p => p.id !== id);

    if (filtered.length === products.length) return false;

    saveProducts(filtered);
    return true;
}
