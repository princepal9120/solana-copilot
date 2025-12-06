"use client";

import React, { useEffect, useState } from "react";
import { GlassCard } from "@/components/ui/glass-card";
import { ArrowUpRight, ArrowDownRight, TrendingUp, ShieldCheck, Activity, Clock, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { AreaChart, Area, XAxis, YAxis, Tooltip as RechartsTooltip, ResponsiveContainer } from 'recharts';
import { portfolioApi, automationsApi, transactionsApi } from "@/lib/api";

// Types for API responses
interface TokenHolding {
    mint: string;
    symbol: string;
    amount: number;
    price_usd: number;
    value_usd: number;
    allocation_pct: number;
}

interface PortfolioRisk {
    risk_score: number;
    risk_level: string;
    volatility_90d_pct: number;
    max_drawdown_90d_pct: number;
    concentration_top3_pct: number;
}

interface Automation {
    id: string;
    automation_type: string;
    name: string;
    status: string;
    next_execution_at: string;
    source_token: string;
    dest_token: string;
    amount: number;
}

interface RecentActivity {
    id: string;
    action: string;
    description: string;
    status: string;
    timestamp: string;
    tx_signature: string | null;
}

// Mock chart data (would need historical API for real data)
const portfolioChartData = [
    { name: 'Mon', value: 14000 },
    { name: 'Tue', value: 14500 },
    { name: 'Wed', value: 14200 },
    { name: 'Thu', value: 14800 },
    { name: 'Fri', value: 15234 },
    { name: 'Sat', value: 15100 },
    { name: 'Sun', value: 15234 },
];

export default function DashboardPage() {
    // State for API data
    const [portfolio, setPortfolio] = useState<{ total_usd: number; change_pct: number } | null>(null);
    const [holdings, setHoldings] = useState<TokenHolding[]>([]);
    const [risk, setRisk] = useState<PortfolioRisk | null>(null);
    const [automations, setAutomations] = useState<Automation[]>([]);
    const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([]);

    // Loading and error states
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchDashboardData() {
            setLoading(true);
            setError(null);

            try {
                // Fetch all data in parallel
                const [portfolioRes, holdingsRes, riskRes, automationsRes, activityRes] = await Promise.allSettled([
                    portfolioApi.getPortfolio(),
                    portfolioApi.getHoldings(),
                    portfolioApi.getRisk(),
                    automationsApi.getAutomations('active'),
                    transactionsApi.getRecentActivity(5),
                ]);

                // Handle portfolio
                if (portfolioRes.status === 'fulfilled') {
                    const p = portfolioRes.value;
                    setPortfolio({
                        total_usd: p.portfolio_summary?.total_usd || 0,
                        change_pct: p.performance?.return_1d_pct || 0,
                    });
                }

                // Handle holdings
                if (holdingsRes.status === 'fulfilled') {
                    setHoldings(holdingsRes.value || []);
                }

                // Handle risk
                if (riskRes.status === 'fulfilled') {
                    setRisk(riskRes.value);
                }

                // Handle automations
                if (automationsRes.status === 'fulfilled') {
                    setAutomations(automationsRes.value?.automations || []);
                }

                // Handle activity
                if (activityRes.status === 'fulfilled') {
                    setRecentActivity(activityRes.value?.activity || []);
                }

            } catch (err) {
                console.error('Dashboard fetch error:', err);
                setError('Failed to load dashboard data. Using fallback values.');
            } finally {
                setLoading(false);
            }
        }

        fetchDashboardData();
    }, []);

    // Fallback/mock data when API fails or during loading
    const displayPortfolio = portfolio || { total_usd: 15234.50, change_pct: 2.1 };
    const displayHoldings = holdings.length > 0 ? holdings : [
        { mint: "SOL", symbol: "SOL", amount: 145.2, price_usd: 72, value_usd: 10450, allocation_pct: 68.6 },
        { mint: "USDC", symbol: "USDC", amount: 4500, price_usd: 1, value_usd: 4500, allocation_pct: 29.5 },
        { mint: "BONK", symbol: "BONK", amount: 15000000, price_usd: 0.00001893, value_usd: 284, allocation_pct: 1.9 },
    ];
    const displayRisk = risk || { risk_score: 45, risk_level: "medium", volatility_90d_pct: 8.5, max_drawdown_90d_pct: 12.3, concentration_top3_pct: 95.8 };
    const displayAutomations = automations.length > 0 ? automations : [];
    const displayActivity = recentActivity.length > 0 ? recentActivity : [
        { id: "1", action: "Swap", description: "USDC to SOL", status: "success", timestamp: new Date().toISOString(), tx_signature: null },
        { id: "2", action: "Stake", description: "Staked SOL", status: "pending", timestamp: new Date().toISOString(), tx_signature: null },
    ];

    const getHoldingColor = (index: number) => {
        const colors = ["bg-purple-500", "bg-blue-500", "bg-orange-500", "bg-green-500", "bg-pink-500"];
        return colors[index % colors.length];
    };

    const getRiskColor = (level: string) => {
        switch (level.toLowerCase()) {
            case 'low': return 'text-emerald-500';
            case 'medium': return 'text-amber-500';
            case 'high': return 'text-orange-500';
            case 'very_high': return 'text-red-500';
            default: return 'text-muted-foreground';
        }
    };

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
    };

    const formatNumber = (value: number, decimals: number = 2) => {
        if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
        if (value >= 1000) return `${(value / 1000).toFixed(1)}K`;
        return value.toFixed(decimals);
    };

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

            {/* Error Banner */}
            {error && (
                <div className="p-3 bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 rounded-lg">
                    <p className="text-sm text-amber-700 dark:text-amber-400">{error}</p>
                </div>
            )}

            {/* Bento Grid */}
            <div className="grid grid-cols-12 gap-6">

                {/* 1. Portfolio Value (Large Card) */}
                <GlassCard className="col-span-12 md:col-span-8 p-6 flex flex-col justify-between min-h-[300px]">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-sm font-medium text-muted-foreground mb-1">Total Portfolio Value</p>
                            {loading ? (
                                <div className="flex items-center gap-2">
                                    <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                                    <span className="text-muted-foreground">Loading...</span>
                                </div>
                            ) : (
                                <>
                                    <h2 className="text-4xl font-bold text-foreground tracking-tight">
                                        {formatCurrency(displayPortfolio.total_usd)}
                                    </h2>
                                    <div className="flex items-center gap-2 mt-2">
                                        <span className={cn(
                                            "flex items-center px-2 py-1 rounded-full text-xs font-bold",
                                            displayPortfolio.change_pct >= 0
                                                ? "text-emerald-500 bg-emerald-50 dark:bg-emerald-500/10"
                                                : "text-red-500 bg-red-50 dark:bg-red-500/10"
                                        )}>
                                            {displayPortfolio.change_pct >= 0 ? (
                                                <ArrowUpRight className="h-3 w-3 mr-1" />
                                            ) : (
                                                <ArrowDownRight className="h-3 w-3 mr-1" />
                                            )}
                                            {displayPortfolio.change_pct >= 0 ? '+' : ''}{displayPortfolio.change_pct.toFixed(1)}%
                                        </span>
                                        <span className="text-muted-foreground text-xs">vs last 24h</span>
                                    </div>
                                </>
                            )}
                        </div>
                        <div className="p-3 bg-primary/10 rounded-xl">
                            <TrendingUp className="h-6 w-6 text-primary" />
                        </div>
                    </div>

                    {/* Chart Area */}
                    <div className="h-48 w-full mt-4">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={portfolioChartData}>
                                <defs>
                                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <XAxis dataKey="name" hide />
                                <YAxis hide domain={['dataMin - 500', 'dataMax + 500']} />
                                <RechartsTooltip
                                    contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', borderRadius: '8px' }}
                                    itemStyle={{ color: 'hsl(var(--foreground))' }}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="value"
                                    stroke="hsl(var(--primary))"
                                    fillOpacity={1}
                                    fill="url(#colorValue)"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </GlassCard>

                {/* 2. Risk Score (Medium Card) */}
                <GlassCard className="col-span-12 md:col-span-4 p-6 flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">Risk Score</p>
                            <h3 className="text-2xl font-bold text-foreground mt-1">
                                {loading ? '...' : `${displayRisk.risk_score}/100`}
                            </h3>
                        </div>
                        <ShieldCheck className={cn("h-5 w-5", getRiskColor(displayRisk.risk_level))} />
                    </div>

                    <div className="mt-4 flex flex-col items-center justify-center relative">
                        {/* Simple Gauge Visual */}
                        <div className="w-32 h-16 overflow-hidden relative">
                            <div className="w-32 h-32 rounded-full border-[12px] border-muted absolute top-0 left-0" />
                            <div className={cn(
                                "w-32 h-32 rounded-full border-[12px] absolute top-0 left-0 border-b-transparent border-r-transparent border-l-transparent transform",
                                displayRisk.risk_level === 'low' ? "border-emerald-400 rotate-[-80deg]" :
                                    displayRisk.risk_level === 'medium' ? "border-amber-400 rotate-[-45deg]" :
                                        displayRisk.risk_level === 'high' ? "border-orange-400 rotate-[0deg]" :
                                            "border-red-400 rotate-[45deg]"
                            )} />
                        </div>
                        <p className={cn("font-bold mt-[-10px] capitalize", getRiskColor(displayRisk.risk_level))}>
                            {displayRisk.risk_level.replace('_', ' ')} Risk
                        </p>
                    </div>

                    <div className="mt-4 p-3 bg-amber-50 dark:bg-amber-500/10 rounded-lg border border-amber-100 dark:border-amber-500/20">
                        <p className="text-xs text-amber-700 dark:text-amber-400 leading-relaxed">
                            {displayRisk.concentration_top3_pct > 70
                                ? `High exposure to top tokens (${displayRisk.concentration_top3_pct.toFixed(0)}%). Consider diversifying.`
                                : `Portfolio diversification is healthy. Keep monitoring volatility.`
                            }
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
                        {loading ? (
                            <div className="flex items-center justify-center py-8">
                                <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                            </div>
                        ) : (
                            displayHoldings.slice(0, 3).map((item, index) => (
                                <div key={item.mint} className="flex items-center justify-between p-2 hover:bg-muted/50 rounded-lg transition-colors">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-2 h-8 rounded-full ${getHoldingColor(index)}`} />
                                        <div>
                                            <p className="font-medium text-sm text-foreground">{item.symbol}</p>
                                            <p className="text-xs text-muted-foreground">{formatNumber(item.amount)} {item.symbol}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-medium text-sm text-foreground">{formatCurrency(item.value_usd)}</p>
                                        <p className="text-xs text-muted-foreground">{item.allocation_pct.toFixed(1)}%</p>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </GlassCard>

                {/* 4. Active Automations (Medium Card) */}
                <GlassCard className="col-span-12 md:col-span-4 p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold text-foreground">Automations</h3>
                        <Activity className="h-4 w-4 text-primary" />
                    </div>
                    <div className="space-y-3">
                        {loading ? (
                            <div className="flex items-center justify-center py-8">
                                <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                            </div>
                        ) : displayAutomations.length > 0 ? (
                            displayAutomations.slice(0, 2).map((auto) => (
                                <div key={auto.id} className="p-3 border border-border rounded-xl bg-card hover:border-primary/30 transition-all cursor-pointer">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className={cn(
                                            "text-xs font-bold px-2 py-0.5 rounded-full",
                                            auto.automation_type === 'dca' ? "text-primary bg-primary/10" : "text-amber-600 bg-amber-100 dark:bg-amber-500/10"
                                        )}>
                                            {auto.automation_type.toUpperCase()}
                                        </span>
                                        <span className="text-xs text-emerald-500">{auto.status}</span>
                                    </div>
                                    <p className="text-sm font-medium text-foreground">{auto.name}</p>
                                </div>
                            ))
                        ) : (
                            <div className="p-4 text-center text-muted-foreground text-sm">
                                <p>No active automations</p>
                                <Button variant="link" size="sm" className="mt-2">Create one</Button>
                            </div>
                        )}
                    </div>
                </GlassCard>

                {/* 5. Recent Activity (Large Card) */}
                <GlassCard className="col-span-12 md:col-span-4 p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold text-foreground">Recent Activity</h3>
                    </div>
                    <div className="space-y-4">
                        {loading ? (
                            <div className="flex items-center justify-center py-8">
                                <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                            </div>
                        ) : (
                            displayActivity.slice(0, 3).map((tx) => (
                                <div key={tx.id} className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className={cn(
                                            "w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold",
                                            tx.action === "Swap" || tx.action === "swap" ? "bg-blue-100 dark:bg-blue-500/10 text-blue-600" :
                                                tx.action === "Stake" || tx.action === "stake" ? "bg-purple-100 dark:bg-purple-500/10 text-purple-600" :
                                                    "bg-emerald-100 dark:bg-emerald-500/10 text-emerald-600"
                                        )}>
                                            {tx.action[0].toUpperCase()}
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-foreground capitalize">{tx.action}</p>
                                            <p className="text-xs text-muted-foreground">{tx.description}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className={cn("text-xs capitalize", tx.status === "success" ? "text-emerald-500" : "text-amber-500")}>
                                            {tx.status}
                                        </p>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </GlassCard>
            </div>
        </div>
    );
}
