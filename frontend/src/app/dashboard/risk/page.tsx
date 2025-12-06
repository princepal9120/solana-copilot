"use client";

import React, { useState, useEffect } from "react";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import {
    ShieldCheck, AlertTriangle, TrendingUp, TrendingDown,
    Activity, PieChart, BarChart3, Loader2, RefreshCw, Lightbulb
} from "lucide-react";
import { cn } from "@/lib/utils";
import { portfolioApi } from "@/lib/api";

interface RiskData {
    risk_score: number;
    risk_level: string;
    volatility_90d_pct: number;
    max_drawdown_90d_pct: number;
    concentration_top3_pct: number;
    sharpe_ratio?: number;
    correlation?: number;
}

const mockRiskData: RiskData = {
    risk_score: 45,
    risk_level: "medium",
    volatility_90d_pct: 8.5,
    max_drawdown_90d_pct: 12.3,
    concentration_top3_pct: 95.8,
    sharpe_ratio: 1.2,
    correlation: 0.82,
};

const riskMetrics = [
    {
        key: "volatility_90d_pct",
        label: "Volatility (90d)",
        icon: Activity,
        description: "Price fluctuation intensity",
        thresholds: { low: 5, medium: 10, high: 15 },
        format: (v: number) => `${v.toFixed(1)}%`,
    },
    {
        key: "max_drawdown_90d_pct",
        label: "Max Drawdown (90d)",
        icon: TrendingDown,
        description: "Largest peak-to-trough decline",
        thresholds: { low: 10, medium: 20, high: 30 },
        format: (v: number) => `-${v.toFixed(1)}%`,
    },
    {
        key: "concentration_top3_pct",
        label: "Concentration",
        icon: PieChart,
        description: "Top 3 tokens allocation",
        thresholds: { low: 50, medium: 70, high: 85 },
        format: (v: number) => `${v.toFixed(0)}%`,
    },
    {
        key: "sharpe_ratio",
        label: "Sharpe Ratio",
        icon: BarChart3,
        description: "Risk-adjusted return",
        thresholds: { low: 2, medium: 1, high: 0.5 },
        format: (v: number) => v?.toFixed(2) || "N/A",
        inverse: true,
    },
];

