"use client";

import React from "react";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { TrendingUp, TrendingDown, ArrowUpRight, Wallet, BarChart3, PieChart as PieChartIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip } from 'recharts';

const holdings = [
    { name: "Solana", symbol: "SOL", amount: "145.2", value: 10450, change: 5.2, fill: "#8b5cf6" },
    { name: "USD Coin", symbol: "USDC", amount: "4,500", value: 4500, change: 0, fill: "#3b82f6" },
    { name: "Bonk", symbol: "BONK", amount: "15M", value: 284, change: -12.5, fill: "#f97316" },
    { name: "Raydium", symbol: "RAY", amount: "120", value: 180, change: 8.3, fill: "#14b8a6" },
    { name: "Jupiter", symbol: "JUP", amount: "500", value: 320, change: 15.2, fill: "#6366f1" },
];

const transactions = [
    { type: "Buy", asset: "SOL", amount: "+10 SOL", value: "$720", time: "2 hours ago", status: "completed" },
    { type: "Sell", asset: "BONK", amount: "-5M BONK", value: "$95", time: "5 hours ago", status: "completed" },
    { type: "Swap", asset: "USDC → SOL", amount: "+5 SOL", value: "$360", time: "1 day ago", status: "completed" },
    { type: "Stake", asset: "SOL", amount: "-20 SOL", value: "$1,440", time: "3 days ago", status: "pending" },
    { type: "Buy", asset: "JUP", amount: "+200 JUP", value: "$128", time: "5 days ago", status: "completed" },
];

