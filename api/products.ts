import axios from 'axios';

export interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating: {
        rate: number;
        count: number;
    };
}

const API_URL = 'https://fakestoreapi.com';

const api = axios.create({
    baseURL: API_URL,
});

export const getProducts = async (): Promise<Product[]> => {
    try {
        const response = await api.get<Product[]>('/products');
        return response.data;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
};

export const getProductDetails = async (id: number): Promise<Product> => {
    try {
        const response = await api.get<Product>(`/products/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching product details for id ${id}:`, error);
        throw error;
    }
};