export default function RiskAnalysisPage() {
    const [riskData, setRiskData] = useState<RiskData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchRiskData();
    }, []);

    async function fetchRiskData() {
        setLoading(true);
        try {
            const response = await portfolioApi.getRisk();
            setRiskData(response);
        } catch (err) {
            console.error("Failed to fetch risk data:", err);
            setError("Failed to load risk analysis. Showing sample data.");
            setRiskData(mockRiskData);
        } finally {
            setLoading(false);
        }
    }

    const displayRisk = riskData || mockRiskData;

    const getRiskColor = (level: string) => {
        switch (level.toLowerCase()) {
            case "low": return { text: "text-emerald-600", bg: "bg-emerald-100 dark:bg-emerald-500/20", border: "border-emerald-200" };
            case "medium": return { text: "text-amber-600", bg: "bg-amber-100 dark:bg-amber-500/20", border: "border-amber-200" };
            case "high": return { text: "text-orange-600", bg: "bg-orange-100 dark:bg-orange-500/20", border: "border-orange-200" };
            case "critical": return { text: "text-red-600", bg: "bg-red-100 dark:bg-red-500/20", border: "border-red-200" };
            default: return { text: "text-slate-600", bg: "bg-slate-100", border: "border-slate-200" };
        }
    };

    const getMetricLevel = (value: number, thresholds: { low: number; medium: number; high: number }, inverse = false) => {
        if (inverse) {
            if (value >= thresholds.low) return "low";
            if (value >= thresholds.medium) return "medium";
            return "high";
        }
        if (value <= thresholds.low) return "low";
        if (value <= thresholds.medium) return "medium";
        return "high";
    };

    const riskColors = getRiskColor(displayRisk.risk_level);

    const generateInsights = (data: RiskData) => {
        const insights: { type: "warning" | "info" | "success"; message: string }[] = [];

        if (data.concentration_top3_pct > 80) {
            insights.push({
                type: "warning",
                message: `High exposure to top tokens (${data.concentration_top3_pct.toFixed(0)}%). Consider diversifying to reduce single-asset risk.`,
            });
        }
        if (data.volatility_90d_pct > 10) {
            insights.push({
                type: "warning",
                message: `Portfolio volatility is elevated (${data.volatility_90d_pct.toFixed(1)}%). Consider adding stablecoins or less volatile assets.`,
            });
        }
        if (data.max_drawdown_90d_pct > 20) {
            insights.push({
                type: "warning",
                message: `Significant drawdown detected (-${data.max_drawdown_90d_pct.toFixed(1)}%). Review your stop-loss strategies.`,
            });
        }
        if (data.risk_score <= 30) {
            insights.push({
                type: "success",
                message: "Your portfolio has a healthy risk profile. Keep monitoring for changes.",
            });
        }
        if (insights.length === 0) {
            insights.push({
                type: "info",
                message: "Portfolio diversification is adequate. Continue monitoring volatility trends.",
            });
        }
        return insights;
    };

    const insights = generateInsights(displayRisk);

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-foreground">Risk Analysis</h1>
                    <p className="text-muted-foreground">Understand your portfolio's risk profile</p>
                </div>
                <Button
                    variant="outline"
                    onClick={fetchRiskData}
                    disabled={loading}
                >
                    <RefreshCw className={cn("h-4 w-4 mr-2", loading && "animate-spin")} />
                    Refresh
                </Button>
            </div>

            {/* Error Banner */}
            {error && (
                <div className="p-3 bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 rounded-lg">
                    <p className="text-sm text-amber-700 dark:text-amber-400">{error}</p>
                </div>
            )}

            {/* Main Risk Score */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <GlassCard className="lg:col-span-1 p-8 flex flex-col items-center justify-center">
                    {loading ? (
                        <Loader2 className="h-12 w-12 animate-spin text-muted-foreground" />
                    ) : (
                        <>
                            {/* Gauge */}
                            <div className="relative w-48 h-24 overflow-hidden mb-4">
                                <div className="absolute w-48 h-48 rounded-full border-[16px] border-muted" />
                                <div
                                    className={cn(
                                        "absolute w-48 h-48 rounded-full border-[16px] border-b-transparent border-r-transparent border-l-transparent transition-transform duration-500",
                                        riskColors.text.replace("text-", "border-t-")
                                    )}
                                    style={{
                                        transform: `rotate(${-90 + (displayRisk.risk_score / 100) * 180}deg)`,
                                    }}
                                />
                            </div>
                            <div className="text-center">
                                <p className="text-5xl font-bold text-foreground">{displayRisk.risk_score}</p>
                                <p className="text-sm text-muted-foreground">out of 100</p>
                            </div>
                            <div className={cn(
                                "mt-4 px-4 py-2 rounded-full text-sm font-medium capitalize",
                                riskColors.bg, riskColors.text
                            )}>
                                {displayRisk.risk_level.replace("_", " ")} Risk
                            </div>
                        </>
                    )}
                </GlassCard>

                {/* Metrics Grid */}
                <GlassCard className="lg:col-span-2 p-6">
                    <h3 className="font-semibold text-foreground mb-6 flex items-center gap-2">
                        <Activity className="h-5 w-5 text-primary" />
                        Risk Metrics
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                        {riskMetrics.map((metric) => {
                            const value = displayRisk[metric.key as keyof RiskData] as number;
                            const level = getMetricLevel(value, metric.thresholds, metric.inverse);
                            const levelColors = getRiskColor(level);
                            const Icon = metric.icon;

                            return (
                                <div
                                    key={metric.key}
                                    className={cn(
                                        "p-4 rounded-xl border transition-all hover:shadow-md",
                                        levelColors.bg, levelColors.border
                                    )}
                                >
                                    <div className="flex items-start justify-between mb-2">
                                        <Icon className={cn("h-5 w-5", levelColors.text)} />
                                        <span className={cn(
                                            "text-xs font-medium px-2 py-0.5 rounded-full capitalize",
                                            levelColors.bg, levelColors.text
                                        )}>
                                            {level}
                                        </span>
                                    </div>
                                    <p className="text-2xl font-bold text-foreground">{metric.format(value)}</p>
                                    <p className="text-sm text-muted-foreground mt-1">{metric.label}</p>
                                    <p className="text-xs text-muted-foreground/70 mt-0.5">{metric.description}</p>
                                </div>
                            );
                        })}
                    </div>
                </GlassCard>
            </div>

            {/* AI Insights */}
            <GlassCard className="p-6">
                <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                    <Lightbulb className="h-5 w-5 text-primary" />
                    AI Insights
                </h3>
                <div className="space-y-3">
                    {insights.map((insight, index) => {
                        const isWarning = insight.type === "warning";
                        const isSuccess = insight.type === "success";
                        return (
                            <div
                                key={index}
                                className={cn(
                                    "p-4 rounded-xl border flex items-start gap-3",
                                    isWarning && "bg-amber-50 dark:bg-amber-500/10 border-amber-200 dark:border-amber-500/20",
                                    isSuccess && "bg-emerald-50 dark:bg-emerald-500/10 border-emerald-200 dark:border-emerald-500/20",
                                    !isWarning && !isSuccess && "bg-blue-50 dark:bg-blue-500/10 border-blue-200 dark:border-blue-500/20"
                                )}
                            >
                                {isWarning ? (
                                    <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
                                ) : isSuccess ? (
                                    <ShieldCheck className="h-5 w-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                                ) : (
                                    <Lightbulb className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                                )}
                                <p className={cn(
                                    "text-sm",
                                    isWarning && "text-amber-700 dark:text-amber-400",
                                    isSuccess && "text-emerald-700 dark:text-emerald-400",
                                    !isWarning && !isSuccess && "text-blue-700 dark:text-blue-400"
                                )}>
                                    {insight.message}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </GlassCard>

            {/* Action Buttons */}
            <div className="flex gap-4">
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Rebalance Portfolio
                </Button>
                <Button variant="outline">
                    <TrendingUp className="h-4 w-4 mr-2" />
                    View Recommendations
                </Button>
            </div>
        </div>
    );
}
