import { useState, useEffect, useCallback } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { authApi } from '@/lib/api';
import bs58 from 'bs58';
import { toast } from 'sonner';

export function useAuth() {
    const { publicKey, signMessage, disconnect } = useWallet();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // Check for existing token on mount
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsAuthenticated(true);
        }
    }, []);

    const login = useCallback(async () => {
        if (!publicKey || !signMessage) return;

        try {
            setIsLoading(true);
            const walletAddress = publicKey.toString();

            // 1. Request Challenge
            const { message, nonce } = await authApi.requestChallenge(walletAddress);

            // 2. Sign Message
            const encodedMessage = new TextEncoder().encode(message);
            const signature = await signMessage(encodedMessage);
            const signatureBase58 = bs58.encode(signature);

            // 3. Verify Signature
            const { token } = await authApi.verifySignature(walletAddress, message, signatureBase58);

            // 4. Store Token
            localStorage.setItem('token', token);
            setIsAuthenticated(true);
            toast.success('Successfully logged in!');

        } catch (error) {
            console.error('Login failed:', error);
            toast.error('Login failed. Please try again.');
            disconnect();
        } finally {
            setIsLoading(false);
        }
    }, [publicKey, signMessage, disconnect]);

    const logout = useCallback(() => {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
        disconnect();
        toast.info('Logged out');
    }, [disconnect]);

    return {
        isAuthenticated,
        login,
        logout,
        isLoading
    };
}
