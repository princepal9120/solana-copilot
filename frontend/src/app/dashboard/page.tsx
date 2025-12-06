"use client";

import React from "react";
import { GlassCard } from "@/components/ui/glass-card";
import { ArrowUpRight, TrendingUp, ShieldCheck, Activity, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function DashboardPage() {
    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
                    <p className="text-muted-foreground">Welcome back, here's your portfolio overview.</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline">
                        Add Funds
                    </Button>
                    <Button className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20">
                        New Trade
                    </Button>
                </div>
            </div>

            {/* Bento Grid */}
            <div className="grid grid-cols-12 gap-6">

                {/* 1. Portfolio Value (Large Card) */}
                <GlassCard className="col-span-12 md:col-span-8 p-6 flex flex-col justify-between min-h-[240px]">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-sm font-medium text-muted-foreground mb-1">Total Portfolio Value</p>
                            <h2 className="text-4xl font-bold text-foreground tracking-tight">$15,234.50</h2>
                            <div className="flex items-center gap-2 mt-2">
                                <span className="flex items-center text-emerald-500 bg-emerald-50 dark:bg-emerald-500/10 px-2 py-1 rounded-full text-xs font-bold">
                                    <ArrowUpRight className="h-3 w-3 mr-1" /> +2.1%
                                </span>
                                <span className="text-muted-foreground text-xs">vs last 24h</span>
                            </div>
                        </div>
                        <div className="p-3 bg-primary/10 rounded-xl">
                            <TrendingUp className="h-6 w-6 text-primary" />
                        </div>
                    </div>

                    {/* Placeholder Chart Area */}
                    <div className="h-24 w-full mt-4 bg-gradient-to-r from-primary/5 to-transparent rounded-lg border border-primary/10 relative overflow-hidden">
                        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-primary/20" />
                        <svg className="w-full h-full absolute bottom-0" preserveAspectRatio="none">
                            <path d="M0,80 C100,70 200,90 300,50 C400,20 500,60 600,40 L600,100 L0,100 Z" fill="url(#grad1)" opacity="0.2" />
                            <path d="M0,80 C100,70 200,90 300,50 C400,20 500,60 600,40" stroke="currentColor" strokeWidth="2" fill="none" className="text-primary" />
                            <defs>
                                <linearGradient id="grad1" x1="0%" y1="0%" x2="0%" y2="100%">
                                    <stop offset="0%" stopColor="currentColor" className="text-primary" />
                                    <stop offset="100%" stopColor="transparent" />
                                </linearGradient>
                            </defs>
                        </svg>
                    </div>
                </GlassCard>

                {/* 2. Risk Score (Medium Card) */}
                <GlassCard className="col-span-12 md:col-span-4 p-6 flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">Risk Score</p>
                            <h3 className="text-2xl font-bold text-foreground mt-1">45/100</h3>
                        </div>
                        <ShieldCheck className="h-5 w-5 text-amber-500" />
                    </div>

                    <div className="mt-4 flex flex-col items-center justify-center relative">
                        {/* Simple Gauge Visual */}
                        <div className="w-32 h-16 overflow-hidden relative">
                            <div className="w-32 h-32 rounded-full border-[12px] border-muted absolute top-0 left-0" />
                            <div className="w-32 h-32 rounded-full border-[12px] border-amber-400 absolute top-0 left-0 border-b-transparent border-r-transparent border-l-transparent transform rotate-[-45deg]" />
                        </div>
                        <p className="text-amber-500 font-bold mt-[-10px]">Medium Risk</p>
                    </div>

                    <div className="mt-4 p-3 bg-amber-50 dark:bg-amber-500/10 rounded-lg border border-amber-100 dark:border-amber-500/20">
                        <p className="text-xs text-amber-700 dark:text-amber-400 leading-relaxed">
                            High exposure to SOL (70%). Consider diversifying to reduce volatility.
                        </p>
                    </div>
                </GlassCard>

                {/* 3. Holdings (Medium Card) */}
                <GlassCard className="col-span-12 md:col-span-4 p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold text-foreground">Holdings</h3>
                        <Button variant="ghost" size="sm" className="h-8 text-xs">View All</Button>
                    </div>
                    <div className="space-y-3">
                        {[
                            { name: "Solana", symbol: "SOL", amount: "145.2", value: "$10,450", color: "bg-purple-500" },
                            { name: "USDC", symbol: "USDC", amount: "4,500", value: "$4,500", color: "bg-blue-500" },
                            { name: "Bonk", symbol: "BONK", amount: "15M", value: "$284", color: "bg-orange-500" },
                        ].map((item) => (
                            <div key={item.symbol} className="flex items-center justify-between p-2 hover:bg-muted/50 rounded-lg transition-colors">
                                <div className="flex items-center gap-3">
                                    <div className={`w-2 h-8 rounded-full ${item.color}`} />
                                    <div>
                                        <p className="font-medium text-sm text-foreground">{item.name}</p>
                                        <p className="text-xs text-muted-foreground">{item.amount} {item.symbol}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="font-medium text-sm text-foreground">{item.value}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </GlassCard>

                {/* 4. Active Automations (Medium Card) */}
                <GlassCard className="col-span-12 md:col-span-4 p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold text-foreground">Automations</h3>
                        <Activity className="h-4 w-4 text-primary" />
                    </div>
                    <div className="space-y-3">
                        <div className="p-3 border border-border rounded-xl bg-card hover:border-primary/30 transition-all cursor-pointer group">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full">DCA</span>
                                <span className="text-xs text-muted-foreground flex items-center"><Clock className="h-3 w-3 mr-1" /> 2h left</span>
                            </div>
                            <p className="text-sm font-medium text-foreground">Daily $100 SOL Buy</p>
                            <div className="w-full bg-muted h-1.5 rounded-full mt-3 overflow-hidden">
                                <div className="bg-primary h-full w-[60%]" />
                            </div>
                        </div>

                        <div className="p-3 border border-border rounded-xl bg-card hover:border-primary/30 transition-all cursor-pointer">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-xs font-bold text-amber-600 bg-amber-100 dark:bg-amber-500/10 px-2 py-0.5 rounded-full">Stop-Loss</span>
                                <span className="text-xs text-emerald-500">Active</span>
                            </div>
                            <p className="text-sm font-medium text-foreground">Sell SOL if &lt; $130</p>
                        </div>
                    </div>
                </GlassCard>

                {/* 5. Recent Activity (Large Card) */}
                <GlassCard className="col-span-12 md:col-span-4 p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold text-foreground">Recent Activity</h3>
                    </div>
                    <div className="space-y-4">
                        {[
                            { type: "Swap", desc: "USDC to SOL", time: "2 mins ago", amount: "-$200", status: "success" },
                            { type: "Stake", desc: "Staked SOL", time: "4 hours ago", amount: "-5 SOL", status: "pending" },
                            { type: "Receive", desc: "From Coinbase", time: "1 day ago", amount: "+$1,000", status: "success" },
                        ].map((tx, i) => (
                            <div key={i} className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className={cn(
                                        "w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold",
                                        tx.type === "Swap" ? "bg-blue-100 dark:bg-blue-500/10 text-blue-600" :
                                            tx.type === "Stake" ? "bg-purple-100 dark:bg-purple-500/10 text-purple-600" : "bg-emerald-100 dark:bg-emerald-500/10 text-emerald-600"
                                    )}>
                                        {tx.type[0]}
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-foreground">{tx.type}</p>
                                        <p className="text-xs text-muted-foreground">{tx.desc}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm font-medium text-foreground">{tx.amount}</p>
                                    <p className={cn("text-xs", tx.status === "success" ? "text-emerald-500" : "text-amber-500")}>
                                        {tx.status}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </GlassCard>
            </div>
        </div>
    );
}
