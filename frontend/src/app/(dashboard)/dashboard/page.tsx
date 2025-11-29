"use client";

import { ChatInterface } from "@/components/chat/ChatInterface";
import { useAuthStore } from "@/lib/store/authStore";
import { motion } from "framer-motion";

export default function DashboardPage() {
    const { user } = useAuthStore();

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold tracking-tight">
                    Welcome back, <span className="text-primary">User</span>
                </h1>
                <p className="text-muted-foreground">
                    Your AI Copilot is ready. Ask anything or manage your portfolio.
                </p>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                {/* Chat Section - Takes up 2 columns on large screens */}
                <div className="xl:col-span-2">
                    <ChatInterface />
                </div>

                {/* Quick Stats / Actions - Takes up 1 column */}
                <div className="space-y-6">
                    {/* Quick Actions Card */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm"
                    >
                        <h3 className="font-semibold mb-4">Quick Actions</h3>
                        <div className="grid grid-cols-2 gap-3">
                            {["Swap Tokens", "Send SOL", "Stake", "Analyze"].map((action) => (
                                <button
                                    key={action}
                                    className="p-3 rounded-xl bg-white/5 hover:bg-primary/20 hover:text-primary transition-colors text-sm font-medium text-left"
                                >
                                    {action}
                                </button>
                            ))}
                        </div>
                    </motion.div>

                    {/* Market Overview (Placeholder) */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                        className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm"
                    >
                        <h3 className="font-semibold mb-4">Market Overview</h3>
                        <div className="space-y-4">
                            {[
                                { name: "Solana", symbol: "SOL", price: "$145.20", change: "+5.2%" },
                                { name: "Jupiter", symbol: "JUP", price: "$1.12", change: "+2.1%" },
                                { name: "Bonk", symbol: "BONK", price: "$0.000024", change: "-1.5%" },
                            ].map((token) => (
                                <div key={token.symbol} className="flex justify-between items-center">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-white/10" />
                                        <div>
                                            <div className="font-medium">{token.name}</div>
                                            <div className="text-xs text-muted-foreground">{token.symbol}</div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="font-medium">{token.price}</div>
                                        <div className={token.change.startsWith("+") ? "text-green-400 text-xs" : "text-red-400 text-xs"}>
                                            {token.change}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
