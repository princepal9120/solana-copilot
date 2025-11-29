"use client";

import { useRef, useEffect, useState } from "react";
import { Send, Bot, User, Check, X, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useChat, Message } from "@/lib/hooks/useChat";
import { cn } from "@/lib/utils";

export function ChatInterface() {
    const { messages, sendMessage, approveTransaction, isConnected } = useChat();
    const [input, setInput] = useState("");
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;
        sendMessage(input);
        setInput("");
    };

    return (
        <div className="flex flex-col h-[600px] w-full max-w-3xl mx-auto bg-black/40 border border-white/10 rounded-2xl backdrop-blur-xl overflow-hidden shadow-2xl">
            {/* Header */}
            <div className="p-4 border-b border-white/10 flex items-center justify-between bg-white/5">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center">
                        <Bot className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h3 className="font-semibold text-white">Solana Copilot</h3>
                        <div className="flex items-center gap-2">
                            <span className={cn("w-2 h-2 rounded-full", isConnected ? "bg-green-500" : "bg-red-500")} />
                            <span className="text-xs text-muted-foreground">
                                {isConnected ? "Online" : "Connecting..."}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Messages */}
            <ScrollArea className="flex-1 p-4" ref={scrollRef}>
                <div className="space-y-6">
                    {messages.length === 0 && (
                        <div className="flex flex-col items-center justify-center h-64 text-center text-muted-foreground">
                            <Bot className="w-12 h-12 mb-4 opacity-20" />
                            <p>Start a conversation to manage your wallet.</p>
                            <p className="text-sm mt-2">Try "Swap 1 SOL to USDC" or "Analyze my portfolio"</p>
                        </div>
                    )}

                    <AnimatePresence initial={false}>
                        {messages.map((msg) => (
                            <MessageBubble
                                key={msg.id}
                                message={msg}
                                onApprove={(approved) => approveTransaction(msg.id, approved, msg.data?.transaction_data)}
                            />
                        ))}
                    </AnimatePresence>
                </div>
            </ScrollArea>

            {/* Input */}
            <div className="p-4 border-t border-white/10 bg-white/5">
                <form onSubmit={handleSubmit} className="flex gap-2">
                    <Input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Type a command..."
                        className="flex-1 bg-black/50 border-white/10 focus:border-primary/50"
                        disabled={!isConnected}
                    />
                    <Button type="submit" size="icon" disabled={!isConnected || !input.trim()}>
                        <Send className="w-4 h-4" />
                    </Button>
                </form>
            </div>
        </div>
    );
}

function MessageBubble({ message, onApprove }: { message: Message; onApprove: (approved: boolean) => void }) {
    const isUser = message.role === "user";
    const isApproval = message.data?.status === "awaiting_approval";
    const preview = message.data?.preview;

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={cn("flex gap-3", isUser ? "flex-row-reverse" : "flex-row")}
        >
            <div className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center shrink-0",
                isUser ? "bg-white/10" : "bg-primary/20"
            )}>
                {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4 text-primary" />}
            </div>

            <div className={cn(
                "max-w-[80%] rounded-2xl p-4",
                isUser ? "bg-primary text-white" : "bg-white/5 border border-white/10"
            )}>
                <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>

                {/* Transaction Preview Card */}
                {isApproval && preview && (
                    <div className="mt-4 p-4 rounded-xl bg-black/40 border border-white/10 space-y-3">
                        <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Transaction Preview</h4>

                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Action</span>
                                <span className="font-medium text-primary uppercase">{message.data.action}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">From</span>
                                <span className="font-medium">{preview.from}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">To</span>
                                <span className="font-medium">{preview.to}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Route</span>
                                <span className="font-medium text-xs">{preview.route}</span>
                            </div>
                            <div className="pt-2 border-t border-white/10 flex justify-between text-xs">
                                <span className="text-muted-foreground">Est. Gas</span>
                                <span>{preview.gas_estimate}</span>
                            </div>
                        </div>

                        <div className="flex gap-2 pt-2">
                            <Button size="sm" className="flex-1 bg-green-600 hover:bg-green-700" onClick={() => onApprove(true)}>
                                <Check className="w-4 h-4 mr-1" /> Approve
                            </Button>
                            <Button size="sm" variant="destructive" className="flex-1" onClick={() => onApprove(false)}>
                                <X className="w-4 h-4 mr-1" /> Reject
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </motion.div>
    );
}
