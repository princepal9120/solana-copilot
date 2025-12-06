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

// Portfolio API
export const portfolioApi = {
    getPortfolio: async () => {
        const response = await api.get('/portfolio/');
        return response.data;
    },
    getHoldings: async () => {
        const response = await api.get('/portfolio/holdings');
        return response.data;
    },
    getPerformance: async (timeframe: string = '30d') => {
        const response = await api.get(`/portfolio/performance?timeframe=${timeframe}`);
        return response.data;
    },
    getRisk: async () => {
        const response = await api.get('/portfolio/risk');
        return response.data;
    },
    createSnapshot: async () => {
        const response = await api.post('/portfolio/snapshot');
        return response.data;
    }
};

// Automations API
export const automationsApi = {
    getAutomations: async (status?: string, type?: string) => {
        const params = new URLSearchParams();
        if (status) params.append('status', status);
        if (type) params.append('automation_type', type);
        const response = await api.get(`/automations/?${params.toString()}`);
        return response.data;
    },
    getAutomation: async (id: string) => {
        const response = await api.get(`/automations/${id}`);
        return response.data;
    },
    createAutomation: async (data: {
        automation_type: 'dca' | 'recurring_swap' | 'rebalance';
        name: string;
        source_token: string;
        dest_token: string;
        amount: number;
        frequency_seconds: number;
        metadata?: Record<string, unknown>;
    }) => {
        const response = await api.post('/automations/', data);
        return response.data;
    },
    pauseAutomation: async (id: string) => {
        const response = await api.post(`/automations/${id}/pause`);
        return response.data;
    },
    resumeAutomation: async (id: string) => {
        const response = await api.post(`/automations/${id}/resume`);
        return response.data;
    },
    deleteAutomation: async (id: string) => {
        const response = await api.delete(`/automations/${id}`);
        return response.data;
    },
    getExecutions: async (automationId: string, limit: number = 50) => {
        const response = await api.get(`/automations/${automationId}/executions?limit=${limit}`);
        return response.data;
    }
};

// Transactions API
export const transactionsApi = {
    getTransactions: async (limit: number = 50, offset: number = 0, action?: string, status?: string) => {
        const params = new URLSearchParams();
        params.append('limit', limit.toString());
        params.append('offset', offset.toString());
        if (action) params.append('action', action);
        if (status) params.append('status', status);
        const response = await api.get(`/transactions/?${params.toString()}`);
        return response.data;
    },
    getTransaction: async (id: string) => {
        const response = await api.get(`/transactions/${id}`);
        return response.data;
    },
    getStats: async (timeframe: string = '30d') => {
        const response = await api.get(`/transactions/stats/summary?timeframe=${timeframe}`);
        return response.data;
    },
    getRecentActivity: async (limit: number = 10) => {
        const response = await api.get(`/transactions/recent/activity?limit=${limit}`);
        return response.data;
    }
};
