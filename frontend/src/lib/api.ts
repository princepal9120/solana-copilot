import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';

export const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add request interceptor to include auth token if available
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const chatApi = {
    sendMessage: async (message: string, history: any[]) => {
        const response = await api.post('/chat/send', { message, history });
        return response.data;
    },
    getHistory: async () => {
        const response = await api.get('/chat/history');
        return response.data;
    }
};

export const authApi = {
    requestChallenge: async (wallet: string) => {
        const response = await api.post('/auth/request-challenge', { wallet });
        return response.data;
    },
    verifySignature: async (wallet: string, message: string, signature: string) => {
        const response = await api.post('/auth/verify-signature', { wallet, message, signature });
        return response.data;
    }
};