export default function PortfolioPage() {
    const totalValue = holdings.reduce((acc, h) => acc + h.value, 0);

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-foreground">Portfolio</h1>
                    <p className="text-muted-foreground">Track your holdings and performance</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline">
                        <BarChart3 className="h-4 w-4 mr-2" />
                        Export
                    </Button>
                    <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                        <Wallet className="h-4 w-4 mr-2" />
                        Add Wallet
                    </Button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <GlassCard className="p-5">
                    <p className="text-sm text-muted-foreground">Total Value</p>
                    <h3 className="text-2xl font-bold text-foreground mt-1">${totalValue.toLocaleString()}</h3>
                    <div className="flex items-center gap-1 mt-2 text-emerald-500 text-xs font-medium">
                        <ArrowUpRight className="h-3 w-3" />
                        <span>+$1,234 (8.5%)</span>
                    </div>
                </GlassCard>
                <GlassCard className="p-5">
                    <p className="text-sm text-muted-foreground">24h Change</p>
                    <h3 className="text-2xl font-bold text-emerald-500 mt-1">+$312.50</h3>
                    <p className="text-xs text-muted-foreground mt-2">+2.1% from yesterday</p>
                </GlassCard>
                <GlassCard className="p-5">
                    <p className="text-sm text-muted-foreground">Best Performer</p>
                    <h3 className="text-2xl font-bold text-foreground mt-1">JUP</h3>
                    <div className="flex items-center gap-1 mt-2 text-emerald-500 text-xs font-medium">
                        <TrendingUp className="h-3 w-3" />
                        <span>+15.2% today</span>
                    </div>
                </GlassCard>
                <GlassCard className="p-5">
                    <p className="text-sm text-muted-foreground">Worst Performer</p>
                    <h3 className="text-2xl font-bold text-foreground mt-1">BONK</h3>
                    <div className="flex items-center gap-1 mt-2 text-red-500 text-xs font-medium">
                        <TrendingDown className="h-3 w-3" />
                        <span>-12.5% today</span>
                    </div>
                </GlassCard>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Holdings Table */}
                <GlassCard className="lg:col-span-2 p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="font-semibold text-foreground flex items-center gap-2">
                            <PieChartIcon className="h-5 w-5 text-primary" />
                            Holdings
                        </h3>
                        <Button variant="ghost" size="sm">View All</Button>
                    </div>
                    <div className="space-y-1">
                        <div className="grid grid-cols-5 text-xs text-muted-foreground px-3 pb-2 border-b border-border">
                            <span>Asset</span>
                            <span>Amount</span>
                            <span className="text-right">Value</span>
                            <span className="text-right">24h</span>
                            <span className="text-right">Allocation</span>
                        </div>
                        {holdings.map((holding) => (
                            <div key={holding.symbol} className="grid grid-cols-5 items-center py-3 px-3 hover:bg-muted/50 rounded-lg transition-colors">
                                <div className="flex items-center gap-3">
                                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: holding.fill }} />
                                    <div>
                                        <p className="font-medium text-foreground">{holding.name}</p>
                                        <p className="text-xs text-muted-foreground">{holding.symbol}</p>
                                    </div>
                                </div>
                                <p className="text-sm text-foreground">{holding.amount}</p>
                                <p className="text-sm text-foreground text-right">${holding.value.toLocaleString()}</p>
                                <p className={cn(
                                    "text-sm text-right font-medium",
                                    holding.change > 0 ? "text-emerald-500" : holding.change < 0 ? "text-red-500" : "text-muted-foreground"
                                )}>
                                    {holding.change > 0 ? "+" : ""}{holding.change}%
                                </p>
                                <p className="text-sm text-right text-muted-foreground">
                                    {((holding.value / totalValue) * 100).toFixed(1)}%
                                </p>
                            </div>
                        ))}
                    </div>
                </GlassCard>

                {/* Allocation Chart */}
                <GlassCard className="p-6">
                    <h3 className="font-semibold text-foreground mb-6">Allocation</h3>
                    <div className="h-[200px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={holdings}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {holdings.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.fill} stroke="none" />
                                    ))}
                                </Pie>
                                <RechartsTooltip
                                    contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', borderRadius: '8px' }}
                                    itemStyle={{ color: 'hsl(var(--foreground))' }}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="mt-4 space-y-2">
                        {holdings.slice(0, 3).map((holding) => (
                            <div key={holding.symbol} className="flex items-center justify-between text-sm">
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: holding.fill }} />
                                    <span className="text-foreground">{holding.symbol}</span>
                                </div>
                                <span className="text-muted-foreground">{((holding.value / totalValue) * 100).toFixed(1)}%</span>
                            </div>
                        ))}
                    </div>
                </GlassCard>
            </div>

            {/* Transaction History */}
            <GlassCard className="p-6">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="font-semibold text-foreground">Recent Transactions</h3>
                    <Button variant="ghost" size="sm">View All</Button>
                </div>
                <div className="space-y-1">
                    <div className="grid grid-cols-6 text-xs text-muted-foreground px-3 pb-2 border-b border-border">
                        <span>Type</span>
                        <span>Asset</span>
                        <span>Amount</span>
                        <span>Value</span>
                        <span>Time</span>
                        <span className="text-right">Status</span>
                    </div>
                    {transactions.map((tx, i) => (
                        <div key={i} className="grid grid-cols-6 items-center py-3 px-3 hover:bg-muted/50 rounded-lg transition-colors">
                            <span className={cn(
                                "text-xs font-medium px-2 py-1 rounded-full w-fit",
                                tx.type === "Buy" ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400" :
                                    tx.type === "Sell" ? "bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400" :
                                        tx.type === "Swap" ? "bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400" : "bg-purple-100 text-purple-700 dark:bg-purple-500/20 dark:text-purple-400"
                            )}>
                                {tx.type}
                            </span>
                            <span className="text-sm text-foreground">{tx.asset}</span>
                            <span className="text-sm text-foreground">{tx.amount}</span>
                            <span className="text-sm text-foreground">{tx.value}</span>
                            <span className="text-sm text-muted-foreground">{tx.time}</span>
                            <span className={cn(
                                "text-xs text-right",
                                tx.status === "completed" ? "text-emerald-500" : "text-amber-500"
                            )}>
                                {tx.status}
                            </span>
                        </div>
                    ))}
                </div>
            </GlassCard>
        </div>
    );
}
