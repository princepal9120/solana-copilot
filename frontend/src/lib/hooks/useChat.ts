import { useEffect, useRef, useState, useCallback } from "react";
import { useAuthStore } from "@/store/authStore";
import { toast } from "sonner";

export interface Message {
    id: string;
    role: "user" | "assistant";
    content: string;
    timestamp: number;
    status?: "sending" | "sent" | "error";
    action?: string;
    data?: any;
}

export function useChat() {
    const { token } = useAuthStore();
    const [messages, setMessages] = useState<Message[]>([]);
    const [isConnected, setIsConnected] = useState(false);
    const wsRef = useRef<WebSocket | null>(null);

    const connect = useCallback(() => {
        if (!token || wsRef.current) return;

        const wsUrl = process.env.NEXT_PUBLIC_WS_URL || "ws://localhost:8000/api/v1/chat/ws";
        const ws = new WebSocket(`${wsUrl}?token=${token}`);

        ws.onopen = () => {
            setIsConnected(true);
            console.log("Connected to chat");
        };

        ws.onclose = () => {
            setIsConnected(false);
            wsRef.current = null;
            // Reconnect after delay
            setTimeout(connect, 3000);
        };

        ws.onerror = (error) => {
            console.error("WebSocket error:", error);
            toast.error("Connection error");
        };

        ws.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data);
                handleMessage(data);
            } catch (e) {
                console.error("Failed to parse message:", e);
            }
        };

        wsRef.current = ws;
    }, [token]);

    useEffect(() => {
        connect();
        return () => {
            if (wsRef.current) {
                wsRef.current.close();
            }
        };
    }, [connect]);

    const handleMessage = (data: any) => {
        if (data.type === "response") {
            const newMessage: Message = {
                id: data.id,
                role: "assistant",
                content: data.message || getMessageFromAction(data),
                timestamp: Date.now(),
                action: data.action,
                data: data,
            };
            setMessages((prev) => [...prev, newMessage]);
        }
    };

    const getMessageFromAction = (data: any) => {
        if (data.status === "awaiting_approval") {
            return "Please review and approve this transaction.";
        }
        if (data.preview) {
            return `I've prepared a ${data.action} transaction.`;
        }
        return "";
    };

    const sendMessage = useCallback((content: string) => {
        if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) {
            toast.error("Not connected");
            return;
        }

        const id = Date.now().toString();
        const message: Message = {
            id,
            role: "user",
            content,
            timestamp: Date.now(),
            status: "sent",
        };

        setMessages((prev) => [...prev, message]);

        wsRef.current.send(JSON.stringify({
            type: "message",
            content,
        }));
    }, []);

    const approveTransaction = useCallback((messageId: string, approved: boolean, txData: any) => {
        if (!wsRef.current) return;

        wsRef.current.send(JSON.stringify({
            type: "approval",
            message_id: messageId,
            approved,
            transaction_data: txData,
        }));

        // Update UI immediately
        setMessages((prev) => prev.map(msg => {
            if (msg.id === messageId) {
                return {
                    ...msg,
                    content: approved ? "Transaction approved. Executing..." : "Transaction cancelled.",
                    data: { ...msg.data, status: approved ? "approved" : "cancelled" }
                };
            }
            return msg;
        }));
    }, []);

    return {
        messages,
        sendMessage,
        approveTransaction,
        isConnected,
    };
}
